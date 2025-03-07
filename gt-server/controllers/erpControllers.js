const Setor = require('../models/SetorModel');

exports.index = async (req, res) => {
  const setores = await Setor.buscaSetores();
  res.render('pagPrincipal', { setores, setor: {} });
};