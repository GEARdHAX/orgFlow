import axios from 'axios';

// Use Vite env variable correctly
const baseURL = import.meta.env.VITE_BACKEND_URL || 'https://orgflow.onrender.com';

const api = axios.create({
    baseURL: `${baseURL}/api`,
    withCredentials: true, // sends cookies with every request
});

export default api;
