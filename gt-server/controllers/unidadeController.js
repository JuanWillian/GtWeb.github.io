const Unidade = require('../models/unidadeModel');
const fs = require('node:fs');
const path = require('path');

const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '../conf/keys.json')));

exports.register = async (req, res) => {
  try {
    const unidade = new Unidade(req.body);
    await unidade.register();

    if (unidade.errors.length > 0) {
      req.session.save(() => res.status(400).json({ errors: unidade.errors }));
      return;
    }

    req.session.save(() => res.status(200).json({ message: 'Unidade registrada com sucesso.' }));
    return;
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Erro ao registrar unidade.' });
  }
};

exports.edit = async function (req, res) {
  try {
    if (!req.params.id) return res.status(404).json({ error: 'Unidade não encontrada.' });
    const unidade = new Unidade(req.body);
    await unidade.edit(req.params.id);

    if (unidade.errors.length > 0) {
      req.session.save(() => res.status(400).json({ errors: unidade.errors }));
      return;
    }

    req.session.save(() => res.status(200).json({ message: 'Unidade editada com sucesso.' }));
    return;
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Erro ao editar unidade.' });
  }
};

exports.delete = async function (req, res) {
  try {
    if (!req.params.id) return res.status(404).json({ error: 'Unidade não encontrada.' });
  
    const unidade = await Unidade.delete(req.params.id);
    if (!unidade) return res.status(404).json({ error: 'Unidade não encontrada.' });
  
    req.session.save(() => res.status(200).json({ message: 'Unidade apagada com sucesso.' }));
    return;
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Erro ao apagar unidade.' });
  } 
};

exports.getUnidades = async (req, res) => {
  try {
    const { key, page, limit } = req.query;
    const unidades = await Unidade.buscaUnidades(key, parseInt(page), parseInt(limit));
    res.status(200).json({ unidades });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Erro ao buscar unidades.' });
  }
};

