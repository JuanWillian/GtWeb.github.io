const StatusUsuario = require('../models/statusUsuarioModel');
const fs = require('node:fs');
const path = require('path');

const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '../conf/keys.json')));

exports.register = async (req, res) => {
  try {
    const statusUsuario = new StatusUsuario(req.body);
    await statusUsuario.register();

    if (statusUsuario.errors.length > 0) {
      req.session.save(() => res.status(400).json({ errors: statusUsuario.errors }));
      return;
    }

    req.session.save(() => res.status(200).json({ message: 'Status de usuário registrado com sucesso.' }));
    return;
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Erro ao registrar status de usuário.' });
  }
};

exports.edit = async function (req, res) {
  try {
    if (!req.params.id) return res.status(404).json({ error: 'Status de usuário não encontrado.' });
    const statusUsuario = new StatusUsuario(req.body);
    await statusUsuario.edit(req.params.id);

    if (statusUsuario.errors.length > 0) {
      req.session.save(() => res.status(400).json({ errors: statusUsuario.errors }));
      return;
    }

    req.session.save(() => res.status(200).json({ message: 'Status de usuário editado com sucesso.' }));
    return;
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Erro ao editar status de usuário.' });
  }
};

exports.delete = async function (req, res) {
  try {
    if (!req.params.id) return res.status(404).json({ error: 'Status de usuário não encontrado.' });
  
    const statusUsuario = await StatusUsuario.delete(req.params.id);
    if (!statusUsuario) return res.status(404).json({ error: 'Status de usuário não encontrado.' });
  
    req.session.save(() => res.status(200).json({ message: 'Status de usuário apagado com sucesso.' }));
    return;
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Erro ao apagar status de usuário.' });
  } 
};

exports.getStatuses = async (req, res) => {
  try {
    const { key, page = 1, limit = 10 } = req.query;
    if (!keys.includes(key)) {
      return res.status(401).json({ error: 'Key inválida.' });
    }
    const statuses = await StatusUsuario.buscaStatuses(key, page, limit);
    const totalStatuses = await StatusUsuario.countDocuments(key);
    res.json({ statuses, totalStatuses });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Erro ao buscar statuses de usuário' });
  }
};