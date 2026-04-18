import axios from 'axios';

const api = axios.create({
    // Use the env variable if it exists, otherwise fallback to localhost for dev
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
    withCredentials: true 
});

export default api;