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
const port = 3002; // Porta que o servidor irá escutar

// Middleware
app.use(cors());
app.use(bodyParser.json());

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

console.log(process.env.TESTE_ACCESS_TOKEN);

// Acesso ao MercadoPago
mercadopago.configure({
    access_token: process.env.TESTE_ACCESS_TOKEN,
});

// Middleware para permitir análise de corpos de solicitação
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/assinatura', async (req, res) => {
    try {
      const { nome, numero_cartao, expiracao, cvv } = req.body;
  
      // Criar a assinatura no Mercado Pago
      const assinatura = await mercadopago.preapproval.create({
        payer_email: 'EMAIL_DO_CLIENTE', // Substitua pelo email do cliente
        back_url: 'URL_DE_RETORNO', // URL de retorno após a compra
        reason: 'Descrição da Assinatura',
        external_reference: 'ID_DO_CLIENTE_OU_OUTRO_IDENTIFICADOR',
        auto_recurring: {
          frequency: 1, // Frequência de cobrança (1 = mensal)
          frequency_type: 'months', // Tipo de frequência
          transaction_amount: 100, // Valor da assinatura em centavos (R$1,00)
          currency_id: 'BRL', // Moeda
          start_date: new Date().toISOString(), // Data de início da assinatura
        },
        payment_method_id: 'visa', // Método de pagamento (opcional)
        card_token_id: 'TOKEN_DO_CARTAO', // Token do cartão de crédito
      });
  
      res.json({ success: true, assinatura });
    } catch (error) {
      console.error('Erro ao criar assinatura:', error);
      res.status(500).json({ success: false, error: 'Erro ao criar assinatura' });
    }
  });
  

// Chame a função para autenticar a conexão com o banco de dados
authenticateDatabase();

// Rotas da API
app.use('/api', router);

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor Express rodando na porta ${port}`);
});
