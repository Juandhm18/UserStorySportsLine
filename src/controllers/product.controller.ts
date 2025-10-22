import { Request, Response } from 'express';
import ProductService from '../services/product.service';

class ProductController {
    async getAll(req: Request, res: Response) {
        try {
            const products = await ProductService.getAll();
            
            res.status(200).json({
                success: true,
                message: 'Productos obtenidos exitosamente',
                data: products
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener productos: ' + error.message
            });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const product = await ProductService.getById(parseInt(id!));

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: 'Producto no encontrado'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Producto obtenido exitosamente',
                data: product
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener producto: ' + error.message
            });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const productData = req.body;
            const product = await ProductService.create(productData);

            res.status(201).json({
                success: true,
                message: 'Producto creado exitosamente',
                data: product
            });
        } catch (error: any) {
            if (error.message.includes('código único')) {
                return res.status(400).json({
                    success: false,
                    message: 'El código del producto ya existe'
                });
            }

            res.status(500).json({
                success: false,
                message: 'Error al crear producto: ' + error.message
            });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const productData = req.body;
            
            const product = await ProductService.update(parseInt(id!), productData);

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: 'Producto no encontrado'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Producto actualizado exitosamente',
                data: product
            });
        } catch (error: any) {
            if (error.message.includes('código único')) {
                return res.status(400).json({
                    success: false,
                    message: 'El código del producto ya existe'
                });
            }

            res.status(500).json({
                success: false,
                message: 'Error al actualizar producto: ' + error.message
            });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const deleted = await ProductService.delete(parseInt(id!));

            if (!deleted) {
                return res.status(404).json({
                    success: false,
                    message: 'Producto no encontrado'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Producto eliminado exitosamente'
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Error al eliminar producto: ' + error.message
            });
        }
    }
}

export default new ProductController();
