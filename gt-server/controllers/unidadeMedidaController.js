const UnidadeMedida = require('../models/unidadeMedidaModel');
const fs = require('node:fs');
const path = require('path');

const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '../conf/keys.json')));

exports.register = async (req, res) => {
  try {
    const unidadeMedida = new UnidadeMedida(req.body);
    await unidadeMedida.register();

    if (unidadeMedida.errors.length > 0) {
      req.session.save(() => res.status(400).json({ errors: unidadeMedida.errors }));
      return;
    }

    req.session.save(() => res.status(200).json({ message: 'Unidade de medida registrada com sucesso.' }));
    return;
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Erro ao registrar Unidade de medida.' });
  }
};

exports.edit = async function (req, res) {
  try {
    if (!req.params.id) return res.status(404).json({ error: 'Unidade de medida não encontrada.' });
    const unidadeMedida = new UnidadeMedida(req.body);
    await unidadeMedida.edit(req.params.id);

    if (unidadeMedida.errors.length > 0) {
      req.session.save(() => res.status(400).json({ errors: unidadeMedida.errors }));
      return;
    }

    req.session.save(() => res.status(200).json({ message: 'Unidade de medida editada com sucesso.' }));
    return;
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Erro ao editar Unidade de medida.' });
  }
};

exports.delete = async function (req, res) {
  if (!req.params.id) return res.status(404).json({ error: 'Unidade de medida não encontrada.' });

  const unidadeMedida = await UnidadeMedida.delete(req.params.id);
  if (!unidadeMedida) return res.status(404).json({ error: 'Unidade de medida não encontrada.' });

  req.session.save(() => res.status(200).json({ message: 'Unidade de medida apagada com sucesso.' }));
  return;
};

exports.getUnidadeMedidas = async (req, res) => {
  try {
    const { key, page = 1, limit = 10 } = req.query;
    if (!keys.includes(key)) {
      return res.status(401).json({ error: 'Key inválida.' });
    }
    const unidadeMedidas = await UnidadeMedida.buscaUnidadeMedidas(key, page, limit);
    const totalUnidadeMedida = await UnidadeMedida.countDocuments(key);
    res.json({ unidadeMedidas, totalUnidadeMedida });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Erro ao buscar unidadeMedidas' });
  }
};