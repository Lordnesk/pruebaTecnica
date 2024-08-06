import { Router } from "express";
import OrderController from "../controllers/orderController";

export const orderRouter = Router();

orderRouter.get("/", OrderController.getAllOrders);
orderRouter.get("/:id", OrderController.getOrdersByUserId);
orderRouter.post("/", OrderController.createOrder);
orderRouter.put("/:id", OrderController.updateOrder);
orderRouter.delete("/:id", OrderController.deleteOrder);