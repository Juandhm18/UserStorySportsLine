"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_service_1 = __importDefault(require("../services/client.service"));
class ClientController {
    async getAll(req, res) {
        try {
            const clients = await client_service_1.default.getAll();
            res.status(200).json({
                success: true,
                message: 'Clientes obtenidos exitosamente',
                data: clients
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener clientes: ' + error.message
            });
        }
    }
    async getById(req, res) {
        try {
            const { id } = req.params;
            const client = await client_service_1.default.getById(id);
            if (!client) {
                return res.status(404).json({
                    success: false,
                    message: 'Cliente no encontrado'
                });
            }
            res.status(200).json({
                success: true,
                message: 'Cliente obtenido exitosamente',
                data: client
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener cliente: ' + error.message
            });
        }
    }
    async create(req, res) {
        try {
            const clientData = req.body;
            const client = await client_service_1.default.create(clientData);
            res.status(201).json({
                success: true,
                message: 'Cliente creado exitosamente',
                data: client
            });
        }
        catch (error) {
            if (error.message.includes('email único') || error.message.includes('documento único')) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                });
            }
            res.status(500).json({
                success: false,
                message: 'Error al crear cliente: ' + error.message
            });
        }
    }
    async update(req, res) {
        try {
            const { id } = req.params;
            const clientData = req.body;
            const client = await client_service_1.default.update(id, clientData);
            if (!client) {
                return res.status(404).json({
                    success: false,
                    message: 'Cliente no encontrado'
                });
            }
            res.status(200).json({
                success: true,
                message: 'Cliente actualizado exitosamente',
                data: client
            });
        }
        catch (error) {
            if (error.message.includes('email único') || error.message.includes('documento único')) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                });
            }
            res.status(500).json({
                success: false,
                message: 'Error al actualizar cliente: ' + error.message
            });
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params;
            const deleted = await client_service_1.default.delete(id);
            if (!deleted) {
                return res.status(404).json({
                    success: false,
                    message: 'Cliente no encontrado'
                });
            }
            res.status(200).json({
                success: true,
                message: 'Cliente eliminado exitosamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al eliminar cliente: ' + error.message
            });
        }
    }
}
exports.default = new ClientController();
//# sourceMappingURL=client.controller.js.map