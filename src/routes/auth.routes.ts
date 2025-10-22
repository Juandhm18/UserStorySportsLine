import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();

// Rutas de autenticación
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/refresh', AuthController.refreshToken);
router.get('/profile', verifyToken, AuthController.getProfile);

export default router;
