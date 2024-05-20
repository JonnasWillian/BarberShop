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
const sequelize = new Sequelize('barbearia', 'root', 'root', {
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

// Middleware para analisar o corpo das solicitações
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rota para processar o pagamento
app.post('/assinatura', async (req, res) => {
  console.log(req.body);
  const nome = req.body.nome;
  const numero_cartao = req.body.numero_cartao;
  const expiracao = req.body.expiracao;
  const cvv = req.body.cvv;
  const valor = req.body.valor;
  const barbearia = req.body.barbearia;

  if (isNaN(valor) || valor <= 0) {
    return res.status(400).json({ success: false, error: 'Valor de pagamento inválido' });
  }

  if (valor == "" || barbearia == "") {
    res.status(500).json({ success: false, error: 'Sem informação de planos ou barbearia selecionada' });
  } else {
    try {
      // Obtenha os dados do cartão do corpo da solicitação
  
      // Crie o pagamento no Mercado Pago
      const pagamento = await mercadopago.payment.create({
        transaction_amount: parseFloat(valor), // Converta o valor para um número
        token: numero_cartao, // Token do cartão de crédito
        description: 'Plano de assinatura', // Descrição opcional
        installments: 1, // Número de parcelas
        // payment_method_id: 'visa', // Método de pagamento (opcional)
        // payer: {
        //   email: 'email@cliente.com', // Email do cliente (opcional)
        // },
      });
  
      // Retorne a resposta do Mercado Pago
      res.json({ success: true, pagamento });
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      res.status(500).json({ success: false, error: 'Erro ao processar pagamento' });
    }
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
