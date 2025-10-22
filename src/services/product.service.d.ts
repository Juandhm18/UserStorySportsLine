import { CreateProductData, UpdateProductData } from '../dao/product.dao';
import { ProductResponseDTO, ProductListResponseDTO } from '../dto/product.dto';
declare class ProductService {
    getAll(options?: {
        page?: number;
        limit?: number;
        search?: string;
        sortBy?: string;
        sortOrder?: 'ASC' | 'DESC';
    }): Promise<ProductListResponseDTO>;
    getById(id: number): Promise<ProductResponseDTO | null>;
    create(data: CreateProductData): Promise<ProductResponseDTO>;
    update(id: number, data: UpdateProductData): Promise<ProductResponseDTO | null>;
    delete(id: number): Promise<boolean>;
    findByCode(code: string): Promise<ProductResponseDTO | null>;
    updateStock(id: number, newStock: number): Promise<ProductResponseDTO | null>;
    getLowStockProducts(threshold?: number): Promise<ProductResponseDTO[]>;
}
declare const _default: ProductService;
export default _default;
//# sourceMappingURL=product.service.d.ts.map