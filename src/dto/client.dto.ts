import { z } from 'zod';

// DTO para crear cliente
export const CreateClientDTO = z.object({
    name: z.string()
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .max(100, 'El nombre no puede exceder 100 caracteres')
        .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras y espacios'),
    email: z.string()
        .email('Formato de email inválido')
        .max(100, 'El email no puede exceder 100 caracteres'),
    phone: z.string()
        .regex(/^[\+]?[0-9\s\-\(\)]{7,15}$/, 'Formato de teléfono inválido')
        .optional()
        .or(z.literal('')),
    address: z.string()
        .max(500, 'La dirección no puede exceder 500 caracteres')
        .optional()
        .or(z.literal('')),
    document: z.string()
        .min(5, 'El documento debe tener al menos 5 caracteres')
        .max(20, 'El documento no puede exceder 20 caracteres')
        .regex(/^[0-9A-Za-z\-\.]+$/, 'El documento solo puede contener números, letras, guiones y puntos')
});

// DTO para actualizar cliente
export const UpdateClientDTO = z.object({
    name: z.string()
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .max(100, 'El nombre no puede exceder 100 caracteres')
        .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras y espacios')
        .optional(),
    email: z.string()
        .email('Formato de email inválido')
        .max(100, 'El email no puede exceder 100 caracteres')
        .optional(),
    phone: z.string()
        .regex(/^[\+]?[0-9\s\-\(\)]{7,15}$/, 'Formato de teléfono inválido')
        .optional()
        .or(z.literal('')),
    address: z.string()
        .max(500, 'La dirección no puede exceder 500 caracteres')
        .optional()
        .or(z.literal('')),
    document: z.string()
        .min(5, 'El documento debe tener al menos 5 caracteres')
        .max(20, 'El documento no puede exceder 20 caracteres')
        .regex(/^[0-9A-Za-z\-\.]+$/, 'El documento solo puede contener números, letras, guiones y puntos')
        .optional()
});

// DTO para parámetros de ruta
export const ClientParamsDTO = z.object({
    id: z.string()
        .regex(/^\d+$/, 'El ID debe ser un número')
        .transform(val => parseInt(val, 10))
});

// DTO para query parameters
export const ClientQueryDTO = z.object({
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
    sortBy: z.enum(['name', 'email', 'document', 'createdAt'])
        .optional(),
    sortOrder: z.enum(['ASC', 'DESC'])
        .optional()
});

// Tipos TypeScript derivados de los DTOs
export type CreateClientDTOType = z.infer<typeof CreateClientDTO>;
export type UpdateClientDTOType = z.infer<typeof UpdateClientDTO>;
export type ClientParamsDTOType = z.infer<typeof ClientParamsDTO>;
export type ClientQueryDTOType = z.infer<typeof ClientQueryDTO>;

// DTOs de respuesta
export interface ClientResponseDTO {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    address: string | null;
    document: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ClientListResponseDTO {
    clients: ClientResponseDTO[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
