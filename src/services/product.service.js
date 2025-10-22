"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_dao_1 = __importDefault(require("../dao/product.dao"));
class ProductService {
    async getAll(options) {
        const { page = 1, limit = 10 } = options || {};
        const result = await product_dao_1.default.findAll(options);
        return {
            products: product_dao_1.default.toResponseDTOArray(result.products),
            pagination: {
                page,
                limit,
                total: result.total,
                totalPages: Math.ceil(result.total / limit)
            }
        };
    }
    async getById(id) {
        const product = await product_dao_1.default.findById(id);
        return product ? product_dao_1.default.toResponseDTO(product) : null;
    }
    async create(data) {
        // Verificar si el código ya existe
        const exists = await product_dao_1.default.existsByCode(data.code);
        if (exists) {
            throw new Error('El código del producto debe ser único');
        }
        const product = await product_dao_1.default.create(data);
        return product_dao_1.default.toResponseDTO(product);
    }
    async update(id, data) {
        // Si se está actualizando el código, verificar que no exista
        if (data.code) {
            const exists = await product_dao_1.default.existsByCode(data.code, id);
            if (exists) {
                throw new Error('El código del producto debe ser único');
            }
        }
        const affectedCount = await product_dao_1.default.update(id, data);
        if (affectedCount === 0) {
            return null;
        }
        const updatedProduct = await product_dao_1.default.findById(id);
        return updatedProduct ? product_dao_1.default.toResponseDTO(updatedProduct) : null;
    }
    async delete(id) {
        const deletedCount = await product_dao_1.default.delete(id);
        return deletedCount > 0;
    }
    async findByCode(code) {
        const product = await product_dao_1.default.findByCode(code);
        return product ? product_dao_1.default.toResponseDTO(product) : null;
    }
    async updateStock(id, newStock) {
        const affectedCount = await product_dao_1.default.updateStock(id, newStock);
        if (affectedCount === 0) {
            return null;
        }
        const updatedProduct = await product_dao_1.default.findById(id);
        return updatedProduct ? product_dao_1.default.toResponseDTO(updatedProduct) : null;
    }
    async getLowStockProducts(threshold = 10) {
        const products = await product_dao_1.default.getLowStockProducts(threshold);
        return product_dao_1.default.toResponseDTOArray(products);
    }
}
exports.default = new ProductService();
//# sourceMappingURL=product.service.js.map