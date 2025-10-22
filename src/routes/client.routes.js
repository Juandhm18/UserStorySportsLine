"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_controller_1 = __importDefault(require("../controllers/client.controller"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const client_dto_1 = require("../dto/client.dto");
const router = (0, express_1.Router)();
// Rutas de clientes con validaciones
router.get('/', auth_middleware_1.verifyToken, auth_middleware_1.requireAdminOrVendedor, (0, validation_middleware_1.validateQuery)(client_dto_1.ClientQueryDTO), client_controller_1.default.getAll);
router.get('/:id', auth_middleware_1.verifyToken, auth_middleware_1.requireAdminOrVendedor, (0, validation_middleware_1.validateParams)(client_dto_1.ClientParamsDTO), client_controller_1.default.getById);
router.post('/', auth_middleware_1.verifyToken, auth_middleware_1.requireAdmin, (0, validation_middleware_1.validateDTO)(client_dto_1.CreateClientDTO), client_controller_1.default.create);
router.put('/:id', auth_middleware_1.verifyToken, auth_middleware_1.requireAdmin, (0, validation_middleware_1.validateParams)(client_dto_1.ClientParamsDTO), (0, validation_middleware_1.validateDTO)(client_dto_1.UpdateClientDTO), client_controller_1.default.update);
router.delete('/:id', auth_middleware_1.verifyToken, auth_middleware_1.requireAdmin, (0, validation_middleware_1.validateParams)(client_dto_1.ClientParamsDTO), client_controller_1.default.delete);
exports.default = router;
//# sourceMappingURL=client.routes.js.map