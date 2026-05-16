import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.MODE === 'production' 
        ? import.meta.env.VITE_API_PRO_URL 
        : import.meta.env.VITE_API_DEV_URL,
    withCredentials: true,
    timeout: 10000, 
});

// 🛡️ INTERCEPTOR: Proper AbortController handling
api.interceptors.request.use((config) => {
    // Only apply the 10s fallback if the component didn't provide its own signal
    // This prevents overwriting the AbortController needed for debouncing
    if (!config.signal) {
        config.signal = AbortSignal.timeout(10000); 
    }
    return config;
});

export default api;