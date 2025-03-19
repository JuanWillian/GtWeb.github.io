const mongoose = require('mongoose');
const fs = require('node:fs');
const path = require('path');

const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '../conf/keys.json')));

const SetorPorUnidadeSchema = new mongoose.Schema({
  key: { type: String, required: true },
  _setorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Setor', required: true },
  _unidadeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Unidade', required: true },
});

const SetorPorUnidadeModel = mongoose.model('SetorPorUnidade', SetorPorUnidadeSchema);

function SetorPorUnidade(body) {
  this.body = body;
  this.errors = [];
  this.setorPorUnidade = null;
}

SetorPorUnidade.prototype.verificarExistencia = async function () {
  const setorPorUnidadeJaCadastrado = await SetorPorUnidadeModel.findOne({
    key: this.body.key,
    _setorId: this.body._setorId,
    _unidadeId: this.body._unidadeId,
  });
  if (setorPorUnidadeJaCadastrado) {
    this.errors.push('Setor por Unidade já cadastrado.');
    return;
  }
}

SetorPorUnidade.prototype.valida = async function () {
  await this.verificarExistencia();
  this.cleanUp();
  if (!keys.includes(this.body.key)) {
    this.errors.push('Key inválida.');
  }
};

SetorPorUnidade.prototype.register = async function () {
  await this.valida();
  if (this.errors.length > 0) return;

  this.setorPorUnidade = await SetorPorUnidadeModel.create(this.body);
};

SetorPorUnidade.prototype.edit = async function (id) {
  if (typeof id !== 'string') return;
  await this.valida();
  if (this.errors.length > 0) return;
  this.setorPorUnidade = await SetorPorUnidadeModel.findByIdAndUpdate(id, this.body, { new: true });
};

SetorPorUnidade.buscaSetoresPorUnidade = async function (key, page, limit) {
  const skip = (page - 1) * limit;
  const setoresPorUnidade = await SetorPorUnidadeModel.find({ key })
    .sort({ _unidadeId: 1 })
    .skip(skip)
    .limit(parseInt(limit))
    .populate('_setorId', 'nome')
    .populate('_unidadeId', 'nome');
  return setoresPorUnidade;
};

SetorPorUnidade.delete = async function (id) {
  if (typeof id !== 'string') return;
  const setorPorUnidade = await SetorPorUnidadeModel.findOneAndDelete({ _id: id });
  return setorPorUnidade;
};

SetorPorUnidade.countDocuments = async function (key) {
  return await SetorPorUnidadeModel.countDocuments({ key });
};

SetorPorUnidade.prototype.cleanUp = function () {
  for (const field in this.body) {
    if (field !== 'key' && typeof this.body[field] === 'string') {
      this.body[field] = this.body[field].charAt(0).toUpperCase() + this.body[field].slice(1).toLowerCase();
    }
  }

  this.body = {
    key: this.body.key,
    _setorId: this.body._setorId,
    _unidadeId: this.body._unidadeId,
  };
};

module.exports = SetorPorUnidade;