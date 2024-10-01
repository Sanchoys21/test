import axios from 'axios';

const apiClient = axios.create({
    baseURL: '/api',
    timeout: 10000,
});

apiClient.interceptors.request.use(config => {
    const token = import.meta.env.VITE_API_TOKEN;

    if (token) {
        // Add Authorization header to every request
        config.headers['Authorization'] = `Bearer ${token}`;
    }


    return config;
}, error => {
    return Promise.reject(error);
});

export default apiClient;
