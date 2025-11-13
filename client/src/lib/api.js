import axios from 'axios';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`, // Your backend URL
    withCredentials: true, // This sends cookies with every request!
});

export default api;