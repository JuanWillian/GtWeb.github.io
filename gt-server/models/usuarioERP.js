const mongoose = require('mongoose');

const usuarioERPSchema = new mongoose.Schema({
    key: String,
    usuario: String,
    senha: String
});

const UsuarioERP = mongoose.model('UsuarioERP', usuarioERPSchema);

module.exports = UsuarioERP;