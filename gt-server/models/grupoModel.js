const mongoose = require('mongoose');
const fs = require('node:fs');
const path = require('path');

const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '../conf/keys.json')));

const GrupoSchema = new mongoose.Schema({
  key: { type: String, required: true },
  nome: { type: String, required: true },
});

const grupoModel = mongoose.model('Grupo', GrupoSchema);

function Grupo(body) {
  this.body = body;
  this.errors = [];
  this.grupo = null;
}

Grupo.prototype.verificarExistencia = async function () {
  const grupoExistente = await grupoModel.findOne({
    key: this.body.key,
    nome: this.body.nome,
  })
  if(grupoExistente){
    this.errors.push("Grupo já cadastrado.")
    return
  }
}

Grupo.prototype.valida = async function () {
  await this.verificarExistencia();
  this.cleanUp();

  if (!this.body.nome) this.errors.push('Nome é um campo obrigatório.');
  if (!keys.includes(this.body.key)) {
    this.errors.push('Key inválida.');
  }
};

Grupo.prototype.register = async function () {
  await this.valida();
  if (this.errors.length > 0) return;

  const grupoExistente = await grupoModel.findOne({ nome: this.body.nome, key: this.body.key });
  if (grupoExistente) {
    this.errors.push('Grupo já cadastrado.');
    return;
  }

  this.grupo = await grupoModel.create(this.body);
};


Grupo.prototype.cleanUp = function () {
  for (const key in this.body) {
    if (typeof this.body[key] !== 'string') {
      this.body[key] = '';
    }
  }

  this.body = {
    key: this.body.key,
    nome: this.body.nome,
  };
};

Grupo.prototype.edit = async function (id) {
  if (typeof id !== 'string') return;
  await this.valida();
  if (this.errors.length > 0) return;
  this.grupo = await grupoModel.findByIdAndUpdate(id, this.body, { new: true });
};

Grupo.buscaPorId = async function (id) {
  if (typeof id !== 'string') return;
  const grupo = await grupoModel.findById(id);
  return grupo;
};

Grupo.buscaGrupos = async function (key, page, limit) {
  const skip = (page - 1) * limit;
  const grupos = await grupoModel.find({ key })
    .sort({ nome: 1 })
    .skip(skip)
    .limit(parseInt(limit));
  return grupos;
};

Grupo.delete = async function (id) {
  if (typeof id !== 'string') return;
  const grupo = await grupoModel.findOneAndDelete({ _id: id });
  return grupo;
};

Grupo.countDocuments = async function (key) {
  return await grupoModel.countDocuments({ key });
};

module.exports = Grupo;
