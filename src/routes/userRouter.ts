import { Router } from "express";
import UserController from "../controllers/userControllers";
import AuthController from "../controllers/authControllers";

export const userRouter = Router();

userRouter.get("/", UserController.getAllUsers);
userRouter.get("/:id", UserController.getUserById);
userRouter.post("/", UserController.createUser);
userRouter.put("/:id", UserController.updateUser);
userRouter.delete("/:id", UserController.deleteUser);


userRouter.post("/login", AuthController.login);

