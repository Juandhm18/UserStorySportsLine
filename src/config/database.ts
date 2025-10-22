import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

// Configuración de PostgreSQL usando URI de conexión
const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
    dialect: 'postgres',
    logging: false,
});

console.log('Configurado para PostgreSQL con Supabase');

export default sequelize;