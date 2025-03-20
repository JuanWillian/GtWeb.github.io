const mongoose = require('mongoose');
const fs = require('node:fs');
const path = require('path');

const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '../conf/keys.json')));

const SubGrupoSchema = new mongoose.Schema({
  key: { type: "String", required: true },
  _grupoId: { type: mongoose.Schema.Types.ObjectId, ref: "Grupo", required: true },
  nome: { type: "String", required: true },
});

SubGrupoSchema.pre('findOneAndDelete', async function (next) {
  const subGrupoId = this.getQuery()["_id"];
  await mongoose.model('Produto').deleteMany({ _subGrupoId: subGrupoId });
  next();
});

SubGrupoSchema.pre('deleteMany', async function (next) {
  const query = this.getQuery();
  const subGrupoDocs = await mongoose.model('SubGrupo').find(query);
  const subGrupoIds = subGrupoDocs.map(doc => doc._id);
  await mongoose.model('Produto').deleteMany({ _subGrupoId: { $in: subGrupoIds } });
  next();
});

const subGrupoModel = mongoose.model('SubGrupo', SubGrupoSchema);

function subGrupo(body) {
  this.body = body;
  this.errors = [];
  this.subGrupo = null;
}

subGrupo.prototype.verificarExistencia = async function () {
  const subGrupoExiste = await subGrupoModel.findOne({
    key: this.body.key,
    _grupoId: this.body._grupoId,
    nome: this.body.nome,
  });
  if (subGrupoExiste) {
    this.errors.push("SubGrupo já cadastrado.");
    return;
  }
}

subGrupo.prototype.valida = async function () {
  await this.verificarExistencia();
  this.cleanUp();
  if (!keys.includes(this.body.key)) {
    this.errors.push('Key inválida');
  }
}

subGrupo.prototype.register = async function () {
  await this.valida();
  if (this.errors.length > 0) return;

  this.subGrupo = await subGrupoModel.create(this.body);
}

subGrupo.prototype.edit = async function (id) {
  if (typeof id !== "string") { this.errors.push("id inválido."); }

  await this.valida();
  if (this.errors.length > 0) return;

  this.subGrupo = await subGrupoModel.findByIdAndUpdate(id, this.body, { new: true });
}

subGrupo.buscaSubGrupos = async function (key, page, limit) {
  const skip = (page - 1) * limit;
  const subGrupos = await subGrupoModel.find({ key })
    .sort({ nome: 1 })
    .skip(skip)
    .limit(parseInt(limit))
    .populate('_grupoId', 'nome');
  return subGrupos;
};

subGrupo.delete = async function (id) {
  if (typeof id !== "string") return;

  const subGrupoDeletado = await subGrupoModel.findByIdAndDelete({ _id: id });

  return subGrupoDeletado;
}

subGrupo.countDocuments = async function (key) {
  return await subGrupoModel.countDocuments({ key });
};

subGrupo.prototype.cleanUp = function () {
  for (const field in this.body) {
    if (field !== 'key' && typeof this.body[field] === 'string') {
      this.body[field] = this.body[field].charAt(0).toUpperCase() + this.body[field].slice(1).toLowerCase();
    }
  }

  this.body = {
    key: this.body.key,
    _grupoId: this.body._grupoId,
    nome: this.body.nome,
  };
};

module.exports = subGrupo;

