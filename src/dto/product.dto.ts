import { z } from 'zod';

// DTO para crear producto
export const CreateProductDTO = z.object({
    code: z.string()
        .min(1, 'El código es requerido')
        .max(50, 'El código no puede exceder 50 caracteres')
        .regex(/^[A-Z0-9-_]+$/, 'El código solo puede contener letras mayúsculas, números, guiones y guiones bajos'),
    name: z.string()
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .max(100, 'El nombre no puede exceder 100 caracteres'),
    price: z.number()
        .positive('El precio debe ser mayor a 0')
        .max(999999.99, 'El precio no puede exceder 999,999.99'),
    stock: z.number()
        .int('El stock debe ser un número entero')
        .min(0, 'El stock no puede ser negativo')
        .max(99999, 'El stock no puede exceder 99,999')
});

// DTO para actualizar producto
export const UpdateProductDTO = z.object({
    code: z.string()
        .min(1, 'El código es requerido')
        .max(50, 'El código no puede exceder 50 caracteres')
        .regex(/^[A-Z0-9-_]+$/, 'El código solo puede contener letras mayúsculas, números, guiones y guiones bajos')
        .optional(),
    name: z.string()
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .max(100, 'El nombre no puede exceder 100 caracteres')
        .optional(),
    price: z.number()
        .positive('El precio debe ser mayor a 0')
        .max(999999.99, 'El precio no puede exceder 999,999.99')
        .optional(),
    stock: z.number()
        .int('El stock debe ser un número entero')
        .min(0, 'El stock no puede ser negativo')
        .max(99999, 'El stock no puede exceder 99,999')
        .optional()
});

// DTO para parámetros de ruta
export const ProductParamsDTO = z.object({
    id: z.string()
        .regex(/^\d+$/, 'El ID debe ser un número')
        .transform(val => parseInt(val, 10))
});

// DTO para query parameters
export const ProductQueryDTO = z.object({
    page: z.string()
        .regex(/^\d+$/, 'La página debe ser un número')
        .transform(val => parseInt(val, 10))
        .optional(),
    limit: z.string()
        .regex(/^\d+$/, 'El límite debe ser un número')
        .transform(val => parseInt(val, 10))
        .optional(),
    search: z.string()
        .max(100, 'La búsqueda no puede exceder 100 caracteres')
        .optional(),
    sortBy: z.enum(['name', 'price', 'stock', 'createdAt'])
        .optional(),
    sortOrder: z.enum(['ASC', 'DESC'])
        .optional()
});

// Tipos TypeScript derivados de los DTOs
export type CreateProductDTOType = z.infer<typeof CreateProductDTO>;
export type UpdateProductDTOType = z.infer<typeof UpdateProductDTO>;
export type ProductParamsDTOType = z.infer<typeof ProductParamsDTO>;
export type ProductQueryDTOType = z.infer<typeof ProductQueryDTO>;

// DTOs de respuesta
export interface ProductResponseDTO {
    id: number;
    code: string;
    name: string;
    price: number;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface ProductListResponseDTO {
    products: ProductResponseDTO[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
