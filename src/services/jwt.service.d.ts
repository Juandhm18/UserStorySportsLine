export interface TokenPayload {
    id: number;
    email: string;
    rol: string;
}
export interface TokenPair {
    accessToken: string;
    refreshToken: string;
}
declare class JWTService {
    generateAccessToken(payload: TokenPayload): string;
    generateRefreshToken(payload: TokenPayload): string;
    generateTokenPair(payload: TokenPayload): TokenPair;
    verifyAccessToken(token: string): TokenPayload;
    verifyRefreshToken(token: string): TokenPayload;
    refreshTokens(refreshToken: string): Promise<TokenPair>;
}
declare const _default: JWTService;
export default _default;
//# sourceMappingURL=jwt.service.d.ts.map