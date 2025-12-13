import apiClient from './client.js';

// Create
export const createHabit = async (habitData) => {
    const response = await apiClient.post('/habits', habitData);
    return response.data;
};

// Read
export const getAllHabits = async () => {
    const response = await apiClient.get('/habits/all');
    return response.data;
};

export const getHabit = async (habitId) => {
    const response = await apiClient.get(`/habits/${habitId}`);
    return response.data;
};

// Update
export const updateHabitName = async (habitId, newName) => {
    const response = await apiClient.patch(`/habits/${habitId}/name`, { name: newName });
    return response.data;
};

export const updateHabitColor = async (habitId, newColor) => {
    const response = await apiClient.patch(`/habits/${habitId}/color`, { color: newColor });
    return response.data;
};

export const updateHabitFrequency = async (habitId, newFrequency) => {
    const response = await apiClient.patch(`/habits/${habitId}/frequency`, {
        frequency: newFrequency,
    });
    return response.data;
};

// Delete
export const deleteHabit = async (habitId) => {
    const response = await apiClient.delete(`/habits/${habitId}`);
    return response.data;
};
