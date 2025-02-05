require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./config/db');
const routes = require('./routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api', routes);

// Sincronizar la base de datos (solo en desarrollo, en producción usar migraciones)
sequelize.sync({ force: false }) // Cambiar a `true` si quieres borrar y recrear la BD en cada arranque
    .then(() => console.log('📦 Base de datos sincronizada'))
    .catch((error) => console.error('❌ Error al sincronizar la base de datos:', error));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;
