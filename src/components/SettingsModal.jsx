import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';

const SettingsModal = ({ isOpen, onClose, onSave }) => {
    const [apiKey, setApiKey] = useState('');
    const [voiceId, setVoiceId] = useState('');
    const [autoPlay, setAutoPlay] = useState(false);
    const [elevenEndpoint, setElevenEndpoint] = useState('https://api.elevenlabs.io/v1/text-to-speech');
    const [conversationMode, setConversationMode] = useState(false);
    const [voiceOutputEnabled, setVoiceOutputEnabled] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        if (isOpen) {
            const storedSettings = JSON.parse(localStorage.getItem('chatSettings') || '{}');
            setApiKey(storedSettings.apiKey || '');
            setVoiceId(storedSettings.voiceId || '');
            setAutoPlay(storedSettings.autoPlay || false);
            setElevenEndpoint(storedSettings.elevenEndpoint || 'https://api.elevenlabs.io/v1/text-to-speech');
            setConversationMode(storedSettings.conversationMode || false);
            setVoiceOutputEnabled(storedSettings.voiceOutputEnabled || false);
            setIsSaved(false);
        }
    }, [isOpen]);

    const handleSave = () => {
        const settings = { apiKey, voiceId, autoPlay, elevenEndpoint, conversationMode, voiceOutputEnabled };
        localStorage.setItem('chatSettings', JSON.stringify(settings));
        onSave(settings);
        setIsSaved(true);
        setTimeout(() => {
            onClose();
        }, 800);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300">
            <div className="bg-white rounded-[24px] w-full max-w-sm p-6 shadow-2xl transform transition-all scale-100">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-[#1A1A1A]">Settings</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="space-y-5">
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">ElevenLabs API Key</label>
                        <input
                            type="password"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            className="w-full p-3.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:border-[#6E5DE7] focus:ring-2 focus:ring-[#6E5DE7]/20 outline-none transition-all"
                            placeholder="sk_..."
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Voice ID</label>
                        <input
                            type="text"
                            value={voiceId}
                            onChange={(e) => setVoiceId(e.target.value)}
                            className="w-full p-3.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:border-[#6E5DE7] focus:ring-2 focus:ring-[#6E5DE7]/20 outline-none transition-all"
                            placeholder="e.g. 21m00Tcm4TlvDq8ikWAM"
                        />
                    </div>

                    <div className="flex items-center justify-between py-2">
                        <span className="text-sm font-medium text-gray-700">Auto-play Audio</span>
                        <button
                            onClick={() => setAutoPlay(!autoPlay)}
                            className={`w-12 h-7 rounded-full transition-colors relative ${autoPlay ? 'bg-[#6E5DE7]' : 'bg-gray-200'}`}
                        >
                            <div className={`w-5 h-5 bg-white rounded-full shadow-sm absolute top-1 transition-transform duration-200 ${autoPlay ? 'left-6' : 'left-1'}`} />
                        </button>
                    </div>
                </div>

                <div className="space-y-5 mt-4">
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">ElevenLabs Endpoint</label>
                        <input
                            type="text"
                            value={elevenEndpoint}
                            onChange={(e) => setElevenEndpoint(e.target.value)}
                            className="w-full p-3.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:border-[#6E5DE7] focus:ring-2 focus:ring-[#6E5DE7]/20 outline-none transition-all"
                            placeholder="https://api.elevenlabs.io/v1/text-to-speech"
                        />
                    </div>

                    <div className="flex items-center justify-between py-2">
                        <span className="text-sm font-medium text-gray-700">Conversation Mode</span>
                        <button
                            onClick={() => setConversationMode(!conversationMode)}
                            className={`w-12 h-7 rounded-full transition-colors relative ${conversationMode ? 'bg-[#6E5DE7]' : 'bg-gray-200'}`}
                        >
                            <div className={`w-5 h-5 bg-white rounded-full shadow-sm absolute top-1 transition-transform duration-200 ${conversationMode ? 'left-6' : 'left-1'}`} />
                        </button>
                    </div>

                    <div className="flex items-center justify-between py-2">
                        <span className="text-sm font-medium text-gray-700">Voice Output</span>
                        <button
                            onClick={() => setVoiceOutputEnabled(!voiceOutputEnabled)}
                            className={`w-12 h-7 rounded-full transition-colors relative ${voiceOutputEnabled ? 'bg-[#6E5DE7]' : 'bg-gray-200'}`}
                        >
                            <div className={`w-5 h-5 bg-white rounded-full shadow-sm absolute top-1 transition-transform duration-200 ${voiceOutputEnabled ? 'left-6' : 'left-1'}`} />
                        </button>
                    </div>
                </div>

                <button
                    onClick={handleSave}
                    className={`w-full mt-8 py-3.5 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${isSaved ? 'bg-green-500' : 'bg-[#6E5DE7] hover:bg-[#5b4bc4] shadow-lg hover:shadow-xl'
                        }`}
                >
                    {isSaved ? (
                        <>
                            <Check size={20} /> Saved
                        </>
                    ) : (
                        'Save Settings'
                    )}
                </button>
            </div>
        </div>
    );
};

export default SettingsModal;
