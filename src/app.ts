import express from 'express';
import sequelize from './config/database';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (_req, res) => {
    res.send(`Servidor corriendo con exito`);
});

sequelize.authenticate()
    .then(() => console.log('Conexion a la base de datos exitosa'))
    .catch((err) => console.error('Error al conectar a la base de datos:', err));

sequelize.sync({ alter: true })
    .then (() => console.log('Modelos sincronizados con la base de datos'))
    .catch ((err) => console.error('Error al sincronizar modelos:', err));

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto http://localhost:${PORT}`);
});