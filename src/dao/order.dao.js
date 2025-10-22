"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const associations_1 = require("../models/associations");
class OrderDAO {
    async create(orderData) {
        const { clientId, userId, items, notes } = orderData;
        // Calcular el total
        const total = items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
        // Crear la orden
        const order = await associations_1.Order.create({
            clientId,
            userId,
            total,
            notes
        });
        // Crear los items de la orden
        const orderItems = await Promise.all(items.map(item => associations_1.OrderItem.create({
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            subtotal: item.unitPrice * item.quantity
        })));
        return order;
    }
    async findById(id) {
        return await associations_1.Order.findByPk(id, {
            include: [
                {
                    model: associations_1.Client,
                    as: 'client',
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: associations_1.User,
                    as: 'user',
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: associations_1.OrderItem,
                    as: 'items',
                    include: [
                        {
                            model: associations_1.Product,
                            as: 'product',
                            attributes: ['id', 'code', 'name']
                        }
                    ]
                }
            ]
        });
    }
    async findAll(options) {
        const { page = 1, limit = 10, clientId, userId, status, sortBy = 'createdAt', sortOrder = 'DESC' } = options || {};
        const offset = (page - 1) * limit;
        let whereClause = {};
        if (clientId) {
            whereClause.clientId = clientId;
        }
        if (userId) {
            whereClause.userId = userId;
        }
        if (status) {
            whereClause.status = status;
        }
        const { count, rows } = await associations_1.Order.findAndCountAll({
            where: whereClause,
            include: [
                {
                    model: associations_1.Client,
                    as: 'client',
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: associations_1.User,
                    as: 'user',
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: associations_1.OrderItem,
                    as: 'items',
                    include: [
                        {
                            model: associations_1.Product,
                            as: 'product',
                            attributes: ['id', 'code', 'name']
                        }
                    ]
                }
            ],
            limit,
            offset,
            order: [[sortBy, sortOrder]]
        });
        return {
            orders: rows,
            total: count
        };
    }
    async update(id, orderData) {
        const [affectedCount] = await associations_1.Order.update(orderData, { where: { id } });
        return affectedCount;
    }
    async delete(id) {
        // Primero eliminar los items de la orden
        await associations_1.OrderItem.destroy({ where: { orderId: id } });
        // Luego eliminar la orden
        return await associations_1.Order.destroy({ where: { id } });
    }
    async findByClientId(clientId) {
        return await associations_1.Order.findAll({
            where: { clientId },
            include: [
                {
                    model: associations_1.Client,
                    as: 'client',
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: associations_1.User,
                    as: 'user',
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: associations_1.OrderItem,
                    as: 'items',
                    include: [
                        {
                            model: associations_1.Product,
                            as: 'product',
                            attributes: ['id', 'code', 'name']
                        }
                    ]
                }
            ],
            order: [['createdAt', 'DESC']]
        });
    }
    async findByProductId(productId) {
        return await associations_1.Order.findAll({
            include: [
                {
                    model: associations_1.Client,
                    as: 'client',
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: associations_1.User,
                    as: 'user',
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: associations_1.OrderItem,
                    as: 'items',
                    where: { productId },
                    include: [
                        {
                            model: associations_1.Product,
                            as: 'product',
                            attributes: ['id', 'code', 'name']
                        }
                    ]
                }
            ],
            order: [['createdAt', 'DESC']]
        });
    }
    async getOrdersByStatus(status) {
        return await associations_1.Order.findAll({
            where: { status },
            include: [
                {
                    model: associations_1.Client,
                    as: 'client',
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: associations_1.User,
                    as: 'user',
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: associations_1.OrderItem,
                    as: 'items',
                    include: [
                        {
                            model: associations_1.Product,
                            as: 'product',
                            attributes: ['id', 'code', 'name']
                        }
                    ]
                }
            ],
            order: [['createdAt', 'DESC']]
        });
    }
    // Método para convertir Order a OrderResponseDTO
    toResponseDTO(order) {
        return {
            id: order.id,
            clientId: order.clientId,
            userId: order.userId,
            total: order.total,
            status: order.status,
            notes: order.notes,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
            client: order.client,
            user: order.user,
            items: order.items || []
        };
    }
    // Método para convertir array de Orders a OrderResponseDTOs
    toResponseDTOArray(orders) {
        return orders.map(order => this.toResponseDTO(order));
    }
}
exports.default = new OrderDAO();
//# sourceMappingURL=order.dao.js.map