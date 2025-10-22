"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_dao_1 = __importDefault(require("../dao/client.dao"));
class ClientService {
    async getAll(options) {
        const { page = 1, limit = 10 } = options || {};
        const result = await client_dao_1.default.findAll(options);
        return {
            clients: client_dao_1.default.toResponseDTOArray(result.clients),
            pagination: {
                page,
                limit,
                total: result.total,
                totalPages: Math.ceil(result.total / limit)
            }
        };
    }
    async getById(id) {
        const client = await client_dao_1.default.findById(id);
        return client ? client_dao_1.default.toResponseDTO(client) : null;
    }
    async create(data) {
        // Verificar si el email ya existe
        const emailExists = await client_dao_1.default.existsByEmail(data.email);
        if (emailExists) {
            throw new Error('El email del cliente debe ser único');
        }
        // Verificar si el documento ya existe
        const documentExists = await client_dao_1.default.existsByDocument(data.document);
        if (documentExists) {
            throw new Error('El documento del cliente debe ser único');
        }
        const client = await client_dao_1.default.create(data);
        return client_dao_1.default.toResponseDTO(client);
    }
    async update(id, data) {
        // Si se está actualizando el email, verificar que no exista
        if (data.email) {
            const emailExists = await client_dao_1.default.existsByEmail(data.email, id);
            if (emailExists) {
                throw new Error('El email del cliente debe ser único');
            }
        }
        // Si se está actualizando el documento, verificar que no exista
        if (data.document) {
            const documentExists = await client_dao_1.default.existsByDocument(data.document, id);
            if (documentExists) {
                throw new Error('El documento del cliente debe ser único');
            }
        }
        const affectedCount = await client_dao_1.default.update(id, data);
        if (affectedCount === 0) {
            return null;
        }
        const updatedClient = await client_dao_1.default.findById(id);
        return updatedClient ? client_dao_1.default.toResponseDTO(updatedClient) : null;
    }
    async delete(id) {
        const deletedCount = await client_dao_1.default.delete(id);
        return deletedCount > 0;
    }
    async findByEmail(email) {
        const client = await client_dao_1.default.findByEmail(email);
        return client ? client_dao_1.default.toResponseDTO(client) : null;
    }
    async findByDocument(document) {
        const client = await client_dao_1.default.findByDocument(document);
        return client ? client_dao_1.default.toResponseDTO(client) : null;
    }
    async getClientsWithOrders() {
        const clients = await client_dao_1.default.getClientsWithOrders();
        return client_dao_1.default.toResponseDTOArray(clients);
    }
    async getTopClients(limit = 10) {
        const clients = await client_dao_1.default.getTopClients(limit);
        return client_dao_1.default.toResponseDTOArray(clients);
    }
}
exports.default = new ClientService();
//# sourceMappingURL=client.service.js.map