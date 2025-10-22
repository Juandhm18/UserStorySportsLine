import ProductService from '../../services/product.service';
import { ProductDAO } from '../../dao/product.dao';

// Mock de dependencias
jest.mock('../../dao/product.dao');

describe('ProductService', () => {
  let mockProductDAO: jest.Mocked<ProductDAO>;

  beforeEach(() => {
    mockProductDAO = ProductDAO as jest.Mocked<ProductDAO>;
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('debería obtener todos los productos exitosamente', async () => {
      // Arrange
      const mockProducts = [
        {
          id: 1,
          name: 'Product 1',
          code: 'P001',
          price: 100,
          stock: 10,
          description: 'Description 1'
        },
        {
          id: 2,
          name: 'Product 2',
          code: 'P002',
          price: 200,
          stock: 20,
          description: 'Description 2'
        }
      ];

      const queryParams = { page: 1, limit: 10 };
      mockProductDAO.findAll.mockResolvedValue(mockProducts as any);

      // Act
      const result = await ProductService.getAll(queryParams);

      // Assert
      expect(result.success).toBe(true);
      expect(result.data.products).toEqual(mockProducts);
      expect(result.data.pagination.page).toBe(1);
      expect(result.data.pagination.limit).toBe(10);
      expect(mockProductDAO.findAll).toHaveBeenCalledWith(queryParams);
    });
  });

  describe('getById', () => {
    it('debería obtener un producto por ID exitosamente', async () => {
      // Arrange
      const mockProduct = {
        id: 1,
        name: 'Product 1',
        code: 'P001',
        price: 100,
        stock: 10,
        description: 'Description 1'
      };

      mockProductDAO.findById.mockResolvedValue(mockProduct as any);

      // Act
      const result = await ProductService.getById(1);

      // Assert
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockProduct);
      expect(mockProductDAO.findById).toHaveBeenCalledWith(1);
    });

    it('debería fallar si el producto no existe', async () => {
      // Arrange
      mockProductDAO.findById.mockResolvedValue(null);

      // Act
      const result = await productService.getById(999);

      // Assert
      expect(result.success).toBe(false);
      expect(result.message).toBe('Producto no encontrado');
    });
  });

  describe('create', () => {
    it('debería crear un producto exitosamente', async () => {
      // Arrange
      const productData = {
        name: 'New Product',
        code: 'P003',
        price: 150,
        stock: 15,
        description: 'New Description'
      };

      const mockCreatedProduct = {
        id: 3,
        ...productData
      };

      mockProductDAO.existsByCode.mockResolvedValue(false);
      mockProductDAO.create.mockResolvedValue(mockCreatedProduct as any);

      // Act
      const result = await ProductService.create(productData);

      // Assert
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockCreatedProduct);
      expect(mockProductDAO.existsByCode).toHaveBeenCalledWith('P003');
      expect(mockProductDAO.create).toHaveBeenCalledWith(productData);
    });

    it('debería fallar si el código ya existe', async () => {
      // Arrange
      const productData = {
        name: 'New Product',
        code: 'P001',
        price: 150,
        stock: 15,
        description: 'New Description'
      };

      mockProductDAO.existsByCode.mockResolvedValue(true);

      // Act
      const result = await ProductService.create(productData);

      // Assert
      expect(result.success).toBe(false);
      expect(result.message).toBe('El código del producto ya existe');
      expect(mockProductDAO.create).not.toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('debería actualizar un producto exitosamente', async () => {
      // Arrange
      const updateData = {
        name: 'Updated Product',
        price: 200
      };

      const mockUpdatedProduct = {
        id: 1,
        name: 'Updated Product',
        code: 'P001',
        price: 200,
        stock: 10,
        description: 'Description 1'
      };

      mockProductDAO.findById.mockResolvedValue({ id: 1 } as any);
      mockProductDAO.update.mockResolvedValue(mockUpdatedProduct as any);

      // Act
      const result = await ProductService.update(1, updateData);

      // Assert
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockUpdatedProduct);
      expect(mockProductDAO.findById).toHaveBeenCalledWith(1);
      expect(mockProductDAO.update).toHaveBeenCalledWith(1, updateData);
    });

    it('debería fallar si el producto no existe', async () => {
      // Arrange
      const updateData = {
        name: 'Updated Product',
        price: 200
      };

      mockProductDAO.findById.mockResolvedValue(null);

      // Act
      const result = await productService.update(999, updateData);

      // Assert
      expect(result.success).toBe(false);
      expect(result.message).toBe('Producto no encontrado');
      expect(mockProductDAO.update).not.toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('debería eliminar un producto exitosamente', async () => {
      // Arrange
      const mockProduct = {
        id: 1,
        name: 'Product 1',
        code: 'P001',
        price: 100,
        stock: 10,
        description: 'Description 1'
      };

      mockProductDAO.findById.mockResolvedValue(mockProduct as any);
      mockProductDAO.delete.mockResolvedValue(true);

      // Act
      const result = await ProductService.delete(1);

      // Assert
      expect(result.success).toBe(true);
      expect(result.message).toBe('Producto eliminado exitosamente');
      expect(mockProductDAO.findById).toHaveBeenCalledWith(1);
      expect(mockProductDAO.delete).toHaveBeenCalledWith(1);
    });

    it('debería fallar si el producto no existe', async () => {
      // Arrange
      mockProductDAO.findById.mockResolvedValue(null);

      // Act
      const result = await productService.delete(999);

      // Assert
      expect(result.success).toBe(false);
      expect(result.message).toBe('Producto no encontrado');
      expect(mockProductDAO.delete).not.toHaveBeenCalled();
    });
  });
});
