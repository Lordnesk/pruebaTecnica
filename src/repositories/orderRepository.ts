import { injectable } from "tsyringe";
import { Order } from "../models";
import { CreationAttributes } from "sequelize";


@injectable()
export default class OrderRepository{
    async findAll() {
        return await Order.findAll()
    }

    async findById(id: number) {
        return await Order.findByPk(id)
    }

    async findByEmail(email: string){
        return await Order.findOne({where: {email}})
    }

    async create(order: { name: string, email: string, password: string, role: "admin"  | "client"}) {
        return await Order.create(order)
    }

    async update(id: number, orderData: Partial<CreationAttributes<Order>>) {
        const [updatedCount, updatedOrders] = await Order.update(orderData, {
            where: { id },
            returning: true
        });
    
        if (updatedCount === 0) {
            return null; // Asegúrate de que el ID sea correcto y exista una tarea con ese ID.
        }
    
        return updatedOrders[0];
    }

    async delete(id: number) {
        const result = await Order.destroy({
            where: { id }
        });
    
        return result > 0;
    }
}