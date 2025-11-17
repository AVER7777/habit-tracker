import ApiError from "../utils/ApiError.js";

export function userDTO(user) {
    if (!user) {
        throw new ApiError('User not found', 404);
    }
    return {
        id: user.id,
        email: user.email,
        name: user.name
    }
}