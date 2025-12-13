import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// automatically attach the JWT token to all requests
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshResponse = await axios.post(
                    'http://localhost:3000/auth/refresh',
                    {},
                    { withCredentials: true },
                );

                const { accessToken } = refreshResponse.data;

                localStorage.setItem('accessToken', accessToken);

                originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                return apiClient(originalRequest);
            } catch (refreshError) {
                console.log('Session expired, logout');

                localStorage.removeItem('accessToken');

                if (window.location.pathname !== '/login') {
                    window.location.href = '/login';
                }

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    },
);

export default apiClient;
