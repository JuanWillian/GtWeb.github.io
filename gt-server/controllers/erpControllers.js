const Setor = require('../models/SetorModel');

exports.index = async (req, res) => {
  const setores = await Setor.buscaSetores();
  res.render('pagPrincipal', { setores, setor: {} });
};

exports.getSetores = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const setores = await Setor.buscaSetores(page, limit);
    const totalSetores = await Setor.countDocuments(); // Use the correct method
    res.json({ setores, totalSetores });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Erro ao buscar setores' });
  }
};