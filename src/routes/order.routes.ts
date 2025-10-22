import { Router } from 'express';
import OrderController from '../controllers/order.controller';
import { verifyToken, requireAdminOrVendedor } from '../middlewares/auth.middleware';
import { validateDTO, validateParams, validateQuery } from '../middlewares/validation.middleware';
import { orderEncryption, encryptOrderStatistics } from '../middlewares/orderEncryption.middleware';
import { CreateOrderDTO, UpdateOrderDTO, OrderParamsDTO, OrderQueryDTO } from '../dto/order.dto';

const router = Router();

// Rutas de pedidos con validaciones y cifrado
router.get('/', verifyToken, requireAdminOrVendedor, validateQuery(OrderQueryDTO), OrderController.getAll);
router.get('/:id', verifyToken, requireAdminOrVendedor, validateParams(OrderParamsDTO), OrderController.getById);
router.post('/', orderEncryption, verifyToken, requireAdminOrVendedor, validateDTO(CreateOrderDTO), OrderController.create);
router.put('/:id', orderEncryption, verifyToken, requireAdminOrVendedor, validateParams(OrderParamsDTO), validateDTO(UpdateOrderDTO), OrderController.update);
router.delete('/:id', verifyToken, requireAdminOrVendedor, validateParams(OrderParamsDTO), OrderController.delete);

// Rutas específicas para gestión de pedidos
router.get('/client/:clientId', verifyToken, requireAdminOrVendedor, OrderController.getOrdersByClient);
router.get('/product/:productId', verifyToken, requireAdminOrVendedor, OrderController.getOrdersByProduct);
router.get('/status/:status', verifyToken, requireAdminOrVendedor, OrderController.getOrdersByStatus);
router.get('/history/my-orders', verifyToken, requireAdminOrVendedor, validateQuery(OrderQueryDTO), OrderController.getOrderHistory);
router.get('/statistics', verifyToken, requireAdminOrVendedor, encryptOrderStatistics, OrderController.getOrderStatistics);

// Rutas para cambio de estado de pedidos
router.patch('/:id/cancel', verifyToken, requireAdminOrVendedor, validateParams(OrderParamsDTO), OrderController.cancelOrder);
router.patch('/:id/confirm', verifyToken, requireAdminOrVendedor, validateParams(OrderParamsDTO), OrderController.confirmOrder);
router.patch('/:id/deliver', verifyToken, requireAdminOrVendedor, validateParams(OrderParamsDTO), OrderController.deliverOrder);

// Ruta de prueba para cifrado híbrido
router.post('/test-encryption', OrderController.testOrderEncryption);

export default router;
