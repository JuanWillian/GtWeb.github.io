const mongoose = require('mongoose');
const fs = require('node:fs');
const path = require('path');

const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '../conf/keys.json')));

const CargoSchema = new mongoose.Schema({
  key: { type: String, required: true },
  nome: { type: String, required: true },
});

CargoSchema.pre('findOneAndDelete', async function (next) {
  const cargoId = this.getQuery()["_id"];
  await mongoose.model('Usuario').deleteMany({ _cargoId: cargoId });
  next();
});

const CargoModel = mongoose.model('Cargo', CargoSchema);

function Cargo(body) {
  this.body = body;
  this.errors = [];
  this.cargo = null;
}

Cargo.prototype.verificarExistencia = async function () {
  const cargoExistente = await CargoModel.findOne({
    key: this.body.key,
    nome: this.body.nome,
  })
  if (cargoExistente) {
    this.errors.push("Cargo já cadastrado.")
    return
  }
}

Cargo.prototype.valida = async function () {
  await this.verificarExistencia();
  this.cleanUp();

  if (!this.body.nome) this.errors.push('Nome é um campo obrigatório.');
  if (!keys.includes(this.body.key)) {
    this.errors.push('Key inválida.');
  }
};

Cargo.prototype.register = async function () {
  await this.valida();
  if (this.errors.length > 0) return;

  this.cargo = await CargoModel.create(this.body);
};

Cargo.prototype.cleanUp = function () {
  this.body = {
    key: this.body.key,
    nome: this.body.nome,
  };
};

Cargo.prototype.edit = async function (id) {
  if (typeof id !== 'string') return;
  await this.valida();
  if (this.errors.length > 0) return;
  this.cargo = await CargoModel.findByIdAndUpdate(id, this.body, { new: true });
};

Cargo.buscaPorId = async function (id) {
  if (typeof id !== 'string') return;
  const cargo = await CargoModel.findById(id);
  return cargo;
};

Cargo.buscaCargos = async function (key, page, limit) {
  const skip = (page - 1) * limit;
  const cargos = await CargoModel.find({ key })
    .sort({ nome: 1 })
    .skip(skip)
    .limit(parseInt(limit));
  return cargos;
};

Cargo.delete = async function (id) {
  if (typeof id !== 'string') return;
  const cargo = await CargoModel.findOneAndDelete({ _id: id });
  return cargo;
};

Cargo.countDocuments = async function (key) {
  return await CargoModel.countDocuments({ key });
};

module.exports = Cargo;