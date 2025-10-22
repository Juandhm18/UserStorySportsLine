import { Request, Response } from 'express';
import AuthService from '../services/auth.service';
import { RegisterDTOType, LoginDTOType } from '../dto/auth.dto';

class AuthController {
    async register(req: Request, res: Response) {
        try {
            const data: RegisterDTOType = req.body;
            const result = await AuthService.register(data);

            res.status(201).json({
                success: true,
                message: 'Usuario registrado exitosamente',
                data: result
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const data: LoginDTOType = req.body;
            const result = await AuthService.login(data);

            res.status(200).json({
                success: true,
                message: 'Inicio de sesión exitoso',
                data: result
            });
        } catch (error: any) {
            res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }

    async getProfile(req: Request, res: Response) {
        try {
            const userId = (req as any).user?.id;
            
            if (!userId) {
                return res.status(401).json({
                    success: false,
                    message: 'Token no válido'
                });
            }

            const user = await AuthService.getUserById(userId);

            res.status(200).json({
                success: true,
                data: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    rol: user.rol
                }
            });
        } catch (error: any) {
            res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }

    async refreshToken(req: Request, res: Response) {
        try {
            const { refreshToken } = req.body;

            if (!refreshToken) {
                return res.status(400).json({
                    success: false,
                    message: 'Refresh token es requerido'
                });
            }

            const tokens = await AuthService.refreshTokens(refreshToken);

            res.status(200).json({
                success: true,
                message: 'Tokens renovados exitosamente',
                data: tokens
            });
        } catch (error: any) {
            res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }
}

export default new AuthController();
