"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = __importDefault(require("../controllers/order.controller"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const orderEncryption_middleware_1 = require("../middlewares/orderEncryption.middleware");
const order_dto_1 = require("../dto/order.dto");
const router = (0, express_1.Router)();
// Rutas de pedidos con validaciones y cifrado
router.get('/', auth_middleware_1.verifyToken, auth_middleware_1.requireAdminOrVendedor, (0, validation_middleware_1.validateQuery)(order_dto_1.OrderQueryDTO), order_controller_1.default.getAll);
router.get('/:id', auth_middleware_1.verifyToken, auth_middleware_1.requireAdminOrVendedor, (0, validation_middleware_1.validateParams)(order_dto_1.OrderParamsDTO), order_controller_1.default.getById);
router.post('/', orderEncryption_middleware_1.orderEncryption, auth_middleware_1.verifyToken, auth_middleware_1.requireAdminOrVendedor, (0, validation_middleware_1.validateDTO)(order_dto_1.CreateOrderDTO), order_controller_1.default.create);
router.put('/:id', orderEncryption_middleware_1.orderEncryption, auth_middleware_1.verifyToken, auth_middleware_1.requireAdminOrVendedor, (0, validation_middleware_1.validateParams)(order_dto_1.OrderParamsDTO), (0, validation_middleware_1.validateDTO)(order_dto_1.UpdateOrderDTO), order_controller_1.default.update);
router.delete('/:id', auth_middleware_1.verifyToken, auth_middleware_1.requireAdminOrVendedor, (0, validation_middleware_1.validateParams)(order_dto_1.OrderParamsDTO), order_controller_1.default.delete);
// Rutas específicas para gestión de pedidos
router.get('/client/:clientId', auth_middleware_1.verifyToken, auth_middleware_1.requireAdminOrVendedor, order_controller_1.default.getOrdersByClient);
router.get('/product/:productId', auth_middleware_1.verifyToken, auth_middleware_1.requireAdminOrVendedor, order_controller_1.default.getOrdersByProduct);
router.get('/status/:status', auth_middleware_1.verifyToken, auth_middleware_1.requireAdminOrVendedor, order_controller_1.default.getOrdersByStatus);
router.get('/history/my-orders', auth_middleware_1.verifyToken, auth_middleware_1.requireAdminOrVendedor, (0, validation_middleware_1.validateQuery)(order_dto_1.OrderQueryDTO), order_controller_1.default.getOrderHistory);
router.get('/statistics', auth_middleware_1.verifyToken, auth_middleware_1.requireAdminOrVendedor, orderEncryption_middleware_1.encryptOrderStatistics, order_controller_1.default.getOrderStatistics);
// Rutas para cambio de estado de pedidos
router.patch('/:id/cancel', auth_middleware_1.verifyToken, auth_middleware_1.requireAdminOrVendedor, (0, validation_middleware_1.validateParams)(order_dto_1.OrderParamsDTO), order_controller_1.default.cancelOrder);
router.patch('/:id/confirm', auth_middleware_1.verifyToken, auth_middleware_1.requireAdminOrVendedor, (0, validation_middleware_1.validateParams)(order_dto_1.OrderParamsDTO), order_controller_1.default.confirmOrder);
router.patch('/:id/deliver', auth_middleware_1.verifyToken, auth_middleware_1.requireAdminOrVendedor, (0, validation_middleware_1.validateParams)(order_dto_1.OrderParamsDTO), order_controller_1.default.deliverOrder);
// Ruta de prueba para cifrado híbrido
router.post('/test-encryption', order_controller_1.default.testOrderEncryption);
exports.default = router;
//# sourceMappingURL=order.routes.js.map