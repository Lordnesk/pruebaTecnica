import { injectable } from "tsyringe";
import { ProductCart, Product, Cart} from "../models";
import { CreationAttributes } from "sequelize";


@injectable()
export default class ProductCartRepository{
    
    async create(product: {cartId: Cart, productId: Product, quantity: number }) {
        return await ProductCart.create(product)
    }

    async update(id: number, productCartData: Partial<CreationAttributes <ProductCart>>) {
        const [updatedCount, updateProductCarts] = await ProductCart.update(productCartData, {
            where: { id },
            returning: true
        });
    
        if (updatedCount === 0) {
            return null; // Asegúrate de que el ID sea correcto y exista una tarea con ese ID.
        }
    
        return updateProductCarts[0];
    }

    async delete(id: number) {
        const result = await ProductCart.destroy({
            where: { id }
        });
    
        return result > 0;
    }
}