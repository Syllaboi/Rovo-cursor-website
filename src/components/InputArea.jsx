import React, { useState, useRef, useEffect } from 'react';
import { Mic, Plus, Send } from 'lucide-react';

const InputArea = ({ onSendMessage, conversationMode = false }) => {
    const [text, setText] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const fileInputRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const streamRef = useRef(null);
    const analyserRef = useRef(null);
    const silenceTimerRef = useRef(null);
    const audioCtxRef = useRef(null);

    const isDesktop = typeof window !== 'undefined' && !/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  const handleSend = () => {
        if (text.trim()) {
            onSendMessage(text, null, null);
            setText('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (isDesktop) {
                handleSend();
            }
        }
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            onSendMessage(null, file, null);
            e.target.value = null;
        }
    };

    const toggleRecording = async () => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;

            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };

            mediaRecorder.onstop = async () => {
                try {
                    const blob = new Blob(audioChunksRef.current, { type: audioChunksRef.current[0]?.type || 'audio/webm' });
                    const { blobToWav } = await import('../utils/audioUtils');
                    const wav = await blobToWav(blob);
                    // Await send to avoid overlapping calls
                    await onSendMessage(null, null, wav);
                } catch (e) {
                    console.error('Voice send failed:', e);
                } finally {
                    cleanupStream();
                    // In conversation mode, restart only after send completes
                    if (conversationMode) {
                        setTimeout(() => startRecording(), 400);
                    }
                }
            };

            setupSilenceDetection(stream);
            mediaRecorder.start();
            setIsRecording(true);
        } catch (err) {
            console.error('Error accessing microphone:', err);
            alert('Could not access microphone');
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    // Recording is now only controlled by tapping the mic (no auto-start in conversation mode)
    useEffect(() => {
        // intentionally left blank
    }, [conversationMode]);

    const cleanupStream = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(t => t.stop());
            streamRef.current = null;
        }
        if (audioCtxRef.current) {
            audioCtxRef.current.close();
            audioCtxRef.current = null;
        }
        if (silenceTimerRef.current) {
            clearTimeout(silenceTimerRef.current);
            silenceTimerRef.current = null;
        }
    };

    const setupSilenceDetection = (stream) => {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioContext();
        audioCtxRef.current = audioCtx;
        const source = audioCtx.createMediaStreamSource(stream);
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 2048;
        analyserRef.current = analyser;
        source.connect(analyser);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        const checkSilence = () => {
            analyser.getByteTimeDomainData(dataArray);
            // Compute RMS
            let sumSquares = 0;
            for (let i = 0; i < dataArray.length; i++) {
                const v = (dataArray[i] - 128) / 128;
                sumSquares += v * v;
            }
            const rms = Math.sqrt(sumSquares / dataArray.length);
            const silent = rms < 0.02; // threshold

            if (silent) {
                if (!silenceTimerRef.current) {
                    silenceTimerRef.current = setTimeout(() => {
                        silenceTimerRef.current = null;
                        if (conversationMode) {
                            // stop and let onstop handler restart after send completes
                            stopRecording();
                        }
                    }, 2500);
                }
            } else {
                if (silenceTimerRef.current) {
                    clearTimeout(silenceTimerRef.current);
                    silenceTimerRef.current = null;
                }
            }
            if (isRecording) requestAnimationFrame(checkSilence);
        };
        requestAnimationFrame(checkSilence);
    };

    return (
        <div className="px-5 pb-4 pt-2">
            <div className="flex items-center gap-3 h-[72px]">
                {/* Plus button */}
                <button
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-white border border-black/10 text-black flex-shrink-0"
                    onClick={() => fileInputRef.current.click()}
                    title="Attach"
                >
                    <Plus size={20} className="text-black" />
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileSelect}
                    accept="image/png,image/jpeg,image/jpg,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,audio/*,video/*"
                />

                {/* Text field */}
                {!conversationMode && (
                    <div className="flex-1 flex items-center gap-2">
                        <div className="h-10 bg-white rounded-full px-4 flex items-center shadow-sm flex-1">
                            <input
                                type="text"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Type a message"
                                disabled={isRecording}
                                className="w-full bg-transparent border-none outline-none text-[14px] leading-5 text-[#151515] placeholder-[#B1B1B1]"
                            />
                        </div>
                        <button
                            onClick={handleSend}
                            disabled={!text.trim()}
                            className={`w-10 h-10 rounded-full flex items-center justify-center bg-black text-white disabled:opacity-30 disabled:cursor-not-allowed`}
                            title="Send"
                        >
                            <Send size={16} />
                        </button>
                    </div>
                )}

                {/* Mic button */}
                <button
                    onClick={toggleRecording}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all flex-shrink-0 mic-gradient ${isRecording ? 'ring-2 ring-red-500 animate-pulse' : ''}`}
                    title={isRecording ? 'Stop' : 'Record'}
                >
                    <Mic size={16} className="text-white" />
                </button>
            </div>
        </div>
    );
};

export default InputArea;
