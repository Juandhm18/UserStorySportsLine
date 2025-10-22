"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_model_1 = __importDefault(require("../models/client.model"));
class ClientDAO {
    async create(clientData) {
        return await client_model_1.default.create(clientData);
    }
    async findById(id) {
        return await client_model_1.default.findByPk(id);
    }
    async findByEmail(email) {
        return await client_model_1.default.findOne({ where: { email } });
    }
    async findByDocument(document) {
        return await client_model_1.default.findOne({ where: { document } });
    }
    async findAll(options) {
        const { page = 1, limit = 10, search, sortBy = 'createdAt', sortOrder = 'DESC' } = options || {};
        const offset = (page - 1) * limit;
        let whereClause = {};
        if (search) {
            whereClause = {
                [require('sequelize').Op.or]: [
                    { name: { [require('sequelize').Op.iLike]: `%${search}%` } },
                    { email: { [require('sequelize').Op.iLike]: `%${search}%` } },
                    { document: { [require('sequelize').Op.iLike]: `%${search}%` } }
                ]
            };
        }
        const { count, rows } = await client_model_1.default.findAndCountAll({
            where: whereClause,
            limit,
            offset,
            order: [[sortBy, sortOrder]]
        });
        return {
            clients: rows,
            total: count
        };
    }
    async update(id, clientData) {
        const [affectedCount] = await client_model_1.default.update(clientData, { where: { id } });
        return affectedCount;
    }
    async delete(id) {
        return await client_model_1.default.destroy({ where: { id } });
    }
    async existsByEmail(email, excludeId) {
        const whereClause = { email };
        if (excludeId) {
            whereClause.id = { [require('sequelize').Op.ne]: excludeId };
        }
        const client = await client_model_1.default.findOne({ where: whereClause });
        return client !== null;
    }
    async existsByDocument(document, excludeId) {
        const whereClause = { document };
        if (excludeId) {
            whereClause.id = { [require('sequelize').Op.ne]: excludeId };
        }
        const client = await client_model_1.default.findOne({ where: whereClause });
        return client !== null;
    }
    async getClientsWithOrders() {
        // Este método se implementará cuando tengamos el modelo de pedidos
        return await client_model_1.default.findAll({
            order: [['name', 'ASC']]
        });
    }
    async getTopClients(limit = 10) {
        // Este método se implementará cuando tengamos el modelo de pedidos
        return await client_model_1.default.findAll({
            limit,
            order: [['createdAt', 'DESC']]
        });
    }
    // Método para convertir Client a ClientResponseDTO
    toResponseDTO(client) {
        return {
            id: client.id,
            name: client.name,
            email: client.email,
            phone: client.phone,
            address: client.address,
            document: client.document,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        };
    }
    // Método para convertir array de Clients a ClientResponseDTOs
    toResponseDTOArray(clients) {
        return clients.map(client => this.toResponseDTO(client));
    }
}
exports.default = new ClientDAO();
//# sourceMappingURL=client.dao.js.map