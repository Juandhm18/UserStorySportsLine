import { z } from 'zod';
export declare const RegisterDTO: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    rol: z.ZodEnum<{
        admin: "admin";
        vendedor: "vendedor";
    }>;
}, z.core.$strip>;
export declare const LoginDTO: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const RefreshTokenDTO: z.ZodObject<{
    refreshToken: z.ZodString;
}, z.core.$strip>;
export type RegisterDTOType = z.infer<typeof RegisterDTO>;
export type LoginDTOType = z.infer<typeof LoginDTO>;
export type RefreshTokenDTOType = z.infer<typeof RefreshTokenDTO>;
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
//# sourceMappingURL=auth.dto.d.ts.map