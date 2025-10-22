export interface EncryptionResult {
    encryptedData: string;
    encryptedKey: string;
    iv: string;
}
export interface DecryptionResult {
    decryptedData: string;
}
declare class EncryptionService {
    private readonly RSA_PUBLIC_KEY;
    private readonly RSA_PRIVATE_KEY;
    private readonly AES_KEY_LENGTH;
    private generateRSAKeyPair;
    private encryptAES;
    private decryptAES;
    private encryptRSA;
    private decryptRSA;
    encryptHybrid(data: string): EncryptionResult;
    decryptHybrid(encryptionResult: EncryptionResult): DecryptionResult;
    encryptSensitiveData(data: string): string;
    decryptSensitiveData(encryptedData: string): string;
}
declare const _default: EncryptionService;
export default _default;
//# sourceMappingURL=encryption.service.d.ts.map