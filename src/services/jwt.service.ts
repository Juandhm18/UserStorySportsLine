import jwt from 'jsonwebtoken';
import User from '../models/user.model';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '15m';
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

export interface TokenPayload {
    id: number;
    email: string;
    rol: string;
}

export interface TokenPair {
    accessToken: string;
    refreshToken: string;
}

class JWTService {
    generateAccessToken(payload: TokenPayload): string {
        return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as any);
    }

    generateRefreshToken(payload: TokenPayload): string {
        return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN } as any);
    }

    generateTokenPair(payload: TokenPayload): TokenPair {
        return {
            accessToken: this.generateAccessToken(payload),
            refreshToken: this.generateRefreshToken(payload)
        };
    }

    verifyAccessToken(token: string): TokenPayload {
        try {
            return jwt.verify(token, JWT_SECRET) as TokenPayload;
        } catch (error) {
            throw new Error('Token de acceso inválido o expirado');
        }
    }

    verifyRefreshToken(token: string): TokenPayload {
        try {
            return jwt.verify(token, JWT_REFRESH_SECRET) as TokenPayload;
        } catch (error) {
            throw new Error('Token de refresh inválido o expirado');
        }
    }

    async refreshTokens(refreshToken: string): Promise<TokenPair> {
        // Verificar el refresh token
        const payload = this.verifyRefreshToken(refreshToken);
        
        // Verificar que el usuario aún existe
        const user = await User.findByPk(payload.id);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        // Generar nuevos tokens
        const newPayload: TokenPayload = {
            id: (user as any).id,
            email: (user as any).email,
            rol: (user as any).rol
        };

        return this.generateTokenPair(newPayload);
    }
}

export default new JWTService();
