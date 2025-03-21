const Cargo = require('../../../models/cargoModel');
const StatusAtividade = require('../../../models/statusAtividadeModel');
const StatusUsuario = require('../../../models/statusUsuarioModel');
const Cidade = require('../../../models/cidadeModel');
const UnidadeMedida = require('../../../models/unidadeMedidaModel');
require('dotenv').config();

/**
 * Insere dados iniciais no banco de dados.
 */
async function inserirDadosIniciais() {
  const key = process.env.KEY_1;
  const cargos = [
    { key: key, nome: 'Líder' },
    { key: key, nome: 'Supervisor' },
    { key: key, nome: 'Funcionário Padrão' },
    { key: key, nome: 'Gerente' },
  ];

  const statusAtividades = [
    { key: key, descricao: 'A fazer' },
    { key: key, descricao: 'Em andamento' },
    { key: key, descricao: 'Realizado' },
    { key: key, descricao: 'Concluído' },
    { key: key, descricao: 'Inconformidade' },
  ];

  const statusUsuarios = [
    { key: key, descricao: 'Livre' },
    { key: key, descricao: 'Ocupado' },
  ];

  const cidades = [
    { key: key, nome: 'Salvador' },
    { key: key, nome: 'Lauro de Freitas' },
    { key: key, nome: 'Feira de Santana' },
    { key: key, nome: 'Jacobina' },
  ];

  const unidadeMedidas = [
    { key: key, descricao: 'Quilograma', sigla: 'Kg', podeFracionar: 'on' },
    { key: key, descricao: 'Caixa', sigla: 'Cx', podeFracionar: 'off' },
    { key: key, descricao: 'Vidro', sigla: 'Vd', podeFracionar: 'off' },
    { key: key, descricao: 'Metro', sigla: 'Mt', podeFracionar: 'on' },
    { key: key, descricao: 'Metro quadrado', sigla: 'M2', podeFracionar: 'on' },
    { key: key, descricao: 'Metro cubico', sigla: 'M3', podeFracionar: 'on' },
    { key: key, descricao: 'Litro', sigla: 'Lt', podeFracionar: 'off' },
    { key: key, descricao: 'Peca', sigla: 'Pc', podeFracionar: 'off' },
  ];

  for (const unidadeMedida of unidadeMedidas) {
    const unidadeMedidaInstance = new UnidadeMedida(unidadeMedida);
    await unidadeMedidaInstance.register();
    if (unidadeMedidaInstance.errors.length > 0) {
      console.log(`Erro ao inserir unidade de medida: ${unidadeMedidaInstance.errors.join(', ')}`);
    }
  }

  for (const cargo of cargos) {
    const cargoInstance = new Cargo(cargo);
    await cargoInstance.register();
    if (cargoInstance.errors.length > 0) {
      console.log(`Erro ao inserir cargo: ${cargoInstance.errors.join(', ')}`);
    }
  }

  for (const statusAtividade of statusAtividades) {
    const statusAtividadeInstance = new StatusAtividade(statusAtividade);
    await statusAtividadeInstance.register();
    if (statusAtividadeInstance.errors.length > 0) {
      console.log(`Erro ao inserir status de atividade: ${statusAtividadeInstance.errors.join(', ')}`);
    }
  }

  for (const statusUsuario of statusUsuarios) {
    const statusUsuarioInstance = new StatusUsuario(statusUsuario);
    await statusUsuarioInstance.register();
    if (statusUsuarioInstance.errors.length > 0) {
      console.log(`Erro ao inserir status de usuário: ${statusUsuarioInstance.errors.join(', ')}`);
    }
  }

  for (const cidade of cidades) {
    const cidadeInstance = new Cidade(cidade);
    await cidadeInstance.register();
    if (cidadeInstance.errors.length > 0) {
      console.log(`Erro ao inserir cidade: ${cidadeInstance.errors.join(', ')}`);
    }
  }

  console.log('Dados iniciais inseridos com sucesso.');
}

module.exports = inserirDadosIniciais;