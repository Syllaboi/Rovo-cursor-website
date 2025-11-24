const WEBHOOK_URL = 'https://n8n-5373.onrender.com/webhook/n8n';

export const sendMessage = async (text, file = null, voice = null, clientMessageId = null) => {
  const formData = new FormData();

  // Add client message id for backend idempotency/deduplication
  const id = clientMessageId || ((typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`);
  formData.append('clientMessageId', id);

  // Construct payload to match n8n expectation: { message, type }
  if (voice) {
    formData.append('file', voice, 'recording.wav');
    formData.append('type', 'audio');
    formData.append('message', 'Voice message');
  } else if (file) {
    formData.append('file', file);
    const fileType = file.type.split('/')[0]; // 'image', 'video', 'audio', or 'application'
    formData.append('type', fileType);
    formData.append('message', 'File attachment');
  } else {
    formData.append('message', text);
    formData.append('type', 'text');
  }

  const fetchWithTimeout = async (resource, options = {}) => {
    const { timeout = 60000 } = options; // increase default timeout for cold starts
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
      const response = await fetch(resource, { mode: 'cors', credentials: 'omit', headers: { 'Accept': 'application/json, text/plain, */*', ...(options.headers||{}) }, ...options, signal: controller.signal });
      clearTimeout(id);
      return response;
    } catch (e) {
      clearTimeout(id);
      throw e;
    }
  };

  const attempt = async () => {
    const response = await fetchWithTimeout(WEBHOOK_URL, { method: 'POST', body: formData, timeout: 60000, headers: { 'X-Client-Message-Id': id } });
    if (!response.ok) throw new Error(`Server error: ${response.status}`);
    const contentType = response.headers.get('content-type');
    if (contentType && /application\/json/i.test(contentType)) {
      const data = await response.json();
      const content = data.output || data.text || data.message || data.reply || data.response || data.content || (typeof data === 'string' ? data : JSON.stringify(data));
      // If backend provides explicit type (e.g., markdown), honor it
      const respType = data.type && typeof data.type === 'string' ? data.type : 'text';
      return { type: respType, content, raw: data, mimeType: data.mimeType };
    } else if (contentType && (contentType.startsWith('image/') || contentType.startsWith('audio/') || contentType.startsWith('video/'))) {
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      return { type: contentType.split('/')[0], content: url, mimeType: contentType };
    } else {
      const text = await response.text();
      return { type: 'text', content: text };
    }
  };

  const retries = 3;
  let lastErr;
  for (let i = 0; i <= retries; i++) {
    try {
      return await attempt();
    } catch (err) {
      lastErr = err;
      // Retry on network/abort only; break on server errors
      if (err.name !== 'AbortError' && !/NetworkError|Failed to fetch|network/i.test(err.message)) {
        break;
      }
      await new Promise(r => setTimeout(r, 600 * Math.pow(2, i)));
    }
  }
  throw lastErr;
};
