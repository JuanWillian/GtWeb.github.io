const mongoose = require('mongoose');
const fs = require('node:fs');
const path = require('path');

const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '../conf/keys.json')));

const ExecucaoSchema = new mongoose.Schema({
  key: { type: String, required: true },
  descricao: { type: String, required: true },
});

const execucaoModel = mongoose.model('Execucao', ExecucaoSchema);

function Execucao(body) {
  this.body = body;
  this.errors = [];
  this.execucao = null;
}

Execucao.prototype.register = async function () {
  this.valida();
  if (this.errors.length > 0) return;

  const execucaoExistente = await execucaoModel.findOne({ descricao: this.body.descricao, key: this.body.key });
  if (execucaoExistente) {
    this.errors.push('Execução já cadastrada.');
    return;
  }

  this.execucao = await execucaoModel.create(this.body);
};

Execucao.prototype.valida = function () {
  this.cleanUp();

  if (!this.body.descricao) this.errors.push('Descrição é um campo obrigatório.');
  if (!keys.includes(this.body.key)) {
    this.errors.push('Key inválida.');
  }
};

Execucao.prototype.cleanUp = function () {
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

Execucao.prototype.edit = async function (id) {
  if (typeof id !== 'string') return;
  this.valida();
  if (this.errors.length > 0) return;
  this.execucao = await execucaoModel.findByIdAndUpdate(id, this.body, { new: true });
};

Execucao.buscaPorId = async function (id) {
  if (typeof id !== 'string') return;
  const execucao = await execucaoModel.findById(id);
  return execucao;
};

Execucao.buscaExecucoes = async function (key, page, limit) {
  const skip = (page - 1) * limit;
  const execucoes = await execucaoModel.find({ key })
    .sort({ descricao: 1 })
    .skip(skip)
    .limit(parseInt(limit));
  return execucoes;
};

Execucao.delete = async function (id) {
  if (typeof id !== 'string') return;
  const execucao = await execucaoModel.findOneAndDelete({ _id: id });
  return execucao;
};

Execucao.countDocuments = async function (key) {
  return await execucaoModel.countDocuments({ key });
};

module.exports = Execucao;
