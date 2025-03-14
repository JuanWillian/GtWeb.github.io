const Execucao = require('../models/execucaoModel');
const fs = require('node:fs');
const path = require('path');

const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '../conf/keys.json')));

exports.register = async (req, res) => {
  try {
    const execucao = new Execucao(req.body);
    await execucao.register();

    if (execucao.errors.length > 0) {
      req.session.save(() => res.status(400).json({ errors: execucao.errors }));
      return;
    }

    req.session.save(() => res.status(200).json({ message: 'Execução registrada com sucesso.' }));
    return;
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Erro ao registrar Execução.' });
  }
};

exports.edit = async function (req, res) {
  try {
    if (!req.params.id) return res.status(404).json({ error: 'Execução não encontrada.' });
    const execucao = new Execucao(req.body);
    await execucao.edit(req.params.id);

    if (execucao.errors.length > 0) {
      req.session.save(() => res.status(400).json({ errors: execucao.errors }));
      return;
    }

    req.session.save(() => res.status(200).json({ message: 'Execução editada com sucesso.' }));
    return;
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Erro ao editar Execução.' });
  }
};

exports.delete = async function (req, res) {
  if (!req.params.id) return res.status(404).json({ error: 'Execução não encontrada.' });

  const execucao = await Execucao.delete(req.params.id);
  if (!execucao) return res.status(404).json({ error: 'Execução não encontrada.' });

  req.session.save(() => res.status(200).json({ message: 'Execução apagada com sucesso.' }));
  return;
};

exports.getExecucoes = async (req, res) => {
  try {
    const { key, page = 1, limit = 10 } = req.query;
    if (!keys.includes(key)) {
      return res.status(401).json({ error: 'Key inválida.' });
    }
    const execucoes = await Execucao.buscaExecucoes(key, page, limit);
    const totalExecucoes = await Execucao.countDocuments(key);
    res.json({ execucoes, totalExecucoes });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Erro ao buscar execucoes' });
  }
};