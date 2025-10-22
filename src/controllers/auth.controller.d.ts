import { Request, Response } from 'express';
declare class AuthController {
    register(req: Request, res: Response): Promise<void>;
    login(req: Request, res: Response): Promise<void>;
    getProfile(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    refreshToken(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    testEncryption(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
declare const _default: AuthController;
export default _default;
//# sourceMappingURL=auth.controller.d.ts.map