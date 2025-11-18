import jwt from 'jsonwebtoken';
import ApiError from "../utils/ApiError.js";

export function auth(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return next(new ApiError("No token provided", 401));
    }

    const token = authHeader.split(" ")[1]; // extracts token from the bearer

    if (!token) {
        return next(new ApiError("Invalid token format", 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id }; // user id
        next();
    }
    catch (error) {
        if (error.name === "TokenExpiredError") {
            return next(new ApiError("Token expired", 401));
        }

        return next(new ApiError("Invalid token", 401));
    }
}