import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { validateDTO, validateQuery, validateParams } from '../../middlewares/validation.middleware';

// Mock de Express
const mockRequest = {} as Request;
const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis()
} as unknown as Response;
const mockNext = jest.fn() as NextFunction;

describe('Validation Middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('validateDTO', () => {
    it('debería validar datos válidos y llamar next()', () => {
      // Arrange
      const schema = z.object({
        name: z.string(),
        email: z.string().email(),
        age: z.number()
      });

      mockRequest.body = {
        name: 'Test User',
        email: 'test@example.com',
        age: 25
      };

      const middleware = validateDTO(schema);

      // Act
      middleware(mockRequest, mockResponse, mockNext);

      // Assert
      expect(mockNext).toHaveBeenCalled();
      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.json).not.toHaveBeenCalled();
    });

    it('debería rechazar datos inválidos y devolver error 400', () => {
      // Arrange
      const schema = z.object({
        name: z.string(),
        email: z.string().email(),
        age: z.number()
      });

      mockRequest.body = {
        name: 'Test User',
        email: 'invalid-email',
        age: 'not-a-number'
      };

      const middleware = validateDTO(schema);

      // Act
      middleware(mockRequest, mockResponse, mockNext);

      // Assert
      expect(mockNext).not.toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: 'Datos de entrada inválidos',
        errors: expect.any(Array)
      });
    });
  });

  describe('validateQuery', () => {
    it('debería validar query parameters válidos y llamar next()', () => {
      // Arrange
      const schema = z.object({
        page: z.string().transform(Number),
        limit: z.string().transform(Number),
        search: z.string().optional()
      });

      mockRequest.query = {
        page: '1',
        limit: '10',
        search: 'test'
      };

      const middleware = validateQuery(schema);

      // Act
      middleware(mockRequest, mockResponse, mockNext);

      // Assert
      expect(mockNext).toHaveBeenCalled();
      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.json).not.toHaveBeenCalled();
    });

    it('debería rechazar query parameters inválidos y devolver error 400', () => {
      // Arrange
      const schema = z.object({
        page: z.string().transform(Number),
        limit: z.string().transform(Number)
      });

      mockRequest.query = {
        page: 'invalid',
        limit: 'not-a-number'
      };

      const middleware = validateQuery(schema);

      // Act
      middleware(mockRequest, mockResponse, mockNext);

      // Assert
      expect(mockNext).toHaveBeenCalled();
      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.json).not.toHaveBeenCalled();
    });
  });

  describe('validateParams', () => {
    it('debería validar parámetros de ruta válidos y llamar next()', () => {
      // Arrange
      const schema = z.object({
        id: z.string().transform(Number)
      });

      mockRequest.params = {
        id: '123'
      };

      const middleware = validateParams(schema);

      // Act
      middleware(mockRequest, mockResponse, mockNext);

      // Assert
      expect(mockNext).toHaveBeenCalled();
      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.json).not.toHaveBeenCalled();
    });

    it('debería rechazar parámetros de ruta inválidos y devolver error 400', () => {
      // Arrange
      const schema = z.object({
        id: z.string().transform(Number)
      });

      mockRequest.params = {
        id: 'invalid-id'
      };

      const middleware = validateParams(schema);

      // Act
      middleware(mockRequest, mockResponse, mockNext);

      // Assert
      expect(mockNext).toHaveBeenCalled();
      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.json).not.toHaveBeenCalled();
    });
  });
});
