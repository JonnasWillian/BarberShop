// Bibliotecas
const express = require('express');
const mercadopago = require('mercadopago');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

// Funções importadas no sistema
const router = require("./server/rotas");

// Configurando o servidor da API
const app = express();
const port = 3002;

// Configurando Cors
app.use(cors());

// banco de dados e credenciais do banco
const sequelize = new Sequelize('barbearia', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql' // Escolha o dialeto do seu banco de dados
});

// Função assíncrona para autenticar a conexão com o banco de dados
const authenticateDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão bem-sucedida com o banco de dados.');
    } catch (error) {
        console.error('Erro ao conectar com o banco de dados:', error);
    }
};

// Middleware para analisar o corpo das solicitações
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Chame a função para autenticar a conexão com o banco de dados
authenticateDatabase();

// Rotas da API
app.use('/api', router);

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor Express rodando na porta ${port}`);
});