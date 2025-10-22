import { Router } from 'express';
import ClientController from '../controllers/client.controller';
import { verifyToken, requireAdmin, requireAdminOrVendedor } from '../middlewares/auth.middleware';

const router = Router();

// Rutas de clientes
router.get('/', verifyToken, requireAdminOrVendedor, ClientController.getAll);
router.get('/:id', verifyToken, requireAdminOrVendedor, ClientController.getById);
router.post('/', verifyToken, requireAdmin, ClientController.create);
router.put('/:id', verifyToken, requireAdmin, ClientController.update);
router.delete('/:id', verifyToken, requireAdmin, ClientController.delete);

export default router;
