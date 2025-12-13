import apiClient from './client';

export const registerUser = async (email, password) => {
    const response = await apiClient.post('/auth/register', { email, password });
    return response.data;
};

export const loginUser = async (email, password) => {
    const response = await apiClient.post('/auth/login', { email, password });

    const { accessToken, user } = response.data;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('user', JSON.stringify(user));

    return user;
};

export const logoutUser = async () => {
    await apiClient.delete('/auth/logout');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
};
