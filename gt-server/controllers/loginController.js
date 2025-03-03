const path = require('path');
const { UsuarioERP } = require('../models/usuarioERP');

exports.index = (req, res) => {
    if (req.session.user) {
        return res.sendFile(path.resolve(__dirname, '../views/pagPrincipal.html'));
    }
    return res.sendFile(path.resolve(__dirname, '../views/index.html'));
};

exports.register = async function (req, res) {
    try {
        const usuarioERP = new UsuarioERP(req.body);
        const key = req.body.key; 
        await usuarioERP.register(key);

        if (usuarioERP.errors.length > 0) {
            console.log(usuarioERP.errors);
            req.session.save(function () {
                return res.redirect('back');
            });
            return;
        }

        console.log('Usuário registrado com sucesso.');
        req.session.save(function () {
            return res.redirect('/pagPrincipal.html');
        });
    } catch (e) {
        console.log('Error: Could not connect to the database!', e);

        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.write('500 Internal Server Error');
        res.end();
    }
};

exports.login = async function (req, res) {
    const { usuario, password } = req.body;

    try {
        console.log(`Tentando encontrar usuário: ${usuario} com a senha: ${password}`);

        // Adicionando log para verificar os dados enviados
        console.log(`Dados recebidos - Usuário: ${usuario}, Senha: ${password}`);

        const usuarioERP = new UsuarioERP(req.body);
        await usuarioERP.login();

        if (usuarioERP.errors.length > 0) {
            console.log(usuarioERP.errors);
            req.session.save(function () {
                return res.redirect('back');
            });
            return;
        }

        req.session.user = usuarioERP.user;
        console.log('Usuário logado com sucesso.');
        req.session.save(function (err) {
            if (err) {
                console.log('Erro ao salvar a sessão:', err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.write('500 Internal Server Error');
                res.end();
                return;
            }
            return res.redirect('/pagPrincipal.html');
        });
    } catch (e) {
        console.log('Error: Could not connect to the database!', e);

        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.write('500 Internal Server Error');
        res.end();
    }
};

exports.logout = function (req, res) {
    req.session.destroy();
    res.redirect('/index.html');
};