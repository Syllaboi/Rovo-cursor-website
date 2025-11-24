export const playElevenLabsAudio = async (text, apiKey, voiceId, endpoint = 'https://api.elevenlabs.io/v1/text-to-speech') => {
    if (!apiKey || !voiceId) {
        console.warn('ElevenLabs API Key or Voice ID missing');
        return;
    }

    try {
        const response = await fetch(`${endpoint.replace(/\/$/, '')}/${voiceId}`, {
            method: 'POST',
            headers: {
                'Accept': 'audio/mpeg',
                'Content-Type': 'application/json',
                'xi-api-key': apiKey
            },
            body: JSON.stringify({
                text: text,
                model_id: "eleven_monolingual_v1",
                voice_settings: {
                    stability: 0.5,
                    similarity_boost: 0.5
                }
            })
        });

        if (!response.ok) {
            throw new Error(`ElevenLabs API Error: ${response.status}`);
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audio.play();
    } catch (error) {
        console.error('Error playing ElevenLabs audio:', error);
    }
};

export function speakWithWebSpeech(text) {
    if (!('speechSynthesis' in window)) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1;
    utter.pitch = 1;
    window.speechSynthesis.speak(utter);
}
