const Cargo = require('../models/cargoModel');
const fs = require('node:fs');
const path = require('path');

const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '../conf/keys.json')));

exports.register = async (req, res) => {
  try {
    const cargo = new Cargo(req.body);
    await cargo.register();

    if (cargo.errors.length > 0) {
      req.session.save(() => res.status(400).json({ errors: cargo.errors }));
      return;
    }

    req.session.save(() => res.status(200).json({ message: 'Cargo registrado com sucesso.' }));
    return;
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Erro ao registrar cargo.' });
  }
};

exports.edit = async function (req, res) {
  try {
    if (!req.params.id) return res.status(404).json({ error: 'Cargo não encontrado.' });
    const cargo = new Cargo(req.body);
    await cargo.edit(req.params.id);

    if (cargo.errors.length > 0) {
      req.session.save(() => res.status(400).json({ errors: cargo.errors }));
      return;
    }

    req.session.save(() => res.status(200).json({ message: 'Cargo editado com sucesso.' }));
    return;
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Erro ao editar cargo.' });
  }
};

exports.delete = async function (req, res) {
  if (!req.params.id) return res.status(404).json({ error: 'Cargo não encontrado.' });

  const cargo = await Cargo.delete(req.params.id);
  if (!cargo) return res.status(404).json({ error: 'Cargo não encontrado.' });

  req.session.save(() => res.status(200).json({ message: 'Cargo apagado com sucesso.' }));
  return;
};

exports.getCargos = async (req, res) => {
  try {
    const { key, page = 1, limit = 10 } = req.query;
    if (!keys.includes(key)) {
      return res.status(401).json({ error: 'Key inválida.' });
    }
    const cargos = await Cargo.buscaCargos(key, page, limit);
    const totalCargos = await Cargo.countDocuments(key);
    res.json({ cargos, totalCargos });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Erro ao buscar cargos' });
  }
};