"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authEncryption = exports.decryptRequest = exports.encryptResponse = void 0;
const encryption_service_1 = __importDefault(require("../services/encryption.service"));
// Campos sensibles que deben ser cifrados
const SENSITIVE_FIELDS = ['password', 'email', 'phone', 'address', 'creditCard', 'notes', 'document'];
// Middleware para cifrar datos sensibles en las respuestas
const encryptResponse = (req, res, next) => {
    const originalSend = res.send;
    res.send = function (data) {
        try {
            if (typeof data === 'string') {
                const parsedData = JSON.parse(data);
                if (parsedData.success && parsedData.data) {
                    parsedData.data = encryptSensitiveFields(parsedData.data);
                    return originalSend.call(this, JSON.stringify(parsedData));
                }
            }
            return originalSend.call(this, data);
        }
        catch (error) {
            return originalSend.call(this, data);
        }
    };
    next();
};
exports.encryptResponse = encryptResponse;
// Middleware para descifrar datos sensibles en las requests
const decryptRequest = (req, res, next) => {
    try {
        if (req.body && typeof req.body === 'object') {
            req.body = decryptSensitiveFields(req.body);
        }
    }
    catch (error) {
        // Si hay error en el descifrado, continuar sin modificar
        console.warn('Error decrypting request data:', error);
    }
    next();
};
exports.decryptRequest = decryptRequest;
// Función para cifrar campos sensibles
function encryptSensitiveFields(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map(item => encryptSensitiveFields(item));
    }
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
        if (SENSITIVE_FIELDS.includes(key) && typeof value === 'string') {
            // Cifrar campo sensible
            result[key] = encryption_service_1.default.encryptSensitiveData(value);
        }
        else if (typeof value === 'object' && value !== null) {
            // Recursivamente procesar objetos anidados
            result[key] = encryptSensitiveFields(value);
        }
        else {
            result[key] = value;
        }
    }
    return result;
}
// Función para descifrar campos sensibles
function decryptSensitiveFields(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map(item => decryptSensitiveFields(item));
    }
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
        if (SENSITIVE_FIELDS.includes(key) && typeof value === 'string') {
            try {
                // Intentar descifrar campo sensible
                result[key] = encryption_service_1.default.decryptSensitiveData(value);
            }
            catch (error) {
                // Si no se puede descifrar, asumir que no está cifrado
                result[key] = value;
            }
        }
        else if (typeof value === 'object' && value !== null) {
            // Recursivamente procesar objetos anidados
            result[key] = decryptSensitiveFields(value);
        }
        else {
            result[key] = value;
        }
    }
    return result;
}
// Middleware específico para rutas de autenticación
const authEncryption = (req, res, next) => {
    // Descifrar request
    (0, exports.decryptRequest)(req, res, () => {
        // Cifrar response
        (0, exports.encryptResponse)(req, res, next);
    });
};
exports.authEncryption = authEncryption;
//# sourceMappingURL=encryption.middleware.js.map