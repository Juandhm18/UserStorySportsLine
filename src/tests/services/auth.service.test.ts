import AuthService from '../../services/auth.service';
import { UserDAO } from '../../dao/user.dao';
import { JWTService } from '../../services/jwt.service';
import bcrypt from 'bcrypt';

// Mock de dependencias
jest.mock('../../dao/user.dao');
jest.mock('../../services/jwt.service');
jest.mock('bcrypt');

describe('AuthService', () => {
  let mockUserDAO: jest.Mocked<UserDAO>;
  let mockJWTService: jest.Mocked<JWTService>;

  beforeEach(() => {
    mockUserDAO = UserDAO as jest.Mocked<UserDAO>;
    mockJWTService = JWTService as jest.Mocked<JWTService>;
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('debería registrar un nuevo usuario exitosamente', async () => {
      // Arrange
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        rol: 'vendedor' as const
      };

      const mockUser = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        rol: 'vendedor'
      };

      const mockTokens = {
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token'
      };

      mockUserDAO.existsByEmail.mockResolvedValue(false);
      mockUserDAO.create.mockResolvedValue(mockUser as any);
      mockJWTService.generateTokenPair.mockReturnValue(mockTokens);

      // Act
      const result = await AuthService.register(userData);

      // Assert
      expect(result.success).toBe(true);
      expect(result.data.user).toEqual(mockUser);
      expect(result.data.tokens).toEqual(mockTokens);
      expect(mockUserDAO.existsByEmail).toHaveBeenCalledWith('test@example.com');
      expect(mockUserDAO.create).toHaveBeenCalledWith(userData);
    });

    it('debería fallar si el email ya existe', async () => {
      // Arrange
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        rol: 'vendedor' as const
      };

      mockUserDAO.existsByEmail.mockResolvedValue(true);

      // Act
      const result = await AuthService.register(userData);

      // Assert
      expect(result.success).toBe(false);
      expect(result.message).toBe('El email ya está registrado');
      expect(mockUserDAO.create).not.toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('debería hacer login exitosamente con credenciales válidas', async () => {
      // Arrange
      const loginData = {
        email: 'test@example.com',
        password: 'password123'
      };

      const mockUser = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashed-password',
        rol: 'vendedor'
      };

      const mockTokens = {
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token'
      };

      mockUserDAO.findByEmail.mockResolvedValue(mockUser as any);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      mockJWTService.generateTokenPair.mockReturnValue(mockTokens);

      // Act
      const result = await AuthService.login(loginData);

      // Assert
      expect(result.success).toBe(true);
      expect(result.data.user).toEqual({
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        rol: 'vendedor'
      });
      expect(result.data.tokens).toEqual(mockTokens);
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashed-password');
    });

    it('debería fallar con credenciales inválidas', async () => {
      // Arrange
      const loginData = {
        email: 'test@example.com',
        password: 'wrong-password'
      };

      const mockUser = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashed-password',
        rol: 'vendedor'
      };

      mockUserDAO.findByEmail.mockResolvedValue(mockUser as any);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      // Act
      const result = await AuthService.login(loginData);

      // Assert
      expect(result.success).toBe(false);
      expect(result.message).toBe('Credenciales inválidas');
    });

    it('debería fallar si el usuario no existe', async () => {
      // Arrange
      const loginData = {
        email: 'nonexistent@example.com',
        password: 'password123'
      };

      mockUserDAO.findByEmail.mockResolvedValue(null);

      // Act
      const result = await AuthService.login(loginData);

      // Assert
      expect(result.success).toBe(false);
      expect(result.message).toBe('Credenciales inválidas');
    });
  });

  describe('refreshTokens', () => {
    it('debería refrescar tokens exitosamente', async () => {
      // Arrange
      const refreshToken = 'valid-refresh-token';
      const mockUser = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        rol: 'vendedor'
      };

      const mockTokens = {
        accessToken: 'new-access-token',
        refreshToken: 'new-refresh-token'
      };

      mockJWTService.verifyRefreshToken.mockReturnValue({ id: 1, email: 'test@example.com', rol: 'vendedor' });
      mockUserDAO.findById.mockResolvedValue(mockUser as any);
      mockJWTService.generateTokenPair.mockReturnValue(mockTokens);

      // Act
      const result = await AuthService.refreshTokens(refreshToken);

      // Assert
      expect(result.success).toBe(true);
      expect(result.data.tokens).toEqual(mockTokens);
      expect(mockJWTService.verifyRefreshToken).toHaveBeenCalledWith(refreshToken);
      expect(mockUserDAO.findById).toHaveBeenCalledWith(1);
    });

    it('debería fallar con token de refresh inválido', async () => {
      // Arrange
      const refreshToken = 'invalid-refresh-token';
      mockJWTService.verifyRefreshToken.mockImplementation(() => {
        throw new Error('Token inválido');
      });

      // Act
      const result = await AuthService.refreshTokens(refreshToken);

      // Assert
      expect(result.success).toBe(false);
      expect(result.message).toBe('Token de refresh inválido');
    });
  });
});
