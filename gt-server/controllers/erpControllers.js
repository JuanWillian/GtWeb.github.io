const Setor = require('../models/SetorModel');
const Empresa = require('../models/empresaModel');
const Atividade = require('../models/atividadeModel');
const Execucao = require('../models/execucaoModel');
const Grupo = require('../models/grupoModel');
const Unidade = require('../models/unidadeModel');
const Cidade = require('../models/cidadeModel');
const SubGrupo = require('../models/subGrupoModel');
const UnidadeMedida = require('../models/unidadeMedidaModel');

exports.index = async (req, res) => {
  const setores = await Setor.buscaSetores();
  const empresas = await Empresa.buscaEmpresas();
  const atividades = await Atividade.buscaAtividades();
  const execucoes = await Execucao.buscaExecucoes();
  const grupos = await Grupo.buscaGrupos();
  const unidades = await Unidade.buscaUnidades();
  const cidades = await Cidade.buscaCidades();
  const subGrupos = await SubGrupo.buscaSubGrupos();
  const unidadeMedidas = await UnidadeMedida.buscaUnidadeMedidas();

  res.render('pagPrincipal', { setores, setor: {}, empresas, empresa: {}, atividades, atividade: {}, execucoes, execucao: {}, grupos, grupo: {}, unidades, unidade: {}, cidades, subGrupos, subGrupo: {}, unidadeMedidas, unidadeMedida: {} });
};

exports.carregarFormulario = (req, res) => {
  const { formulario } = req.params;
  res.render(`partials/${formulario}`);
}