import axios from 'axios';

// Vite sets import.meta.env.MODE to 'development' during npm run dev
// and 'production' during npm run build
const isProduction = import.meta.env.MODE === 'production';

const api = axios.create({
    baseURL: isProduction 
        ? import.meta.env.VITE_API_PRO_URL 
        : import.meta.env.VITE_API_DEV_URL,
    withCredentials: true 
});

export default api;