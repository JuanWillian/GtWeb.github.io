const Setor = require('../models/SetorModel');
const fs = require('node:fs');
const path = require('path');

const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '../conf/keys.json')));

exports.register = async (req, res) => {
  try {
    const setor = new Setor(req.body);
    await setor.register();

    if (setor.errors.length > 0) {
      req.session.save(() => res.status(400).json({ errors: setor.errors }));
      return;
    }

    req.session.save(() => res.status(200).json({ message: 'Setor registrado com sucesso.' }));
    return;
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Erro ao registrar setor.' });
  }
};

exports.edit = async function (req, res) {
  try {
    if (!req.params.id) return res.status(404).json({ error: 'Setor não encontrado.' });
    const setor = new Setor(req.body);
    await setor.edit(req.params.id);

    if (setor.errors.length > 0) {
      req.session.save(() => res.status(400).json({ errors: setor.errors }));
      return;
    }

    req.session.save(() => res.status(200).json({ message: 'Setor editado com sucesso.' }));
    return;
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Erro ao editar setor.' });
  }
};

exports.delete = async function (req, res) {
  try {
    if (!req.params.id) return res.status(404).json({ error: 'Setor não encontrado.' });
  
    const setor = await Setor.delete(req.params.id);
    if (!setor) return res.status(404).json({ error: 'Setor não encontrado.' });
  
    req.session.save(() => res.status(200).json({ message: 'Setor apagado com sucesso.' }));
    return;
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Erro ao apagar setor.' });
  } 
};

exports.getSetores = async (req, res) => {
  try {
    const { key, page = 1, limit = 10 } = req.query;
    if (!keys.includes(key)) {
      return res.status(401).json({ error: 'Key inválida.' });
    }
    const setores = await Setor.buscaSetores(key, page, limit);
    const totalSetores = await Setor.countDocuments(key);
    res.json({ setores, totalSetores });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Erro ao buscar setores' });
  }
};