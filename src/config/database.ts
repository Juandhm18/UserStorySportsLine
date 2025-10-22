import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

// Función para crear instancia de Sequelize
function createSequelizeInstance(): Sequelize {
    // Si se fuerza SQLite, usar SQLite
    if (process.env.FORCE_SQLITE === 'true') {
        console.log('Usando SQLite (forzado)');
        return new Sequelize({
            dialect: 'sqlite',
            storage: './database.sqlite',
            logging: false,
        });
    }

    // Si se especifica PostgreSQL, intentar usarlo
    if (process.env.DB_HOST && process.env.DB_HOST !== 'localhost') {
        console.log('Configurado para PostgreSQL remoto');
        return new Sequelize(
            process.env.DB_NAME as string,
            process.env.DB_USER as string,
            process.env.DB_PASSWORD as string,
            {
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT) || 5432,
                dialect: 'postgres',
                logging: false,
            }
        );
    }

    // Por defecto, usar SQLite para desarrollo local
    console.log('Usando SQLite (desarrollo local)');
    return new Sequelize({
        dialect: 'sqlite',
        storage: './database.sqlite',
        logging: false,
    });
}

const sequelize = createSequelizeInstance();

export default sequelize;