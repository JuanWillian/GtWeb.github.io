const Marca = require('../models/marcaModel');
const fs = require('node:fs');
const path = require('path');

const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '../conf/keys.json')));

exports.register = async (req, res) => {
  try {
    const marca = new Marca(req.body);
    await marca.register();

    if (marca.errors.length > 0) {
      req.session.save(() => res.status(400).json({ errors: marca.errors }));
      return;
    }

    req.session.save(() => res.status(200).json({ message: 'Marca registrada com sucesso.' }));
    return;
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Erro ao registrar marca.' });
  }
};

exports.edit = async function (req, res) {
  try {
    if (!req.params.id) return res.status(404).json({ error: 'Marca não encontrada.' });
    const marca = new Marca(req.body);
    await marca.edit(req.params.id);

    if (marca.errors.length > 0) {
      req.session.save(() => res.status(400).json({ errors: marca.errors }));
      return;
    }

    req.session.save(() => res.status(200).json({ message: 'Marca editada com sucesso.' }));
    return;
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Erro ao editar marca.' });
  }
};

exports.delete = async function (req, res) {
  try {
    if (!req.params.id) return res.status(404).json({ error: 'Marca não encontrada.' });
  
    const marca = await Marca.delete(req.params.id);
    if (!marca) return res.status(404).json({ error: 'Marca não encontrada.' });
  
    req.session.save(() => res.status(200).json({ message: 'Marca apagada com sucesso.' }));
    return;
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Erro ao apagar marca.' });
  } 
};

exports.getMarcas = async (req, res) => {
  try {
    const { key, page = 1, limit = 10 } = req.query;
    if (!keys.includes(key)) {
      return res.status(401).json({ error: 'Key inválida.' });
    }
    const marcas = await Marca.buscaMarcas(key, page, limit);
    const totalMarcas = await Marca.countDocuments(key);
    res.json({ marcas, totalMarcas });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Erro ao buscar marcas' });
  }
};