import { Order, OrderItem, Client, User, Product } from '../models/associations';

export interface CreateOrderData {
    clientId: number;
    userId: number;
    items: {
        productId: number;
        quantity: number;
        unitPrice: number;
    }[];
    notes?: string;
}

export interface UpdateOrderData {
    status?: 'pending' | 'confirmed' | 'cancelled' | 'delivered';
    notes?: string;
}

export interface OrderResponseDTO {
    id: number;
    clientId: number;
    userId: number;
    total: number;
    status: string;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
    client: {
        id: number;
        name: string;
        email: string;
    };
    user: {
        id: number;
        name: string;
        email: string;
    };
    items: {
        id: number;
        productId: number;
        quantity: number;
        unitPrice: number;
        subtotal: number;
        product: {
            id: number;
            code: string;
            name: string;
        };
    }[];
}

class OrderDAO {
    async create(orderData: CreateOrderData): Promise<Order> {
        const { clientId, userId, items, notes } = orderData;
        
        // Calcular el total
        const total = items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
        
        // Crear la orden
        const order = await Order.create({
            clientId,
            userId,
            total,
            notes
        } as any);

        // Crear los items de la orden
        const orderItems = await Promise.all(
            items.map(item => 
                OrderItem.create({
                    orderId: order.id,
                    productId: item.productId,
                    quantity: item.quantity,
                    unitPrice: item.unitPrice,
                    subtotal: item.unitPrice * item.quantity
                } as any)
            )
        );

        return order;
    }

    async findById(id: number): Promise<Order | null> {
        return await Order.findByPk(id, {
            include: [
                {
                    model: Client,
                    as: 'client',
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: OrderItem,
                    as: 'items',
                    include: [
                        {
                            model: Product,
                            as: 'product',
                            attributes: ['id', 'code', 'name']
                        }
                    ]
                }
            ]
        });
    }

    async findAll(options?: {
        page?: number;
        limit?: number;
        clientId?: number;
        userId?: number;
        status?: string;
        sortBy?: string;
        sortOrder?: 'ASC' | 'DESC';
    }): Promise<{ orders: Order[]; total: number }> {
        const { 
            page = 1, 
            limit = 10, 
            clientId, 
            userId, 
            status, 
            sortBy = 'createdAt', 
            sortOrder = 'DESC' 
        } = options || {};
        
        const offset = (page - 1) * limit;
        
        let whereClause: any = {};
        
        if (clientId) {
            whereClause.clientId = clientId;
        }
        
        if (userId) {
            whereClause.userId = userId;
        }
        
        if (status) {
            whereClause.status = status;
        }

        const { count, rows } = await Order.findAndCountAll({
            where: whereClause,
            include: [
                {
                    model: Client,
                    as: 'client',
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: OrderItem,
                    as: 'items',
                    include: [
                        {
                            model: Product,
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

    async update(id: number, orderData: UpdateOrderData): Promise<number> {
        const [affectedCount] = await Order.update(orderData, { where: { id } });
        return affectedCount;
    }

    async delete(id: number): Promise<number> {
        // Primero eliminar los items de la orden
        await OrderItem.destroy({ where: { orderId: id } });
        
        // Luego eliminar la orden
        return await Order.destroy({ where: { id } });
    }

    async findByClientId(clientId: number): Promise<Order[]> {
        return await Order.findAll({
            where: { clientId },
            include: [
                {
                    model: Client,
                    as: 'client',
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: OrderItem,
                    as: 'items',
                    include: [
                        {
                            model: Product,
                            as: 'product',
                            attributes: ['id', 'code', 'name']
                        }
                    ]
                }
            ],
            order: [['createdAt', 'DESC']]
        });
    }

    async findByProductId(productId: number): Promise<Order[]> {
        return await Order.findAll({
            include: [
                {
                    model: Client,
                    as: 'client',
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: OrderItem,
                    as: 'items',
                    where: { productId },
                    include: [
                        {
                            model: Product,
                            as: 'product',
                            attributes: ['id', 'code', 'name']
                        }
                    ]
                }
            ],
            order: [['createdAt', 'DESC']]
        });
    }

    async getOrdersByStatus(status: string): Promise<Order[]> {
        return await Order.findAll({
            where: { status },
            include: [
                {
                    model: Client,
                    as: 'client',
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: OrderItem,
                    as: 'items',
                    include: [
                        {
                            model: Product,
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
    toResponseDTO(order: Order): OrderResponseDTO {
        return {
            id: (order as any).id,
            clientId: (order as any).clientId,
            userId: (order as any).userId,
            total: (order as any).total,
            status: (order as any).status,
            notes: (order as any).notes,
            createdAt: (order as any).createdAt,
            updatedAt: (order as any).updatedAt,
            client: (order as any).client,
            user: (order as any).user,
            items: (order as any).items || []
        };
    }

    // Método para convertir array de Orders a OrderResponseDTOs
    toResponseDTOArray(orders: Order[]): OrderResponseDTO[] {
        return orders.map(order => this.toResponseDTO(order));
    }
}

export default new OrderDAO();
