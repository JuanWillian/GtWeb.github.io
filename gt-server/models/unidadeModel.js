const mongoose = require('mongoose');
const fs = require('node:fs');
const path = require('path');

const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '../conf/keys.json')));

const UnidadeSchema = new mongoose.Schema({
  key: { type: String, required: true },
  _empresaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Empresa', required: true },
  _cidadeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cidade', required: true },
  nome: { type: String, required: true }, 
  endereco: { type: String, required: false },
  complemento: { type: String, required: false },
});

const UnidadeModel = mongoose.model('Unidade', UnidadeSchema);

function Unidade(body) {
  this.body = body;
  this.errors = [];
  this.unidade = null;
}

Unidade.prototype.verificarExistencia = async function () {
  const unidadeJaCadastrada = await UnidadeModel.findOne({
    key: this.body.key,
    _empresaId: this.body._empresaId,
    _cidadeId: this.body._cidadeId,
    nome: this.body.nome, // Adicionado campo nome
    endereco: this.body.endereco,
  });
  if (unidadeJaCadastrada) {
    this.errors.push('Unidade já cadastrada.');
    return;
  }
}

Unidade.prototype.valida = async function () {
  await this.verificarExistencia();
  this.cleanUp();
  if (!keys.includes(this.body.key)) {
    this.errors.push('Key inválida.');
  }
};

Unidade.prototype.register = async function () {
  await this.valida();
  if (this.errors.length > 0) return;

  this.unidade = await UnidadeModel.create(this.body);
};

Unidade.prototype.edit = async function (id) {
  if (typeof id !== 'string') return;
  await this.valida();
  if (this.errors.length > 0) return;
  this.unidade = await UnidadeModel.findByIdAndUpdate(id, this.body, { new: true });
};

Unidade.buscaUnidades = async function (key, page, limit) {
  const skip = (page - 1) * limit;
  const unidades = await UnidadeModel.find({ key })
    .sort({ endereco: 1 })
    .skip(skip)
    .limit(parseInt(limit))
    .populate('_empresaId', 'nome')
    .populate('_cidadeId', 'nome');
  return unidades;
};

Unidade.delete = async function (id) {
  if (typeof id !== 'string') return;
  const unidade = await UnidadeModel.findOneAndDelete({ _id: id });
  return unidade;
};

Unidade.countDocuments = async function (key) {
  return await UnidadeModel.countDocuments({ key });
};

Unidade.prototype.cleanUp = function () {
  for (const field in this.body) {
    if (field !== 'key' && typeof this.body[field] === 'string') {
      this.body[field] = this.body[field].charAt(0).toUpperCase() + this.body[field].slice(1).toLowerCase();
    }
  }

  this.body = {
    key: this.body.key,
    _empresaId: this.body._empresaId,
    _cidadeId: this.body._cidadeId,
    nome: this.body.nome, 
    endereco: this.body.endereco,
    complemento: this.body.complemento,
  };
};

module.exports = Unidade;