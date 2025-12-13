import apiClient from './client.js';

// Create
export const addEntry = async (habitId, date) => {
    const response = await apiClient.post('/entries', { habitId, date });
    return response.data;
};

// Delete
export const deleteEntry = async (habitId, date) => {
    const response = await apiClient.delete(`/entries/${habitId}`, { data: { date } });
    return response.data;
};
