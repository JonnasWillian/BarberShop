const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('barbearia', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql' // Escolha o dialeto do seu banco de dados
});

const User = sequelize.define('Users', {
    id_barbearia: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pix: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

// exportar mais de uma constante
module.exports = User;