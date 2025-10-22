import { Router } from 'express';
import ClientController from '../controllers/client.controller';
import { verifyToken, requireAdmin, requireAdminOrVendedor } from '../middlewares/auth.middleware';
import { validateDTO, validateParams, validateQuery } from '../middlewares/validation.middleware';
import { CreateClientDTO, UpdateClientDTO, ClientParamsDTO, ClientQueryDTO } from '../dto/client.dto';

const router = Router();

// Rutas de clientes con validaciones
router.get('/', verifyToken, requireAdminOrVendedor, validateQuery(ClientQueryDTO), ClientController.getAll);
router.get('/:id', verifyToken, requireAdminOrVendedor, validateParams(ClientParamsDTO), ClientController.getById);
router.post('/', verifyToken, requireAdmin, validateDTO(CreateClientDTO), ClientController.create);
router.put('/:id', verifyToken, requireAdmin, validateParams(ClientParamsDTO), validateDTO(UpdateClientDTO), ClientController.update);
router.delete('/:id', verifyToken, requireAdmin, validateParams(ClientParamsDTO), ClientController.delete);

export default router;
