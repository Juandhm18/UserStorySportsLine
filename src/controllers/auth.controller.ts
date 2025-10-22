import { Request, Response } from 'express';
import AuthService, { RegisterData, LoginData } from '../services/auth.service';

class AuthController {
    async register(req: Request, res: Response) {
        try {
            const { name, email, password, rol }: RegisterData = req.body;

            // Validaciones básicas
            if (!name || !email || !password || !rol) {
                return res.status(400).json({
                    success: false,
                    message: 'Todos los campos son requeridos'
                });
            }

            if (!['admin', 'vendedor'].includes(rol)) {
                return res.status(400).json({
                    success: false,
                    message: 'El rol debe ser admin o vendedor'
                });
            }

            if (password.length < 6) {
                return res.status(400).json({
                    success: false,
                    message: 'La contraseña debe tener al menos 6 caracteres'
                });
            }

            const result = await AuthService.register({ name, email, password, rol });

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
            const { email, password }: LoginData = req.body;

            // Validaciones básicas
            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Email y contraseña son requeridos'
                });
            }

            const result = await AuthService.login({ email, password });

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
