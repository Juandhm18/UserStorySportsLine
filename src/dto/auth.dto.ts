import { z } from 'zod';

// DTO para registro de usuario
export const RegisterDTO = z.object({
    name: z.string()
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .max(50, 'El nombre no puede exceder 50 caracteres'),
    email: z.string()
        .email('Formato de email inválido')
        .max(100, 'El email no puede exceder 100 caracteres'),
    password: z.string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .max(100, 'La contraseña no puede exceder 100 caracteres'),
    rol: z.enum(['admin', 'vendedor'], {
        message: 'El rol debe ser admin o vendedor'
    })
});

// DTO para login
export const LoginDTO = z.object({
    email: z.string()
        .email('Formato de email inválido'),
    password: z.string()
        .min(1, 'La contraseña es requerida')
});

// DTO para refresh token
export const RefreshTokenDTO = z.object({
    refreshToken: z.string()
        .min(1, 'El refresh token es requerido')
});

// Tipos TypeScript derivados de los DTOs
export type RegisterDTOType = z.infer<typeof RegisterDTO>;
export type LoginDTOType = z.infer<typeof LoginDTO>;
export type RefreshTokenDTOType = z.infer<typeof RefreshTokenDTO>;

// DTOs de respuesta
export interface UserResponseDTO {
    id: number;
    name: string;
    email: string;
    rol: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface AuthResponseDTO {
    user: UserResponseDTO;
    tokens: {
        accessToken: string;
        refreshToken: string;
    };
}

export interface TokenResponseDTO {
    accessToken: string;
    refreshToken: string;
}
