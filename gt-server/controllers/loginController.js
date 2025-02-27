const { MongoClient } = require('mongodb');
const config = require('../conf/config.json');

const client = new MongoClient(config.mongoServer);
const database = client.db(config.mongoDatabase);
const usuarios = database.collection('usuarios');

exports.Verificarlogin = async (req, res) => {
    const { usuario, senha } = req.body;

    try {
        const user = await usuarios.findOne({ usuario, senha });

        if (user) {
            res.redirect('/pagprincipal.html');
        } else {
            res.redirect('/index.html');
            console.log('Usuário ou senha inválidos!');
        }
    } catch (e) {
        console.log('Error: Could not connect to the database!');
        res.status(500).send('Internal Server Error');
    }
};