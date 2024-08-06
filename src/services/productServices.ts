import ProductRepository from '../repositories/productsRepository';
import OrderRepository from '../repositories/orderRepository';
import { CreationAttributes } from 'sequelize';
import { injectable, inject } from "tsyringe";
import { Product, Order} from '../models';




@injectable()
export default class ProductService{
    constructor(@inject(ProductRepository) private productRepository: ProductRepository, @inject(OrderRepository) private orderRepository: OrderRepository){}

    async getAllProducts() {
        return await this.productRepository.findAll();
    }

    async getProductById(id: number): Promise<Product | null> {
        return await this.productRepository.findById(id)
    }

    async getProductsByOrderId(id: number): Promise<Order | null> {
        return await this.orderRepository.findById(id);
    }

    async createProduct(productData: { name: string, price: number, description: string, stock: number}) {
        const product = new Product();
        product.name = productData.name;
        product.price = productData.price;
        product.description = productData.description;
        product.stock = productData.stock
        return await product.save();
    }


    async updateProduct(id: number, productData: Partial<CreationAttributes<Product>>) {
        const existingProduct = await this.productRepository.findById(id);
    
        if (!existingProduct) {
            console.log(`Product with ID ${id} not found in repository`); 
            return null;
        }
    
        return await this.productRepository.update(id, productData);
    }
    

    async deleteProduct(id: number) {
        const result = await this.productRepository.delete(id);
        return result;
    }
}