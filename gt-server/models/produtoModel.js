const mongoose = require('mongoose');
const fs = require('node:fs');
const path = require('path');

const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '../conf/keys.json')));

const ProdutoSchema = new mongoose.Schema({
  key: { type: "String", required: true },
  _marcaId: { type: mongoose.Schema.Types.ObjectId, ref: "Marca", required: true },
  _subGrupoId: { type: mongoose.Schema.Types.ObjectId, ref: "SubGrupo", required: true },
  nome: { type: "String", required: true },
  descricao: { type: "String", required: true },
  _unidadeMedidaId: { type: mongoose.Schema.Types.ObjectId, ref: "UnidadeMedida", required: true },
  quantidadeEstoque: { type: Number, required: true },
  valorUnitario: { type: Number, required: true },
});

const produtoModel = mongoose.model('Produto', ProdutoSchema);

function Produto(body) {
  this.body = body;
  this.errors = [];
  this.Produto = null;
}

Produto.prototype.verificarExistencia = async function () {
  const ProdutoExiste = await produtoModel.findOne({
    key: this.body.key,
    _marcaId: this.body._marcaId,
    _subGrupoId: this.body._subGrupoId,
    nome: this.body.nome,
  });
  if (ProdutoExiste) {
    this.errors.push("Produto já cadastrado.");
    return;
  }
}

Produto.prototype.valida = async function () {
  await this.verificarExistencia();
  this.cleanUp();
  if (!keys.includes(this.body.key)) {
    this.errors.push('Key inválida');
  }
}

Produto.prototype.register = async function () {
  await this.valida();
  if (this.errors.length > 0) return;

  this.Produto = await produtoModel.create(this.body);
}

Produto.prototype.edit = async function (id) {
  if (typeof id !== "string") { this.errors.push("id inválido."); }

  await this.valida();
  if (this.errors.length > 0) return;

  this.Produto = await produtoModel.findByIdAndUpdate(id, this.body, { new: true });
}

Produto.buscaProdutos = async function (key, page, limit) {
  const skip = (page - 1) * limit;
  const Produtos = await produtoModel.find({ key })
    .sort({ nome: 1 })
    .skip(skip)
    .limit(parseInt(limit))
    .populate('_marcaId', 'nome')
    .populate('_subGrupoId', 'nome')
    .populate('_unidadeMedidaId', 'sigla');
  return Produtos;
};

Produto.delete = async function (id) {
  if (typeof id !== "string") return;

  const ProdutoDeletado = await produtoModel.findByIdAndDelete({ _id: id });

  return ProdutoDeletado;
}

Produto.countDocuments = async function (key) {
  return await produtoModel.countDocuments({ key });
};

Produto.prototype.cleanUp = function () {
  for (const field in this.body) {
    if (field !== 'key' && typeof this.body[field] === 'string') {
      this.body[field] = this.body[field].charAt(0).toUpperCase() + this.body[field].slice(1).toLowerCase();
    }
  }

  this.body = {
    key: this.body.key,
    _marcaId: this.body._marcaId,
    _subGrupoId: this.body._subGrupoId,
    nome: this.body.nome,
    descricao: this.body.descricao,
    _unidadeMedidaId: this.body._unidadeMedidaId,
    quantidadeEstoque: this.body.quantidadeEstoque,
    valorUnitario: this.body.valorUnitario,
  };
};

module.exports = Produto;

