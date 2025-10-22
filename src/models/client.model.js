"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Client extends sequelize_1.Model {
    id;
    name;
    email;
    phone;
    address;
    document;
}
Client.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    address: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    document: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    modelName: 'Client',
    tableName: 'clients',
    timestamps: true,
});
exports.default = Client;
//# sourceMappingURL=client.model.js.map