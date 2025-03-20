const mongoose = require('mongoose');
const fs = require('node:fs');
const path = require('path');

const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '../conf/keys.json')));

const UsuarioSchema = new mongoose.Schema({
  key: { type: String, required: true },
  nome: { type: String, required: true },
  sobreNome: { type: String, required: true },
  email: { type: String, required: false },
  usuario: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  _cargoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cargo', required: true },
  _setorPorUnidadeId: { type: mongoose.Schema.Types.ObjectId, ref: 'SetorPorUnidade', required: true },
});

const UsuarioModel = mongoose.model('Usuario', UsuarioSchema);

function Usuario(body) {
  this.body = body;
  this.errors = [];
  this.usuario = null;
}

Usuario.prototype.verificarExistencia = async function () {
  const usuarioJaCadastrado = await UsuarioModel.findOne({
    key: this.body.key,
    usuario: this.body.usuario,

  });
  if (usuarioJaCadastrado) {
    this.errors.push('Usuário já cadastrado.');
    return;
  }
}

Usuario.prototype.valida = async function () {
  await this.verificarExistencia();
  this.cleanUp();
  if (!keys.includes(this.body.key)) {
    this.errors.push('Key inválida.');
  }
};

Usuario.prototype.login = async function () {
  try {
    this.user = await UsuarioModel.findOne({ usuario: this.body.usuario })
      .populate('_cargoId', 'nome')

    if (!this.user) {
      this.errors.push('Usuário não existe.');
      return;
    }

    console.log(`Usuário encontrado: ${this.user.usuario}, Senha: ${this.user.password}, Cargo: ${this.user._cargoId ? this.user._cargoId.nome : 'N/A'}`);

    if (this.body.password !== this.user.password) {
      this.errors.push('Senha inválida');
      this.user = null;
      return;
    }

    if (this.user._cargoId.nome !== 'Gerente') {
      this.errors.push('Cargo inválido.');
      this.user = null;
      return;
    }
  } catch (error) {
    this.errors.push('Erro ao tentar fazer login.');
  }
}

Usuario.prototype.register = async function () {
  await this.valida();
  if (this.errors.length > 0) return;

  this.usuario = await UsuarioModel.create(this.body);
};

Usuario.prototype.edit = async function (id) {
  try {
    if (typeof id !== 'string') return;
    this.cleanUp();
    if (!keys.includes(this.body.key)) {
      this.errors.push('Key inválida.');
    }
    if (this.errors.length > 0) return;

    this.usuario = await UsuarioModel.findByIdAndUpdate(id, this.body, { new: true });
  } catch (error) {

    if (error.code === 11000 && error.keyPattern && error.keyPattern.usuario) {
      this.errors.push('O nome de usuário já está em uso.');
    } else {
      this.errors.push('Erro ao tentar editar usuário.');
    }
  }
};

Usuario.buscaUsuarios = async function (key, page, limit) {
  const skip = (page - 1) * limit;
  const usuarios = await UsuarioModel.find({ key })
    .sort({ nome: 1 })
    .skip(skip)
    .limit(parseInt(limit))
    .populate('_cargoId', 'nome')
    .populate({
      path: '_setorPorUnidadeId',
      populate: [
        { path: '_unidadeId', select: 'nome' },
        { path: '_setorId', select: 'nome' }
      ]
    });
  return usuarios;
};

Usuario.delete = async function (id) {
  if (typeof id !== 'string') return;
  const usuario = await UsuarioModel.findOneAndDelete({ _id: id });
  return usuario;
};

Usuario.countDocuments = async function (key) {
  return await UsuarioModel.countDocuments({ key });
};

Usuario.prototype.cleanUp = function () {
  for (const field in this.body) {
    if (field !== 'key' && typeof this.body[field] === 'string' && field == 'nome') {
      this.body[field] = this.body[field].charAt(0).toUpperCase() + this.body[field].slice(1).toLowerCase();
    }
  }

  this.body = {
    key: this.body.key,
    nome: this.body.nome,
    sobreNome: this.body.sobreNome,
    email: this.body.email,
    usuario: this.body.usuario,
    password: this.body.password,
    _cargoId: this.body._cargoId,
    _setorPorUnidadeId: this.body._setorPorUnidadeId,
  };
};

module.exports = Usuario;