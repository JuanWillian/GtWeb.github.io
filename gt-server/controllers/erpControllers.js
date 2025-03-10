const Setor = require('../models/SetorModel');

exports.index = async (req, res) => {
  const setores = await Setor.buscaSetores();
  res.render('pagPrincipal', { setores, setor: {} });
};

exports.getSetores = async (req, res) => {
  try {
    const setores = await Setor.buscaSetores();
    res.json(setores);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Erro ao buscar setores' });
  }
};