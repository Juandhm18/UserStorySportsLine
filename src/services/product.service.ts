import ProductDAO, { CreateProductData, UpdateProductData } from '../dao/product.dao';
import { ProductResponseDTO, ProductListResponseDTO } from '../dto/product.dto';

class ProductService {
    async getAll(options?: {
        page?: number;
        limit?: number;
        search?: string;
        sortBy?: string;
        sortOrder?: 'ASC' | 'DESC';
    }): Promise<ProductListResponseDTO> {
        const { page = 1, limit = 10 } = options || {};
        
        const result = await ProductDAO.findAll(options);
        
        return {
            products: ProductDAO.toResponseDTOArray(result.products),
            pagination: {
                page,
                limit,
                total: result.total,
                totalPages: Math.ceil(result.total / limit)
            }
        };
    }

    async getById(id: number): Promise<ProductResponseDTO | null> {
        const product = await ProductDAO.findById(id);
        return product ? ProductDAO.toResponseDTO(product) : null;
    }

    async create(data: CreateProductData): Promise<ProductResponseDTO> {
        // Verificar si el código ya existe
        const exists = await ProductDAO.existsByCode(data.code);
        if (exists) {
            throw new Error('El código del producto debe ser único');
        }

        const product = await ProductDAO.create(data);
        return ProductDAO.toResponseDTO(product);
    }

    async update(id: number, data: UpdateProductData): Promise<ProductResponseDTO | null> {
        // Si se está actualizando el código, verificar que no exista
        if (data.code) {
            const exists = await ProductDAO.existsByCode(data.code, id);
            if (exists) {
                throw new Error('El código del producto debe ser único');
            }
        }

        const affectedCount = await ProductDAO.update(id, data);
        
        if (affectedCount === 0) {
            return null;
        }

        const updatedProduct = await ProductDAO.findById(id);
        return updatedProduct ? ProductDAO.toResponseDTO(updatedProduct) : null;
    }

    async delete(id: number): Promise<boolean> {
        const deletedCount = await ProductDAO.delete(id);
        return deletedCount > 0;
    }

    async findByCode(code: string): Promise<ProductResponseDTO | null> {
        const product = await ProductDAO.findByCode(code);
        return product ? ProductDAO.toResponseDTO(product) : null;
    }

    async updateStock(id: number, newStock: number): Promise<ProductResponseDTO | null> {
        const affectedCount = await ProductDAO.updateStock(id, newStock);
        
        if (affectedCount === 0) {
            return null;
        }

        const updatedProduct = await ProductDAO.findById(id);
        return updatedProduct ? ProductDAO.toResponseDTO(updatedProduct) : null;
    }

    async getLowStockProducts(threshold: number = 10): Promise<ProductResponseDTO[]> {
        const products = await ProductDAO.getLowStockProducts(threshold);
        return ProductDAO.toResponseDTOArray(products);
    }
}

export default new ProductService();