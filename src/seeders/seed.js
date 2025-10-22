"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../config/database"));
const product_model_1 = __importDefault(require("../models/product.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
async function runSeeds() {
    try {
        await database_1.default.authenticate();
        console.log('Conexión establecida correctamente.');
        await database_1.default.sync({ alter: true });
        // Seed de usuario admin
        const [admin, created] = await user_model_1.default.findOrCreate({
            where: { email: 'admin@example.com' },
            defaults: {
                name: 'Administrator',
                email: 'admin@example.com',
                password: 'admin123',
                rol: 'admin',
            },
        });
        if (created) {
            console.log('Usuario admin creado.');
        }
        else {
            console.log('Usuario admin ya existía.');
        }
        // Seed de productos iniciales
        const products = [
            { name: 'Camiseta deportiva', price: 89.99, stock: 10 },
            { name: 'Balón profesional', price: 129.99, stock: 5 },
            { name: 'Tenis running', price: 259.99, stock: 8 },
        ];
        for (const p of products) {
            const [product, creado] = await product_model_1.default.findOrCreate({
                where: { name: p.name },
                defaults: p,
            });
            if (creado)
                console.log(`Producto creado: ${product.name}`);
        }
        console.log('Seeds ejecutados correctamente.');
        process.exit(0);
    }
    catch (error) {
        console.error('Error ejecutando seeds:', error);
        process.exit(1);
    }
}
runSeeds();
//# sourceMappingURL=seed.js.map