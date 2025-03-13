const Setor = require('../models/SetorModel');
const Empresa = require('../models/empresaModel');

exports.index = async (req, res) => {
  const setores = await Setor.buscaSetores();
  const empresas = await Empresa.buscaEmpresas();
  res.render('pagPrincipal', { setores, setor: {}, empresas, empresa: {} });
};

exports.carregarFormulario = (req, res) => {
  const { formulario } = req.params;
  res.render(`partials/${formulario}`);
}