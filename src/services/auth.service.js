"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_service_1 = __importDefault(require("./jwt.service"));
const user_dao_1 = __importDefault(require("../dao/user.dao"));
class AuthService {
    async register(data) {
        const { name, email, password, rol } = data;
        // Verificar si el usuario ya existe usando el DAO
        const existingUser = await user_dao_1.default.findByEmail(email);
        if (existingUser) {
            throw new Error('El usuario ya existe con este email');
        }
        // Encriptar contraseña
        const saltRounds = 10;
        const hashedPassword = await bcrypt_1.default.hash(password, saltRounds);
        // Crear usuario usando el DAO
        const user = await user_dao_1.default.create({
            name,
            email,
            password: hashedPassword,
            rol
        });
        // Generar tokens JWT
        const tokens = jwt_service_1.default.generateTokenPair({
            id: user.id,
            email: user.email,
            rol: user.rol
        });
        return {
            user: user_dao_1.default.toResponseDTO(user),
            tokens
        };
    }
    async login(data) {
        const { email, password } = data;
        // Buscar usuario usando el DAO
        const user = await user_dao_1.default.findByEmail(email);
        if (!user) {
            throw new Error('Credenciales inválidas');
        }
        // Verificar contraseña
        const isValidPassword = await bcrypt_1.default.compare(password, user.password);
        if (!isValidPassword) {
            throw new Error('Credenciales inválidas');
        }
        // Generar tokens JWT
        const tokens = jwt_service_1.default.generateTokenPair({
            id: user.id,
            email: user.email,
            rol: user.rol
        });
        return {
            user: user_dao_1.default.toResponseDTO(user),
            tokens
        };
    }
    async getUserById(id) {
        const user = await user_dao_1.default.findById(id);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        return user_dao_1.default.toResponseDTO(user);
    }
    async refreshTokens(refreshToken) {
        return jwt_service_1.default.refreshTokens(refreshToken);
    }
}
exports.default = new AuthService();
//# sourceMappingURL=auth.service.js.map