import Product from '../models/product.model';

export interface CreateProductData {
    code: string;
    name: string;
    price: number;
    stock: number;
}

export interface UpdateProductData {
    code?: string;
    name?: string;
    price?: number;
    stock?: number;
}

export interface ProductResponse {
    id: number;
    code: string;
    name: string;
    price: number;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
}

class ProductService {
    async getAll(): Promise<ProductResponse[]> {
        const products = await Product.findAll();
        return products.map(product => this.toResponseDTO(product));
    }

    async getById(id: number): Promise<ProductResponse | null> {
        const product = await Product.findByPk(id);
        return product ? this.toResponseDTO(product) : null;
    }

    async create(data: CreateProductData): Promise<ProductResponse> {
        // Verificar si el código ya existe
        const existingProduct = await Product.findOne({ where: { code: data.code } });
        if (existingProduct) {
            throw new Error('El código del producto debe ser único');
        }

        const product = await Product.create(data as any);
        return this.toResponseDTO(product);
    }

    async update(id: number, data: UpdateProductData): Promise<ProductResponse | null> {
        // Si se está actualizando el código, verificar que no exista
        if (data.code) {
            const existingProduct = await Product.findOne({ 
                where: { 
                    code: data.code,
                    id: { [require('sequelize').Op.ne]: id }
                } 
            });
            if (existingProduct) {
                throw new Error('El código del producto debe ser único');
            }
        }

        const [affectedCount] = await Product.update(data, { where: { id } });
        
        if (affectedCount === 0) {
            return null;
        }

        const updatedProduct = await Product.findByPk(id);
        return updatedProduct ? this.toResponseDTO(updatedProduct) : null;
    }

    async delete(id: number): Promise<boolean> {
        const deletedCount = await Product.destroy({ where: { id } });
        return deletedCount > 0;
    }

    async findByCode(code: string): Promise<ProductResponse | null> {
        const product = await Product.findOne({ where: { code } });
        return product ? this.toResponseDTO(product) : null;
    }

    async updateStock(id: number, newStock: number): Promise<ProductResponse | null> {
        const [affectedCount] = await Product.update({ stock: newStock }, { where: { id } });
        
        if (affectedCount === 0) {
            return null;
        }

        const updatedProduct = await Product.findByPk(id);
        return updatedProduct ? this.toResponseDTO(updatedProduct) : null;
    }

    // Método para convertir Product a ProductResponse
    private toResponseDTO(product: Product): ProductResponse {
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
}

export default new ProductService();
