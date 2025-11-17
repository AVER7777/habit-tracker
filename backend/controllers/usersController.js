import { findById } from "../models/usersModel.js";
import { userDTO } from "../dtos/userDTO.js";

export async function getUserById(req, res, next) {
    const userId = req.params.id;

    try {
        const user = await findById(userId);
        res.json(userDTO(user));
    }
    catch (error) {
        next(error);
    }
}