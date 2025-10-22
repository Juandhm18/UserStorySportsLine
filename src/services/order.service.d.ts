import { CreateOrderData, UpdateOrderData } from '../dao/order.dao';
import { OrderResponseDTO, OrderListResponseDTO } from '../dto/order.dto';
declare class OrderService {
    create(orderData: CreateOrderData): Promise<OrderResponseDTO>;
    getAll(options?: {
        page?: number;
        limit?: number;
        clientId?: number;
        userId?: number;
        status?: string;
        sortBy?: string;
        sortOrder?: 'ASC' | 'DESC';
    }): Promise<OrderListResponseDTO>;
    getById(id: number): Promise<OrderResponseDTO | null>;
    update(id: number, orderData: UpdateOrderData): Promise<OrderResponseDTO | null>;
    delete(id: number): Promise<boolean>;
    getOrdersByClient(clientId: number): Promise<OrderResponseDTO[]>;
    getOrdersByProduct(productId: number): Promise<OrderResponseDTO[]>;
    getOrdersByStatus(status: string): Promise<OrderResponseDTO[]>;
    cancelOrder(id: number): Promise<OrderResponseDTO | null>;
    confirmOrder(id: number): Promise<OrderResponseDTO | null>;
    deliverOrder(id: number): Promise<OrderResponseDTO | null>;
}
declare const _default: OrderService;
export default _default;
//# sourceMappingURL=order.service.d.ts.map