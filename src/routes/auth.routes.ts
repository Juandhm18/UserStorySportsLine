import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { verifyToken } from '../middlewares/auth.middleware';
import { validateDTO } from '../middlewares/validation.middleware';
import { authEncryption } from '../middlewares/encryption.middleware';
import { RegisterDTO, LoginDTO, RefreshTokenDTO } from '../dto/auth.dto';

const router = Router();

router.post('/register', authEncryption, validateDTO(RegisterDTO), AuthController.register);

router.post('/login', authEncryption, validateDTO(LoginDTO), AuthController.login);

router.post('/refresh', validateDTO(RefreshTokenDTO), AuthController.refreshToken);

router.get('/profile', verifyToken, AuthController.getProfile);

router.post('/test-encryption', AuthController.testEncryption);

export default router;