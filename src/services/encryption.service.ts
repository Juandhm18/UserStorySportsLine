import crypto from 'crypto';
import CryptoJS from 'crypto-js';

export interface EncryptionResult {
    encryptedData: string;
    encryptedKey: string;
    iv: string;
}

export interface DecryptionResult {
    decryptedData: string;
}

class EncryptionService {
    private readonly RSA_PUBLIC_KEY = process.env.RSA_PUBLIC_KEY || this.generateRSAKeyPair().publicKey;
    private readonly RSA_PRIVATE_KEY = process.env.RSA_PRIVATE_KEY || this.generateRSAKeyPair().privateKey;
    private readonly AES_KEY_LENGTH = 32; // 256 bits

    // Generar par de claves RSA
    private generateRSAKeyPair() {
        const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
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
    private encryptAES(data: string, key: Buffer, iv: Buffer): string {
        const cipher = crypto.createCipher('aes-256-gcm', key);
        cipher.setAAD(Buffer.from('sportsline-app', 'utf8'));
        
        let encrypted = cipher.update(data, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        
        const authTag = cipher.getAuthTag();
        return encrypted + ':' + authTag.toString('hex');
    }

    // Descifrar con AES-256-GCM
    private decryptAES(encryptedData: string, key: Buffer, iv: Buffer): string {
        const [encrypted, authTagHex] = encryptedData.split(':');
        const authTag = Buffer.from(authTagHex, 'hex');
        
        const decipher = crypto.createDecipher('aes-256-gcm', key);
        decipher.setAAD(Buffer.from('sportsline-app', 'utf8'));
        decipher.setAuthTag(authTag);
        
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        
        return decrypted;
    }

    // Cifrar clave AES con RSA
    private encryptRSA(data: Buffer): string {
        return crypto.publicEncrypt({
            key: this.RSA_PUBLIC_KEY,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: 'sha256'
        }, data).toString('base64');
    }

    // Descifrar clave AES con RSA
    private decryptRSA(encryptedData: string): Buffer {
        return crypto.privateDecrypt({
            key: this.RSA_PRIVATE_KEY,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: 'sha256'
        }, Buffer.from(encryptedData, 'base64'));
    }

    // Cifrado híbrido: AES + RSA
    public encryptHybrid(data: string): EncryptionResult {
        // Generar clave AES aleatoria
        const aesKey = crypto.randomBytes(this.AES_KEY_LENGTH);
        const iv = crypto.randomBytes(16);

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
    public decryptHybrid(encryptionResult: EncryptionResult): DecryptionResult {
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
    public encryptSensitiveData(data: string): string {
        const result = this.encryptHybrid(data);
        return JSON.stringify(result);
    }

    // Método para descifrar datos sensibles de la base de datos
    public decryptSensitiveData(encryptedData: string): string {
        const encryptionResult: EncryptionResult = JSON.parse(encryptedData);
        const result = this.decryptHybrid(encryptionResult);
        return result.decryptedData;
    }
}

export default new EncryptionService();
