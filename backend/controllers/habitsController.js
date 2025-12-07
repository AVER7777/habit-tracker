import { habitDTO } from '../dtos/habitDTO.js';
import {
    deleteHabitById,
    findHabitsWithStats,
    findHabitWithStats,
    insertHabit,
    updateHabitColorById,
    updateHabitCurrentStreakById,
    updateHabitFrequencyId,
    updateHabitNameById,
} from '../models/habitsModel.js';
import { findUserById } from '../models/usersModel.js';
import ApiError from '../utils/ApiError.js';
import { calculateLiveStreak } from '../utils/streakCalculator.js';

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

        const rawHabits = await findHabitsWithStats(userId);

        rawHabits.forEach((habit) => {
            const real = calculateLiveStreak(
                habit.current_streak,
                habit.last_entry_date,
                habit.frequency,
            );

            if (real !== habit.current_streak) {
                updateHabitCurrentStreakById(habit.id, userId, real).catch(console.error);
            }
        });

        res.status(200).json(rawHabits.map(habitDTO));
    } catch (error) {
        next(error);
    }
}

export async function getHabit(req, res, next) {
    try {
        const { id } = req.params;

        const userId = req.user.id;

        const habit = await findHabitWithStats(id, userId);

        if (!habit) {
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
