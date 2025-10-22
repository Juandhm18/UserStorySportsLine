"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientQueryDTO = exports.ClientParamsDTO = exports.UpdateClientDTO = exports.CreateClientDTO = void 0;
const zod_1 = require("zod");
// DTO para crear cliente
exports.CreateClientDTO = zod_1.z.object({
    name: zod_1.z.string()
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .max(100, 'El nombre no puede exceder 100 caracteres')
        .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras y espacios'),
    email: zod_1.z.string()
        .email('Formato de email inválido')
        .max(100, 'El email no puede exceder 100 caracteres'),
    phone: zod_1.z.string()
        .regex(/^[\+]?[0-9\s\-\(\)]{7,15}$/, 'Formato de teléfono inválido')
        .optional()
        .or(zod_1.z.literal('')),
    address: zod_1.z.string()
        .max(500, 'La dirección no puede exceder 500 caracteres')
        .optional()
        .or(zod_1.z.literal('')),
    document: zod_1.z.string()
        .min(5, 'El documento debe tener al menos 5 caracteres')
        .max(20, 'El documento no puede exceder 20 caracteres')
        .regex(/^[0-9A-Za-z\-\.]+$/, 'El documento solo puede contener números, letras, guiones y puntos')
});
// DTO para actualizar cliente
exports.UpdateClientDTO = zod_1.z.object({
    name: zod_1.z.string()
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .max(100, 'El nombre no puede exceder 100 caracteres')
        .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras y espacios')
        .optional(),
    email: zod_1.z.string()
        .email('Formato de email inválido')
        .max(100, 'El email no puede exceder 100 caracteres')
        .optional(),
    phone: zod_1.z.string()
        .regex(/^[\+]?[0-9\s\-\(\)]{7,15}$/, 'Formato de teléfono inválido')
        .optional()
        .or(zod_1.z.literal('')),
    address: zod_1.z.string()
        .max(500, 'La dirección no puede exceder 500 caracteres')
        .optional()
        .or(zod_1.z.literal('')),
    document: zod_1.z.string()
        .min(5, 'El documento debe tener al menos 5 caracteres')
        .max(20, 'El documento no puede exceder 20 caracteres')
        .regex(/^[0-9A-Za-z\-\.]+$/, 'El documento solo puede contener números, letras, guiones y puntos')
        .optional()
});
// DTO para parámetros de ruta
exports.ClientParamsDTO = zod_1.z.object({
    id: zod_1.z.string()
        .regex(/^\d+$/, 'El ID debe ser un número')
        .transform(val => parseInt(val, 10))
});
// DTO para query parameters
exports.ClientQueryDTO = zod_1.z.object({
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
    sortBy: zod_1.z.enum(['name', 'email', 'document', 'createdAt'])
        .optional(),
    sortOrder: zod_1.z.enum(['ASC', 'DESC'])
        .optional()
});
//# sourceMappingURL=client.dto.js.map