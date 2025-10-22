import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class User extends Model {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public rol!: string;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rol: {
        type: DataTypes.STRING,
        defaultValue: 'user'
    },
},{
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
});

export default User;