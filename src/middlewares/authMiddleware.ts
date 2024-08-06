import { Request, Response, NextFunction } from "express";
import Jwt  from "jsonwebtoken";
import { User } from "../models/userModel";

const authMiddleware= (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.json({
            status: 401,
            message: "No token provided"
        })
    }

    try {
        const decoded = Jwt.verify(token, "secret_key") as User;
        req.user = decoded;
        next()
    } catch (error) {
        res.json({
            status: 401,
            message: "Invalid token"
        })
    }
};

export default authMiddleware;