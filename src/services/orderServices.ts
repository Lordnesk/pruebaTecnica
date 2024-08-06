import OrderRepository from '../repositories/orderRepository';
import UserRepository from '../repositories/userRepository';
import { CreationAttributes } from 'sequelize';
import { injectable, inject } from "tsyringe";
import { Order, ProductCart } from '../models';
import { User } from '../models';



@injectable()
export default class OrderService{
    constructor(@inject(OrderRepository) private orderRepository: OrderRepository, @inject(UserRepository) private userRepository: UserRepository){}

    async getAllOrders() {
        return await this.orderRepository.findAll();
    }

    async getOrdersByUserId(id: number): Promise<User | null> {
        return await this.userRepository.findById(id);
    }

    async createOrder(orderData: { products: ProductCart[], total: number}) {
        const order = new Order();
        order.total = orderData.total;
        order.productCart = orderData.products;
        return await order.save();
    }


    async updateOrder(id: number, orderData: Partial<CreationAttributes<Order>>) {
        const existingOrder = await this.orderRepository.findById(id);
    
        if (!existingOrder) {
            console.log(`Order with ID ${id} not found in repository`); 
            return null;
        }
    
        return await this.orderRepository.update(id, orderData);
    }
    

    async deleteOrder(id: number) {
        const result = await this.orderRepository.delete(id);
        return result;
    }
}


