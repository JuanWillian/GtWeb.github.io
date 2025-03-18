const mongoose = require('mongoose');
const fs = require('node:fs');
const path = require('path');

const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '../conf/keys.json')));

const StatusAtividadeSchema = new mongoose.Schema({
  key: { type: String, required: true },
  descricao: { type: String, required: true },
});

const StatusAtividadeModel = mongoose.model('StatusAtividade', StatusAtividadeSchema);

function StatusAtividade(body) {
  this.body = body;
  this.errors = [];
  this.statusAtividade = null;
}

StatusAtividade.prototype.verificarExistencia = async function () {
  const statusAtividadeExistente = await StatusAtividadeModel.findOne({
    key: this.body.key,
    descricao: this.body.descricao,
  })
  if(statusAtividadeExistente){
    this.errors.push("Status de Atividade já cadastrada.")
    return
  }
}

StatusAtividade.prototype.valida = async function () {
  await this.verificarExistencia();
  this.cleanUp();

  if (!this.body.descricao) this.errors.push('Descrição é um campo obrigatório.');
  if (!keys.includes(this.body.key)) {
    this.errors.push('Key inválida.');
  }
};

StatusAtividade.prototype.register = async function () {
  await this.valida();
  if (this.errors.length > 0) return;

  this.statusAtividade = await StatusAtividadeModel.create(this.body);
};


StatusAtividade.prototype.cleanUp = function () {
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

StatusAtividade.prototype.edit = async function (id) {
  if (typeof id !== 'string') return;
  await this.valida();
  if (this.errors.length > 0) return;
  this.statusAtividade = await StatusAtividadeModel.findByIdAndUpdate(id, this.body, { new: true });
};

StatusAtividade.buscaPorId = async function (id) {
  if (typeof id !== 'string') return;
  const statusAtividade = await StatusAtividadeModel.findById(id);
  return statusAtividade;
};

StatusAtividade.buscaStatuses = async function (key, page, limit) {
  const skip = (page - 1) * limit;
  const statuses = await StatusAtividadeModel.find({ key })
    .sort({ descricao: 1 })
    .skip(skip)
    .limit(parseInt(limit));
  return statuses;
};

StatusAtividade.delete = async function (id) {
  if (typeof id !== 'string') return;
  const statusAtividade = await StatusAtividadeModel.findOneAndDelete({ _id: id });
  return statusAtividade;
};

StatusAtividade.countDocuments = async function (key) {
  return await StatusAtividadeModel.countDocuments({ key });
};

module.exports = StatusAtividade;