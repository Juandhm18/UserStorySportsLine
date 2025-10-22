import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { verifyToken } from '../middlewares/auth.middleware';
import { validateDTO } from '../middlewares/validation.middleware';
import { RegisterDTO, LoginDTO, RefreshTokenDTO } from '../dto/auth.dto';

const router = Router();

// Rutas de autenticación
router.post('/register', validateDTO(RegisterDTO), AuthController.register);
router.post('/login', validateDTO(LoginDTO), AuthController.login);
router.post('/refresh', validateDTO(RefreshTokenDTO), AuthController.refreshToken);
router.get('/profile', verifyToken, AuthController.getProfile);

export default router;
