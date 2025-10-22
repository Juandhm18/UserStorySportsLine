"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
class UserDAO {
    async create(userData) {
        return await user_model_1.default.create(userData);
    }
    async findById(id) {
        return await user_model_1.default.findByPk(id);
    }
    async findByEmail(email) {
        return await user_model_1.default.findOne({ where: { email } });
    }
    async findAll() {
        return await user_model_1.default.findAll();
    }
    async update(id, userData) {
        const [affectedCount] = await user_model_1.default.update(userData, { where: { id } });
        return affectedCount;
    }
    async delete(id) {
        return await user_model_1.default.destroy({ where: { id } });
    }
    async existsByEmail(email) {
        const user = await user_model_1.default.findOne({ where: { email } });
        return user !== null;
    }
    // Método para convertir User a UserResponseDTO
    toResponseDTO(user) {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            rol: user.rol,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };
    }
    // Método para convertir array de Users a UserResponseDTOs
    toResponseDTOArray(users) {
        return users.map(user => this.toResponseDTO(user));
    }
}
exports.default = new UserDAO();
//# sourceMappingURL=user.dao.js.map