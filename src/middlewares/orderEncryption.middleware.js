"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptOrderStatistics = exports.orderEncryption = void 0;
const encryption_service_1 = __importDefault(require("../services/encryption.service"));
// Middleware específico para cifrar datos sensibles de pedidos
const orderEncryption = (req, res, next) => {
    // Descifrar request
    decryptOrderRequest(req, res, () => {
        // Cifrar response
        encryptOrderResponse(req, res, next);
    });
};
exports.orderEncryption = orderEncryption;
// Función para descifrar datos sensibles en requests de pedidos
function decryptOrderRequest(req, res, next) {
    try {
        if (req.body && typeof req.body === 'object') {
            req.body = decryptOrderFields(req.body);
        }
    }
    catch (error) {
        console.warn('Error decrypting order request data:', error);
    }
    next();
}
// Función para cifrar datos sensibles en responses de pedidos
function encryptOrderResponse(req, res, next) {
    const originalSend = res.send;
    res.send = function (data) {
        try {
            if (typeof data === 'string') {
                const parsedData = JSON.parse(data);
                if (parsedData.success && parsedData.data) {
                    parsedData.data = encryptOrderFields(parsedData.data);
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
}
// Función para cifrar campos sensibles de pedidos
function encryptOrderFields(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map(item => encryptOrderFields(item));
    }
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
        if (shouldEncryptField(key, value)) {
            // Cifrar campo sensible
            result[key] = encryption_service_1.default.encryptSensitiveData(value);
        }
        else if (typeof value === 'object' && value !== null) {
            // Recursivamente procesar objetos anidados
            result[key] = encryptOrderFields(value);
        }
        else {
            result[key] = value;
        }
    }
    return result;
}
// Función para descifrar campos sensibles de pedidos
function decryptOrderFields(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map(item => decryptOrderFields(item));
    }
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
        if (shouldEncryptField(key, value)) {
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
            result[key] = decryptOrderFields(value);
        }
        else {
            result[key] = value;
        }
    }
    return result;
}
// Función para determinar si un campo debe ser cifrado
function shouldEncryptField(key, value) {
    const sensitiveFields = ['notes', 'email', 'phone', 'address', 'document'];
    return sensitiveFields.includes(key) &&
        typeof value === 'string' &&
        value.length > 0;
}
// Middleware para cifrar estadísticas de pedidos
const encryptOrderStatistics = (req, res, next) => {
    const originalSend = res.send;
    res.send = function (data) {
        try {
            if (typeof data === 'string') {
                const parsedData = JSON.parse(data);
                if (parsedData.success && parsedData.data && parsedData.data.topProducts) {
                    // Cifrar nombres de productos en estadísticas si es necesario
                    parsedData.data.topProducts = parsedData.data.topProducts.map((product) => ({
                        ...product,
                        productName: encryption_service_1.default.encryptSensitiveData(product.productName)
                    }));
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
exports.encryptOrderStatistics = encryptOrderStatistics;
//# sourceMappingURL=orderEncryption.middleware.js.map