"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_service_1 = __importDefault(require("../services/product.service"));
class ProductController {
    async getAll(req, res) {
        try {
            const products = await product_service_1.default.getAll();
            res.status(200).json({
                success: true,
                message: 'Productos obtenidos exitosamente',
                data: products
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener productos: ' + error.message
            });
        }
    }
    async getById(req, res) {
        try {
            const { id } = req.params;
            const product = await product_service_1.default.getById(id);
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: 'Producto no encontrado'
                });
            }
            res.status(200).json({
                success: true,
                message: 'Producto obtenido exitosamente',
                data: product
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener producto: ' + error.message
            });
        }
    }
    async create(req, res) {
        try {
            const productData = req.body;
            const product = await product_service_1.default.create(productData);
            res.status(201).json({
                success: true,
                message: 'Producto creado exitosamente',
                data: product
            });
        }
        catch (error) {
            if (error.message.includes('código único')) {
                return res.status(400).json({
                    success: false,
                    message: 'El código del producto ya existe'
                });
            }
            res.status(500).json({
                success: false,
                message: 'Error al crear producto: ' + error.message
            });
        }
    }
    async update(req, res) {
        try {
            const { id } = req.params;
            const productData = req.body;
            const product = await product_service_1.default.update(id, productData);
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: 'Producto no encontrado'
                });
            }
            res.status(200).json({
                success: true,
                message: 'Producto actualizado exitosamente',
                data: product
            });
        }
        catch (error) {
            if (error.message.includes('código único')) {
                return res.status(400).json({
                    success: false,
                    message: 'El código del producto ya existe'
                });
            }
            res.status(500).json({
                success: false,
                message: 'Error al actualizar producto: ' + error.message
            });
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params;
            const deleted = await product_service_1.default.delete(id);
            if (!deleted) {
                return res.status(404).json({
                    success: false,
                    message: 'Producto no encontrado'
                });
            }
            res.status(200).json({
                success: true,
                message: 'Producto eliminado exitosamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al eliminar producto: ' + error.message
            });
        }
    }
}
exports.default = new ProductController();
//# sourceMappingURL=product.controller.js.map