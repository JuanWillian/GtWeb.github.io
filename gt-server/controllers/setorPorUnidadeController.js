const SetorPorUnidade = require('../models/setorPorUnidadeModel');
const fs = require('node:fs');
const path = require('path');

const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '../conf/keys.json')));

exports.register = async (req, res) => {
  try {
    const setorPorUnidade = new SetorPorUnidade(req.body);
    await setorPorUnidade.register();

    if (setorPorUnidade.errors.length > 0) {
      req.session.save(() => res.status(400).json({ errors: setorPorUnidade.errors }));
      return;
    }

    req.session.save(() => res.status(200).json({ message: 'Setor por Unidade registrado com sucesso.' }));
    return;
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Erro ao registrar Setor por Unidade.' });
  }
};

exports.edit = async function (req, res) {
  try {
    if (!req.params.id) return res.status(404).json({ error: 'Setor por Unidade não encontrado.' });
    const setorPorUnidade = new SetorPorUnidade(req.body);
    await setorPorUnidade.edit(req.params.id);

    if (setorPorUnidade.errors.length > 0) {
      req.session.save(() => res.status(400).json({ errors: setorPorUnidade.errors }));
      return;
    }

    req.session.save(() => res.status(200).json({ message: 'Setor por Unidade editado com sucesso.' }));
    return;
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Erro ao editar Setor por Unidade.' });
  }
};

exports.delete = async function (req, res) {
  try {
    if (!req.params.id) return res.status(404).json({ error: 'Setor por Unidade não encontrado.' });
    
    const setorPorUnidade = await SetorPorUnidade.delete(req.params.id);
    if (!setorPorUnidade) return res.status(404).json({ error: 'Setor por Unidade não encontrado.' });
    
    req.session.save(() => res.status(200).json({ message: 'Setor por Unidade apagado com sucesso.' }));
    return;
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Erro ao apagar setor por unidade.' });
  } 
};

exports.getSetoresPorUnidade = async (req, res) => {
  try {
    const { key, page, limit } = req.query;
    const setoresPorUnidade = await SetorPorUnidade.buscaSetoresPorUnidade(key, parseInt(page), parseInt(limit));
    res.status(200).json({ setoresPorUnidade });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Erro ao buscar Setores por Unidade.' });
  }
};

exports.registerOrFind = async (req, res) => {
  try {
    const { key, _setorId, _unidadeId } = req.body;
    if (!key || !_setorId || !_unidadeId) {
      return res.status(400).json({ error: 'Dados incompletos.' });
    }

    let setorPorUnidade = await SetorPorUnidade.findOne({ key, _setorId, _unidadeId });

    if (!setorPorUnidade) {
      const setorPorUnidadeInstance = new SetorPorUnidade(req.body);
      await setorPorUnidadeInstance.register();

      if (setorPorUnidadeInstance.errors.length > 0) {
        return res.status(400).json({ errors: setorPorUnidadeInstance.errors });
      }

      setorPorUnidade = setorPorUnidadeInstance.setorPorUnidade;
    }

    res.status(200).json({ setorPorUnidade });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Erro ao buscar ou criar SetorPorUnidade.' });
  }
};