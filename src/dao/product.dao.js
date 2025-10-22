"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_model_1 = __importDefault(require("../models/product.model"));
class ProductDAO {
    async create(productData) {
        return await product_model_1.default.create(productData);
    }
    async findById(id) {
        return await product_model_1.default.findByPk(id);
    }
    async findByCode(code) {
        return await product_model_1.default.findOne({ where: { code } });
    }
    async findAll(options) {
        const { page = 1, limit = 10, search, sortBy = 'createdAt', sortOrder = 'DESC' } = options || {};
        const offset = (page - 1) * limit;
        let whereClause = {};
        if (search) {
            whereClause = {
                [require('sequelize').Op.or]: [
                    { name: { [require('sequelize').Op.iLike]: `%${search}%` } },
                    { code: { [require('sequelize').Op.iLike]: `%${search}%` } }
                ]
            };
        }
        const { count, rows } = await product_model_1.default.findAndCountAll({
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
    async update(id, productData) {
        const [affectedCount] = await product_model_1.default.update(productData, { where: { id } });
        return affectedCount;
    }
    async delete(id) {
        return await product_model_1.default.destroy({ where: { id } });
    }
    async existsByCode(code, excludeId) {
        const whereClause = { code };
        if (excludeId) {
            whereClause.id = { [require('sequelize').Op.ne]: excludeId };
        }
        const product = await product_model_1.default.findOne({ where: whereClause });
        return product !== null;
    }
    async updateStock(id, newStock) {
        const [affectedCount] = await product_model_1.default.update({ stock: newStock }, { where: { id } });
        return affectedCount;
    }
    async getLowStockProducts(threshold = 10) {
        return await product_model_1.default.findAll({
            where: {
                stock: { [require('sequelize').Op.lte]: threshold }
            },
            order: [['stock', 'ASC']]
        });
    }
    // Método para convertir Product a ProductResponseDTO
    toResponseDTO(product) {
        return {
            id: product.id,
            code: product.code,
            name: product.name,
            price: product.price,
            stock: product.stock,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        };
    }
    // Método para convertir array de Products a ProductResponseDTOs
    toResponseDTOArray(products) {
        return products.map(product => this.toResponseDTO(product));
    }
}
exports.default = new ProductDAO();
//# sourceMappingURL=product.dao.js.map