const Setor = require('../models/SetorModel');
const Empresa = require('../models/empresaModel');
const Atividade = require('../models/atividadeModel');
const Execucao = require('../models/execucaoModel');
const Grupo = require('../models/grupoModel');

exports.index = async (req, res) => {
  const setores = await Setor.buscaSetores();
  const empresas = await Empresa.buscaEmpresas();
  const atividades = await Atividade.buscaAtividades();
  const execucoes = await Execucao.buscaExecucoes();
  const grupos = await Grupo.buscaGrupos();
  res.render('pagPrincipal', { setores, setor: {}, empresas, empresa: {}, atividades, atividade: {}, execucoes, execucao: {}, grupos, grupo: {} });
};

exports.carregarFormulario = (req, res) => {
  const { formulario } = req.params;
  res.render(`partials/${formulario}`);
}