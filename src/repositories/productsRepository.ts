import { injectable } from "tsyringe";
import { Product, ProductCart } from "../models";
import { CreationAttributes, where } from "sequelize";
import { Order } from "../models";

injectable()
export default class ProductRepository{
    async findAll() {
        return await Product.findAll()
    }

    async findById(id: number) {
        return await Product.findByPk(id)
    }


    async findByOrderId(id: number) {
        return Order.findByPk(id), {where: {ProductCart}}
    }

    async create(product: { name: string, price: number, description: string, stock: number}) {
        return await Product.create(product)
    }

    async update(id: number, productData: Partial<CreationAttributes<Product>>) {
        const [updatedCount, updatedProducts] = await Product.update(productData, {
            where: { id },
            returning: true
        });
    
        if (updatedCount === 0) {
            return null; // Asegúrate de que el ID sea correcto y exista una tarea con ese ID.
        }
    
        return updatedProducts[0];
    }

    async delete(id: number) {
        const result = await Product.destroy({
            where: { id }
        });
    
        return result > 0;
    }
}