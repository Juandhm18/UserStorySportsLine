"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const swagger_1 = require("./config/swagger");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const client_routes_1 = __importDefault(require("./routes/client.routes"));
const order_routes_1 = __importDefault(require("./routes/order.routes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
// Swagger documentation
app.use('/api-docs', swagger_1.swaggerUi.serve, swagger_1.swaggerUi.setup(swagger_1.specs, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'SportsLine API Documentation'
}));
// Rutas
app.use('/api/auth', auth_routes_1.default);
app.use('/api/products', product_routes_1.default);
app.use('/api/clients', client_routes_1.default);
app.use('/api/orders', order_routes_1.default);
app.get('/', (_req, res) => {
    res.send(`Servidor corriendo con exito`);
});
database_1.default.authenticate()
    .then(() => console.log('Conexion a la base de datos exitosa'))
    .catch((err) => console.error('Error al conectar a la base de datos:', err));
database_1.default.sync({ alter: true })
    .then(() => console.log('Modelos sincronizados con la base de datos'))
    .catch((err) => console.error('Error al sincronizar modelos:', err));
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto http://localhost:${PORT}`);
});
//# sourceMappingURL=app.js.map