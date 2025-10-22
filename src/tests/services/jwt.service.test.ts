import JWTService from '../../services/jwt.service';

describe('JWTService', () => {
  describe('generateAccessToken', () => {
    it('debería generar un token JWT válido', () => {
      // Arrange
      const payload = {
        id: 1,
        email: 'test@example.com',
        rol: 'vendedor'
      };

      // Act
      const token = JWTService.generateAccessToken(payload);

      // Assert
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3); // JWT tiene 3 partes separadas por puntos
    });
  });

  describe('generateRefreshToken', () => {
    it('debería generar un refresh token válido', () => {
      // Arrange
      const payload = {
        id: 1,
        email: 'test@example.com',
        rol: 'vendedor'
      };

      // Act
      const refreshToken = JWTService.generateRefreshToken(payload);

      // Assert
      expect(refreshToken).toBeDefined();
      expect(typeof refreshToken).toBe('string');
      expect(refreshToken.split('.')).toHaveLength(3);
    });
  });

  describe('generateTokenPair', () => {
    it('debería generar un par de tokens (access y refresh)', () => {
      // Arrange
      const payload = {
        id: 1,
        email: 'test@example.com',
        rol: 'vendedor'
      };

      // Act
      const tokenPair = JWTService.generateTokenPair(payload);

      // Assert
      expect(tokenPair).toBeDefined();
      expect(tokenPair.accessToken).toBeDefined();
      expect(tokenPair.refreshToken).toBeDefined();
      expect(typeof tokenPair.accessToken).toBe('string');
      expect(typeof tokenPair.refreshToken).toBe('string');
      expect(tokenPair.accessToken.split('.')).toHaveLength(3);
      expect(tokenPair.refreshToken.split('.')).toHaveLength(3);
    });
  });

  describe('verifyAccessToken', () => {
    it('debería verificar un token válido', () => {
      // Arrange
      const payload = {
        id: 1,
        email: 'test@example.com',
        rol: 'vendedor'
      };
      const token = JWTService.generateAccessToken(payload);

      // Act
      const decoded = JWTService.verifyAccessToken(token);

      // Assert
      expect(decoded).toBeDefined();
      expect(decoded.id).toBe(payload.id);
      expect(decoded.email).toBe(payload.email);
      expect(decoded.rol).toBe(payload.rol);
    });

    it('debería lanzar error con token inválido', () => {
      // Arrange
      const invalidToken = 'invalid.token.here';

      // Act & Assert
      expect(() => {
        JWTService.verifyAccessToken(invalidToken);
      }).toThrow();
    });
  });

  describe('verifyRefreshToken', () => {
    it('debería verificar un refresh token válido', () => {
      // Arrange
      const payload = {
        id: 1,
        email: 'test@example.com',
        rol: 'vendedor'
      };
      const refreshToken = JWTService.generateRefreshToken(payload);

      // Act
      const decoded = JWTService.verifyRefreshToken(refreshToken);

      // Assert
      expect(decoded).toBeDefined();
      expect(decoded.id).toBe(payload.id);
      expect(decoded.email).toBe(payload.email);
      expect(decoded.rol).toBe(payload.rol);
    });

    it('debería lanzar error con refresh token inválido', () => {
      // Arrange
      const invalidRefreshToken = 'invalid.refresh.token';

      // Act & Assert
      expect(() => {
        JWTService.verifyRefreshToken(invalidRefreshToken);
      }).toThrow();
    });
  });
});
