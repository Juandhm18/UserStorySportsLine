import { Router } from 'express';
import ProductController from '../controllers/product.controller';
import { verifyToken, requireAdmin, requireAdminOrVendedor } from '../middlewares/auth.middleware';

const router = Router();

// Rutas de productos
router.get('/', verifyToken, requireAdminOrVendedor, ProductController.getAll);
router.get('/:id', verifyToken, requireAdminOrVendedor, ProductController.getById);
router.post('/', verifyToken, requireAdmin, ProductController.create);
router.put('/:id', verifyToken, requireAdmin, ProductController.update);
router.delete('/:id', verifyToken, requireAdmin, ProductController.delete);

export default router;
