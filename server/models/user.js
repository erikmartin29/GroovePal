const { DataTypes } = require('sequelize');
const sequelize = require('../database/MariaDBConnection');

const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    user_pass: {
        type: DataTypes.STRING,
        allowNull: false,       
    },
    user_fname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_lname: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = User;
