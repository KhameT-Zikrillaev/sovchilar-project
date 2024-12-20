import axios from 'axios';

const api = axios.create({
    baseURL: 'https://back.sovchilar.net/api',  // Ваш базовый URL
});

// Response interceptor для обработки ошибок
api.interceptors.response.use(
    (response) => response,  // Если ответ успешный, просто возвращаем его
    (error) => {
        // Обработка ошибок
        return Promise.reject(error);
    }
);

export default api;
