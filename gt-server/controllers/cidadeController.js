const Cidade = require('../models/cidadeModel');
const fs = require('node:fs');
const path = require('path');

const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '../conf/keys.json')));

exports.register = async (req, res) => {
  try {
    const cidade = new Cidade(req.body);
    await cidade.register();

    if (cidade.errors.length > 0) {
      req.session.save(() => res.status(400).json({ errors: cidade.errors }));
      return;
    }

    req.session.save(() => res.status(200).json({ message: 'Cidade registrada com sucesso.' }));
    return;
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Erro ao registrar cidade.' });
  }
};

exports.edit = async function (req, res) {
  try {
    if (!req.params.id) return res.status(404).json({ error: 'Cidade não encontrada.' });
    const cidade = new Cidade(req.body);
    await cidade.edit(req.params.id);

    if (cidade.errors.length > 0) {
      req.session.save(() => res.status(400).json({ errors: cidade.errors }));
      return;
    }

    req.session.save(() => res.status(200).json({ message: 'Cidade editada com sucesso.' }));
    return;
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Erro ao editar cidade.' });
  }
};

exports.delete = async function (req, res) {
  try {
    if (!req.params.id) return res.status(404).json({ error: 'Cidade não encontrada.' });

    const cidade = await Cidade.delete(req.params.id);
    if (!cidade) return res.status(404).json({ error: 'Cidade não encontrada.' });

    req.session.save(() => res.status(200).json({ message: 'Cidade apagada com sucesso.' }));
    return;
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Erro ao apagar cidade.' });
  }
};

exports.getCidades = async (req, res) => {
  try {
    const { key, page = 1, limit = 10 } = req.query;
    if (!keys.includes(key)) {
      return res.status(401).json({ error: 'Key inválida.' });
    }
    const cidades = await Cidade.buscaCidades(key, page, limit);
    const totalCidades = await Cidade.countDocuments(key);
    res.json({ cidades, totalCidades });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Erro ao buscar cidades' });
  }
};