"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = __importDefault(require("../services/auth.service"));
const encryption_service_1 = __importDefault(require("../services/encryption.service"));
class AuthController {
    async register(req, res) {
        try {
            const data = req.body;
            const result = await auth_service_1.default.register(data);
            res.status(201).json({
                success: true,
                message: 'Usuario registrado exitosamente',
                data: result
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
    async login(req, res) {
        try {
            const data = req.body;
            const result = await auth_service_1.default.login(data);
            res.status(200).json({
                success: true,
                message: 'Inicio de sesión exitoso',
                data: result
            });
        }
        catch (error) {
            res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }
    async getProfile(req, res) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json({
                    success: false,
                    message: 'Token no válido'
                });
            }
            const user = await auth_service_1.default.getUserById(userId);
            res.status(200).json({
                success: true,
                data: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    rol: user.rol
                }
            });
        }
        catch (error) {
            res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }
    async refreshToken(req, res) {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) {
                return res.status(400).json({
                    success: false,
                    message: 'Refresh token es requerido'
                });
            }
            const tokens = await auth_service_1.default.refreshTokens(refreshToken);
            res.status(200).json({
                success: true,
                message: 'Tokens renovados exitosamente',
                data: tokens
            });
        }
        catch (error) {
            res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }
    async testEncryption(req, res) {
        try {
            const { message } = req.body;
            if (!message) {
                return res.status(400).json({
                    success: false,
                    message: 'Mensaje requerido para la prueba de cifrado'
                });
            }
            // Cifrar mensaje
            const encrypted = encryption_service_1.default.encryptHybrid(message);
            // Descifrar mensaje
            const decrypted = encryption_service_1.default.decryptHybrid(encrypted);
            res.status(200).json({
                success: true,
                message: 'Prueba de cifrado híbrido exitosa',
                data: {
                    originalMessage: message,
                    encryptedData: encrypted.encryptedData,
                    encryptedKey: encrypted.encryptedKey,
                    iv: encrypted.iv,
                    decryptedMessage: decrypted.decryptedData,
                    encryptionWorking: message === decrypted.decryptedData
                }
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error en la prueba de cifrado: ' + error.message
            });
        }
    }
}
exports.default = new AuthController();
//# sourceMappingURL=auth.controller.js.map