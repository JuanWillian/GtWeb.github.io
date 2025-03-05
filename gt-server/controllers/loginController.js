const UsuarioERP = require('../models/usuarioERP');

exports.Verificarlogin = async (req, res) => {
    const { usuario, senha } = req.body;

    try {
        console.log(`Tentando encontrar usuário: ${usuario} com a senha: ${senha}`);

        // Adicionando log para verificar os dados enviados
        console.log(`Dados recebidos - Usuário: ${usuario}, Senha: ${senha}`);

        // Adicionando log para verificar a consulta
        const user = await UsuarioERP.findOne({ usuario, senha });
        console.log(`Consulta ao banco de dados - Resultado: ${user}`);

        if (user) {
            console.log('Usuário autenticado!');
            res.redirect('/pagPrincipal.html');
        } else {
            console.log('Usuário ou senha inválidos!');
            res.redirect('/index.html');
        }
    } catch (e) {
        console.log('Error: Could not connect to the database!', e);
        res.status(500).send('Internal Server Error');
    }
};