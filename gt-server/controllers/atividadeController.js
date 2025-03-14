const Atividade = require('../models/atividadeModel');
const fs = require('node:fs');
const path = require('path');

const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '../conf/keys.json')));

exports.register = async (req, res) => {
  try {
    const atividade = new Atividade(req.body);
    await atividade.register();

    if (atividade.errors.length > 0) {
      req.session.save(() => res.status(400).json({ errors: atividade.errors }));
      return;
    }

    req.session.save(() => res.status(200).json({ message: 'Atividade registrada com sucesso.' }));
    return;
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Erro ao registrar atividade.' });
  }
};

exports.edit = async function (req, res) {
  try {
    if (!req.params.id) return res.status(404).json({ error: 'Atividade não encontrada.' });
    const atividade = new Atividade(req.body);
    await atividade.edit(req.params.id);

    if (atividade.errors.length > 0) {
      req.session.save(() => res.status(400).json({ errors: atividade.errors }));
      return;
    }

    req.session.save(() => res.status(200).json({ message: 'Atividade editada com sucesso.' }));
    return;
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Erro ao editar atividade.' });
  }
};

exports.delete = async function (req, res) {
  if (!req.params.id) return res.status(404).json({ error: 'Atividade não encontrada.' });

  const atividade = await Atividade.delete(req.params.id);
  if (!atividade) return res.status(404).json({ error: 'Atividade não encontrada.' });

  req.session.save(() => res.status(200).json({ message: 'Atividade apagada com sucesso.' }));
  return;
};

exports.getAtividades = async (req, res) => {
  try {
    const { key, page = 1, limit = 10 } = req.query;
    if (!keys.includes(key)) {
      return res.status(401).json({ error: 'Key inválida.' });
    }
    const atividades = await Atividade.buscaAtividades(key, page, limit);
    const totalAtividades = await Atividade.countDocuments(key);
    res.json({ atividades, totalAtividades });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Erro ao buscar atividades' });
  }
};