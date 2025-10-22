import { Router } from 'express';
import ProductController from '../controllers/product.controller';
import { verifyToken, requireAdmin, requireAdminOrVendedor } from '../middlewares/auth.middleware';
import { validateDTO, validateParams, validateQuery } from '../middlewares/validation.middleware';
import { CreateProductDTO, UpdateProductDTO, ProductParamsDTO, ProductQueryDTO } from '../dto/product.dto';

const router = Router();

// Rutas de productos con validaciones
router.get('/', verifyToken, requireAdminOrVendedor, validateQuery(ProductQueryDTO), ProductController.getAll);
router.get('/:id', verifyToken, requireAdminOrVendedor, validateParams(ProductParamsDTO), ProductController.getById);
router.post('/', verifyToken, requireAdmin, validateDTO(CreateProductDTO), ProductController.create);
router.put('/:id', verifyToken, requireAdmin, validateParams(ProductParamsDTO), validateDTO(UpdateProductDTO), ProductController.update);
router.delete('/:id', verifyToken, requireAdmin, validateParams(ProductParamsDTO), ProductController.delete);

export default router;
