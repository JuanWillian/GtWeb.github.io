const Grupo = require('../models/grupoModel');
const fs = require('node:fs');
const path = require('path');

const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '../conf/keys.json')));

exports.register = async (req, res) => {
  try {
    const grupo = new Grupo(req.body);
    await grupo.register();

    if (grupo.errors.length > 0) {
      req.session.save(() => res.status(400).json({ errors: grupo.errors }));
      return;
    }

    req.session.save(() => res.status(200).json({ message: 'Grupo registrada com sucesso.' }));
    return;
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Erro ao registrar Grupo.' });
  }
};

exports.edit = async function (req, res) {
  try {
    if (!req.params.id) return res.status(404).json({ error: 'Grupo não encontrada.' });
    const grupo = new Grupo(req.body);
    await grupo.edit(req.params.id);

    if (grupo.errors.length > 0) {
      req.session.save(() => res.status(400).json({ errors: grupo.errors }));
      return;
    }

    req.session.save(() => res.status(200).json({ message: 'Grupo editada com sucesso.' }));
    return;
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Erro ao editar grupo.' });
  }
};

exports.delete = async function (req, res) {
  if (!req.params.id) return res.status(404).json({ error: 'Grupo não encontrada.' });

  const grupo = await Grupo.delete(req.params.id);
  if (!grupo) return res.status(404).json({ error: 'Grupo não encontrada.' });

  req.session.save(() => res.status(200).json({ message: 'Grupo apagada com sucesso.' }));
  return;
};

exports.getGrupos = async (req, res) => {
  try {
    const { key, page = 1, limit = 10 } = req.query;
    if (!keys.includes(key)) {
      return res.status(401).json({ error: 'Key inválida.' });
    }
    const grupos = await Grupo.buscaGrupos(key, page, limit);
    const totalGrupos = await Grupo.countDocuments(key);
    res.json({ grupos, totalGrupos });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Erro ao buscar grupos' });
  }
};