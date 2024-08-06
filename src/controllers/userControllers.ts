import { Request, Response } from "express";
import { container } from "tsyringe";
import UserService from "../services/userServices";

export default class UserController {
    static async getAllUsers(_: Request, res: Response) {
        const userService= container.resolve(UserService);
        const users = await userService.getAllUsers();
        res.json(users);
    }

    static async getUserById(req: Request, res: Response){
        const userService = container.resolve(UserService);
        const user = await userService.getUserById(parseInt(req.params.id));
        res.json(user)
    }

    static async createUser(req: Request, res: Response) {
        const { name, email, password, rol} = req.body;

        if (!name || !email || !password || !rol) {
            return res.status(400).json({message: "All fields needs to be filled"})
        }

        if (rol !== "admin" && rol !== "client") {
            return res.status(400).json({ message: "Role is required"})
        }

        try {
            const userService = container.resolve(UserService);
            const user = await userService.createUser(req.body);
            res.status(201).json({
                message: "User Created",
                data: user
            })
        }catch (err){
            if (err instanceof Error) {
                res.status(400).json({message: err.message})
            }
        }
    }

    static async updateUser(req: Request, res: Response) {
        const userService = container.resolve(UserService);
        const updatedUser = await userService.updateUser(parseInt(req.params.id), req.body);
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
    
        res.json({
            status: 201,
            message: "User updated succesfully",
            data: updatedUser
        });
    }

    static async deleteUser(req: Request, res: Response) {
        const userService = container.resolve(UserService);
        const result = await userService.deleteUser(parseInt(req.params.id));
    
        if (!result) {
            return res.json({
                status: 404,
                message: 'User not found' 
            });
        }
        res.send({
            status: 204,
            message: "User deleted succesfully"
        });
    };

    static async login(req: Request, res: Response) {
        try {
            const userService = container.resolve(UserService);
            const token = await userService.login(req.body.email, req.body.password);
            res.json({message: "Login successful", token})
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            };
        }
    }
}
