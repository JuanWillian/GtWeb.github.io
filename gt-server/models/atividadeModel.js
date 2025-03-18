const mongoose = require('mongoose');
const fs = require('node:fs');
const path = require('path');

const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '../conf/keys.json')));

const AtividadeSchema = new mongoose.Schema({
  key: { type: String, required: true },
  nome: { type: String, required: true },
});

const atividadeModel = mongoose.model('Atividade', AtividadeSchema);

function Atividade(body) {
  this.body = body;
  this.errors = [];
  this.atividade = null;
}

Atividade.prototype.verificarExistencia = async function () {
  const atividadeExistente = await atividadeModel.findOne({
    key: this.body.key,
    nome: this.body.nome,
  })
  if(atividadeExistente){
    this.errors.push("Atividade já cadastrada.")
    return
  }
}

Atividade.prototype.valida = async function () {
  await this.verificarExistencia();
  this.cleanUp();

  if (!this.body.nome) this.errors.push('Nome é um campo obrigatório.');
  if (!keys.includes(this.body.key)) {
    this.errors.push('Key inválida.');
  }
};

Atividade.prototype.register = async function () {
  await this.valida();
  if (this.errors.length > 0) return;

  this.atividade = await atividadeModel.create(this.body);
};


Atividade.prototype.cleanUp = function () {
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

Atividade.prototype.edit = async function (id) {
  if (typeof id !== 'string') return;
  await this.valida();
  if (this.errors.length > 0) return;
  this.atividade = await atividadeModel.findByIdAndUpdate(id, this.body, { new: true });
};

Atividade.buscaPorId = async function (id) {
  if (typeof id !== 'string') return;
  const atividade = await atividadeModel.findById(id);
  return atividade;
};

Atividade.buscaAtividades = async function (key, page, limit) {
  const skip = (page - 1) * limit;
  const atividades = await atividadeModel.find({ key })
    .sort({ nome: 1 })
    .skip(skip)
    .limit(parseInt(limit));
  return atividades;
};

Atividade.delete = async function (id) {
  if (typeof id !== 'string') return;
  const atividade = await atividadeModel.findOneAndDelete({ _id: id });
  return atividade;
};

Atividade.countDocuments = async function (key) {
  return await atividadeModel.countDocuments({ key });
};

module.exports = Atividade;
