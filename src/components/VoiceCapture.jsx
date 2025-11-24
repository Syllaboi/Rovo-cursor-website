import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, Mic, UserRound } from 'lucide-react';

// Lightweight volume analyser from getUserMedia to drive orb pulse
function useMicAnalyser(isOn) {
  const [level, setLevel] = useState(0);
  const streamRef = useRef(null);
  const ctxRef = useRef(null);
  const analyserRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const start = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        ctxRef.current = ctx;
        const source = ctx.createMediaStreamSource(stream);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 1024;
        analyserRef.current = analyser;
        source.connect(analyser);
        const data = new Uint8Array(analyser.frequencyBinCount);
        const tick = () => {
          analyser.getByteTimeDomainData(data);
          let sum = 0;
          for (let i = 0; i < data.length; i++) {
            const v = (data[i] - 128) / 128;
            sum += v * v;
          }
          const rms = Math.sqrt(sum / data.length);
          setLevel(rms);
          rafRef.current = requestAnimationFrame(tick);
        };
        tick();
      } catch (e) {
        console.warn('Microphone not available', e);
        setLevel(0);
      }
    };

    if (isOn) start();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (ctxRef.current) {
        try { ctxRef.current.close(); } catch {}
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }
      analyserRef.current = null;
      ctxRef.current = null;
      streamRef.current = null;
    };
  }, [isOn]);

  // return level in [0,1]
  return Math.min(1, level * 8);
}

export default function VoiceCapture({ onBack }) {
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const level = useMicAnalyser(isRecording);

  // Recording state
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const streamRef = useRef(null);

  // Basic timer when recording
  useEffect(() => {
    let id;
    if (isRecording) {
      const started = Date.now();
      id = setInterval(() => setElapsed(Math.floor((Date.now() - started) / 1000)), 200);
    } else {
      setElapsed(0);
    }
    return () => id && clearInterval(id);
  }, [isRecording]);

  // Minimal web speech live transcription (if available)
  const [transcript, setTranscript] = useState('');
  const recRef = useRef(null);
  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    if (isRecording) {
      setTranscript('');
      const rec = new SR();
      recRef.current = rec;
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = 'en-US';
      let acc = '';
      rec.onresult = (evt) => {
        let interim = '';
        for (let i = evt.resultIndex; i < evt.results.length; i++) {
          const res = evt.results[i];
          if (res.isFinal) acc += res[0].transcript + ' ';
          else interim += res[0].transcript;
        }
        setTranscript((acc + interim).trim());
      };
      rec.onerror = (e) => {
        console.warn('SpeechRecognition error', e);
      };
      try { rec.start(); } catch {}
      return () => { try { rec.stop(); } catch {} };
    } else {
      if (recRef.current) { try { recRef.current.stop(); } catch {} }
    }
  }, [isRecording]);

  // Derived visual states
  const orbScale = useMemo(() => 1 + level * 0.25, [level]);
  const orbGlow = useMemo(() => 0.4 + level * 0.8, [level]);

  const stopStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
  };

  const toggleRec = async () => {
    if (isRecording) {
      // Stop recording and send to webhook
      try {
        mediaRecorderRef.current?.stop();
      } catch {}
      setIsRecording(false);
    } else {
      setError('');
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;
        const mr = new MediaRecorder(stream);
        mediaRecorderRef.current = mr;
        audioChunksRef.current = [];
        mr.ondataavailable = (e) => audioChunksRef.current.push(e.data);
        mr.onstop = async () => {
          const blob = new Blob(audioChunksRef.current, { type: audioChunksRef.current[0]?.type || 'audio/webm' });
          // Convert to wav for webhook
          try {
            const { blobToWav } = await import('../utils/audioUtils');
            const wav = await blobToWav(blob);
            // Send to webhook via n8n service
            const { sendMessage } = await import('../services/n8nService');
            const res = await sendMessage('', null, wav);
            // You can handle response here (e.g., show toast or route back)
            setSuccess(true);
            setTimeout(() => setSuccess(false), 900);
          } catch (err) {
            console.error(err);
            setError('Upload failed. Try Again');
          } finally {
            stopStream();
          }
        };
        mr.start();
        setIsRecording(true);
      } catch (e) {
        setError('Microphone access denied. Try Again');
      }
    }
  };

  const formatted = useMemo(() => {
    const mm = String(Math.floor(elapsed / 60)).padStart(2, '0');
    const ss = String(elapsed % 60).padStart(2, '0');
    return `${mm}:${ss}`;
  }, [elapsed]);

  return (
    <div className="w-full h-dvh flex items-center justify-center bg-transparent">
      <div className="relative w-full max-w-[390px] h-dvh max-h-[844px] rounded-[32px] overflow-hidden shadow-xl border border-black/5">
        {/* Background gradient */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, #B8E4E4 0%, #F4D0A9 50%, #D3C1A6 100%)'
        }} />

        {/* Header */}
        <div className="relative z-10 h-[56px] px-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-8 h-8 rounded-full flex items-center justify-center border border-black/60 text-black/80 bg-transparent"
            aria-label="Back"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="text-[17px] font-medium text-[#111]">Voice Analysis</div>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-black/80 border border-black/20">
            <UserRound size={18} />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-[calc(100%-56px-112px)] px-6 flex flex-col items-center justify-center gap-6">
          {/* Listening label */}
          <div className="text-[14px] font-normal text-[#888] -mb-2">{isRecording ? 'Listening…' : success ? 'Captured' : error ? 'Try Again' : 'Ready'}</div>

          {/* Orb */}
          <div
            className={`voice-orb ${isRecording ? 'recording' : ''} ${success ? 'success' : ''} ${error ? 'error' : ''}`}
            style={{ transform: `scale(${orbScale})`, boxShadow: `0 0 60px rgba(80,205,254,${orbGlow})` }}
          >
            <div className="orb-inner" />
          </div>

          {/* Live transcription */}
          <div className="w-full max-w-[80%] text-center text-[16px] leading-[1.5] text-[#222]"><span className="font-normal whitespace-pre-wrap">
            {transcript || 'Hello, I need to find an invoice for October 2024.\nThere was also a calculation for the iScan'}
          </span></div>
        </div>

        {/* Bottom controls area (112px height to mimic sticky safe area) */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-8 pt-4">
          <div className="w-full flex items-center justify-between">
            {/* Timer circle */}
            <div className="w-10 h-10 rounded-full border border-black/60 flex items-center justify-center text-[12px] text-black/80">
              {isRecording ? formatted : '00'}
            </div>

            {/* Mic button */}
            <button
              onClick={toggleRec}
              onContextMenu={(e) => { e.preventDefault(); setIsRecording(false); }}
              className="w-[60px] h-[60px] rounded-full flex items-center justify-center mic-gradient text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
              aria-label={isRecording ? 'Pause' : 'Record'}
            >
              <Mic size={24} />
            </button>

            {/* Spacer to balance layout */}
            <div className="w-10 h-10" />
          </div>
        </div>
      </div>
    </div>
  );
}
