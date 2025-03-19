const mongoose = require('mongoose');
const fs = require('node:fs');
const path = require('path');

const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '../conf/keys.json')));

const MarcaSchema = new mongoose.Schema({
  key: { type: String, required: true },
  nome: { type: String, required: true },
});

const marcaModel = mongoose.model('Marca', MarcaSchema);

function Marca(body) {
  this.body = body;
  this.errors = [];
  this.marca = null;
}

Marca.prototype.verificarExistencia = async function () {
  const marcaExistente = await marcaModel.findOne({
    key: this.body.key,
    nome: this.body.nome,
  })
  if (marcaExistente) {
    this.errors.push("Marca já cadastrada.")
    return
  }
}

Marca.prototype.valida = async function () {
  await this.verificarExistencia();
  this.cleanUp();

  if (!this.body.nome) this.errors.push('Nome é um campo obrigatório.');
  if (!keys.includes(this.body.key)) {
    this.errors.push('Key inválida.');
  }
};

Marca.prototype.register = async function () {
  await this.valida();
  if (this.errors.length > 0) return;

  this.marca = await marcaModel.create(this.body);
};


Marca.prototype.cleanUp = function () {
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

Marca.prototype.edit = async function (id) {
  if (typeof id !== 'string') return;
  await this.valida();
  if (this.errors.length > 0) return;
  this.marca = await marcaModel.findByIdAndUpdate(id, this.body, { new: true });
};

Marca.buscaPorId = async function (id) {
  if (typeof id !== 'string') return;
  const marca = await marcaModel.findById(id);
  return marca;
};

Marca.buscaMarcas = async function (key, page, limit) {
  const skip = (page - 1) * limit;
  const marcas = await marcaModel.find({ key })
    .sort({ nome: 1 })
    .skip(skip)
    .limit(parseInt(limit));
  return marcas;
};

Marca.delete = async function (id) {
  if (typeof id !== 'string') return;
  const marca = await marcaModel.findOneAndDelete({ _id: id });
  return marca;
};

Marca.countDocuments = async function (key) {
  return await marcaModel.countDocuments({ key });
};

module.exports = Marca;
