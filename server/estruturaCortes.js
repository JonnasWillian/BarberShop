const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('barbearia', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql' // Escolha o dialeto do seu banco de dados
});

const CortesAvulsos = sequelize.define('CortesAvulsos', {
    id_barbearia: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    mes: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ano: {
        type: DataTypes.STRING,
        allowNull: true
    },
    data: {
        type: DataTypes.DATE,
        allowNull: false
    },
    barbeiro: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    cliente: {
        type: DataTypes.STRING,
        allowNull: false
    },
    formaPagamento: {
        type: DataTypes.STRING,
        allowNull: false
    },
    preco: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    comissao: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
});

module.exports = CortesAvulsos;