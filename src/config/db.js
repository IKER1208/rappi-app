require('dotenv').config(); // Asegúrate de cargar las variables de entorno

module.exports = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: 'mysql',
        migrationStorageTableName: 'sequelize_meta',
        migrations: [
            './migrations/*.js'  // Cambia a la ruta correcta en la raíz
        ]

    },
    test: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: 'mysql',
        migrationStorageTableName: 'sequelize_meta',
        migrations: [
            './migrations/*.js'  // Cambia a la ruta correcta en la raíz
        ]

    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: 'mysql',
        migrationStorageTableName: 'sequelize_meta',
        migrations: [
            './migrations/*.js'  // Cambia a la ruta correcta en la raíz
        ]

    }
};
