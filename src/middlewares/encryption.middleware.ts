import { Request, Response, NextFunction } from 'express';
import EncryptionService from '../services/encryption.service';

// Campos sensibles que deben ser cifrados
const SENSITIVE_FIELDS = ['password', 'email', 'phone', 'address', 'creditCard'];

// Middleware para cifrar datos sensibles en las respuestas
export const encryptResponse = (req: Request, res: Response, next: NextFunction) => {
    const originalSend = res.send;
    
    res.send = function(data: any) {
        try {
            if (typeof data === 'string') {
                const parsedData = JSON.parse(data);
                if (parsedData.success && parsedData.data) {
                    parsedData.data = encryptSensitiveFields(parsedData.data);
                    return originalSend.call(this, JSON.stringify(parsedData));
                }
            }
            return originalSend.call(this, data);
        } catch (error) {
            return originalSend.call(this, data);
        }
    };
    
    next();
};

// Middleware para descifrar datos sensibles en las requests
export const decryptRequest = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.body && typeof req.body === 'object') {
            req.body = decryptSensitiveFields(req.body);
        }
    } catch (error) {
        // Si hay error en el descifrado, continuar sin modificar
        console.warn('Error decrypting request data:', error);
    }
    
    next();
};

// Función para cifrar campos sensibles
function encryptSensitiveFields(obj: any): any {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(item => encryptSensitiveFields(item));
    }

    const result: any = {};
    
    for (const [key, value] of Object.entries(obj)) {
        if (SENSITIVE_FIELDS.includes(key) && typeof value === 'string') {
            // Cifrar campo sensible
            result[key] = EncryptionService.encryptSensitiveData(value);
        } else if (typeof value === 'object' && value !== null) {
            // Recursivamente procesar objetos anidados
            result[key] = encryptSensitiveFields(value);
        } else {
            result[key] = value;
        }
    }
    
    return result;
}

// Función para descifrar campos sensibles
function decryptSensitiveFields(obj: any): any {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(item => decryptSensitiveFields(item));
    }

    const result: any = {};
    
    for (const [key, value] of Object.entries(obj)) {
        if (SENSITIVE_FIELDS.includes(key) && typeof value === 'string') {
            try {
                // Intentar descifrar campo sensible
                result[key] = EncryptionService.decryptSensitiveData(value);
            } catch (error) {
                // Si no se puede descifrar, asumir que no está cifrado
                result[key] = value;
            }
        } else if (typeof value === 'object' && value !== null) {
            // Recursivamente procesar objetos anidados
            result[key] = decryptSensitiveFields(value);
        } else {
            result[key] = value;
        }
    }
    
    return result;
}

// Middleware específico para rutas de autenticación
export const authEncryption = (req: Request, res: Response, next: NextFunction) => {
    // Descifrar request
    decryptRequest(req, res, () => {
        // Cifrar response
        encryptResponse(req, res, next);
    });
};
