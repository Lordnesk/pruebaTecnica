import { Request, Response } from "express";
import { container } from "tsyringe";
import ProductService from "../services/productServices";

export default class ProductController {
    static async getAllProducts(_: Request, res: Response) {
        try {
            const productService= container.resolve(ProductService);
            const products = await productService.getAllProducts();
            res.json({
                status: 201,
                message : "Those are all products",
                data: products
            });
        } catch (error) {
            res.json({
                status: 404,
                message: error,
            })
        }
    }

    static async getProductById(req: Request, res: Response){
        try {
            const productService = container.resolve(ProductService);
            const product = await productService.getProductById(parseInt(req.params.id));
            res.json({
                status: 201,
                message : "This is the product",
                data: product
            })
        } catch (error) {
            res.json({
                status: 404,
                message: error,
            })
        }
    }

    static async getProductByOrderId(req: Request, res: Response){
        try {
            const productService = container.resolve(ProductService);
            const product = await productService.getProductsByOrderId(parseInt(req.params.id));
            res.json({
                status: 201,
                message : "Thos are the products",
                data: product
            })
        } catch (error) {
            
        }
    }

    static async createProduct(req: Request, res: Response) {
        const { name, price, description, stock} = req.body;

        if (!name || !price || !description || !stock) {
            return res.status(400).json({message: "All fields needs to be filled"})
        }
        try {
            const productService = container.resolve(ProductService);
            const product = await productService.createProduct(req.body);
            res.json({
                status: 201,
                message: "Product Created",
                data: product
            })
        }catch (err){
            if (err instanceof Error) {
                res.json({status: 400, message: err.message})
            }
        }
    }

    static async updateProduct(req: Request, res: Response) {
        const productService = container.resolve(ProductService);
        const updatedProduct = await productService.updateProduct(parseInt(req.params.id), req.body);
        if (!updatedProduct) {
            return res.json({ status: 404, message: 'Product not found' });
        }
    
        res.json({
            status: 201,
            message: "Product updated succesfully",
            data: updatedProduct
        });
    }

    static async deleteProduct(req: Request, res: Response) {
        const productService = container.resolve(ProductService);
        const result = await productService.deleteProduct(parseInt(req.params.id));
    
        if (!result) {
            return res.json({
                status: 404,
                message: 'Product not found' 
            });
        }
        res.send({
            status: 204,
            message: "Product deleted succesfully"
        });
    };
}