"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdminOrVendedor = exports.requireVendedor = exports.requireAdmin = exports.requireRole = exports.verifyToken = void 0;
const jwt_service_1 = __importDefault(require("../services/jwt.service"));
// Middleware para verificar JWT
const verifyToken = (req, res, next) => {
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
        const decoded = jwt_service_1.default.verifyAccessToken(token);
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message
        });
    }
};
exports.verifyToken = verifyToken;
// Middleware para validar roles
const requireRole = (roles) => {
    return (req, res, next) => {
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
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    };
};
exports.requireRole = requireRole;
// Middleware específico para admin
exports.requireAdmin = (0, exports.requireRole)(['admin']);
// Middleware específico para vendedor
exports.requireVendedor = (0, exports.requireRole)(['vendedor']);
// Middleware para admin o vendedor
exports.requireAdminOrVendedor = (0, exports.requireRole)(['admin', 'vendedor']);
//# sourceMappingURL=auth.middleware.js.map