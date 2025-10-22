"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_service_1 = __importDefault(require("../services/order.service"));
const encryption_service_1 = __importDefault(require("../services/encryption.service"));
class OrderController {
    async create(req, res) {
        try {
            const orderData = req.body;
            // Agregar el userId del usuario autenticado
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json({
                    success: false,
                    message: 'Usuario no autenticado'
                });
            }
            const orderWithUser = {
                ...orderData,
                userId
            };
            const order = await order_service_1.default.create(orderWithUser);
            res.status(201).json({
                success: true,
                message: 'Pedido creado exitosamente',
                data: order
            });
        }
        catch (error) {
            if (error.message.includes('Stock insuficiente') ||
                error.message.includes('no encontrado') ||
                error.message.includes('Debe incluir')) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                });
            }
            res.status(500).json({
                success: false,
                message: 'Error al crear pedido: ' + error.message
            });
        }
    }
    async getAll(req, res) {
        try {
            const queryParams = req.query;
            const orders = await order_service_1.default.getAll(queryParams);
            res.status(200).json({
                success: true,
                message: 'Pedidos obtenidos exitosamente',
                data: orders
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener pedidos: ' + error.message
            });
        }
    }
    async getById(req, res) {
        try {
            const { id } = req.params;
            const order = await order_service_1.default.getById(id);
            if (!order) {
                return res.status(404).json({
                    success: false,
                    message: 'Pedido no encontrado'
                });
            }
            res.status(200).json({
                success: true,
                message: 'Pedido obtenido exitosamente',
                data: order
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener pedido: ' + error.message
            });
        }
    }
    async update(req, res) {
        try {
            const { id } = req.params;
            const orderData = req.body;
            const order = await order_service_1.default.update(id, orderData);
            if (!order) {
                return res.status(404).json({
                    success: false,
                    message: 'Pedido no encontrado'
                });
            }
            res.status(200).json({
                success: true,
                message: 'Pedido actualizado exitosamente',
                data: order
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al actualizar pedido: ' + error.message
            });
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params;
            const deleted = await order_service_1.default.delete(id);
            if (!deleted) {
                return res.status(404).json({
                    success: false,
                    message: 'Pedido no encontrado'
                });
            }
            res.status(200).json({
                success: true,
                message: 'Pedido eliminado exitosamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al eliminar pedido: ' + error.message
            });
        }
    }
    async getOrdersByClient(req, res) {
        try {
            const { clientId } = req.params;
            const orders = await order_service_1.default.getOrdersByClient(parseInt(clientId));
            res.status(200).json({
                success: true,
                message: 'Pedidos del cliente obtenidos exitosamente',
                data: orders
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener pedidos del cliente: ' + error.message
            });
        }
    }
    async getOrdersByProduct(req, res) {
        try {
            const { productId } = req.params;
            const orders = await order_service_1.default.getOrdersByProduct(parseInt(productId));
            res.status(200).json({
                success: true,
                message: 'Pedidos del producto obtenidos exitosamente',
                data: orders
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener pedidos del producto: ' + error.message
            });
        }
    }
    async cancelOrder(req, res) {
        try {
            const { id } = req.params;
            const order = await order_service_1.default.cancelOrder(id);
            if (!order) {
                return res.status(404).json({
                    success: false,
                    message: 'Pedido no encontrado'
                });
            }
            res.status(200).json({
                success: true,
                message: 'Pedido cancelado exitosamente',
                data: order
            });
        }
        catch (error) {
            if (error.message.includes('Solo se pueden cancelar')) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                });
            }
            res.status(500).json({
                success: false,
                message: 'Error al cancelar pedido: ' + error.message
            });
        }
    }
    async confirmOrder(req, res) {
        try {
            const { id } = req.params;
            const order = await order_service_1.default.confirmOrder(id);
            if (!order) {
                return res.status(404).json({
                    success: false,
                    message: 'Pedido no encontrado'
                });
            }
            res.status(200).json({
                success: true,
                message: 'Pedido confirmado exitosamente',
                data: order
            });
        }
        catch (error) {
            if (error.message.includes('Solo se pueden confirmar')) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                });
            }
            res.status(500).json({
                success: false,
                message: 'Error al confirmar pedido: ' + error.message
            });
        }
    }
    async deliverOrder(req, res) {
        try {
            const { id } = req.params;
            const order = await order_service_1.default.deliverOrder(id);
            if (!order) {
                return res.status(404).json({
                    success: false,
                    message: 'Pedido no encontrado'
                });
            }
            res.status(200).json({
                success: true,
                message: 'Pedido entregado exitosamente',
                data: order
            });
        }
        catch (error) {
            if (error.message.includes('Solo se pueden entregar')) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                });
            }
            res.status(500).json({
                success: false,
                message: 'Error al entregar pedido: ' + error.message
            });
        }
    }
    async getOrdersByStatus(req, res) {
        try {
            const { status } = req.params;
            const orders = await order_service_1.default.getOrdersByStatus(status);
            res.status(200).json({
                success: true,
                message: `Pedidos con estado ${status} obtenidos exitosamente`,
                data: orders
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener pedidos por estado: ' + error.message
            });
        }
    }
    async getOrderHistory(req, res) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json({
                    success: false,
                    message: 'Usuario no autenticado'
                });
            }
            const queryParams = {
                ...req.query,
                userId
            };
            const orders = await order_service_1.default.getAll(queryParams);
            res.status(200).json({
                success: true,
                message: 'Historial de pedidos obtenido exitosamente',
                data: orders
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener historial de pedidos: ' + error.message
            });
        }
    }
    async getOrderStatistics(req, res) {
        try {
            const { status } = req.query;
            let orders;
            if (status) {
                orders = await order_service_1.default.getOrdersByStatus(status);
            }
            else {
                const allOrders = await order_service_1.default.getAll({ limit: 1000 });
                orders = allOrders.orders;
            }
            // Calcular estadísticas
            const totalOrders = orders.length;
            const totalValue = orders.reduce((sum, order) => sum + order.total, 0);
            const averageOrderValue = totalOrders > 0 ? totalValue / totalOrders : 0;
            const statusCounts = orders.reduce((acc, order) => {
                acc[order.status] = (acc[order.status] || 0) + 1;
                return acc;
            }, {});
            const statistics = {
                totalOrders,
                totalValue,
                averageOrderValue: Math.round(averageOrderValue * 100) / 100,
                statusCounts,
                topProducts: this.calculateTopProducts(orders)
            };
            res.status(200).json({
                success: true,
                message: 'Estadísticas de pedidos obtenidas exitosamente',
                data: statistics
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener estadísticas: ' + error.message
            });
        }
    }
    calculateTopProducts(orders) {
        const productStats = new Map();
        orders.forEach(order => {
            order.items.forEach((item) => {
                const existing = productStats.get(item.productId);
                if (existing) {
                    existing.quantity += item.quantity;
                    existing.value += item.subtotal;
                }
                else {
                    productStats.set(item.productId, {
                        name: item.product.name,
                        quantity: item.quantity,
                        value: item.subtotal
                    });
                }
            });
        });
        return Array.from(productStats.entries())
            .map(([productId, stats]) => ({
            productId,
            productName: stats.name,
            totalQuantity: stats.quantity,
            totalValue: stats.value
        }))
            .sort((a, b) => b.totalQuantity - a.totalQuantity)
            .slice(0, 10);
    }
    async testOrderEncryption(req, res) {
        try {
            const { sensitiveData } = req.body;
            if (!sensitiveData) {
                return res.status(400).json({
                    success: false,
                    message: 'Datos sensibles requeridos para la prueba de cifrado'
                });
            }
            // Cifrar datos sensibles
            const encrypted = encryption_service_1.default.encryptHybrid(sensitiveData);
            // Descifrar datos sensibles
            const decrypted = encryption_service_1.default.decryptHybrid(encrypted);
            res.status(200).json({
                success: true,
                message: 'Prueba de cifrado híbrido en pedidos exitosa',
                data: {
                    originalData: sensitiveData,
                    encryptedData: encrypted.encryptedData,
                    encryptedKey: encrypted.encryptedKey,
                    iv: encrypted.iv,
                    decryptedData: decrypted.decryptedData,
                    encryptionWorking: sensitiveData === decrypted.decryptedData
                }
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error en la prueba de cifrado de pedidos: ' + error.message
            });
        }
    }
}
exports.default = new OrderController();
//# sourceMappingURL=order.controller.js.map