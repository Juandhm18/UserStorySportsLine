import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

// Configuración de PostgreSQL
const sequelize = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASSWORD as string,
    {
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 5432,
        dialect: 'postgres',
        logging: false,
    }
);

console.log('Configurado para PostgreSQL');

export default sequelize;