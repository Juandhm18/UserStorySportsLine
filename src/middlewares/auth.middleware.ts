import { Request, Response, NextFunction } from 'express';
import JWTService from '../services/jwt.service';

// Extender la interfaz Request para incluir user
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
                email: string;
                rol: string;
            };
        }
    }
}

// Middleware para verificar JWT
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: 'Token de acceso requerido'
            });
        }

        const token = authHeader.split(' ')[1]; // Bearer <token>
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Formato de token inválido'
            });
        }

        // Verificar el token
        const decoded = JWTService.verifyAccessToken(token);
        req.user = decoded;
        
        next();
    } catch (error: any) {
        return res.status(401).json({
            success: false,
            message: error.message
        });
    }
};

// Middleware para validar roles
export const requireRole = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: 'Usuario no autenticado'
                });
            }

            if (!roles.includes(req.user.rol)) {
                return res.status(403).json({
                    success: false,
                    message: 'No tienes permisos para acceder a este recurso'
                });
            }

            next();
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    };
};

// Middleware específico para admin
export const requireAdmin = requireRole(['admin']);

// Middleware específico para vendedor
export const requireVendedor = requireRole(['vendedor']);

// Middleware para admin o vendedor
export const requireAdminOrVendedor = requireRole(['admin', 'vendedor']);
