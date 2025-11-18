import ApiError from "../utils/ApiError.js";

export function userDTO(user) {
    if (!user) return null;
    return {
        id: user.id,
        email: user.email,
        name: user.name
    }
}