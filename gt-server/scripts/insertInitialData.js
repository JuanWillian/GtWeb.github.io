const Cargo = require('../models/cargoModel');
const StatusAtividade = require('../models/statusAtividadeModel');
const StatusUsuario = require('../models/statusUsuarioModel');
const Cidade = require('../models/cidadeModel');

async function insertInitialData() {
  const cargos = [
    { key: 'ad0c0749e023d44bd92c1e56ca0b3e3c', nome: 'Líder' },
    { key: 'ad0c0749e023d44bd92c1e56ca0b3e3c', nome: 'Supervisor' },
    { key: 'ad0c0749e023d44bd92c1e56ca0b3e3c', nome: 'Funcionário Padrão' },
  ];

  const statusAtividades = [
    { key: 'ad0c0749e023d44bd92c1e56ca0b3e3c', descricao: 'A fazer' },
    { key: 'ad0c0749e023d44bd92c1e56ca0b3e3c', descricao: 'Em andamento' },
    { key: 'ad0c0749e023d44bd92c1e56ca0b3e3c', descricao: 'Realizado' },
    { key: 'ad0c0749e023d44bd92c1e56ca0b3e3c', descricao: 'Concluído' },
    { key: 'ad0c0749e023d44bd92c1e56ca0b3e3c', descricao: 'Inconformidade' },
  ];

  const statusUsuarios = [
    { key: 'ad0c0749e023d44bd92c1e56ca0b3e3c', descricao: 'Livre' },
    { key: 'ad0c0749e023d44bd92c1e56ca0b3e3c', descricao: 'Ocupado' },
  ];

  const cidades = [
    { key: 'ad0c0749e023d44bd92c1e56ca0b3e3c', nome: 'Salvador' },
    { key: 'ad0c0749e023d44bd92c1e56ca0b3e3c', nome: 'Lauro de Freitas' },
    { key: 'ad0c0749e023d44bd92c1e56ca0b3e3c', nome: 'Feira de Santana' },
    { key: 'ad0c0749e023d44bd92c1e56ca0b3e3c', nome: 'Jacobina' },
  ];

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

module.exports = insertInitialData;