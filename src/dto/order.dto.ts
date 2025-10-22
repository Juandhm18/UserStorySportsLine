import { z } from 'zod';

// DTO para crear pedido
export const CreateOrderDTO = z.object({
    clientId: z.number()
        .int('El ID del cliente debe ser un número entero')
        .positive('El ID del cliente debe ser mayor a 0'),
    items: z.array(z.object({
        productId: z.number()
            .int('El ID del producto debe ser un número entero')
            .positive('El ID del producto debe ser mayor a 0'),
        quantity: z.number()
            .int('La cantidad debe ser un número entero')
            .min(1, 'La cantidad debe ser al menos 1')
            .max(999, 'La cantidad no puede exceder 999'),
        unitPrice: z.number()
            .positive('El precio unitario debe ser mayor a 0')
            .max(999999.99, 'El precio unitario no puede exceder 999,999.99')
    }))
    .min(1, 'Debe incluir al menos un producto')
    .max(50, 'No puede incluir más de 50 productos'),
    notes: z.string()
        .max(500, 'Las notas no pueden exceder 500 caracteres')
        .optional()
});

// DTO para actualizar pedido
export const UpdateOrderDTO = z.object({
    status: z.enum(['pending', 'confirmed', 'cancelled', 'delivered'], {
        message: 'El estado debe ser pending, confirmed, cancelled o delivered'
    }).optional(),
    notes: z.string()
        .max(500, 'Las notas no pueden exceder 500 caracteres')
        .optional()
});

// DTO para parámetros de ruta
export const OrderParamsDTO = z.object({
    id: z.string()
        .regex(/^\d+$/, 'El ID debe ser un número')
        .transform(val => parseInt(val, 10))
});

// DTO para query parameters
export const OrderQueryDTO = z.object({
    page: z.string()
        .regex(/^\d+$/, 'La página debe ser un número')
        .transform(val => parseInt(val, 10))
        .optional(),
    limit: z.string()
        .regex(/^\d+$/, 'El límite debe ser un número')
        .transform(val => parseInt(val, 10))
        .optional(),
    clientId: z.string()
        .regex(/^\d+$/, 'El ID del cliente debe ser un número')
        .transform(val => parseInt(val, 10))
        .optional(),
    userId: z.string()
        .regex(/^\d+$/, 'El ID del usuario debe ser un número')
        .transform(val => parseInt(val, 10))
        .optional(),
    status: z.enum(['pending', 'confirmed', 'cancelled', 'delivered'])
        .optional(),
    sortBy: z.enum(['createdAt', 'total', 'status'])
        .optional(),
    sortOrder: z.enum(['ASC', 'DESC'])
        .optional()
});

// Tipos TypeScript derivados de los DTOs
export type CreateOrderDTOType = z.infer<typeof CreateOrderDTO>;
export type UpdateOrderDTOType = z.infer<typeof UpdateOrderDTO>;
export type OrderParamsDTOType = z.infer<typeof OrderParamsDTO>;
export type OrderQueryDTOType = z.infer<typeof OrderQueryDTO>;

// DTOs de respuesta
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
