import { Request, Response } from 'express';
import AuthController from '../../controllers/auth.controller';
import AuthService from '../../services/auth.service';

// Mock de dependencias
jest.mock('../../services/auth.service');

describe('AuthController', () => {
  let mockAuthService: jest.Mocked<typeof AuthService>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockAuthService = AuthService as jest.Mocked<typeof AuthService>;
    jest.clearAllMocks();

    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
  });

  describe('register', () => {
    it('debería registrar un usuario exitosamente', async () => {
      // Arrange
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        rol: 'vendedor'
      };

      const mockResult = {
        success: true,
        message: 'Usuario registrado exitosamente',
        data: {
          user: {
            id: 1,
            name: 'Test User',
            email: 'test@example.com',
            rol: 'vendedor'
          },
          tokens: {
            accessToken: 'mock-access-token',
            refreshToken: 'mock-refresh-token'
          }
        }
      };

      mockRequest.body = userData;
      mockAuthService.register.mockResolvedValue(mockResult);

      // Act
      await AuthController.register(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockAuthService.register).toHaveBeenCalledWith(userData);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(mockResult);
    });

    it('debería manejar errores en el registro', async () => {
      // Arrange
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        rol: 'vendedor'
      };

      const mockError = {
        success: false,
        message: 'El email ya está registrado'
      };

      mockRequest.body = userData;
      mockAuthService.register.mockResolvedValue(mockError);

      // Act
      await AuthController.register(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockAuthService.register).toHaveBeenCalledWith(userData);
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith(mockError);
    });
  });

  describe('login', () => {
    it('debería hacer login exitosamente', async () => {
      // Arrange
      const loginData = {
        email: 'test@example.com',
        password: 'password123'
      };

      const mockResult = {
        success: true,
        message: 'Login exitoso',
        data: {
          user: {
            id: 1,
            name: 'Test User',
            email: 'test@example.com',
            rol: 'vendedor'
          },
          tokens: {
            accessToken: 'mock-access-token',
            refreshToken: 'mock-refresh-token'
          }
        }
      };

      mockRequest.body = loginData;
      mockAuthService.login.mockResolvedValue(mockResult);

      // Act
      await AuthController.login(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockAuthService.login).toHaveBeenCalledWith(loginData);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockResult);
    });

    it('debería manejar credenciales inválidas', async () => {
      // Arrange
      const loginData = {
        email: 'test@example.com',
        password: 'wrong-password'
      };

      const mockError = {
        success: false,
        message: 'Credenciales inválidas'
      };

      mockRequest.body = loginData;
      mockAuthService.login.mockResolvedValue(mockError);

      // Act
      await AuthController.login(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockAuthService.login).toHaveBeenCalledWith(loginData);
      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith(mockError);
    });
  });

  describe('refreshToken', () => {
    it('debería refrescar tokens exitosamente', async () => {
      // Arrange
      const refreshData = {
        refreshToken: 'valid-refresh-token'
      };

      const mockResult = {
        success: true,
        message: 'Tokens refrescados exitosamente',
        data: {
          tokens: {
            accessToken: 'new-access-token',
            refreshToken: 'new-refresh-token'
          }
        }
      };

      mockRequest.body = refreshData;
      mockAuthService.refreshTokens.mockResolvedValue(mockResult);

      // Act
      await AuthController.refreshToken(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockAuthService.refreshTokens).toHaveBeenCalledWith('valid-refresh-token');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockResult);
    });

    it('debería manejar token de refresh inválido', async () => {
      // Arrange
      const refreshData = {
        refreshToken: 'invalid-refresh-token'
      };

      const mockError = {
        success: false,
        message: 'Token de refresh inválido'
      };

      mockRequest.body = refreshData;
      mockAuthService.refreshTokens.mockResolvedValue(mockError);

      // Act
      await AuthController.refreshToken(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockAuthService.refreshTokens).toHaveBeenCalledWith('invalid-refresh-token');
      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith(mockError);
    });
  });

  describe('getProfile', () => {
    it('debería obtener el perfil del usuario autenticado', async () => {
      // Arrange
      const mockUser = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        rol: 'vendedor'
      };

      mockRequest.user = mockUser;

      // Act
      await AuthController.getProfile(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        message: 'Perfil obtenido exitosamente',
        data: mockUser
      });
    });
  });
});
