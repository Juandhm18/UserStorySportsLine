import { Response } from 'express';
import { HTTP_STATUS, MESSAGES } from '../constants/messages';

/**
 * Utilidades para respuestas HTTP estandarizadas
 */
export class ResponseUtil {
  /**
   * Envía una respuesta de éxito
   */
  static success(
    res: Response,
    message: string,
    data?: any,
    statusCode: number = HTTP_STATUS.OK
  ): void {
    res.status(statusCode).json({
      success: true,
      message,
      data
    });
  }

  /**
   * Envía una respuesta de error
   */
  static error(
    res: Response,
    message: string,
    statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    errors?: any[]
  ): void {
    res.status(statusCode).json({
      success: false,
      message,
      ...(errors && { errors })
    });
  }

  /**
   * Envía una respuesta de error de validación
   */
  static validationError(
    res: Response,
    message: string = MESSAGES.ERROR.INVALID_INPUT_DATA,
    errors: any[]
  ): void {
    this.error(res, message, HTTP_STATUS.BAD_REQUEST, errors);
  }

  /**
   * Envía una respuesta de recurso no encontrado
   */
  static notFound(
    res: Response,
    message: string = MESSAGES.ERROR.USER_NOT_FOUND
  ): void {
    this.error(res, message, HTTP_STATUS.NOT_FOUND);
  }

  /**
   * Envía una respuesta de no autorizado
   */
  static unauthorized(
    res: Response,
    message: string = MESSAGES.ERROR.INVALID_CREDENTIALS
  ): void {
    this.error(res, message, HTTP_STATUS.UNAUTHORIZED);
  }

  /**
   * Envía una respuesta de error interno del servidor
   */
  static internalError(
    res: Response,
    message: string = MESSAGES.ERROR.INTERNAL_SERVER_ERROR
  ): void {
    this.error(res, message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }

  /**
   * Envía una respuesta de recurso creado
   */
  static created(
    res: Response,
    message: string,
    data?: any
  ): void {
    this.success(res, message, data, HTTP_STATUS.CREATED);
  }
}
