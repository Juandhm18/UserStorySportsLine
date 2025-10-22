import EncryptionService from '../../services/encryption.service';

describe('EncryptionService', () => {
  describe('encryptHybrid', () => {
    it('debería cifrar datos usando cifrado híbrido', () => {
      // Arrange
      const data = 'Datos sensibles para cifrar';

      // Act
      const encrypted = EncryptionService.encryptHybrid(data);

      // Assert
      expect(encrypted).toBeDefined();
      expect(encrypted.encryptedData).toBeDefined();
      expect(encrypted.encryptedKey).toBeDefined();
      expect(encrypted.iv).toBeDefined();
      expect(typeof encrypted.encryptedData).toBe('string');
      expect(typeof encrypted.encryptedKey).toBe('string');
      expect(typeof encrypted.iv).toBe('string');
      expect(encrypted.encryptedData).not.toBe(data);
    });
  });

  describe('decryptHybrid', () => {
    it('debería descifrar datos usando cifrado híbrido', () => {
      // Arrange
      const originalData = 'Datos sensibles para cifrar';
      const encrypted = EncryptionService.encryptHybrid(originalData);

      // Act
      const decrypted = EncryptionService.decryptHybrid(encrypted);

      // Assert
      expect(decrypted).toBeDefined();
      expect(decrypted.decryptedData).toBe(originalData);
    });

    it('debería lanzar error con datos cifrados inválidos', () => {
      // Arrange
      const invalidEncryptedData = {
        encryptedData: 'datos:inválidos',
        encryptedKey: 'clave:inválida',
        iv: 'iv:inválido'
      };

      // Act & Assert
      expect(() => {
        EncryptionService.decryptHybrid(invalidEncryptedData);
      }).toThrow();
    });
  });

  describe('encryptSensitiveData', () => {
    it('debería cifrar datos sensibles y devolver JSON string', () => {
      // Arrange
      const data = 'Datos sensibles para la base de datos';

      // Act
      const encrypted = EncryptionService.encryptSensitiveData(data);

      // Assert
      expect(encrypted).toBeDefined();
      expect(typeof encrypted).toBe('string');
      
      // Verificar que es un JSON válido
      const parsed = JSON.parse(encrypted);
      expect(parsed.encryptedData).toBeDefined();
      expect(parsed.encryptedKey).toBeDefined();
      expect(parsed.iv).toBeDefined();
    });
  });

  describe('decryptSensitiveData', () => {
    it('debería descifrar datos sensibles desde JSON string', () => {
      // Arrange
      const originalData = 'Datos sensibles para la base de datos';
      const encrypted = EncryptionService.encryptSensitiveData(originalData);

      // Act
      const decrypted = EncryptionService.decryptSensitiveData(encrypted);

      // Assert
      expect(decrypted).toBe(originalData);
    });
  });

  describe('roundtrip encryption', () => {
    it('debería mantener la integridad de los datos en un ciclo completo de cifrado/descifrado', () => {
      // Arrange
      const testData = [
        'Datos simples',
        'Datos con caracteres especiales: !@#$%^&*()',
        'Datos con números: 123456789',
        'Datos con espacios y saltos de línea:\nLínea 1\nLínea 2',
        'Datos JSON: {"usuario": "test", "rol": "admin"}'
      ];

      testData.forEach((data) => {
        // Act
        const encrypted = EncryptionService.encryptHybrid(data);
        const decrypted = EncryptionService.decryptHybrid(encrypted);

        // Assert
        expect(decrypted.decryptedData).toBe(data);
      });
    });

    it('debería mantener la integridad con encryptSensitiveData/decryptSensitiveData', () => {
      // Arrange
      const testData = [
        'Datos simples',
        'Datos con caracteres especiales: !@#$%^&*()',
        'Datos con números: 123456789',
        'Datos JSON: {"usuario": "test", "rol": "admin"}'
      ];

      testData.forEach((data) => {
        // Act
        const encrypted = EncryptionService.encryptSensitiveData(data);
        const decrypted = EncryptionService.decryptSensitiveData(encrypted);

        // Assert
        expect(decrypted).toBe(data);
      });
    });
  });
});