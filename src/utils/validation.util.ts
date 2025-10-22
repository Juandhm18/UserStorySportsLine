import { z } from 'zod';

/**
 * Utilidades para validaciones comunes
 */
export class ValidationUtil {
  /**
   * Valida un ID numérico
   */
  static validateId(id: string | number): number {
    const parsedId = typeof id === 'string' ? parseInt(id, 10) : id;
    
    if (isNaN(parsedId) || parsedId <= 0) {
      throw new Error('ID inválido');
    }
    
    return parsedId;
  }

  /**
   * Valida un email
   */
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return Boolean(emailRegex.test(email));
  }

  /**
   * Valida una contraseña (mínimo 6 caracteres)
   */
  static validatePassword(password: string): boolean {
    return Boolean(password && password.length >= 6);
  }

  /**
   * Valida un código de producto (alfanumérico, 3-10 caracteres)
   */
  static validateProductCode(code: string): boolean {
    const codeRegex = /^[A-Z0-9]{3,10}$/;
    return codeRegex.test(code);
  }

  /**
   * Valida un precio (número positivo)
   */
  static validatePrice(price: number): boolean {
    return price > 0;
  }

  /**
   * Valida stock (número entero no negativo)
   */
  static validateStock(stock: number): boolean {
    return Number.isInteger(stock) && stock >= 0;
  }

  /**
   * Valida cantidad (número entero positivo)
   */
  static validateQuantity(quantity: number): boolean {
    return Number.isInteger(quantity) && quantity > 0;
  }

  /**
   * Sanitiza un string (elimina espacios extra y caracteres especiales)
   */
  static sanitizeString(str: string): string {
    return str.trim().replace(/\s+/g, ' ');
  }

  /**
   * Valida parámetros de paginación
   */
  static validatePagination(page?: number, limit?: number): { page: number; limit: number } {
    const validPage = page && page > 0 ? page : 1;
    const validLimit = limit && limit > 0 && limit <= 100 ? limit : 10;
    
    return { page: validPage, limit: validLimit };
  }

  /**
   * Valida ordenamiento
   */
  static validateSorting(sortBy?: string, sortOrder?: string): { sortBy: string; sortOrder: 'ASC' | 'DESC' } {
    const validSortBy = sortBy || 'id';
    const validSortOrder = (sortOrder?.toUpperCase() === 'DESC') ? 'DESC' : 'ASC';
    
    return { sortBy: validSortBy, sortOrder: validSortOrder };
  }
}

/**
 * Esquemas de validación comunes con Zod
 */
export const CommonSchemas = {
  id: z.string().transform((val) => {
    const id = parseInt(val, 10);
    if (isNaN(id) || id <= 0) {
      throw new Error('ID inválido');
    }
    return id;
  }),

  email: z.string().email('Email inválido'),

  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),

  productCode: z.string().regex(/^[A-Z0-9]{3,10}$/, 'Código de producto inválido'),

  price: z.number().positive('El precio debe ser positivo'),

  stock: z.number().int('El stock debe ser un número entero').min(0, 'El stock no puede ser negativo'),

  quantity: z.number().int('La cantidad debe ser un número entero').positive('La cantidad debe ser positiva'),

  pagination: z.object({
    page: z.string().optional().transform((val) => {
      const page = val ? parseInt(val, 10) : 1;
      return page > 0 ? page : 1;
    }),
    limit: z.string().optional().transform((val) => {
      const limit = val ? parseInt(val, 10) : 10;
      return limit > 0 && limit <= 100 ? limit : 10;
    })
  }),

  sorting: z.object({
    sortBy: z.string().optional().default('id'),
    sortOrder: z.enum(['ASC', 'DESC']).optional().default('ASC')
  })
};
