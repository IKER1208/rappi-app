const { Sequelize } = require('sequelize');
const config = require('./src/config/db'); // Ajuste para que apunte al archivo src/config/db.js

const sequelize = new Sequelize(config.development); // Usando la configuración para el entorno de desarrollo

module.exports = sequelize;
