const fs = require('node:fs');
const path = require('path');
const mongoose = require('mongoose');
const { UsuarioERP, UsuarioERPModel } = require('../models/usuarioERP');

const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '../conf/keys.json')));

exports.index = (req, res) => {
    if (req.session.user) {
        return res.redirect('/pagPrincipal');
    }
    return res.render('index');
};

exports.register = async function (req, res) {
    try {
        const usuarioERP = new UsuarioERP(req.body);
        const key = req.body.key;
        await usuarioERP.register(key);

        if (usuarioERP.errors.length > 0) {
            console.log(usuarioERP.errors);
            req.flash('error', usuarioERP.errors);
            req.session.save(function () {
                return res.redirect('back');
            });
            return;
        }

        req.flash('success', 'Usuário registrado com sucesso.');
        console.log('Usuário registrado com sucesso.');
        req.session.save(function () {
            return res.redirect('/pagPrincipal');
        });
    } catch (e) {
        req.flash('error', 'Erro ao conectar ao banco de dados.');
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

        const usuarioERP = new UsuarioERP(req.body);
        await usuarioERP.login();

        if (usuarioERP.errors.length > 0) {
            console.log(usuarioERP.errors);
            req.flash('error', usuarioERP.errors);
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
                req.flash('error', 'Erro ao salvar a sessão.');
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.write('500 Internal Server Error');
                res.end();
                return;
            }
            return res.redirect('/pagPrincipal');
        });
    } catch (e) {
        console.log('Error: Could not connect to the database!', e);
        req.flash('error', 'Erro ao conectar ao banco de dados.');
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.write('500 Internal Server Error');
        res.end();
    }
};

exports.logout = function (req, res) {
    req.session.destroy();
    res.redirect('/index');
};


exports.getListaUsuarios = async (request, response) => {
    var key = request.query.key;

    if (typeof (key) != 'undefined') {
        if (keys.includes(key)) {
            try {
                const query = { 'key': key };
                const options = {
                    sort: { data: -1 },
                    projection: { _id: 0 }
                };

                console.log('Connecting to the database...');
                const cursor = UsuarioERPModel.find(query).sort(options.sort).select(options.projection);

                if ((await UsuarioERPModel.countDocuments(query)) === 0) {
                    console.log('Erro: Nenhum usuário cadastrado!');

                    response.writeHead(400, { 'Content-Type': 'text/plain' });
                    response.write('400 Bad Request');
                    response.end();
                } else {
                    var UsuarioERPList = [];

                    for await (const doc of cursor) {
                        UsuarioERPList.push(doc);
                    }

                    console.log(JSON.stringify(UsuarioERPList));
                    response.writeHead(200, { 'Content-Type': 'application/json' });
                    response.write(JSON.stringify(UsuarioERPList));
                    response.end();
                }
            } catch (e) {
                console.log('Error: Could not connect to the database!', e);

                response.writeHead(500, { 'Content-Type': 'text/plain' });
                response.write('500 Internal Server Error');
                response.end();

                return;
            }
        } else {
            console.log('Error: Unregistred key!');

            response.writeHead(401, { 'Content-Type': 'text/plain' });
            response.write('401 Unauthorized');
            response.end();
        }
    } else {
        console.log('Error: Undefined key!');

        response.writeHead(401, { 'Content-Type': 'text/plain' });
        response.write('401 Unauthorized');
        response.end();
    }
};

exports.deleteUsuario = async (request, response) => {
    var key = request.query.key;
    var usuario = request.query.usuario;

    if (!key || !usuario) {
        console.log('Error: Undefined key or usuario!');

        response.writeHead(401, { 'Content-Type': 'text/plain' });
        response.write('401 Unauthorized');
        response.end();
        return;
    }

    const query = { 'key': key, 'usuario': usuario };
    const options = {};

    const listaUsuarios = await UsuarioERPModel.findOne(query, options);

    if (listaUsuarios != null) {
        try {
            await UsuarioERPModel.deleteOne(query);
            console.log('User deleted!');

            response.writeHead(200, { 'Content-Type': 'text/plain' });
            response.write("Ok");
            response.end();
        } catch (e) {
            console.log('Error: Could not connect to the database!', e);

            response.writeHead(500, { 'Content-Type': 'text/plain' });
            response.write('500 Internal Server Error');
            response.end();

            return;
        }
    } else {
        console.log('Error: Invalid key or usuario!');

        response.writeHead(401, { 'Content-Type': 'text/plain' });
        response.write('401 Unauthorized');
        response.end();
    }
};

exports.deleteUsuarios = async (request, response) => {
    var pathname = request.path;

    var key = request.query.key;

    const query = { 'key': key };
    const options = {};

    const listaUsuarios = await UsuarioERPModel.findOne(query, options);
    console.log(listaUsuarios);

    if (listaUsuarios != null) {
        try {
            await UsuarioERPModel.collection.drop();

            response.writeHead(200, { 'Content-Type': 'text/plain' });
            response.write("Ok");
            response.end();
        } catch (e) {
            console.log('Error: Could not connect to the database!', e);

            response.writeHead(500, { 'Content-Type': 'text/plain' });
            response.write('500 Internal Server Error');
            response.end();

            return;
        }
    } else {
        console.log('Error: Invalid key!');

        response.writeHead(401, { 'Content-Type': 'text/plain' });
        response.write('401 Unauthorized');
        response.end();
    }
};

exports.deleteAll = async (request, response) => {
    var key = request.query.key;

    const query = { 'key': key };
    const options = {};

    const listaUsuarios = await UsuarioERPModel.findOne(query, options);
    console.log(listaUsuarios);

    if (listaUsuarios != null) {
        try {
            await mongoose.connection.dropDatabase();

            response.writeHead(200, { 'Content-Type': 'text/plain' });
            response.write("Ok");
            response.end();
        } catch (e) {
            console.log('Error: Could not connect to the database!', e);

            response.writeHead(500, { 'Content-Type': 'text/plain' });
            response.write('500 Internal Server Error');
            response.end();

            return;
        }
    } else {
        console.log('Error: Invalid key!');

        response.writeHead(401, { 'Content-Type': 'text/plain' });
        response.write('401 Unauthorized');
        response.end();
    }
};