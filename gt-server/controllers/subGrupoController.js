const SubGrupo = require('../models/subGrupoModel');
const fs = require('node:fs');
const path = require('path');

const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '../conf/keys.json')));

exports.register = async (req, res) => {
  try {
    const subGrupo = new SubGrupo(req.body);
    await subGrupo.register();

    if (subGrupo.errors.length  > 0) {
      req.session.save(() => res.status(400).json({ errors: subGrupo.errors }));
      return;
    }

    req.session.save(() => res.status(200).json({ message: 'SubGrupo registrado com sucesso.' }));
    return;
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Erro ao registrar subGrupo.' });
  }
};

exports.edit = async function (req, res) {
  try {
    if (!req.params.id) return res.status(404).json({ error: 'SubGrupo não encontrado.' });
    const subGrupo = new SubGrupo(req.body);
    await subGrupo.edit(req.params.id);

    if (subGrupo.errors.length > 0) {
      req.session.save(() => res.status(400).json({ errors: subGrupo.errors }));
      return;
    }

    req.session.save(() => res.status(200).json({ message: 'SubGrupo editado com sucesso.' }));
    return;
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Erro ao editar subGrupo.' });
  }
};

exports.delete = async function (req, res) {
  if (!req.params.id) return res.status(404).json({ error: 'SubGrupo não encontrado.' });

  const subGrupo = await SubGrupo.delete(req.params.id);
  if (!subGrupo) return res.status(404).json({ error: 'SubGrupo não encontrado.' });

  req.session.save(() => res.status(200).json({ message: 'SubGrupo apagado com sucesso.' }));
  return;
};

exports.getSubGrupos = async (req, res) => {
  try {
    const { key, page = 1, limit = 10 } = req.query;
    if (!keys.includes(key)) {
      return res.status(401).json({ error: 'Key inválida.' });
    }
    const subGrupos = await SubGrupo.buscaSubGrupos(key, page, limit);
    const totalSubGrupos = await SubGrupo.countDocuments(key);
    res.json({ subGrupos, totalSubGrupos });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Erro ao buscar subGrupos' });
  }
};

