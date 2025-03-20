const mongoose = require('mongoose');
const fs = require('node:fs');
const path = require('path');

const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '../conf/keys.json')));

const CidadeSchema = new mongoose.Schema({
  key: { type: String, required: true },
  nome: { type: String, required: true },
});

CidadeSchema.pre('findOneAndDelete', async function (next) {
  const cidadeId = this.getQuery()["_id"];
  await mongoose.model('Unidade').deleteMany({ _cidadeId: cidadeId });
  next();
});

const CidadeModel = mongoose.model('Cidade', CidadeSchema);

function Cidade(body) {
  this.body = body;
  this.errors = [];
  this.cidade = null;
}

Cidade.prototype.verificarExistencia = async function () {
  const cidadeExistente = await CidadeModel.findOne({
    key: this.body.key,
    nome: this.body.nome,
  })
  if (cidadeExistente) {
    this.errors.push("Cidade já cadastrada.")
    return
  }
}

Cidade.prototype.valida = async function () {
  await this.verificarExistencia();
  this.cleanUp();

  if (!this.body.nome) this.errors.push('Nome é um campo obrigatório.');
  if (!keys.includes(this.body.key)) {
    this.errors.push('Key inválida.');
  }
};

Cidade.prototype.register = async function () {
  await this.valida();
  if (this.errors.length > 0) return;

  this.cidade = await CidadeModel.create(this.body);
};

Cidade.prototype.cleanUp = function () {
  for (const field in this.body) {
    if (field !== 'key' && typeof this.body[field] === 'string') {
      this.body[field] = this.body[field].charAt(0).toUpperCase() + this.body[field].slice(1).toLowerCase();
    }
  }

  this.body = {
    key: this.body.key,
    nome: this.body.nome,
  };
};

Cidade.prototype.edit = async function (id) {
  if (typeof id !== 'string') return;
  await this.valida();
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