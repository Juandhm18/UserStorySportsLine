import OrderDAO, { CreateOrderData, UpdateOrderData } from '../dao/order.dao';
import ProductDAO from '../dao/product.dao';
import { OrderResponseDTO, OrderListResponseDTO } from '../dto/order.dto';

class OrderService {
    async create(orderData: CreateOrderData): Promise<OrderResponseDTO> {
        // Validar que todos los productos existan y tengan stock suficiente
        for (const item of orderData.items) {
            const product = await ProductDAO.findById(item.productId);
            
            if (!product) {
                throw new Error(`Producto con ID ${item.productId} no encontrado`);
            }
            
            if ((product as any).stock < item.quantity) {
                throw new Error(`Stock insuficiente para el producto ${(product as any).name}. Stock disponible: ${(product as any).stock}, solicitado: ${item.quantity}`);
            }
        }

        // Crear la orden
        const order = await OrderDAO.create(orderData);

        // Reducir el stock de los productos
        for (const item of orderData.items) {
            const product = await ProductDAO.findById(item.productId);
            if (product) {
                const newStock = (product as any).stock - item.quantity;
                await ProductDAO.updateStock(item.productId, newStock);
            }
        }

        // Obtener la orden completa con todas las relaciones
        const completeOrder = await OrderDAO.findById(order.id);
        if (!completeOrder) {
            throw new Error('Error al obtener la orden creada');
        }

        return OrderDAO.toResponseDTO(completeOrder);
    }

    async getAll(options?: {
        page?: number;
        limit?: number;
        clientId?: number;
        userId?: number;
        status?: string;
        sortBy?: string;
        sortOrder?: 'ASC' | 'DESC';
    }): Promise<OrderListResponseDTO> {
        const { page = 1, limit = 10 } = options || {};
        
        const result = await OrderDAO.findAll(options);
        
        return {
            orders: OrderDAO.toResponseDTOArray(result.orders),
            pagination: {
                page,
                limit,
                total: result.total,
                totalPages: Math.ceil(result.total / limit)
            }
        };
    }

    async getById(id: number): Promise<OrderResponseDTO | null> {
        const order = await OrderDAO.findById(id);
        return order ? OrderDAO.toResponseDTO(order) : null;
    }

    async update(id: number, orderData: UpdateOrderData): Promise<OrderResponseDTO | null> {
        const affectedCount = await OrderDAO.update(id, orderData);
        
        if (affectedCount === 0) {
            return null;
        }

        const updatedOrder = await OrderDAO.findById(id);
        return updatedOrder ? OrderDAO.toResponseDTO(updatedOrder) : null;
    }

    async delete(id: number): Promise<boolean> {
        // Obtener la orden antes de eliminarla para restaurar el stock
        const order = await OrderDAO.findById(id);
        if (!order) {
            return false;
        }

        // Restaurar el stock de los productos si la orden no está cancelada
        if ((order as any).status !== 'cancelled') {
            for (const item of (order as any).items) {
                const product = await ProductDAO.findById(item.productId);
                if (product) {
                    const newStock = (product as any).stock + item.quantity;
                    await ProductDAO.updateStock(item.productId, newStock);
                }
            }
        }

        const deletedCount = await OrderDAO.delete(id);
        return deletedCount > 0;
    }

    async getOrdersByClient(clientId: number): Promise<OrderResponseDTO[]> {
        const orders = await OrderDAO.findByClientId(clientId);
        return OrderDAO.toResponseDTOArray(orders);
    }

    async getOrdersByProduct(productId: number): Promise<OrderResponseDTO[]> {
        const orders = await OrderDAO.findByProductId(productId);
        return OrderDAO.toResponseDTOArray(orders);
    }

    async getOrdersByStatus(status: string): Promise<OrderResponseDTO[]> {
        const orders = await OrderDAO.getOrdersByStatus(status);
        return OrderDAO.toResponseDTOArray(orders);
    }

    async cancelOrder(id: number): Promise<OrderResponseDTO | null> {
        const order = await OrderDAO.findById(id);
        if (!order) {
            return null;
        }

        // Solo se pueden cancelar órdenes pendientes o confirmadas
        if (!['pending', 'confirmed'].includes((order as any).status)) {
            throw new Error('Solo se pueden cancelar órdenes pendientes o confirmadas');
        }

        // Restaurar el stock de los productos
        for (const item of (order as any).items) {
            const product = await ProductDAO.findById(item.productId);
            if (product) {
                const newStock = (product as any).stock + item.quantity;
                await ProductDAO.updateStock(item.productId, newStock);
            }
        }

        // Actualizar el estado de la orden
        const updatedOrder = await this.update(id, { status: 'cancelled' });
        return updatedOrder;
    }

    async confirmOrder(id: number): Promise<OrderResponseDTO | null> {
        const order = await OrderDAO.findById(id);
        if (!order) {
            return null;
        }

        // Solo se pueden confirmar órdenes pendientes
        if ((order as any).status !== 'pending') {
            throw new Error('Solo se pueden confirmar órdenes pendientes');
        }

        const updatedOrder = await this.update(id, { status: 'confirmed' });
        return updatedOrder;
    }

    async deliverOrder(id: number): Promise<OrderResponseDTO | null> {
        const order = await OrderDAO.findById(id);
        if (!order) {
            return null;
        }

        // Solo se pueden entregar órdenes confirmadas
        if ((order as any).status !== 'confirmed') {
            throw new Error('Solo se pueden entregar órdenes confirmadas');
        }

        const updatedOrder = await this.update(id, { status: 'delivered' });
        return updatedOrder;
    }
}

export default new OrderService();
