import { Request, Response } from "express";
import { container } from "tsyringe";
import OrderService from "../services/orderServices";


export default class OrderController {
    static async getAllOrders(_: Request, res: Response) {
        try {
            const orderService= container.resolve(OrderService);
            const orders = await orderService.getAllOrders();
            res.json({
                status: 200,
                data:orders
            });
        } catch (error) {
            res.json({message: "There is an error" + error})
        }
    }

    static async getOrdersByUserId(req: Request, res: Response){
        try {
            const orderService = container.resolve(OrderService);
            const orders = await orderService.getOrdersByUserId(parseInt(req.params.id));
            res.json({
                status: 200,
                data: orders
            })
        } catch (error) {
            res.json({message: "There is an error" + error})
        }
    }

    static async createOrder(req: Request, res: Response) {
        const { productCart, total} = req.body;

        if (!productCart || !total) {
            return res.status(400).json({message: "All fields needs to be filled"})
        }

        try {
            const orderService = container.resolve(OrderService);
            const order = await orderService.createOrder(req.body);
            res.json({
                status : 201,
                message: "Order created",
                data: order
            })
        }catch (err){
            if (err instanceof Error) {
                res.json({status: 400, message: err.message})
            }
        }
    }

    static async updateOrder(req: Request, res: Response) {
        const orderService = container.resolve(OrderService);
        const updatedOrder = await orderService.updateOrder(parseInt(req.params.id), req.body);
        if (!updatedOrder) {
            return res.json({ status: 404 , message: 'Order not found' });
        }
        res.json({
            status: 201,
            message: "Order updated succesfully",
            data: updatedOrder
        });
    }

    static async deleteOrder(req: Request, res: Response) {
        const orderService = container.resolve(OrderService);
        const result = await orderService.deleteOrder(parseInt(req.params.id));
    
        if (!result) {
            return res.json({
                status: 404,
                message: 'Order not found' 
            });
        }
        res.send({
            status: 204,
            message: "Order deleted succesfully"
        });
    };
}
