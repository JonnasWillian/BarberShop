const { Router } = require("express");
// const {getLivros, getLivro, postLivro, pathLivro, deleteLivro} = require("../controladores/livro");
const router = Router();
const User = require("./estruturaBanco");

// router.get('/', getLivros);

// router.get('/:id', getLivro);

// router.post('/', postLivro);

// router.patch('/:id', pathLivro);

// router.delete('/:id', deleteLivro);

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
    console.log(req.body.email)
    try {
        const email  = req.body.email;
        const senha = req.body.senha;
        const user = await User.findOne({ where: { email, senha } });

        if (user) {
            res.json({ exists: true, message: 'Usuário encontrado.', userId: user.id, userName: user.nome});
        } else {
            res.json({ exists: false, message: 'Usuário não encontrado.' });
        }
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
});

// Criar rota do plano mercado pago

module.exports = router;