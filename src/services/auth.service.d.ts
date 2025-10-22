import { TokenPair } from './jwt.service';
import { RegisterDTOType, LoginDTOType, AuthResponseDTO } from '../dto/auth.dto';
declare class AuthService {
    register(data: RegisterDTOType): Promise<AuthResponseDTO>;
    login(data: LoginDTOType): Promise<AuthResponseDTO>;
    getUserById(id: number): Promise<import("../dto/auth.dto").UserResponseDTO>;
    refreshTokens(refreshToken: string): Promise<TokenPair>;
}
declare const _default: AuthService;
export default _default;
//# sourceMappingURL=auth.service.d.ts.map