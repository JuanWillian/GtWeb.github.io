const mongoose = require('mongoose');
const fs = require('node:fs');
const path = require('path');

const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '../conf/keys.json')));

const StatusUsuarioSchema = new mongoose.Schema({
  key: { type: String, required: true },
  descricao: { type: String, required: true },
});

const StatusUsuarioModel = mongoose.model('StatusUsuario', StatusUsuarioSchema);

function StatusUsuario(body) {
  this.body = body;
  this.errors = [];
  this.statusUsuario = null;
}

StatusUsuario.prototype.verificarExistencia = async function () {
  const statusUsuarioExistente = await StatusUsuarioModel.findOne({
    key: this.body.key,
    descricao: this.body.descricao,
  })
  if(statusUsuarioExistente){
    this.errors.push("Status de Atividade já cadastrada.")
    return
  }
}

StatusUsuario.prototype.valida = async function () {
  await this.verificarExistencia();
  this.cleanUp();

  if (!this.body.descricao) this.errors.push('Descrição é um campo obrigatório.');
  if (!keys.includes(this.body.key)) {
    this.errors.push('Key inválida.');
  }
}

StatusUsuario.prototype.register = async function () {
  await this.valida();
  if (this.errors.length > 0) return;

  this.statusUsuario = await StatusUsuarioModel.create(this.body);
};

StatusUsuario.prototype.cleanUp = function () {
  for (const key in this.body) {
    if (typeof this.body[key] !== 'string') {
      this.body[key] = '';
    }
  }

  this.body = {
    key: this.body.key,
    descricao: this.body.descricao,
  };
};

StatusUsuario.prototype.edit = async function (id) {
  if (typeof id !== 'string') return;
  await this.valida();
  if (this.errors.length > 0) return;
  this.statusUsuario = await StatusUsuarioModel.findByIdAndUpdate(id, this.body, { new: true });
};

StatusUsuario.buscaPorId = async function (id) {
  if (typeof id !== 'string') return;
  const statusUsuario = await StatusUsuarioModel.findById(id);
  return statusUsuario;
};

StatusUsuario.buscaStatuses = async function (key, page, limit) {
  const skip = (page - 1) * limit;
  const statuses = await StatusUsuarioModel.find({ key })
    .sort({ descricao: 1 })
    .skip(skip)
    .limit(parseInt(limit));
  return statuses;
};

StatusUsuario.delete = async function (id) {
  if (typeof id !== 'string') return;
  const statusUsuario = await StatusUsuarioModel.findOneAndDelete({ _id: id });
  return statusUsuario;
};

StatusUsuario.countDocuments = async function (key) {
  return await StatusUsuarioModel.countDocuments({ key });
};

module.exports = StatusUsuario;