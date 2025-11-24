import { useEffect, useRef, useState } from 'react';
import ChatInterface from './components/ChatInterface';
import VoiceCapture from './components/VoiceCapture';

const ACCESS_CODE = 'Royalty.1';
const INACTIVITY_LIMIT_MS = 20 * 60 * 1000; // 20 minutes

export default function App() {
  const [route, setRoute] = useState(typeof window !== 'undefined' ? (window.location.hash || '#chat') : '#chat');
  const [isAuthed, setIsAuthed] = useState(() => {
    try { return typeof window !== 'undefined' && sessionStorage.getItem('auth_ok') === '1'; } catch { return false; }
  });
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [lockedReason, setLockedReason] = useState('');
  const timerRef = useRef(null);

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash || '#chat');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // Inactivity timer and activity listeners
  useEffect(() => {
    if (!isAuthed) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    const resetTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        try { sessionStorage.removeItem('auth_ok'); } catch {}
        setIsAuthed(false);
        setLockedReason('Session locked due to 20 minutes of inactivity. Enter code to continue.');
      }, INACTIVITY_LIMIT_MS);
    };

    // Initial start
    resetTimer();

    const events = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart', 'click', 'visibilitychange'];
    const onActivity = (e) => {
      if (e.type === 'visibilitychange' && document.visibilityState !== 'visible') return;
      resetTimer();
    };

    events.forEach(ev => window.addEventListener(ev, onActivity, { passive: true }));
    return () => {
      events.forEach(ev => window.removeEventListener(ev, onActivity));
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isAuthed]);

  const tryUnlock = (e) => {
    e?.preventDefault?.();
    if (code.trim() === ACCESS_CODE) {
      setIsAuthed(true);
      setCode('');
      setError('');
      setLockedReason('');
      try { sessionStorage.setItem('auth_ok', '1'); } catch {}
    } else {
      setError('Invalid code. Please try again.');
    }
  };

  const LockScreen = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-xl font-semibold mb-2">Enter Access Code</h2>
        {lockedReason ? (
          <p className="text-sm text-gray-600 mb-4">{lockedReason}</p>
        ) : (
          <p className="text-sm text-gray-600 mb-4">This site is protected. Please enter the access code to continue.</p>
        )}
        <form onSubmit={tryUnlock} className="space-y-3">
          <input
            type="password"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Access code"
            className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none"
            autoFocus
          />
          {error && <div className="text-sm text-red-600">{error}</div>}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#6E5DE7] hover:bg-[#5b4bc4] text-white font-semibold"
          >Unlock</button>
        </form>
      </div>
    </div>
  );

  if (!isAuthed) {
    return (
      <div className="h-dvh w-full">
        {LockScreen}
      </div>
    );
  }

  if (route === '#voice') {
    return (
      <div className="h-dvh w-full">
        <VoiceCapture onBack={() => { window.location.hash = '#chat'; }} />
      </div>
    );
  }

  return (
    <div className="h-dvh w-full">
      <ChatInterface />
    </div>
  );
}
