"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '15m';
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d';
class JWTService {
    generateAccessToken(payload) {
        return jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    }
    generateRefreshToken(payload) {
        return jsonwebtoken_1.default.sign(payload, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN });
    }
    generateTokenPair(payload) {
        return {
            accessToken: this.generateAccessToken(payload),
            refreshToken: this.generateRefreshToken(payload)
        };
    }
    verifyAccessToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, JWT_SECRET);
        }
        catch (error) {
            throw new Error('Token de acceso inválido o expirado');
        }
    }
    verifyRefreshToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, JWT_REFRESH_SECRET);
        }
        catch (error) {
            throw new Error('Token de refresh inválido o expirado');
        }
    }
    async refreshTokens(refreshToken) {
        // Verificar el refresh token
        const payload = this.verifyRefreshToken(refreshToken);
        // Verificar que el usuario aún existe
        const user = await user_model_1.default.findByPk(payload.id);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        // Generar nuevos tokens
        const newPayload = {
            id: user.id,
            email: user.email,
            rol: user.rol
        };
        return this.generateTokenPair(newPayload);
    }
}
exports.default = new JWTService();
//# sourceMappingURL=jwt.service.js.map