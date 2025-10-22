"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderQueryDTO = exports.OrderParamsDTO = exports.UpdateOrderDTO = exports.CreateOrderDTO = void 0;
const zod_1 = require("zod");
// DTO para crear pedido
exports.CreateOrderDTO = zod_1.z.object({
    clientId: zod_1.z.number()
        .int('El ID del cliente debe ser un número entero')
        .positive('El ID del cliente debe ser mayor a 0'),
    items: zod_1.z.array(zod_1.z.object({
        productId: zod_1.z.number()
            .int('El ID del producto debe ser un número entero')
            .positive('El ID del producto debe ser mayor a 0'),
        quantity: zod_1.z.number()
            .int('La cantidad debe ser un número entero')
            .min(1, 'La cantidad debe ser al menos 1')
            .max(999, 'La cantidad no puede exceder 999'),
        unitPrice: zod_1.z.number()
            .positive('El precio unitario debe ser mayor a 0')
            .max(999999.99, 'El precio unitario no puede exceder 999,999.99')
    }))
        .min(1, 'Debe incluir al menos un producto')
        .max(50, 'No puede incluir más de 50 productos'),
    notes: zod_1.z.string()
        .max(500, 'Las notas no pueden exceder 500 caracteres')
        .optional()
});
// DTO para actualizar pedido
exports.UpdateOrderDTO = zod_1.z.object({
    status: zod_1.z.enum(['pending', 'confirmed', 'cancelled', 'delivered'], {
        message: 'El estado debe ser pending, confirmed, cancelled o delivered'
    }).optional(),
    notes: zod_1.z.string()
        .max(500, 'Las notas no pueden exceder 500 caracteres')
        .optional()
});
// DTO para parámetros de ruta
exports.OrderParamsDTO = zod_1.z.object({
    id: zod_1.z.string()
        .regex(/^\d+$/, 'El ID debe ser un número')
        .transform(val => parseInt(val, 10))
});
// DTO para query parameters
exports.OrderQueryDTO = zod_1.z.object({
    page: zod_1.z.string()
        .regex(/^\d+$/, 'La página debe ser un número')
        .transform(val => parseInt(val, 10))
        .optional(),
    limit: zod_1.z.string()
        .regex(/^\d+$/, 'El límite debe ser un número')
        .transform(val => parseInt(val, 10))
        .optional(),
    clientId: zod_1.z.string()
        .regex(/^\d+$/, 'El ID del cliente debe ser un número')
        .transform(val => parseInt(val, 10))
        .optional(),
    userId: zod_1.z.string()
        .regex(/^\d+$/, 'El ID del usuario debe ser un número')
        .transform(val => parseInt(val, 10))
        .optional(),
    status: zod_1.z.enum(['pending', 'confirmed', 'cancelled', 'delivered'])
        .optional(),
    sortBy: zod_1.z.enum(['createdAt', 'total', 'status'])
        .optional(),
    sortOrder: zod_1.z.enum(['ASC', 'DESC'])
        .optional()
});
//# sourceMappingURL=order.dto.js.map