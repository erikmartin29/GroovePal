const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'mariadb',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
});

module.exports = sequelize;
