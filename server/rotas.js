const { Router } = require("express");
const router = Router();
const User = require("./estruturaBancoUser");
const AgendaCorte = require("./estruturaBancoAgenda");
const CortesAvulsos = require("./estruturaCortes");

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('barbearia', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql' // Escolha o dialeto do seu banco de dados
});
sequelize.sync({ force: true }).then(() => {
  console.log('Tabelas sincronizadas');
}).catch(err => {
  console.error('Erro ao sincronizar tabelas:', err);
});


router.post('/cadastro', async (req, res) => {
    var tipo = req.body.tipo ? req.body.tipo : 1;
    const nome = req.body.nome;
    const email = req.body.email;
    const telefone = req.body.telefone;
    const cpf = req.body.cpf;
    const senha = req.body.senha;
    const pix = req.body.pix;

    try {
        const newUser = await User.create({ tipo, nome, email, telefone, cpf, senha, pix});
        res.json({ message: 'Cadastro realizado com sucesso!', data: newUser });
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.status(500).json({ error: 'Erro ao cadastrar usuário' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const email  = req.body.email;
        const senha = req.body.senha;
        const user = await User.findOne({ where: { email, senha } });

        if (user) {
            res.json({ exists: true, message: 'Usuário encontrado.', userId: user.id, userName: user.nome, tipo: user.tipo, id_barbearia:user.id_barbearia});
        } else {
            res.json({ exists: false, message: 'Usuário não encontrado.' });
        }
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
});

// Rotas para funções dos clientes
router.get('/listaBarbearias', async (req, res) => {
    try {
        const barbearias = await User.findAll({ where: { tipo: 2 } });
        res.json(barbearias);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ error: 'Erro ao buscar usuários' });
      }
})

router.post('/associarBarbearia', async (req, res) => {
    const idUser = req.body.idUser;
    const barbearia = req.body.barbeariaSelecionada;
    console.log(req.body)

    try {
        // Encontrar o usuário pelo ID
        const usuario = await User.findByPk(idUser);
    
        if (!usuario) {
          return res.status(404).json({ error: 'Usuário não encontrado' });
        }
    
        // Atualizar os campos do usuário
        usuario.id_barbearia = barbearia;
    
        // Salvar as mudanças
        await usuario.save();

        res.json({ message: 'Usuário atualizado com sucesso', usuario });
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.status(500).json({ error: 'Erro ao cadastrar usuário' });
    }
});

router.post('/dadosBarbeariaAssociada', async (req, res) => {
    try {
        console.log(req.body)
        const barbearia = await User.findAll({ where: { id: req.body.id } });
        res.json(barbearia);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ error: 'Erro ao buscar usuários' });
      }
})

router.post('/agendarCorte', async (req, res) => {
    try {
        const id_barbearia = req.body.idBarbearia;
        const id_usr = req.body.usrId;
        const dia = req.body.dia;
        const mes = req.body.mes;
        const ano = req.body.ano;
        const horas = req.body.hora;
        console.log(req.body)
        
        const novaAgenda = await AgendaCorte.create({id_barbearia, id_usr, dia, ano, mes, horas});
        res.json({ message: 'Cadastro realizado com sucesso!', data: novaAgenda });
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ error: 'Erro ao buscar usuários' });
      }
})

router.post('/listarBarbearias', async (req, res) => {
    const id_usr = req.body.usrId;
    const mes = req.body.mes;
    const ano = req.body.ano;
    try {
        const agendasDoMesDoUsuario = await AgendaCorte.findAll({ where: {id_usr, mes, ano} });
        res.json(agendasDoMesDoUsuario);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ error: 'Erro ao buscar usuários' });
      }
})

// Rotas para funções das barbearias
router.post('/membrosBarbearia', async (req, res) => {
    const id_barbearia = req.body.id;
    try {
        const membros = await User.findAll({ where: {id_barbearia} });
        res.json(membros);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ error: 'Erro ao buscar usuários' });
      }
})

router.post('/cadastrarCorte', async (req, res) => {
    const id_barbearia = req.body.id_barbearia;
    const data = req.body.dataAtual;
    const descricao = req.body.corte;
    const barbeiro = req.body.barbeiro;
    const mes = req.body.month;
    const ano = req.body.year;
    const cliente = req.body.cliente;
    const formaPagamento = req.body.pagamento;
    const preco = req.body.preco;
    const comissao = req.body.comissao;
    console.log(req.body);

    try {
        const newUser = await CortesAvulsos.create({id_barbearia, mes, ano, descricao, data, barbeiro, cliente, formaPagamento, preco, comissao});
        res.json({ message: 'Cadastro do corte realizado com sucesso!', data: newUser });
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.status(500).json({ error: 'Erro ao cadastrar o corte, verifique os dados inseridos' });
    }
});

router.post('/buscarCortesBarbearia', async (req, res) => {
    const id_barbearia = req.body.id;
    const mes = req.body.mes;
    const ano = req.body.ano;

    try {
        const cortes = await CortesAvulsos.findAll({ where: {id_barbearia, mes, ano} });
        res.json(cortes);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ error: 'Erro ao buscar usuários' });
      }
})

router.post('/buscarCortesDoMes', async (req, res) => {
  const id_barbearia = req.body.id_barbearia;
  const mes = req.body.mes;
  const ano = req.body.ano;

  try {
      const cortes = await CortesAvulsos.findAll({ where: {id_barbearia, mes, ano} });
      res.json(cortes);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
})

router.post('/listarAgendaCortesBarbearias', async (req, res) => {
  const id_barbearia = req.body.usrId;
  const mes = req.body.mes;
  console.log(req.body)
  try {
      const agendasDoMesDoUsuario =  await AgendaCorte.findAll({
        where: { id_barbearia, mes },
        include: [{
          model: User,
          required: true
        }]
      });
      res.json(agendasDoMesDoUsuario);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
})

module.exports = router;