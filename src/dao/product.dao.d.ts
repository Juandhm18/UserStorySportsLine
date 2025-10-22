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
declare class ProductDAO {
    create(productData: CreateProductData): Promise<Product>;
    findById(id: number): Promise<Product | null>;
    findByCode(code: string): Promise<Product | null>;
    findAll(options?: {
        page?: number;
        limit?: number;
        search?: string;
        sortBy?: string;
        sortOrder?: 'ASC' | 'DESC';
    }): Promise<{
        products: Product[];
        total: number;
    }>;
    update(id: number, productData: UpdateProductData): Promise<number>;
    delete(id: number): Promise<number>;
    existsByCode(code: string, excludeId?: number): Promise<boolean>;
    updateStock(id: number, newStock: number): Promise<number>;
    getLowStockProducts(threshold?: number): Promise<Product[]>;
    toResponseDTO(product: Product): ProductResponseDTO;
    toResponseDTOArray(products: Product[]): ProductResponseDTO[];
}
declare const _default: ProductDAO;
export default _default;
//# sourceMappingURL=product.dao.d.ts.map