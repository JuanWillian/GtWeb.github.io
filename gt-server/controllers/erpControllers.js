const Setor = require('../models/SetorModel');
const Empresa = require('../models/empresaModel');
const Atividade = require('../models/atividadeModel');

exports.index = async (req, res) => {
  const setores = await Setor.buscaSetores();
  const empresas = await Empresa.buscaEmpresas();
  const atividades = await Atividade.buscaAtividades();
  res.render('pagPrincipal', { setores, setor: {}, empresas, empresa: {}, atividades, atividade: {} });
};

exports.carregarFormulario = (req, res) => {
  const { formulario } = req.params;
  res.render(`partials/${formulario}`);
}