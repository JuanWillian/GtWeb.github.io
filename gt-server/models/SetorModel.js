const mongoose = require('mongoose');
const fs = require('node:fs');
const path = require('path');

const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '../conf/keys.json')));

const SetorSchema = new mongoose.Schema({
  key: { type: String, required: true },
  nome: { type: String, required: true },
  descricao: { type: String, required: false, default: '' },
});

const SetorModel = mongoose.model('Setor', SetorSchema);

function Setor(body) {
  this.body = body;
  this.errors = [];
  this.setor = null;
}

Setor.prototype.verificarExistencia = async function () {
  const setorExistente = await SetorModel.findOne({
    key: this.body.key,
    nome: this.body.nome,
    descricao: this.body.descricao,
  })
  if (setorExistente) {
    this.errors.push("Setor já cadastrado.")
    return
  }
}

Setor.prototype.valida = async function () {
  await this.verificarExistencia();
  this.cleanUp();

  if (!this.body.nome) this.errors.push('Nome é um campo obrigatório.');
  if (!keys.includes(this.body.key)) {
    this.errors.push('Key inválida.');
  }
};

Setor.prototype.register = async function () {
  await this.valida();
  if (this.errors.length > 0) return;

  this.setor = await SetorModel.create(this.body);
};


Setor.prototype.cleanUp = function () {
  for (const field in this.body) {
    if (field !== 'key' && typeof this.body[field] === 'string') {
      this.body[field] = this.body[field].charAt(0).toUpperCase() + this.body[field].slice(1).toLowerCase();
    }
  }

  this.body = {
    key: this.body.key,
    nome: this.body.nome,
    descricao: this.body.descricao,
  };
};

Setor.prototype.edit = async function (id) {
  if (typeof id !== 'string') return;
  await this.valida();
  if (this.errors.length > 0) return;
  this.setor = await SetorModel.findByIdAndUpdate(id, this.body, { new: true });
};

Setor.buscaPorId = async function (id) {
  if (typeof id !== 'string') return;
  const setor = await SetorModel.findById(id);
  return setor;
};

Setor.buscaSetores = async function (key, page, limit) {
  const skip = (page - 1) * limit;
  const setores = await SetorModel.find({ key })
    .sort({ nome: 1 })
    .skip(skip)
    .limit(parseInt(limit));
  return setores;
};

Setor.delete = async function (id) {
  if (typeof id !== 'string') return;
  const setor = await SetorModel.findOneAndDelete({ _id: id });
  return setor;
};

Setor.countDocuments = async function (key) {
  return await SetorModel.countDocuments({ key });
};

module.exports = Setor;
