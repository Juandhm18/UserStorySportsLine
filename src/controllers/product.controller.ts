import { Request, Response } from 'express';
import ProductService from '../services/product.service';
import { CreateProductDTOType, UpdateProductDTOType, ProductParamsDTOType, ProductQueryDTOType } from '../dto/product.dto';
import { ResponseUtil } from '../utils/response.util';
import { MESSAGES } from '../constants/messages';

class ProductController {
    async getAll(req: Request, res: Response) {
        try {
            const products = await ProductService.getAll();
            
            ResponseUtil.success(res, MESSAGES.SUCCESS.PRODUCTS_RETRIEVED, products);
        } catch (error: any) {
            ResponseUtil.internalError(res, `Error al obtener productos: ${error.message}`);
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params as unknown as ProductParamsDTOType;
            const product = await ProductService.getById(id);

            if (!product) {
                return ResponseUtil.notFound(res, MESSAGES.ERROR.PRODUCT_NOT_FOUND);
            }

            ResponseUtil.success(res, MESSAGES.SUCCESS.PRODUCT_RETRIEVED, product);
        } catch (error: any) {
            ResponseUtil.internalError(res, `Error al obtener producto: ${error.message}`);
        }
    }

    async create(req: Request, res: Response) {
        try {
            const productData: CreateProductDTOType = req.body;
            const product = await ProductService.create(productData);

            ResponseUtil.created(res, MESSAGES.SUCCESS.PRODUCT_CREATED, product);
        } catch (error: any) {
            if (error.message.includes('código único')) {
                return ResponseUtil.error(res, 'El código del producto ya existe', 400);
            }

            ResponseUtil.internalError(res, `Error al crear producto: ${error.message}`);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params as unknown as ProductParamsDTOType;
            const productData = req.body as UpdateProductDTOType;
            
            const product = await ProductService.update(id, productData);

            if (!product) {
                return ResponseUtil.notFound(res, MESSAGES.ERROR.PRODUCT_NOT_FOUND);
            }

            ResponseUtil.success(res, MESSAGES.SUCCESS.PRODUCT_UPDATED, product);
        } catch (error: any) {
            if (error.message.includes('código único')) {
                return ResponseUtil.error(res, 'El código del producto ya existe', 400);
            }

            ResponseUtil.internalError(res, `Error al actualizar producto: ${error.message}`);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params as unknown as ProductParamsDTOType;
            const deleted = await ProductService.delete(id);

            if (!deleted) {
                return ResponseUtil.notFound(res, MESSAGES.ERROR.PRODUCT_NOT_FOUND);
            }

            ResponseUtil.success(res, MESSAGES.SUCCESS.PRODUCT_DELETED);
        } catch (error: any) {
            ResponseUtil.internalError(res, `Error al eliminar producto: ${error.message}`);
        }
    }
}

export default new ProductController();
