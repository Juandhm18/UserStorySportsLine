import bcrypt from 'bcrypt';
import User from '../models/user.model';
import JWTService, { TokenPair } from './jwt.service';

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    rol: 'admin' | 'vendedor';
}

export interface LoginData {
    email: string;
    password: string;
}

export interface AuthResponse {
    user: {
        id: number;
        name: string;
        email: string;
        rol: string;
    };
    tokens: TokenPair;
}

class AuthService {
    async register(data: RegisterData): Promise<AuthResponse> {
        const { name, email, password, rol } = data;

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw new Error('El usuario ya existe con este email');
        }

        // Encriptar contraseña
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Crear usuario
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            rol
        });

        // Generar tokens JWT
        const tokens = JWTService.generateTokenPair({
            id: user.id,
            email: user.email,
            rol: user.rol
        });

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                rol: user.rol
            },
            tokens
        };
    }

    async login(data: LoginData): Promise<AuthResponse> {
        const { email, password } = data;

        // Buscar usuario
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error('Credenciales inválidas');
        }

        // Verificar contraseña
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new Error('Credenciales inválidas');
        }

        // Generar tokens JWT
        const tokens = JWTService.generateTokenPair({
            id: user.id,
            email: user.email,
            rol: user.rol
        });

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                rol: user.rol
            },
            tokens
        };
    }

    async getUserById(id: number) {
        const user = await User.findByPk(id);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        return user;
    }

    async refreshTokens(refreshToken: string) {
        return JWTService.refreshTokens(refreshToken);
    }
}

export default new AuthService();