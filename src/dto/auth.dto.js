"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenDTO = exports.LoginDTO = exports.RegisterDTO = void 0;
const zod_1 = require("zod");
// DTO para registro de usuario
exports.RegisterDTO = zod_1.z.object({
    name: zod_1.z.string()
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .max(50, 'El nombre no puede exceder 50 caracteres'),
    email: zod_1.z.string()
        .email('Formato de email inválido')
        .max(100, 'El email no puede exceder 100 caracteres'),
    password: zod_1.z.string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .max(100, 'La contraseña no puede exceder 100 caracteres'),
    rol: zod_1.z.enum(['admin', 'vendedor'], {
        message: 'El rol debe ser admin o vendedor'
    })
});
// DTO para login
exports.LoginDTO = zod_1.z.object({
    email: zod_1.z.string()
        .email('Formato de email inválido'),
    password: zod_1.z.string()
        .min(1, 'La contraseña es requerida')
});
// DTO para refresh token
exports.RefreshTokenDTO = zod_1.z.object({
    refreshToken: zod_1.z.string()
        .min(1, 'El refresh token es requerido')
});
//# sourceMappingURL=auth.dto.js.map