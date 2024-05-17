const { Router } = require("express");
const router = Router();
const User = require("./estruturaBancoUser");
const AgendaCorte = require("./estruturaBancoAgenda");

router.post('/cadastro', async (req, res) => {
    var tipo = req.body.tipo ? req.body.tipo : 1;
    const nome = req.body.nome;
    const email = req.body.email;
    const telefone = req.body.telefone;
    const cpf = req.body.cpf;
    const senha = req.body.senha;
    console.log(req.body.tipo)

    try {
        const newUser = await User.create({ tipo, nome, email, telefone, cpf, senha });
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
        // Supondo que você esteja usando um ORM como Sequelize
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
        // Supondo que você esteja usando um ORM como Sequelize
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
        // Supondo que você esteja usando um ORM como Sequelize
        const id_barbearia = req.body.idBarbearia;
        const id_usr = req.body.usrId;
        const dia = req.body.dia;
        const mes = req.body.mes;
        
        const novaAgenda = await AgendaCorte.create({id_barbearia, id_usr, dia, mes});
        res.json({ message: 'Cadastro realizado com sucesso!', data: novaAgenda });
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ error: 'Erro ao buscar usuários' });
      }
})

router.post('/listarBarbearias', async (req, res) => {
    const id_usr = req.body.usrId;
    const mes = req.body.mes;
    try {
        // Supondo que você esteja usando um ORM como Sequelize
        const agendasDoMesDoUsuario = await AgendaCorte.findAll({ where: {id_usr, mes} });
        res.json(agendasDoMesDoUsuario);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ error: 'Erro ao buscar usuários' });
      }
})

// Rotas para funções das barbearias

module.exports = router;