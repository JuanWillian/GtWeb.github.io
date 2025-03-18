const mongoose = require('mongoose');
const fs = require('node:fs');
const path = require('path');

const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '../conf/keys.json')));

const UnidadeMedidaSchema = new mongoose.Schema({
  key: { type: String, required: true },
  descricao: { type: String, required: true },
});

const unidadeMedidaModel = mongoose.model('UnidadeMedida', UnidadeMedidaSchema);

function UnidadeMedida(body) {
  this.body = body;
  this.errors = [];
  this.unidadeMedida = null;
}

UnidadeMedida.prototype.verificarExistencia = async function () {
  const unidadeMedidaExistente = await unidadeMedidaModel.findOne({
    key: this.body.key,
    descricao: this.body.descricao,
  })
  if(unidadeMedidaExistente){
    this.errors.push("Unidade de medida já cadastrada.")
    return
  }
}

UnidadeMedida.prototype.valida = async function () {
  await this.verificarExistencia();
  this.cleanUp();

  if (!this.body.descricao) this.errors.push('Descrição é um campo obrigatório.');
  if (!keys.includes(this.body.key)) {
    this.errors.push('Key inválida.');
  }
}

UnidadeMedida.prototype.register = async function () {
  await this.valida();
  if (this.errors.length > 0) return;

  const UnidadeMedidaExistente = await unidadeMedidaModel.findOne({ descricao: this.body.descricao, key: this.body.key });
  if (UnidadeMedidaExistente) {
    this.errors.push('Unidade de medida já cadastrada.');
    return;
  }

  this.unidadeMedida = await unidadeMedidaModel.create(this.body);
};


UnidadeMedida.prototype.cleanUp = function () {
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

UnidadeMedida.prototype.edit = async function (id) {
  if (typeof id !== 'string') return;
  await this.valida();
  if (this.errors.length > 0) return;
  this.unidadeMedida = await unidadeMedidaModel.findByIdAndUpdate(id, this.body, { new: true });
};

UnidadeMedida.buscaUnidadeMedidas = async function (key, page, limit) {
  const skip = (page - 1) * limit;
  const unidadeMedidas = await unidadeMedidaModel.find({ key })
    .sort({ descricao: 1 })
    .skip(skip)
    .limit(parseInt(limit));
  return unidadeMedidas;
};

UnidadeMedida.delete = async function (id) {
  if (typeof id !== 'string') return;
  const unidadeMedida = await unidadeMedidaModel.findOneAndDelete({ _id: id });
  return unidadeMedida;
};

UnidadeMedida.countDocuments = async function (key) {
  return await unidadeMedidaModel.countDocuments({ key });
};

module.exports = UnidadeMedida;
