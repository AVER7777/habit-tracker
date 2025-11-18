import ApiError from './ApiError.js';

const dbErrorMap = {
    '23505': { message: 'Resource already exists', status: 409 }, // unique_violation
    '23502': { message: 'Missing required field', status: 422 },  // not_null_violation
    '23503': { message: 'Invalid reference', status: 422 },       // foreign_key_violation
    '23514': { message: 'Constraint check failed', status: 422 }, // check_violation
};

export function handleDbError(error) {
    const { message, status } = dbErrorMap[error.code] || { message: 'Database error', status: 500 };

    return new ApiError(message, status);
}