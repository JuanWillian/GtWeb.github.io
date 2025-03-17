const mongoose = require('mongoose');
const fs = require('node:fs');
const path = require('path');

const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '../conf/keys.json')));

const CidadeSchema = new mongoose.Schema({
  key: { type: String, required: true },
  nome: { type: String, required: true },
});

const CidadeModel = mongoose.model('Cidade', CidadeSchema);

function Cidade(body) {
  this.body = body;
  this.errors = [];
  this.cidade = null;
}

Cidade.prototype.register = async function () {
  this.valida();
  if (this.errors.length > 0) return;

  const cidadeExistente = await CidadeModel.findOne({ nome: this.body.nome, key: this.body.key });
  if (cidadeExistente) {
    this.errors.push('Cidade já cadastrada.');
    return;
  }

  this.cidade = await CidadeModel.create(this.body);
};

Cidade.prototype.valida = function () {
  this.cleanUp();

  if (!this.body.nome) this.errors.push('Nome é um campo obrigatório.');
  if (!keys.includes(this.body.key)) {
    this.errors.push('Key inválida.');
  }
};

Cidade.prototype.cleanUp = function () {
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

Cidade.prototype.edit = async function (id) {
  if (typeof id !== 'string') return;
  this.valida();
  if (this.errors.length > 0) return;
  this.cidade = await CidadeModel.findByIdAndUpdate(id, this.body, { new: true });
};

Cidade.buscaPorId = async function (id) {
  if (typeof id !== 'string') return;
  const cidade = await CidadeModel.findById(id);
  return cidade;
};

Cidade.buscaCidades = async function (key, page, limit) {
  const skip = (page - 1) * limit;
  const cidades = await CidadeModel.find({ key })
    .sort({ nome: 1 })
    .skip(skip)
    .limit(parseInt(limit));
  return cidades;
};

Cidade.delete = async function (id) {
  if (typeof id !== 'string') return;
  const cidade = await CidadeModel.findOneAndDelete({ _id: id });
  return cidade;
};

Cidade.countDocuments = async function (key) {
  return await CidadeModel.countDocuments({ key });
};

module.exports = Cidade;