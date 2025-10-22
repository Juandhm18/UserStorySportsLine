"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Order extends sequelize_1.Model {
    id;
    clientId;
    userId;
    total;
    status;
    notes;
}
Order.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    clientId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'clients',
            key: 'id'
        }
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    total: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('pending', 'confirmed', 'cancelled', 'delivered'),
        allowNull: false,
        defaultValue: 'pending'
    },
    notes: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    }
}, {
    sequelize: database_1.default,
    modelName: 'Order',
    tableName: 'orders',
    timestamps: true,
});
exports.default = Order;
//# sourceMappingURL=order.model.js.map