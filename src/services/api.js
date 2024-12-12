import axios from 'axios';

const api = axios.create({
    baseURL: 'https://sovchilar.limsa.uz/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Response interceptor for handling errors globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle errors here
        return Promise.reject(error);
    }
);

export default api;