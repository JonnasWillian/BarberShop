const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('barbearia', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql' // Escolha o dialeto do seu banco de dados
});

const AgendaCorte = sequelize.define('AgendaCorte', {
    id_barbearia: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    id_usr: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    dia: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mes: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

// exportar mais de uma constante
module.exports = AgendaCorte;