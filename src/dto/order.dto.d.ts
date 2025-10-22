import { z } from 'zod';
export declare const CreateOrderDTO: z.ZodObject<{
    clientId: z.ZodNumber;
    items: z.ZodArray<z.ZodObject<{
        productId: z.ZodNumber;
        quantity: z.ZodNumber;
        unitPrice: z.ZodNumber;
    }, z.core.$strip>>;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const UpdateOrderDTO: z.ZodObject<{
    status: z.ZodOptional<z.ZodEnum<{
        pending: "pending";
        confirmed: "confirmed";
        cancelled: "cancelled";
        delivered: "delivered";
    }>>;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const OrderParamsDTO: z.ZodObject<{
    id: z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>;
}, z.core.$strip>;
export declare const OrderQueryDTO: z.ZodObject<{
    page: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>>;
    limit: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>>;
    clientId: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>>;
    userId: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>>;
    status: z.ZodOptional<z.ZodEnum<{
        pending: "pending";
        confirmed: "confirmed";
        cancelled: "cancelled";
        delivered: "delivered";
    }>>;
    sortBy: z.ZodOptional<z.ZodEnum<{
        total: "total";
        status: "status";
        createdAt: "createdAt";
    }>>;
    sortOrder: z.ZodOptional<z.ZodEnum<{
        ASC: "ASC";
        DESC: "DESC";
    }>>;
}, z.core.$strip>;
export type CreateOrderDTOType = z.infer<typeof CreateOrderDTO>;
export type UpdateOrderDTOType = z.infer<typeof UpdateOrderDTO>;
export type OrderParamsDTOType = z.infer<typeof OrderParamsDTO>;
export type OrderQueryDTOType = z.infer<typeof OrderQueryDTO>;
export interface OrderItemResponseDTO {
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
    items: OrderItemResponseDTO[];
}
export interface OrderListResponseDTO {
    orders: OrderResponseDTO[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
//# sourceMappingURL=order.dto.d.ts.map