import { Request, Response, NextFunction } from 'express';
import EncryptionService from '../services/encryption.service';

// Middleware específico para cifrar datos sensibles de pedidos
export const orderEncryption = (req: Request, res: Response, next: NextFunction) => {
    // Descifrar request
    decryptOrderRequest(req, res, () => {
        // Cifrar response
        encryptOrderResponse(req, res, next);
    });
};

// Función para descifrar datos sensibles en requests de pedidos
function decryptOrderRequest(req: Request, res: Response, next: NextFunction) {
    try {
        if (req.body && typeof req.body === 'object') {
            req.body = decryptOrderFields(req.body);
        }
    } catch (error) {
        console.warn('Error decrypting order request data:', error);
    }
    
    next();
}

// Función para cifrar datos sensibles en responses de pedidos
function encryptOrderResponse(req: Request, res: Response, next: NextFunction) {
    const originalSend = res.send;
    
    res.send = function(data: any) {
        try {
            if (typeof data === 'string') {
                const parsedData = JSON.parse(data);
                if (parsedData.success && parsedData.data) {
                    parsedData.data = encryptOrderFields(parsedData.data);
                    return originalSend.call(this, JSON.stringify(parsedData));
                }
            }
            return originalSend.call(this, data);
        } catch (error) {
            return originalSend.call(this, data);
        }
    };
    
    next();
}

// Función para cifrar campos sensibles de pedidos
function encryptOrderFields(obj: any): any {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(item => encryptOrderFields(item));
    }

    const result: any = {};
    
    for (const [key, value] of Object.entries(obj)) {
        if (shouldEncryptField(key, value)) {
            // Cifrar campo sensible
            result[key] = EncryptionService.encryptSensitiveData(value as string);
        } else if (typeof value === 'object' && value !== null) {
            // Recursivamente procesar objetos anidados
            result[key] = encryptOrderFields(value);
        } else {
            result[key] = value;
        }
    }
    
    return result;
}

// Función para descifrar campos sensibles de pedidos
function decryptOrderFields(obj: any): any {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(item => decryptOrderFields(item));
    }

    const result: any = {};
    
    for (const [key, value] of Object.entries(obj)) {
        if (shouldEncryptField(key, value)) {
            try {
                // Intentar descifrar campo sensible
                result[key] = EncryptionService.decryptSensitiveData(value as string);
            } catch (error) {
                // Si no se puede descifrar, asumir que no está cifrado
                result[key] = value;
            }
        } else if (typeof value === 'object' && value !== null) {
            // Recursivamente procesar objetos anidados
            result[key] = decryptOrderFields(value);
        } else {
            result[key] = value;
        }
    }
    
    return result;
}

// Función para determinar si un campo debe ser cifrado
function shouldEncryptField(key: string, value: any): boolean {
    const sensitiveFields = ['notes', 'email', 'phone', 'address', 'document'];
    
    return sensitiveFields.includes(key) && 
           typeof value === 'string' && 
           value.length > 0;
}

// Middleware para cifrar estadísticas de pedidos
export const encryptOrderStatistics = (req: Request, res: Response, next: NextFunction) => {
    const originalSend = res.send;
    
    res.send = function(data: any) {
        try {
            if (typeof data === 'string') {
                const parsedData = JSON.parse(data);
                if (parsedData.success && parsedData.data && parsedData.data.topProducts) {
                    // Cifrar nombres de productos en estadísticas si es necesario
                    parsedData.data.topProducts = parsedData.data.topProducts.map((product: any) => ({
                        ...product,
                        productName: EncryptionService.encryptSensitiveData(product.productName)
                    }));
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
