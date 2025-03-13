const Empresa = require('../models/empresaModel');
const fs = require('node:fs');
const path = require('path');

const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '../conf/keys.json')));

exports.register = async (req, res) => {
  try {
    const empresa = new Empresa(req.body);
    await empresa.register();

    if (empresa.errors.length > 0) {
      req.session.save(() => res.status(400).json({ errors: empresa.errors }));
      return;
    }

    req.session.save(() => res.status(200).json({ message: 'Empresa registrada com sucesso.' }));
    return;
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Erro ao registrar empresa.' });
  }
};

exports.edit = async function (req, res) {
  try {
    if (!req.params.id) return res.status(404).json({ error: 'Empresa não encontrada.' });
    const empresa = new Empresa(req.body);
    await empresa.edit(req.params.id);

    if (empresa.errors.length > 0) {
      req.session.save(() => res.status(400).json({ errors: empresa.errors }));
      return;
    }

    req.session.save(() => res.status(200).json({ message: 'Empresa editada com sucesso.' }));
    return;
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Erro ao editar empresa.' });
  }
};

exports.delete = async function (req, res) {
  if (!req.params.id) return res.status(404).json({ error: 'Empresa não encontrada.' });

  const empresa = await Empresa.delete(req.params.id);
  if (!empresa) return res.status(404).json({ error: 'Empresa não encontrada.' });

  req.session.save(() => res.status(200).json({ message: 'Empresa apagada com sucesso.' }));
  return;
};

exports.getEmpresas = async (req, res) => {
  try {
    const { key, page = 1, limit = 10 } = req.query;
    if (!keys.includes(key)) {
      return res.status(401).json({ error: 'Key inválida.' });
    }
    const empresas = await Empresa.buscaEmpresas(key, page, limit);
    const totalEmpresas = await Empresa.countDocuments(key);
    res.json({ empresas, totalEmpresas });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Erro ao buscar empresas' });
  }
};