"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductQueryDTO = exports.ProductParamsDTO = exports.UpdateProductDTO = exports.CreateProductDTO = void 0;
const zod_1 = require("zod");
// DTO para crear producto
exports.CreateProductDTO = zod_1.z.object({
    code: zod_1.z.string()
        .min(1, 'El código es requerido')
        .max(50, 'El código no puede exceder 50 caracteres')
        .regex(/^[A-Z0-9-_]+$/, 'El código solo puede contener letras mayúsculas, números, guiones y guiones bajos'),
    name: zod_1.z.string()
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .max(100, 'El nombre no puede exceder 100 caracteres'),
    price: zod_1.z.number()
        .positive('El precio debe ser mayor a 0')
        .max(999999.99, 'El precio no puede exceder 999,999.99'),
    stock: zod_1.z.number()
        .int('El stock debe ser un número entero')
        .min(0, 'El stock no puede ser negativo')
        .max(99999, 'El stock no puede exceder 99,999')
});
// DTO para actualizar producto
exports.UpdateProductDTO = zod_1.z.object({
    code: zod_1.z.string()
        .min(1, 'El código es requerido')
        .max(50, 'El código no puede exceder 50 caracteres')
        .regex(/^[A-Z0-9-_]+$/, 'El código solo puede contener letras mayúsculas, números, guiones y guiones bajos')
        .optional(),
    name: zod_1.z.string()
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .max(100, 'El nombre no puede exceder 100 caracteres')
        .optional(),
    price: zod_1.z.number()
        .positive('El precio debe ser mayor a 0')
        .max(999999.99, 'El precio no puede exceder 999,999.99')
        .optional(),
    stock: zod_1.z.number()
        .int('El stock debe ser un número entero')
        .min(0, 'El stock no puede ser negativo')
        .max(99999, 'El stock no puede exceder 99,999')
        .optional()
});
// DTO para parámetros de ruta
exports.ProductParamsDTO = zod_1.z.object({
    id: zod_1.z.string()
        .regex(/^\d+$/, 'El ID debe ser un número')
        .transform(val => parseInt(val, 10))
});
// DTO para query parameters
exports.ProductQueryDTO = zod_1.z.object({
    page: zod_1.z.string()
        .regex(/^\d+$/, 'La página debe ser un número')
        .transform(val => parseInt(val, 10))
        .optional(),
    limit: zod_1.z.string()
        .regex(/^\d+$/, 'El límite debe ser un número')
        .transform(val => parseInt(val, 10))
        .optional(),
    search: zod_1.z.string()
        .max(100, 'La búsqueda no puede exceder 100 caracteres')
        .optional(),
    sortBy: zod_1.z.enum(['name', 'price', 'stock', 'createdAt'])
        .optional(),
    sortOrder: zod_1.z.enum(['ASC', 'DESC'])
        .optional()
});
//# sourceMappingURL=product.dto.js.map