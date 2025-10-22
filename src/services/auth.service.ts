import bcrypt from 'bcrypt';
import JWTService, { TokenPair } from './jwt.service';
import UserDAO from '../dao/user.dao';
import { RegisterDTOType, LoginDTOType, AuthResponseDTO } from '../dto/auth.dto';

class AuthService {
    async register(data: RegisterDTOType): Promise<AuthResponseDTO> {
        const { name, email, password, rol } = data;

        // Verificar si el usuario ya existe usando el DAO
        const existingUser = await UserDAO.findByEmail(email);
        if (existingUser) {
            throw new Error('El usuario ya existe con este email');
        }

        // Encriptar contraseña
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Crear usuario usando el DAO
        const user = await UserDAO.create({
            name,
            email,
            password: hashedPassword,
            rol
        });

        // Generar tokens JWT
        const tokens = JWTService.generateTokenPair({
            id: (user as any).id,
            email: (user as any).email,
            rol: (user as any).rol
        });

        return {
            user: UserDAO.toResponseDTO(user),
            tokens
        };
    }

    async login(data: LoginDTOType): Promise<AuthResponseDTO> {
        const { email, password } = data;

        // Buscar usuario usando el DAO
        const user = await UserDAO.findByEmail(email);
        if (!user) {
            throw new Error('Credenciales inválidas');
        }

        // Verificar contraseña
        const isValidPassword = await bcrypt.compare(password, (user as any).password);
        if (!isValidPassword) {
            throw new Error('Credenciales inválidas');
        }

        // Generar tokens JWT
        const tokens = JWTService.generateTokenPair({
            id: (user as any).id,
            email: (user as any).email,
            rol: (user as any).rol
        });

        return {
            user: UserDAO.toResponseDTO(user),
            tokens
        };
    }

    async getUserById(id: number) {
        const user = await UserDAO.findById(id);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        return UserDAO.toResponseDTO(user);
    }

    async refreshTokens(refreshToken: string) {
        return JWTService.refreshTokens(refreshToken);
    }
}

export default new AuthService();