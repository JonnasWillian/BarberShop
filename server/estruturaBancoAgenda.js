const { Sequelize, DataTypes } = require('sequelize');
const User = require("./estruturaBancoUser");

const sequelize = new Sequelize('barbearia', 'root', '123456', {
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
        references: {
            model: User,
            key: 'id'
        }
    },
    dia: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ano: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    mes: {
        type: DataTypes.STRING,
        allowNull: false
    },
    horas: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

AgendaCorte.belongsTo(User, { foreignKey: 'id_usr' });
User.hasMany(AgendaCorte, { foreignKey: 'id' });

// exportar mais de uma constante
module.exports = AgendaCorte;