import Product from '../models/product.model';
import { ProductResponseDTO } from '../dto/product.dto';

export interface CreateProductData {
    code: string;
    name: string;
    price: number;
    stock: number;
}

export interface UpdateProductData {
    code?: string | undefined;
    name?: string | undefined;
    price?: number | undefined;
    stock?: number | undefined;
}

class ProductDAO {
    async create(productData: CreateProductData): Promise<Product> {
        return await Product.create(productData as any);
    }

    async findById(id: number): Promise<Product | null> {
        return await Product.findByPk(id);
    }

    async findByCode(code: string): Promise<Product | null> {
        return await Product.findOne({ where: { code } });
    }

    async findAll(options?: {
        page?: number;
        limit?: number;
        search?: string;
        sortBy?: string;
        sortOrder?: 'ASC' | 'DESC';
    }): Promise<{ products: Product[]; total: number }> {
        const { page = 1, limit = 10, search, sortBy = 'createdAt', sortOrder = 'DESC' } = options || {};
        
        const offset = (page - 1) * limit;
        
        let whereClause: any = {};
        
        if (search) {
            whereClause = {
                [require('sequelize').Op.or]: [
                    { name: { [require('sequelize').Op.iLike]: `%${search}%` } },
                    { code: { [require('sequelize').Op.iLike]: `%${search}%` } }
                ]
            };
        }

        const { count, rows } = await Product.findAndCountAll({
            where: whereClause,
            limit,
            offset,
            order: [[sortBy, sortOrder]]
        });

        return {
            products: rows,
            total: count
        };
    }

    async update(id: number, productData: UpdateProductData): Promise<number> {
        const [affectedCount] = await Product.update(productData, { where: { id } });
        return affectedCount;
    }

    async delete(id: number): Promise<number> {
        return await Product.destroy({ where: { id } });
    }

    async existsByCode(code: string, excludeId?: number): Promise<boolean> {
        const whereClause: any = { code };
        if (excludeId) {
            whereClause.id = { [require('sequelize').Op.ne]: excludeId };
        }
        
        const product = await Product.findOne({ where: whereClause });
        return product !== null;
    }

    async updateStock(id: number, newStock: number): Promise<number> {
        const [affectedCount] = await Product.update({ stock: newStock }, { where: { id } });
        return affectedCount;
    }

    async getLowStockProducts(threshold: number = 10): Promise<Product[]> {
        return await Product.findAll({
            where: {
                stock: { [require('sequelize').Op.lte]: threshold }
            },
            order: [['stock', 'ASC']]
        });
    }

    // Método para convertir Product a ProductResponseDTO
    toResponseDTO(product: Product): ProductResponseDTO {
        return {
            id: (product as any).id,
            code: (product as any).code,
            name: (product as any).name,
            price: (product as any).price,
            stock: (product as any).stock,
            createdAt: (product as any).createdAt,
            updatedAt: (product as any).updatedAt
        };
    }

    // Método para convertir array de Products a ProductResponseDTOs
    toResponseDTOArray(products: Product[]): ProductResponseDTO[] {
        return products.map(product => this.toResponseDTO(product));
    }
}

export default new ProductDAO();
