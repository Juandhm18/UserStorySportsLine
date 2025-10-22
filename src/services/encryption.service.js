"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
class EncryptionService {
    RSA_PUBLIC_KEY = process.env.RSA_PUBLIC_KEY || this.generateRSAKeyPair().publicKey;
    RSA_PRIVATE_KEY = process.env.RSA_PRIVATE_KEY || this.generateRSAKeyPair().privateKey;
    AES_KEY_LENGTH = 32; // 256 bits
    // Generar par de claves RSA
    generateRSAKeyPair() {
        const { publicKey, privateKey } = crypto_1.default.generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem'
            }
        });
        return { publicKey, privateKey };
    }
    // Cifrar con AES-256-GCM
    encryptAES(data, key, iv) {
        const cipher = crypto_1.default.createCipheriv('aes-256-gcm', key, iv);
        cipher.setAAD(Buffer.from('sportsline-app', 'utf8'));
        let encrypted = cipher.update(data, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        const authTag = cipher.getAuthTag();
        return encrypted + ':' + authTag.toString('hex');
    }
    // Descifrar con AES-256-GCM
    decryptAES(encryptedData, key, iv) {
        const [encrypted, authTagHex] = encryptedData.split(':');
        const authTag = Buffer.from(authTagHex || '', 'hex');
        const decipher = crypto_1.default.createDecipheriv('aes-256-gcm', key, iv);
        decipher.setAAD(Buffer.from('sportsline-app', 'utf8'));
        decipher.setAuthTag(authTag);
        let decrypted = decipher.update(encrypted || '', 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
    // Cifrar clave AES con RSA
    encryptRSA(data) {
        return crypto_1.default.publicEncrypt({
            key: this.RSA_PUBLIC_KEY,
            padding: crypto_1.default.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: 'sha256'
        }, data).toString('base64');
    }
    // Descifrar clave AES con RSA
    decryptRSA(encryptedData) {
        return crypto_1.default.privateDecrypt({
            key: this.RSA_PRIVATE_KEY,
            padding: crypto_1.default.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: 'sha256'
        }, Buffer.from(encryptedData, 'base64'));
    }
    // Cifrado híbrido: AES + RSA
    encryptHybrid(data) {
        // Generar clave AES aleatoria
        const aesKey = crypto_1.default.randomBytes(this.AES_KEY_LENGTH);
        const iv = crypto_1.default.randomBytes(16);
        // Cifrar datos con AES
        const encryptedData = this.encryptAES(data, aesKey, iv);
        // Cifrar clave AES con RSA
        const encryptedKey = this.encryptRSA(aesKey);
        return {
            encryptedData,
            encryptedKey,
            iv: iv.toString('hex')
        };
    }
    // Descifrado híbrido: RSA + AES
    decryptHybrid(encryptionResult) {
        // Descifrar clave AES con RSA
        const aesKey = this.decryptRSA(encryptionResult.encryptedKey);
        const iv = Buffer.from(encryptionResult.iv, 'hex');
        // Descifrar datos con AES
        const decryptedData = this.decryptAES(encryptionResult.encryptedData, aesKey, iv);
        return {
            decryptedData
        };
    }
    // Método para cifrar datos sensibles en la base de datos
    encryptSensitiveData(data) {
        const result = this.encryptHybrid(data);
        return JSON.stringify(result);
    }
    // Método para descifrar datos sensibles de la base de datos
    decryptSensitiveData(encryptedData) {
        const encryptionResult = JSON.parse(encryptedData);
        const result = this.decryptHybrid(encryptionResult);
        return result.decryptedData;
    }
}
exports.default = new EncryptionService();
//# sourceMappingURL=encryption.service.js.map