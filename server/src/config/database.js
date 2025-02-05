const { Sequelize } = require('sequelize');
require('dotenv').config(); // Carga las variables de entorno

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, // Opcional para no ver logs de SQL en consola
});

module.exports = sequelize;
