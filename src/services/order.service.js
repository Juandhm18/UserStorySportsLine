"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_dao_1 = __importDefault(require("../dao/order.dao"));
const product_dao_1 = __importDefault(require("../dao/product.dao"));
class OrderService {
    async create(orderData) {
        // Validar que todos los productos existan y tengan stock suficiente
        for (const item of orderData.items) {
            const product = await product_dao_1.default.findById(item.productId);
            if (!product) {
                throw new Error(`Producto con ID ${item.productId} no encontrado`);
            }
            if (product.stock < item.quantity) {
                throw new Error(`Stock insuficiente para el producto ${product.name}. Stock disponible: ${product.stock}, solicitado: ${item.quantity}`);
            }
        }
        // Crear la orden
        const order = await order_dao_1.default.create(orderData);
        // Reducir el stock de los productos
        for (const item of orderData.items) {
            const product = await product_dao_1.default.findById(item.productId);
            if (product) {
                const newStock = product.stock - item.quantity;
                await product_dao_1.default.updateStock(item.productId, newStock);
            }
        }
        // Obtener la orden completa con todas las relaciones
        const completeOrder = await order_dao_1.default.findById(order.id);
        if (!completeOrder) {
            throw new Error('Error al obtener la orden creada');
        }
        return order_dao_1.default.toResponseDTO(completeOrder);
    }
    async getAll(options) {
        const { page = 1, limit = 10 } = options || {};
        const result = await order_dao_1.default.findAll(options);
        return {
            orders: order_dao_1.default.toResponseDTOArray(result.orders),
            pagination: {
                page,
                limit,
                total: result.total,
                totalPages: Math.ceil(result.total / limit)
            }
        };
    }
    async getById(id) {
        const order = await order_dao_1.default.findById(id);
        return order ? order_dao_1.default.toResponseDTO(order) : null;
    }
    async update(id, orderData) {
        const affectedCount = await order_dao_1.default.update(id, orderData);
        if (affectedCount === 0) {
            return null;
        }
        const updatedOrder = await order_dao_1.default.findById(id);
        return updatedOrder ? order_dao_1.default.toResponseDTO(updatedOrder) : null;
    }
    async delete(id) {
        // Obtener la orden antes de eliminarla para restaurar el stock
        const order = await order_dao_1.default.findById(id);
        if (!order) {
            return false;
        }
        // Restaurar el stock de los productos si la orden no está cancelada
        if (order.status !== 'cancelled') {
            for (const item of order.items) {
                const product = await product_dao_1.default.findById(item.productId);
                if (product) {
                    const newStock = product.stock + item.quantity;
                    await product_dao_1.default.updateStock(item.productId, newStock);
                }
            }
        }
        const deletedCount = await order_dao_1.default.delete(id);
        return deletedCount > 0;
    }
    async getOrdersByClient(clientId) {
        const orders = await order_dao_1.default.findByClientId(clientId);
        return order_dao_1.default.toResponseDTOArray(orders);
    }
    async getOrdersByProduct(productId) {
        const orders = await order_dao_1.default.findByProductId(productId);
        return order_dao_1.default.toResponseDTOArray(orders);
    }
    async getOrdersByStatus(status) {
        const orders = await order_dao_1.default.getOrdersByStatus(status);
        return order_dao_1.default.toResponseDTOArray(orders);
    }
    async cancelOrder(id) {
        const order = await order_dao_1.default.findById(id);
        if (!order) {
            return null;
        }
        // Solo se pueden cancelar órdenes pendientes o confirmadas
        if (!['pending', 'confirmed'].includes(order.status)) {
            throw new Error('Solo se pueden cancelar órdenes pendientes o confirmadas');
        }
        // Restaurar el stock de los productos
        for (const item of order.items) {
            const product = await product_dao_1.default.findById(item.productId);
            if (product) {
                const newStock = product.stock + item.quantity;
                await product_dao_1.default.updateStock(item.productId, newStock);
            }
        }
        // Actualizar el estado de la orden
        const updatedOrder = await this.update(id, { status: 'cancelled' });
        return updatedOrder;
    }
    async confirmOrder(id) {
        const order = await order_dao_1.default.findById(id);
        if (!order) {
            return null;
        }
        // Solo se pueden confirmar órdenes pendientes
        if (order.status !== 'pending') {
            throw new Error('Solo se pueden confirmar órdenes pendientes');
        }
        const updatedOrder = await this.update(id, { status: 'confirmed' });
        return updatedOrder;
    }
    async deliverOrder(id) {
        const order = await order_dao_1.default.findById(id);
        if (!order) {
            return null;
        }
        // Solo se pueden entregar órdenes confirmadas
        if (order.status !== 'confirmed') {
            throw new Error('Solo se pueden entregar órdenes confirmadas');
        }
        const updatedOrder = await this.update(id, { status: 'delivered' });
        return updatedOrder;
    }
}
exports.default = new OrderService();
//# sourceMappingURL=order.service.js.map