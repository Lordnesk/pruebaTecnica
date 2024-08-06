import { Request, Response } from "express";
import { container } from "tsyringe";
import UserService from "../services/userServices";
import  Jwt  from "jsonwebtoken";

const SECRET_KEY = "123456789"

export default class AuthController {
    static async register(req: Request, res: Response){
        const {name, email, password, rol} = req.body;

        if(!["admin", "client"].includes(rol)){
            return res.json({
                status: 400,
                message: "Invalid role"
            })
        }

        const userService = container.resolve(UserService);
        const user = await userService.createUser({ name, email, password, rol})
        res.json({
            status: 201,
            message: "User created succesfully",
            data: user
        })
    }

    static async login(req: Request, res: Response) {
        const {email, password} = req.body;

        const userService = container.resolve(UserService);
        const user = await userService.getUserByEmail(email);

        if (!user || !(await user.validatePassword(password))) {
            return res.json({
                status: 401,
                message: "Invalid credentials"
            })
        }

        const token = Jwt.sign({ id: user.id, role: user.rol}, SECRET_KEY, { expiresIn: "1h"})
        res.json(token)
    }
}