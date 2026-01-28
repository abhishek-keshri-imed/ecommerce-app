import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:5000/api", // backend local URL
    withCredentials: true // Required to send/receive cookies
});

export default api;