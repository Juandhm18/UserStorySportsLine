import { Order } from '../models/associations';
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
declare class OrderDAO {
    create(orderData: CreateOrderData): Promise<Order>;
    findById(id: number): Promise<Order | null>;
    findAll(options?: {
        page?: number;
        limit?: number;
        clientId?: number;
        userId?: number;
        status?: string;
        sortBy?: string;
        sortOrder?: 'ASC' | 'DESC';
    }): Promise<{
        orders: Order[];
        total: number;
    }>;
    update(id: number, orderData: UpdateOrderData): Promise<number>;
    delete(id: number): Promise<number>;
    findByClientId(clientId: number): Promise<Order[]>;
    findByProductId(productId: number): Promise<Order[]>;
    getOrdersByStatus(status: string): Promise<Order[]>;
    toResponseDTO(order: Order): OrderResponseDTO;
    toResponseDTOArray(orders: Order[]): OrderResponseDTO[];
}
declare const _default: OrderDAO;
export default _default;
//# sourceMappingURL=order.dao.d.ts.map