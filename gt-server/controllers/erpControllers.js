const Setor = require('../models/SetorModel');
const Empresa = require('../models/empresaModel');
const Atividade = require('../models/atividadeModel');
const Execucao = require('../models/execucaoModel');
const Grupo = require('../models/grupoModel');
const Unidade = require('../models/unidadeModel');
const Cidade = require('../models/cidadeModel');
const SubGrupo = require('../models/subGrupoModel');
const UnidadeMedida = require('../models/unidadeMedidaModel');
const Marca = require('../models/marcaModel');
const Usuario = require('../models/usuarioModel');
const SetorPorUnidade = require('../models/setorPorUnidadeModel');
const Produto = require('../models/produtoModel');

exports.index = async (req, res) => {
  try {
      
    const setores = await Setor.buscaSetores();
    const empresas = await Empresa.buscaEmpresas();
    const atividades = await Atividade.buscaAtividades();
    const execucoes = await Execucao.buscaExecucoes();
    const grupos = await Grupo.buscaGrupos();
    const unidades = await Unidade.buscaUnidades();
    const cidades = await Cidade.buscaCidades();
    const subGrupos = await SubGrupo.buscaSubGrupos();
    const unidadeMedidas = await UnidadeMedida.buscaUnidadeMedidas();
    const marcas = await Marca.buscaMarcas();
    const usuarios = await Usuario.buscaUsuarios();
    const setoresPorUnidade = await SetorPorUnidade.buscaSetoresPorUnidade();
    const produtos = await Produto.buscaProdutos();

    res.render('pagPrincipal', { setores, setor: {}, empresas, empresa: {}, atividades, atividade: {}, execucoes, execucao: {}, grupos, grupo: {}, unidades, unidade: {}, cidades, subGrupos, subGrupo: {}, unidadeMedidas, unidadeMedida: {}, marcas, marca: {}, setoresPorUnidade, setorPorUnidade: {}, usuarios, usuario: {}, produtos, produto: {} });

  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Erro ao carregar página principal.' });
  }   
};

exports.carregarFormulario = (req, res) => {
  try {
    const { formulario } = req.params;
    res.render(`partials/${formulario}`);
  }
  catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Erro ao carregar formulário.' });
  }
}