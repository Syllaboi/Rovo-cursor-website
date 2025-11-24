import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Layers } from 'lucide-react';
import MessageBubble from './MessageBubble';
import InputArea from './InputArea';
import SettingsModal from './SettingsModal';
import { sendMessage } from '../services/n8nService';
import { playElevenLabsAudio, speakWithWebSpeech } from '../services/elevenLabsService';

const ChatInterface = () => {
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [settings, setSettings] = useState({ apiKey: '', voiceId: '', autoPlay: false, elevenEndpoint: 'https://api.elevenlabs.io/v1/text-to-speech', conversationMode: false, voiceOutputEnabled: false });
    const messagesEndRef = useRef(null);

    // Load persistence
    useEffect(() => {
        const storedMessages = JSON.parse(localStorage.getItem('chatHistory') || '[]');
        const storedSettings = JSON.parse(localStorage.getItem('chatSettings') || '{}');

        if (storedMessages.length > 0) {
            setMessages(storedMessages);
        } else {
            setMessages([{
                id: 1,
                sender: 'bot',
                type: 'text',
                content: 'Hello! I am your AI Assistant. How can I help you today?',
                timestamp: new Date()
            }]);
        }
        setSettings(storedSettings);
    }, []);

    // Save persistence
    useEffect(() => {
        if (messages.length > 0) {
            localStorage.setItem('chatHistory', JSON.stringify(messages));
        }
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages, isTyping]);

    const handleSendMessage = async (text, file, voice) => {
        if (isTyping) return; // prevent duplicate concurrent sends
        let type = 'text';
        let content = text;
        let mimeType = null;

        if (voice) {
            type = 'audio';
            content = URL.createObjectURL(voice);
            mimeType = 'audio/wav';
        } else if (file) {
            content = URL.createObjectURL(file);
            if (file.type.startsWith('image/')) type = 'image';
            else if (file.type.startsWith('audio/')) type = 'audio';
            else if (file.type.startsWith('video/')) type = 'video';
            else type = 'file';
            mimeType = file.type;
        }

        // Create a stable client message id for deduplication across retries
        const clientMessageId = (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

        const userMsg = {
            id: clientMessageId,
            sender: 'user',
            type,
            content,
            timestamp: new Date(),
            mimeType,
            status: 'sending'
        };

        setMessages(prev => [...prev, userMsg]);
        setIsTyping(true);

        try {
            // Prevent duplicate submits by disabling typing state until request returns
            // Use the same clientMessageId for service and UI so backend can dedupe if needed
            const response = await sendMessage(text, file, voice, clientMessageId);
            // Guard: if we've already appended a bot response for this clientMessageId (rare), skip
            let alreadyReplied = false;
            setMessages(prev => {
                if (prev.some(m => m.sender === 'bot' && m.replyTo === clientMessageId)) alreadyReplied = true;
                return prev;
            });
            if (alreadyReplied) return;

            // Mark last user message as sent
            setMessages(prev => prev.map(m => m.id === userMsg.id ? { ...m, status: 'sent' } : m));

            const botMsg = {
                id: `${clientMessageId}-reply`,
                sender: 'bot',
                type: response.type,
                content: response.content,
                timestamp: new Date(),
                mimeType: response.mimeType,
                status: 'received',
                replyTo: clientMessageId
            };

            setMessages(prev => [...prev, botMsg]);

            // ElevenLabs TTS
            if (settings.voiceOutputEnabled && response.type === 'text') {
                if (settings.apiKey && settings.voiceId) {
                    playElevenLabsAudio(response.content, settings.apiKey, settings.voiceId, settings.elevenEndpoint);
                } else {
                    speakWithWebSpeech(response.content);
                }
            }

        } catch (error) {
            console.error(error);
            setMessages(prev => prev.map(m => m.id === userMsg.id ? { ...m, status: 'failed' } : m));
            const errorMsg = {
                id: Date.now() + 2,
                sender: 'bot',
                type: 'text',
                content: (error && (error.userMessage || error.detail || error.message)) ? `Error: ${error.userMessage || error.detail || error.message}` : 'Sorry, I encountered an error connecting to the server.',
                timestamp: new Date(),
                status: 'error'
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="w-full h-dvh flex items-center justify-center bg-transparent">
            <div className="relative w-full max-w-[390px] h-dvh max-h-[844px] rounded-[32px] overflow-hidden shadow-xl border border-black/5 flex flex-col" style={{ background: 'linear-gradient(180deg, #B8E4E4 0%, #F4D0A9 40%, #C8EEC8 100%)' }}>
                {/* Header */}
                <div className="h-[56px] px-5 flex items-center justify-between flex-none">
                    <button className="w-8 h-8 rounded-full flex items-center justify-center border border-black/10 text-black" aria-label="Back">
                        <ArrowLeft size={18} />
                    </button>
                    <h1 className="text-[17px] font-medium text-black">Chat</h1>
                    <button onClick={() => setIsSettingsOpen(true)} className="w-8 h-8 rounded-full flex items-center justify-center border border-black/10 text-black" aria-label="Layers">
                        <Layers size={18} />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-5 pt-2 pb-[88px]">
                    <div className="space-y-3">
                        {messages.map(msg => (
                            <MessageBubble key={msg.id} message={msg} />
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-[#FFF7E9] rounded-[14px] px-3.5 py-2.5 shadow-sm border border-black/0">
                                    <div className="flex gap-1">
                                        <div className="w-1.5 h-1.5 bg-black/50 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                                        <div className="w-1.5 h-1.5 bg-black/50 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                                        <div className="w-1.5 h-1.5 bg-black/50 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Footer */}
                <div className="flex-none">
                    <InputArea onSendMessage={handleSendMessage} conversationMode={settings.conversationMode} />
                </div>

                {/* Settings Modal */}
                <SettingsModal
                    isOpen={isSettingsOpen}
                    onClose={() => setIsSettingsOpen(false)}
                    onSave={setSettings}
                />
            </div>
        </div>
    );
};

export default ChatInterface;
