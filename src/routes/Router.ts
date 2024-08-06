import { Router } from "express";
import { userRouter } from "./userRouter";
import { orderRouter } from "./orderRouter";

const router = Router();

router.use("/users", userRouter);
router.use("/orders", orderRouter)

export default router