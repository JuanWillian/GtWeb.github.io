const mongoose = require('mongoose');
const fs = require('node:fs');
const path = require('path');

const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '../conf/keys.json')));

const EmpresaSchema = new mongoose.Schema({
  key: { type: String, required: true },
  nome: { type: String, required: true },
});

EmpresaSchema.pre('findOneAndDelete', async function (next) {
  const empresaId = this.getQuery()["_id"];
  await mongoose.model('Unidade').deleteMany({ _empresaId: empresaId });
  next();
});

const EmpresaModel = mongoose.model('Empresa', EmpresaSchema);

function Empresa(body) {
  this.body = body;
  this.errors = [];
  this.empresa = null;
}

Empresa.prototype.verificarExistencia = async function () {
  const empresaExistente = await EmpresaModel.findOne({
    key: this.body.key,
    nome: this.body.nome,
  })
  if (empresaExistente) {
    console.log("empresa existe")
    this.errors.push("Empresa já cadastrada.")
    return
  }
}

Empresa.prototype.valida = async function () {
  await this.verificarExistencia();
  this.cleanUp();

  if (!this.body.nome) this.errors.push('Nome é um campo obrigatório.');
  if (!keys.includes(this.body.key)) {
    this.errors.push('Key inválida.');
  }
};

Empresa.prototype.register = async function () {
  await this.valida();
  if (this.errors.length > 0) return;

  this.empresa = await EmpresaModel.create(this.body);
};


Empresa.prototype.cleanUp = function () {

  this.body = {
    key: this.body.key,
    nome: this.body.nome,
  };
};

Empresa.prototype.edit = async function (id) {
  if (typeof id !== 'string') return;
  await this.valida();
  if (this.errors.length > 0) return;
  this.empresa = await EmpresaModel.findByIdAndUpdate(id, this.body, { new: true });
};

Empresa.buscaPorId = async function (id) {
  if (typeof id !== 'string') return;
  const empresa = await EmpresaModel.findById(id);
  return empresa;
};

Empresa.buscaEmpresas = async function (key, page, limit) {
  const skip = (page - 1) * limit;
  const empresas = await EmpresaModel.find({ key })
    .sort({ nome: 1 })
    .skip(skip)
    .limit(parseInt(limit));
  return empresas;
};

Empresa.delete = async function (id) {
  if (typeof id !== 'string') return;
  const empresa = await EmpresaModel.findOneAndDelete({ _id: id });
  return empresa;
};

Empresa.countDocuments = async function (key) {
  return await EmpresaModel.countDocuments({ key });
};

module.exports = Empresa;
