"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateParams = exports.validateQuery = exports.validateDTO = void 0;
const zod_1 = require("zod");
// Middleware genérico para validación con Zod
const validateDTO = (schema) => {
    return (req, res, next) => {
        try {
            // Validar el body de la request
            const validatedData = schema.parse(req.body);
            // Reemplazar el body con los datos validados
            req.body = validatedData;
            next();
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                const errorMessages = error.issues.map((err) => ({
                    field: err.path.join('.'),
                    message: err.message
                }));
                return res.status(400).json({
                    success: false,
                    message: 'Datos de entrada inválidos',
                    errors: errorMessages
                });
            }
            return res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    };
};
exports.validateDTO = validateDTO;
// Middleware específico para validar query parameters
const validateQuery = (schema) => {
    return (req, res, next) => {
        try {
            const validatedData = schema.parse(req.query);
            req.query = validatedData;
            next();
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                const errorMessages = error.issues.map((err) => ({
                    field: err.path.join('.'),
                    message: err.message
                }));
                return res.status(400).json({
                    success: false,
                    message: 'Parámetros de consulta inválidos',
                    errors: errorMessages
                });
            }
            return res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    };
};
exports.validateQuery = validateQuery;
// Middleware específico para validar parámetros de ruta
const validateParams = (schema) => {
    return (req, res, next) => {
        try {
            const validatedData = schema.parse(req.params);
            req.params = validatedData;
            next();
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                const errorMessages = error.issues.map((err) => ({
                    field: err.path.join('.'),
                    message: err.message
                }));
                return res.status(400).json({
                    success: false,
                    message: 'Parámetros de ruta inválidos',
                    errors: errorMessages
                });
            }
            return res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    };
};
exports.validateParams = validateParams;
//# sourceMappingURL=validation.middleware.js.map