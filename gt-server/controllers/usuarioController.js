const Usuario = require('../models/usuarioModel');
const fs = require('node:fs');
const path = require('path');

const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '../conf/keys.json')));

exports.index = (req, res) => {
  try {
    if (req.session.user) {
      return res.redirect('/pagPrincipal');
    }
    return res.render('index');
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Erro ao carregar página.' });
  }
};

exports.login = async function (req, res) {
  try {
    if (req.session.user) {
      return res.redirect('/pagPrincipal');
    } else {
      const { usuario, password } = req.body;

      try {
        console.log(`Tentando encontrar usuário: ${usuario} com a senha: ${password}`);

        const usuarioLogin = new Usuario(req.body);
        await usuarioLogin.login();
        if (usuarioLogin.errors.length > 0) {
          console.log(usuarioLogin.errors);
          req.flash('error', usuarioLogin.errors);
          req.session.save(function () {
            return res.redirect('back');
          });
          return;
        }

        req.session.user = usuarioLogin.user;
        console.log('Usuário logado com sucesso.');
        req.session.save(function (err) {
          if (err) {
            console.log('Erro ao salvar a sessão:', err);
            req.flash('error', 'Erro ao salvar a sessão.');
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.write('500 Internal Server Error');
            res.end();
            return;
          }
          return res.redirect('/pagPrincipal');
        });
      } catch (e) {
        return res.status(500).json({ error: 'Erro ao efetuar login.' });
      }
    }
  }
  catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Erro ao carregar página.' });
  }

};

exports.logout = function (req, res) {
  try {
    req.session.destroy();
    res.redirect('/index');
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Erro ao efetuar logout.' });
  }
};

exports.register = async (req, res) => {
  try {
    const usuario = new Usuario(req.body);
    await usuario.register();

    if (usuario.errors.length > 0) {
      req.session.save(() => res.status(400).json({ errors: usuario.errors }));
      return;
    }

    req.session.save(() => res.status(200).json({ message: 'Usuario registrado com sucesso.' }));
    return;
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Erro ao registrar usuario.' });
  }
};

exports.edit = async function (req, res) {
  try {
    if (!req.params.id) return res.status(404).json({ error: 'Usuario não encontrado.' });
    const usuario = new Usuario(req.body);
    await usuario.edit(req.params.id);

    if (usuario.errors.length > 0) {
      req.session.save(() => res.status(400).json({ errors: usuario.errors }));
      return;
    }

    req.session.save(() => res.status(200).json({ message: 'Usuario editado com sucesso.' }));
    return;
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Erro ao editar usuario.' });
  }
};

exports.delete = async function (req, res) {
  try {
    if (!req.params.id) return res.status(404).json({ error: 'Usuario não encontrado.' });

    const usuario = await Usuario.delete(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario não encontrado.' });

    req.session.save(() => res.status(200).json({ message: 'Usuario apagado com sucesso.' }));
    return;
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Erro ao apagar usuario.' });
  }
};

exports.getUsuarios = async (req, res) => {
  try {
    const { key, page = 1, limit = 10 } = req.query;
    if (!keys.includes(key)) {
      return res.status(401).json({ error: 'Key inválida.' });
    }
    const usuarios = await Usuario.buscaUsuarios(key, page, limit);
    const totalUsuarios = await Usuario.countDocuments(key);
    res.json({ usuarios, totalUsuarios });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Erro ao buscar usuarios' });
  }
};

