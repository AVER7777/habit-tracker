import { habitDTO } from '../dtos/habitDTO.js';
import {
    deleteHabitById,
    findAllUserHabits,
    findHabitById,
    incrementHabitCurrentStreakById,
    insertHabit,
    updateHabitColorById,
    updateHabitCurrentStreakById,
    updateHabitFrequencyId,
    updateHabitMaxStreakById,
    updateHabitNameById,
} from '../models/habitsModel.js';
import { findUserById } from '../models/usersModel.js';
import ApiError from '../utils/ApiError.js';

export async function createHabit(req, res, next) {
    try {
        const { name, color, frequency } = req.body;

        const userId = req.user.id;

        const user = await findUserById(userId);

        if (!user) {
            throw new ApiError('User not found', 404);
        }

        const habit = await insertHabit({ userId, name, color, frequency });

        return res.status(201).json(habitDTO(habit));
    } catch (error) {
        next(error);
    }
}

export async function getAllHabits(req, res, next) {
    try {
        const userId = req.user.id;

        const user = await findUserById(userId);

        if (!user) {
            throw new ApiError('User not found', 404);
        }

        const habits = await findAllUserHabits(userId);

        return res.status(200).json(habits.map(habitDTO));
    } catch (error) {
        next(error);
    }
}

export async function getHabit(req, res, next) {
    try {
        const { id } = req.params;

        const userId = req.user.id;

        const user = await findUserById(userId);

        if (!user) {
            throw new ApiError('User not found', 404);
        }

        const habit = await findHabitById(id, userId);

        if (!habit || habit.user_id !== userId) {
            throw new ApiError('Habit not found', 404);
        }

        return res.status(200).json(habitDTO(habit));
    } catch (error) {
        next(error);
    }
}

export async function updateHabitName(req, res, next) {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const userId = req.user.id;

        const user = await findUserById(userId);

        if (!user) {
            throw new ApiError('User not found', 404);
        }

        const updatedHabit = await updateHabitNameById(id, userId, name);

        if (!updatedHabit) {
            throw new ApiError('Habit not found', 404);
        }

        return res.status(200).json(habitDTO(updatedHabit));
    } catch (error) {
        next(error);
    }
}

export async function updateHabitColor(req, res, next) {
    try {
        const { id } = req.params;
        const { color } = req.body;

        const userId = req.user.id;

        const user = await findUserById(userId);

        if (!user) {
            throw new ApiError('User not found', 404);
        }

        const updatedHabit = await updateHabitColorById(id, userId, color);

        if (!updatedHabit) {
            throw new ApiError('Habit not found', 404);
        }

        return res.status(200).json(habitDTO(updatedHabit));
    } catch (error) {
        next(error);
    }
}

export async function updateHabitFrequency(req, res, next) {
    try {
        const { id } = req.params;
        const { frequency } = req.body;

        const userId = req.user.id;

        const user = await findUserById(userId);

        if (!user) {
            throw new ApiError('User not found', 404);
        }

        const updatedHabit = await updateHabitFrequencyId(id, userId, frequency);

        if (!updatedHabit) {
            throw new ApiError('Habit not found', 404);
        }

        return res.status(200).json(habitDTO(updatedHabit));
    } catch (error) {
        next(error);
    }
}

export async function updateHabitCurrentStreak(req, res, next) {
    try {
        const { id } = req.params;
        const { currentStreak } = req.body;

        const userId = req.user.id;

        const user = await findUserById(userId);

        if (!user) {
            throw new ApiError('User not found', 404);
        }

        const updatedHabit = await updateHabitCurrentStreakById(id, userId, currentStreak);

        if (!updatedHabit) {
            throw new ApiError('Habit not found', 404);
        }

        return res.status(200).json(habitDTO(updatedHabit));
    } catch (error) {
        next(error);
    }
}

export async function incrementHabitCurrentStreak(req, res, next) {
    try {
        const { id } = req.params;

        const userId = req.user.id;

        const user = await findUserById(userId);

        if (!user) {
            throw new ApiError('User not found', 404);
        }

        const updatedHabit = await incrementHabitCurrentStreakById(id, userId);

        if (!updatedHabit) {
            throw new ApiError('Habit not found', 404);
        }

        return res.status(200).json(habitDTO(updatedHabit));
    } catch (error) {
        next(error);
    }
}

export async function updateHabitMaxStreak(req, res, next) {
    try {
        const { id } = req.params;
        const { maxStreak } = req.body;

        const userId = req.user.id;

        const user = await findUserById(userId);

        if (!user) {
            throw new ApiError('User not found', 404);
        }

        const updatedHabit = await updateHabitMaxStreakById(id, userId, maxStreak);

        if (!updatedHabit) {
            throw new ApiError('Habit not found', 404);
        }

        return res.status(200).json(habitDTO(updatedHabit));
    } catch (error) {
        next(error);
    }
}

export async function deleteHabit(req, res, next) {
    try {
        const { id } = req.params;

        const userId = req.user.id;

        const habit = await deleteHabitById(id, userId, id);

        if (!habit) {
            throw new ApiError('Habit not found', 404);
        }

        return res.status(204).end();
    } catch (error) {
        next(error);
    }
}
