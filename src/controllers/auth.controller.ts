import { Request, Response } from 'express';
import AuthService from '../services/auth.service';
import EncryptionService from '../services/encryption.service';
import { RegisterDTOType, LoginDTOType } from '../dto/auth.dto';
import { ResponseUtil } from '../utils/response.util';
import { MESSAGES } from '../constants/messages';

class AuthController {
    async register(req: Request, res: Response) {
        try {
            const data: RegisterDTOType = req.body;
            const result = await AuthService.register(data);

            ResponseUtil.created(res, MESSAGES.SUCCESS.USER_REGISTERED, result);
        } catch (error: any) {
            ResponseUtil.error(res, error.message, 400);
        }
    }

    async login(req: Request, res: Response) {
        try {
            const data: LoginDTOType = req.body;
            const result = await AuthService.login(data);

            ResponseUtil.success(res, MESSAGES.SUCCESS.LOGIN_SUCCESS, result);
        } catch (error: any) {
            ResponseUtil.unauthorized(res, error.message);
        }
    }

    async getProfile(req: Request, res: Response) {
        try {
            const userId = (req as any).user?.id;
            
            if (!userId) {
                return ResponseUtil.unauthorized(res, 'Token no válido');
            }

            const user = await AuthService.getUserById(userId);

            ResponseUtil.success(res, MESSAGES.SUCCESS.PROFILE_RETRIEVED, {
                id: user.id,
                name: user.name,
                email: user.email,
                rol: user.rol
            });
        } catch (error: any) {
            ResponseUtil.notFound(res, error.message);
        }
    }

    async refreshToken(req: Request, res: Response) {
        try {
            const { refreshToken } = req.body;

            if (!refreshToken) {
                return ResponseUtil.error(res, MESSAGES.ERROR.REFRESH_TOKEN_REQUIRED, 400);
            }

            const result = await AuthService.refreshTokens(refreshToken);

            ResponseUtil.success(res, MESSAGES.SUCCESS.TOKENS_REFRESHED, result);
        } catch (error: any) {
            ResponseUtil.unauthorized(res, error.message);
        }
    }

    async testEncryption(req: Request, res: Response) {
        try {
            const { message } = req.body;

            if (!message) {
                return ResponseUtil.error(res, 'Mensaje requerido para la prueba de cifrado', 400);
            }

            // Cifrar mensaje
            const encrypted = EncryptionService.encryptHybrid(message);
            
            // Descifrar mensaje
            const decrypted = EncryptionService.decryptHybrid(encrypted);

            ResponseUtil.success(res, 'Prueba de cifrado híbrido exitosa', {
                originalMessage: message,
                encryptedData: encrypted.encryptedData,
                encryptedKey: encrypted.encryptedKey,
                iv: encrypted.iv,
                decryptedMessage: decrypted.decryptedData,
                encryptionWorking: message === decrypted.decryptedData
            });
        } catch (error: any) {
            ResponseUtil.internalError(res, `Error en la prueba de cifrado: ${error.message}`);
        }
    }
}

export default new AuthController();
