"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItem = exports.Order = exports.Product = exports.Client = exports.User = void 0;
const user_model_1 = __importDefault(require("./user.model"));
exports.User = user_model_1.default;
const client_model_1 = __importDefault(require("./client.model"));
exports.Client = client_model_1.default;
const product_model_1 = __importDefault(require("./product.model"));
exports.Product = product_model_1.default;
const order_model_1 = __importDefault(require("./order.model"));
exports.Order = order_model_1.default;
const orderItem_model_1 = __importDefault(require("./orderItem.model"));
exports.OrderItem = orderItem_model_1.default;
// Asociaciones entre User y Order
user_model_1.default.hasMany(order_model_1.default, {
    foreignKey: 'userId',
    as: 'orders'
});
order_model_1.default.belongsTo(user_model_1.default, {
    foreignKey: 'userId',
    as: 'user'
});
// Asociaciones entre Client y Order
client_model_1.default.hasMany(order_model_1.default, {
    foreignKey: 'clientId',
    as: 'orders'
});
order_model_1.default.belongsTo(client_model_1.default, {
    foreignKey: 'clientId',
    as: 'client'
});
// Asociaciones entre Order y OrderItem
order_model_1.default.hasMany(orderItem_model_1.default, {
    foreignKey: 'orderId',
    as: 'items'
});
orderItem_model_1.default.belongsTo(order_model_1.default, {
    foreignKey: 'orderId',
    as: 'order'
});
// Asociaciones entre Product y OrderItem
product_model_1.default.hasMany(orderItem_model_1.default, {
    foreignKey: 'productId',
    as: 'orderItems'
});
orderItem_model_1.default.belongsTo(product_model_1.default, {
    foreignKey: 'productId',
    as: 'product'
});
// Asociación muchos a muchos entre Order y Product a través de OrderItem
order_model_1.default.belongsToMany(product_model_1.default, {
    through: orderItem_model_1.default,
    foreignKey: 'orderId',
    otherKey: 'productId',
    as: 'products'
});
product_model_1.default.belongsToMany(order_model_1.default, {
    through: orderItem_model_1.default,
    foreignKey: 'productId',
    otherKey: 'orderId',
    as: 'orders'
});
//# sourceMappingURL=associations.js.map