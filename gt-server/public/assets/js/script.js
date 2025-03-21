let paginaAtual = 1;
let registrosPorPag = 10;

/**
 * Busca uma chave do servidor.
 *
 * Esta função envia uma solicitação GET para o endpoint '/get-key' e retorna a chave da resposta.
 *
 * @returns {Promise<string>} Uma promessa que resolve para a chave como uma string.
 * @throws {Error} Se a solicitação fetch falhar ou a resposta não estiver em formato JSON.
 */
async function getKey() {
  try {
    const response = await fetch('/get-key');
    const data = await response.json();
    return data.key;
  } catch (error) {
    console.error('Erro:', error);
    throw error;
  }
}

/**
 * Fecha um modal.
 * @param {string} nomeModal - Nome do modal a ser fechado.
 * @return {boolean} - Retorna false para evitar o comportamento padrão do link.
 */
function botaoCancelarClick(nomeModal) {
  $('#' + nomeModal).modal('hide');
  return false;
}

/**
 * Carrega registros de uma entidade específica.
 * @param {string} entidade - Nome da entidade a ser carregada.
 * @param {number} page - Número da página atual.
 * @param {number} limit - Número de registros por página.
 */
async function carregarRegistros(entidade, page, limit) {
  switch (entidade) {
    case 'setor':
      await carregarSetores(page, limit);
      break;
    case 'empresa':
      await carregarEmpresas(page, limit);
      break;
    case 'atividade':
      await carregarAtividades(page, limit);
      break;
    case 'execucao':
      await carregarExecucoes(page, limit);
      break;
    case 'grupo':
      await carregarGrupos(page, limit);
      break;
    case 'unidade':
      await carregarUnidades(page, limit);
      break;
    case 'subGrupo':
      await carregarSubGrupos(page, limit);
      break;
    case 'unidadeMedida':
      await carregarUnidadeMedidas(page, limit);
      break;
    case 'marca':
      await carregarMarcas(page, limit);
      break;
    case 'usuario':
      await carregarUsuarios(page, limit);
      break;
    case 'produto':
      await carregarProdutos(page, limit);
      break;
    default:
      console.error('Entidade desconhecida:', entidade);
  }
}

/**
 * Carrega um lista específico.
 * @param {string} lista - Nome do lista a ser carregado.
 */
async function carregarLista(lista) {
  try {
    const res = await fetch(`/partials/${lista}`);
    if (res.ok) {
      const html = await res.text();
      document.getElementById('forms').innerHTML = html;
      console.log(`Form carregado: ${lista}`);
      switch (lista) {
        case 'setorLista':
          await atualizarRegistrosPorPag('setor')
          await carregarRegistros("setor", paginaAtual, registrosPorPag);
          break;
        case 'empresaLista':
          await atualizarRegistrosPorPag('empresa')
          await carregarRegistros("empresa", paginaAtual, registrosPorPag);
          break;
        case 'atividadeLista':
          await atualizarRegistrosPorPag('atividade')
          await carregarRegistros("atividade", paginaAtual, registrosPorPag);
          break;
        case 'execucaoLista':
          await atualizarRegistrosPorPag('execucao')
          await carregarRegistros("execucao", paginaAtual, registrosPorPag);
          break;
        case 'grupoLista':
          await atualizarRegistrosPorPag('grupo')
          await carregarRegistros("grupo", paginaAtual, registrosPorPag);
          break;
        case 'unidadeLista':
          await atualizarRegistrosPorPag('unidade')
          await carregarRegistros("unidade", paginaAtual, registrosPorPag);
          break;
        case 'subGrupoLista':
          await atualizarRegistrosPorPag('subGrupo')
          await carregarRegistros("subGrupo", paginaAtual, registrosPorPag);
          break;
        case 'unidadeMedidaLista':
          await atualizarRegistrosPorPag('unidadeMedida')
          await carregarRegistros("unidadeMedida", paginaAtual, registrosPorPag);
          break;
        case 'marcaLista':
          await atualizarRegistrosPorPag('marca')
          await carregarRegistros("marca", paginaAtual, registrosPorPag);
          break;
        case 'usuarioLista':
          await atualizarRegistrosPorPag('usuario')
          await carregarRegistros("usuario", paginaAtual, registrosPorPag);
          break;
        case 'produtoLista':
          await atualizarRegistrosPorPag('produto')
          await carregarRegistros("produto", paginaAtual, registrosPorPag);
          break;

      }
    } else {
      console.error('Erro ao carregar o lista!');
    }
  } catch (error) {
    console.error('Erro:', error);
  }
}

/**
 * Atualiza o número de registros por página.
 * @param {string} nomeModal - Nome do modal a ser atualizado.
 * @return {void}
 */
function atualizarRegistrosPorPag(nomeModal) {
  const registrosPorPagSelect = document.querySelector('#registrosPorPag');
  if (registrosPorPagSelect) {
    registrosPorPag = parseInt(registrosPorPagSelect.value, 10);
    paginaAtual = 1;
    carregarRegistros(nomeModal, paginaAtual, registrosPorPag)
  }
}

/**
 * Gera a paginação para uma entidade específica.
 * @param {string} entidade - Nome da entidade.
 * @param {number} page - Número da página atual.
 * @param {number} totalPaginas - Número total de páginas.
 * @param {number} limit - Número de registros por página.
 * @return {string} - HTML da paginação.
 */
function gerarPaginacao(entidade, page, totalPaginas, limit) {
  return `
    <li class="page-item rounded-left ${page === 1 ? 'disabled' : ''}">
      <a class="page-link" href="#" aria-label="Previous" onclick="carregarRegistros('${entidade}', ${page - 1}, ${limit})">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    ${Array.from({ length: totalPaginas }, (_, i) => `
      <li class="page-item ${page === i + 1 ? 'active' : ''}">
        <a class="page-link" href="#" onclick="carregarRegistros('${entidade}', ${i + 1}, ${limit})">${i + 1}</a>
      </li>
    `).join('')}
    <li class="page-item rounded-right ${page === totalPaginas ? 'disabled' : ''}">
      <a class="page-link" href="#" aria-label="Next" onclick="carregarRegistros('${entidade}', ${page + 1}, ${limit})">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  `;
}

/**
 * Submete um formulário via AJAX.
 * @param {Event} event - Evento de submissão do formulário.
 * @param {string} nomeModal - Nome do modal a ser fechado após a submissão.
 * @return {Promise<void>}
 */
async function submitForm(event, nomeModal) {
  event.preventDefault();
  const form = event.target;
  const action = form.getAttribute('action');
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  data.key = await getKey();
  try {
    const res = await fetch(action, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      $('#' + nomeModal).modal('hide');
      await carregarRegistros(nomeModal, paginaAtual, registrosPorPag);
      window.alert(nomeModal.charAt(0).toUpperCase() + nomeModal.slice(1) + ' salvo com sucesso!');
    } else {
      const result = await res.json();
      window.alert('Erro: ' + result.errors.join('\n'));
    }
  } catch (error) {
    console.error('Erro:', error);
    window.alert('Erro: ' + error.message);
  }
}

/** Rotinas de SETORES
 * Carrega os setores da base de dados e atualiza a tabela de setores.
 * @param {number} page - Número da página atual.
 * @param {number} limit - Número de registros por página.
 */
async function carregarSetores(page, limit) {
  const key = await getKey();
  try {
    const res = await fetch(`/setor/setores?key=${key}&page=${page}&limit=${limit}`);
    if (res.ok) {
      const { setores, totalSetores } = await res.json();
      const tabela = document.querySelector('#setorFormContainer .table tbody');
      tabela.innerHTML = setores.map(setor => `
        <tr>
          <td class="limited-width">${setor.nome}</td>
          <td class="limited-width">${setor.descricao}</td>
          <td class="tdButton">
            <a href="#" class="btn-edit" data-id="${setor._id}" data-nome="${setor.nome}" data-descricao="${setor.descricao}" onclick="return editarSetorClick(this)" title="Editar setor">Editar</a>
          </td>
          <td class="tdButton">
            <a class="text-danger" href="#" onclick="return excluirSetorClick('${setor._id}')" title="Excluir este setor">Excluir</a>
          </td>
        </tr>
      `).join('');

      const totalPaginas = Math.ceil(totalSetores / limit);
      const pagination = document.querySelector('.pagination');
      pagination.innerHTML = gerarPaginacao('setor', page, totalPaginas, limit);
    } else {
      console.error('Erro ao carregar os setores!');
    }
  } catch (error) {
    console.error('Erro:', error);
  }
}

/**
 * Edita um setor existente.
 * @param {HTMLElement} element - Elemento HTML que disparou o evento.
 * @return {boolean} - Retorna false para evitar o comportamento padrão do link.
 */
function editarSetorClick(element) {
  const setorId = $(element).data('id');
  const setorNome = $(element).data('nome');
  const setorDescricao = $(element).data('descricao');

  $('#setorId').val(setorNome);
  $('#setorDescricao').val(setorDescricao);

  $('#tituloModalSetor').text('Editar Setor');
  $('#subTituloModalSetor').text('Edite as informações do setor abaixo.');

  $('#setorForm').attr('action', '/setor/edit/' + setorId);

  $('#setor').modal('show');

  return false;
}

/**
 * Registra um novo setor.
 * @return {boolean} - Retorna false para evitar o comportamento padrão do link.
 */
function registrarNovoSetorClick() {
  $('#setorId').val('');
  $('#setorDescricao').val('');

  $('#tituloModalSetor').text('Cadastrar Setor');
  $('#subTituloModalSetor').text('Cadastre um novo setor abaixo.');

  $('#setorForm').attr('action', '/pagPrincipal/setor/register');

  $('#setor').modal('show');

  return false;
}

/**
 * Exclui um setor existente.
 * @param {string} id - ID do setor a ser excluído.
 * @return {boolean} - Retorna false para evitar o comportamento padrão do link.
 */
async function excluirSetorClick(id) {
  try {
    const result = window.confirm("Deseja realmente excluir este setor?");
    if (result) {
      const res = await fetch(`/setor/delete/${id}`, {
        method: 'GET'
      });

      if (res.ok) {
        console.log('Tentando carregar registros...', paginaAtual, registrosPorPag);
        await carregarRegistros('setor', paginaAtual, registrosPorPag);
      } else {
        const result = await res.json();
        console.error('Erro:', result.error);
      }
    }
  } catch (error) {
    console.error('Erro:', error);
  }

  return false;
}

/**Rotinas de EMPRESAS
 * Carrega as empresas da base de dados e atualiza a tabela de empresas.
 * @param {number} page - Número da página atual.
 * @param {number} limit - Número de registros por página.
 */
async function carregarEmpresas(page, limit) {
  const key = await getKey();
  try {
    const res = await fetch(`/empresa/empresas?key=${key}&page=${page}&limit=${limit}`);
    if (res.ok) {
      const { empresas, totalEmpresas } = await res.json();
      const tabela = document.querySelector('#empresaFormContainer .table tbody');
      tabela.innerHTML = empresas.map(empresa => `
        <tr>
          <td class="limited-width">${empresa.nome}</td>
          <td class="tdButton">
            <a href="#" class="btn-edit" data-id="${empresa._id}" data-nome="${empresa.nome}" onclick="return editarEmpresaClick(this)" title="Editar empresa">Editar</a>
          </td>
          <td class="tdButton">
            <a class="text-danger" href="#" onclick="return excluirEmpresaClick('${empresa._id}')" title="Excluir este empresa">Excluir</a>
          </td>
        </tr>
      `).join('');

      const totalPaginas = Math.ceil(totalEmpresas / limit);
      const pagination = document.querySelector('.pagination');
      pagination.innerHTML = gerarPaginacao('empresa', page, totalPaginas, limit);
    } else {
      console.error('Erro ao carregar as empresas!');
    }
  } catch (error) {
    console.error('Erro:', error);
  }
}

/**
 * Edita uma empresa existente.
 * @param {HTMLElement} element - Elemento HTML que disparou o evento.
 * @return {boolean} - Retorna false para evitar o comportamento padrão do link.
 */
function editarEmpresaClick(element) {
  const empresaId = $(element).data('id');
  const empresaNome = $(element).data('nome');

  $('#empresaId').val(empresaNome);

  $('#tituloModalEmpresa').text('Editar Empresa');
  $('#subTituloModalEmpresa').text('Edite as informações da empresa abaixo.');

  $('#empresaForm').attr('action', '/empresa/edit/' + empresaId);

  $('#empresa').modal('show');

  return false;
}

/**
 * Registra uma nova empresa.
 * @return {boolean} - Retorna false para evitar o comportamento padrão do link.
 */
function registrarNovaEmpresaClick() {
  $('#empresaId').val('');

  $('#tituloModalEmpresa').text('Cadastrar Empresa');
  $('#subTituloModalEmpresa').text('Cadastre uma nova empresa abaixo.');

  $('#empresaForm').attr('action', '/pagPrincipal/empresa/register');

  $('#empresa').modal('show');

  return false;
}

/**
 * Exclui uma empresa.
 * @param {string} id - ID da empresa a ser excluída.
 * @return {boolean} - Retorna false para evitar o comportamento padrão do link.
 */
async function excluirEmpresaClick(id) {
  try {
    const result = window.confirm("Deseja realmente excluir esta empresa?");
    if (result) {
      const res = await fetch(`/empresa/delete/${id}`, {
        method: 'GET'
      });

      if (res.ok) {
        console.log('Tentando carregar registros...', paginaAtual, registrosPorPag);
        await carregarRegistros('empresa', paginaAtual, registrosPorPag);
      } else {
        const result = await res.json();
        console.error('Erro:', result.error);
      }
    }
  } catch (error) {
    console.error('Erro:', error);
  }

  return false;
}

/**Rotinas de ATIVIDADES
 * Carrega as atividades da base de dados e atualiza a tabela de atividades.
 * @param {number} page - Número da página atual.
 * @param {number} limit - Número de registros por página.
 */
async function carregarAtividades(page, limit) {
  const key = await getKey();
  try {
    const res = await fetch(`/atividade/atividades?key=${key}&page=${page}&limit=${limit}`);
    if (res.ok) {
      const { atividades, totalAtividades } = await res.json();
      const tabela = document.querySelector('#atividadeFormContainer .table tbody');
      tabela.innerHTML = atividades.map(atividade => `
        <tr>
          <td class="limited-width">${atividade.nome}</td>
          <td class="tdButton">
            <a href="#" class="btn-edit" data-id="${atividade._id}" data-nome="${atividade.nome}" onclick="return editarAtividadeClick(this)" title="Editar atividade">Editar</a>
          </td>
          <td class="tdButton">
            <a class="text-danger" href="#" onclick="return excluirAtividadeClick('${atividade._id}')" title="Excluir este atividade">Excluir</a>
          </td>
        </tr>
      `).join('');

      const totalPaginas = Math.ceil(totalAtividades / limit);
      const pagination = document.querySelector('.pagination');
      pagination.innerHTML = gerarPaginacao('atividade', page, totalPaginas, limit);
    } else {
      console.error('Erro ao carregar as atividades!');
    }
  } catch (error) {
    console.error('Erro:', error);
  }
}

/**
 * Edita uma atividade existente.
 * @param {HTMLElement} element - Elemento HTML que disparou o evento.
 * @return {boolean} - Retorna false para evitar o comportamento padrão do link.
 */
function editarAtividadeClick(element) {
  const atividadeId = $(element).data('id');
  const atividadeNome = $(element).data('nome');

  $('#atividadeId').val(atividadeNome);

  $('#tituloModalAtividade').text('Editar Atividade');
  $('#subTituloModalAtividade').text('Edite as informações da atividade abaixo.');

  $('#atividadeForm').attr('action', '/atividade/edit/' + atividadeId);

  $('#atividade').modal('show');

  return false;
}

/**
 * Registra uma nova atividade.
 * @return {boolean} - Retorna false para evitar o comportamento padrão do link.
 */
function registrarNovaAtividadeClick() {
  $('#atividadeId').val('');

  $('#tituloModalAtividade').text('Cadastrar Atividade');
  $('#subTituloModalAtividade').text('Cadastre uma nova atividade abaixo.');

  $('#atividadeForm').attr('action', '/pagPrincipal/atividade/register');

  $('#atividade').modal('show');

  return false;
}

/**
 * Exclui uma atividade.
 * @param {string} id - ID da atividade a ser excluída.
 * @return {boolean} - Retorna false para evitar o comportamento padrão do link.
 */
async function excluirAtividadeClick(id) {
  try {
    const result = window.confirm("Deseja realmente excluir esta atividade?");
    if (result) {
      const res = await fetch(`/atividade/delete/${id}`, {
        method: 'GET'
      });

      if (res.ok) {
        console.log('Tentando carregar registros...', paginaAtual, registrosPorPag);
        await carregarRegistros('atividade', paginaAtual, registrosPorPag);
      } else {
        const result = await res.json();
        console.error('Erro:', result.error);
      }
    }
  } catch (error) {
    console.error('Erro:', error);
  }

  return false;
}

/**Rotinas de EXECUÇÕES
 * Carrega as EXECUÇÕES da base de dados e atualiza a tabela de EXECUÇÕES.
 * @param {number} page - Número da página atual.
 * @param {number} limit - Número de registros por página.
 */
async function carregarExecucoes(page, limit) {
  const key = await getKey();
  try {
    const res = await fetch(`/execucao/execucoes?key=${key}&page=${page}&limit=${limit}`);
    if (res.ok) {
      const { execucoes, totalExecucoes } = await res.json();
      const tabela = document.querySelector('#execucaoFormContainer .table tbody');
      tabela.innerHTML = execucoes.map(execucao => `
        <tr>
          <td class="limited-width">${execucao.descricao}</td>
          <td class="tdButton">
            <a href="#" class="btn-edit" data-id="${execucao._id}" data-descricao="${execucao.descricao}" onclick="return editarExecucaoClick(this)" title="Editar execucao">Editar</a>
          </td>
          <td class="tdButton">
            <a class="text-danger" href="#" onclick="return excluirExecucaoClick('${execucao._id}')" title="Excluir este execucao">Excluir</a>
          </td>
        </tr>
      `).join('');

      const totalPaginas = Math.ceil(totalExecucoes / limit);
      const pagination = document.querySelector('.pagination');
      pagination.innerHTML = gerarPaginacao('execucao', page, totalPaginas, limit);
    } else {
      console.error('Erro ao carregar as execucoes!');
    }
  } catch (error) {
    console.error('Erro:', error);
  }
}

/**
 * Edita uma execução existente.
 * @param {HTMLElement} element - Elemento HTML que disparou o evento.
 * @return {boolean} - Retorna false para evitar o comportamento padrão do link.
 */
function editarExecucaoClick(element) {
  const execucaoId = $(element).data('id');
  const execucaoDescricao = $(element).data('descricao');

  $('#execucaoId').val(execucaoDescricao);

  $('#tituloModalExecucao').text('Editar Execução');
  $('#subTituloModalExecucao').text('Edite as informações da execução abaixo.');

  $('#execucaoForm').attr('action', '/execucao/edit/' + execucaoId);

  $('#execucao').modal('show');

  return false;
}

/**
 * Registra uma nova execução.
 * @return {boolean} - Retorna false para evitar o comportamento padrão do link.
 */
function registrarNovaExecucaoClick() {
  $('#execucaoId').val('');

  $('#tituloModalExecucao').text('Cadastrar Execução');
  $('#subTituloModalExecucao').text('Cadastre uma nova Execução abaixo.');

  $('#execucaoForm').attr('action', '/pagPrincipal/execucao/register');

  $('#execucao').modal('show');

  return false;
}

/**
 * Exclui uma execução.
 * @param {string} id - ID da execução a ser excluída.
 * @return {boolean} - Retorna false para evitar o comportamento padrão do link.
 */
async function excluirExecucaoClick(id) {
  try {
    const result = window.confirm("Deseja realmente excluir esta execução?");
    if (result) {
      const res = await fetch(`/execucao/delete/${id}`, {
        method: 'GET'
      });

      if (res.ok) {
        console.log('Tentando carregar registros...', paginaAtual, registrosPorPag);
        await carregarRegistros('execucao', paginaAtual, registrosPorPag);
      } else {
        const result = await res.json();
        console.error('Erro:', result.error);
      }
    }
  } catch (error) {
    console.error('Erro:', error);
  }

  return false;
}

/**Rotinas de ATIVIDADES
 * Carrega as grupos da base de dados e atualiza a tabela de grupos.
 * @param {number} page - Número da página atual.
 * @param {number} limit - Número de registros por página.
 */
async function carregarGrupos(page, limit) {
  const key = await getKey();
  try {
    const res = await fetch(`/grupo/grupos?key=${key}&page=${page}&limit=${limit}`);
    if (res.ok) {
      const { grupos, totalGrupos } = await res.json();
      const tabela = document.querySelector('#grupoFormContainer .table tbody');
      tabela.innerHTML = grupos.map(grupo => `
        <tr>
          <td class="limited-width">${grupo.nome}</td>
          <td class="tdButton">
            <a href="#" class="btn-edit" data-id="${grupo._id}" data-nome="${grupo.nome}" onclick="return editarGrupoClick(this)" title="Editar grupo">Editar</a>
          </td>
          <td class="tdButton">
            <a class="text-danger" href="#" onclick="return excluirGrupoClick('${grupo._id}')" title="Excluir este grupo">Excluir</a>
          </td>
        </tr>
      `).join('');

      const totalPaginas = Math.ceil(totalGrupos / limit);
      const pagination = document.querySelector('.pagination');
      pagination.innerHTML = gerarPaginacao('grupo', page, totalPaginas, limit);
    } else {
      console.error('Erro ao carregar as grupos!');
    }
  } catch (error) {
    console.error('Erro:', error);
  }
}

/**
 * Edita um grupo existente.
 * @param {HTMLElement} element - Elemento HTML que disparou o evento.
 * @return {boolean} - Retorna false para evitar o comportamento padrão do link.
 */
function editarGrupoClick(element) {
  const grupoId = $(element).data('id');
  const grupoNome = $(element).data('nome');

  $('#grupoId').val(grupoNome);

  $('#tituloModalGrupo').text('Editar Grupo');
  $('#subTituloModalGrupo').text('Edite as informações da grupo abaixo.');

  $('#grupoForm').attr('action', '/grupo/edit/' + grupoId);

  $('#grupo').modal('show');

  return false;
}

/**
 * Registra um nova grupo.
 * @return {boolean} - Retorna false para evitar o comportamento padrão do link.
 */
function registrarNovoGrupoClick() {
  $('#grupoId').val('');

  $('#tituloModalGrupo').text('Cadastrar Grupo');
  $('#subTituloModalGrupo').text('Cadastre um nova grupo abaixo.');

  $('#grupoForm').attr('action', '/pagPrincipal/grupo/register');

  $('#grupo').modal('show');

  return false;
}

/**
 * Exclui um grupo.
 * @param {string} id - ID da grupo a ser excluída.
 * @return {boolean} - Retorna false para evitar o comportamento padrão do link.
 */
async function excluirGrupoClick(id) {
  try {
    const result = window.confirm("Deseja realmente excluir esta grupo?");
    if (result) {
      const res = await fetch(`/grupo/delete/${id}`, {
        method: 'GET'
      });

      if (res.ok) {
        console.log('Tentando carregar registros...', paginaAtual, registrosPorPag);
        await carregarRegistros('grupo', paginaAtual, registrosPorPag);
      } else {
        const result = await res.json();
        console.error('Erro:', result.error);
      }
    }
  } catch (error) {
    console.error('Erro:', error);
  }

  return false;
}

/**Rotinas das Unidades
 * Carrega as unidades da base de dados e atualiza a tabela de unidades.
 * @param {number} page - Número da página atual.
 * @param {number} limit - Número de registros por página.
 */
async function carregarUnidades(page, limit) {
  const key = await getKey();
  try {
    const res = await fetch(`/unidade/unidades?key=${key}&page=${page}&limit=${limit}`);
    if (res.ok) {
      const { unidades, totalUnidades } = await res.json();
      const tabela = document.querySelector('#unidadeFormContainer .table tbody');
      tabela.innerHTML = unidades.map(unidade => `
        <tr>
          <td class="limited-width">${unidade._empresaId.nome}</td>
          <td class="limited-width">${unidade._cidadeId.nome}</td>
          <td class="limited-width">${unidade.nome}</td> <!-- Adicionado campo nome -->
          <td class="limited-width">${unidade.endereco}</td>
          <td class="limited-width">${unidade.complemento}</td>
          <td class="tdButton">
            <a href="#" class="btn-edit" data-id="${unidade._id}" data-empresa="${unidade._empresaId._id}" data-cidade="${unidade._cidadeId._id}" data-nome="${unidade.nome}" data-endereco="${unidade.endereco}" data-complemento="${unidade.complemento}" onclick="return editarUnidadeClick(this)" title="Editar unidade">Editar</a>
          </td>
          <td class="tdButton">
            <a class="text-danger" href="#" onclick="return excluirUnidadeClick('${unidade._id}')" title="Excluir esta unidade">Excluir</a>
          </td>
        </tr>
      `).join('');

      const totalPaginas = Math.ceil(totalUnidades / limit);
      const pagination = document.querySelector('.pagination');
      pagination.innerHTML = gerarPaginacao('unidade', page, totalPaginas, limit);
    } else {
      console.error('Erro ao carregar as unidades!');
    }
  } catch (error) {
    console.error('Erro:', error);
  }
}

/**
 * Edita uma unidade existente.
 * @param {HTMLElement} element - Elemento HTML que disparou o evento.
 * @return {boolean} - Retorna false para evitar o comportamento padrão do link.
 */
function editarUnidadeClick(element) {
  const unidadeId = $(element).data('id');
  const unidadeEmpresa = $(element).data('empresa');
  const unidadeCidade = $(element).data('cidade');
  const unidadeNome = $(element).data('nome'); // Adicionado campo nome
  const unidadeEndereco = $(element).data('endereco');
  const unidadeComplemento = $(element).data('complemento');

  $('#tituloModalUnidade').text('Editar Unidade');
  $('#subTituloModalUnidade').text('Edite as informações da Unidade abaixo.');

  $('#unidadeForm').attr('action', '/unidade/edit/' + unidadeId);

  carregarEmpresasSelect().then(() => {
    $('#empresaUnidade').val(unidadeEmpresa);
    carregarCidadesSelect().then(() => {
      $('#cidadeUnidade').val(unidadeCidade);
      $('#nomeId').val(unidadeNome); // Adicionado campo nome
      $('#enderecoId').val(unidadeEndereco);
      $('#complementoId').val(unidadeComplemento);
      $('#unidade').modal('show');
    });
  });

  return false;
}

/**
 * Registra uma nova unidade.
 * @return {boolean} - Retorna false para evitar o comportamento padrão do link.
 */
function registrarNovaUnidadeClick() {
  $('#empresaUnidade').val('');
  $('#cidadeUnidade').val('');
  $('#nomeId').val(''); // Adicionado campo nome
  $('#enderecoId').val('');
  $('#complementoId').val('');

  $('#tituloModalUnidade').text('Cadastrar Unidade');
  $('#subTituloModalUnidade').text('Cadastre uma nova Unidade abaixo.');

  $('#unidadeForm').attr('action', '/pagPrincipal/unidade/register');

  carregarEmpresasSelect().then(() => {
    carregarCidadesSelect().then(() => {
      $('#unidade').modal('show');
    });
  });

  return false;
}

/**
 * Exclui uma unidade.
 * @param {string} id - ID da unidade a ser excluída.
 * @return {boolean} - Retorna false para evitar o comportamento padrão do link.
 */
async function excluirUnidadeClick(id) {
  try {
    const result = window.confirm("Deseja realmente excluir esta unidade?");
    if (result) {
      const res = await fetch(`/unidade/delete/${id}`, {
        method: 'GET'
      });

      if (res.ok) {
        console.log('Tentando carregar registros...', paginaAtual, registrosPorPag);
        await carregarRegistros('unidade', paginaAtual, registrosPorPag);
      } else {
        const result = await res.json();
        console.error('Erro:', result.error);
      }
    }
  } catch (error) {
    console.error('Erro:', error);
  }

  return false;
}

async function carregarEmpresasSelect() {
  const key = await getKey();
  try {
    const res = await fetch(`/empresa/empresas?key=${key}`);
    if (res.ok) {
      const { empresas } = await res.json();
      const select = document.getElementById('empresaUnidade');
      select.innerHTML = empresas.map(empresa => `
        <option value="${empresa._id}">${empresa.nome}</option>
      `).join('');
    } else {
      console.error('Erro ao carregar as empresas!');
    }
  } catch (error) {
    console.error('Erro:', error);
  }
}

async function carregarCidadesSelect() {
  const key = await getKey();
  try {
    const res = await fetch(`/cidade/cidades?key=${key}`);
    if (res.ok) {
      const { cidades } = await res.json();
      const select = document.getElementById('cidadeUnidade');
      select.innerHTML = cidades.map(cidade => `
        <option value="${cidade._id}">${cidade.nome}</option>
      `).join('');
    } else {
      console.error('Erro ao carregar as cidades!');
    }
  } catch (error) {
    console.error('Erro:', error);
  }
}

/**Rotinas ds SubGrupos
 * Carrega as subGrupos da base de dados e atualiza a tabela de subGrupos.
 * @param {number} page - Número da página atual.
 * @param {number} limit - Número de registros por página.
 */
async function carregarSubGrupos(page, limit) {
  const key = await getKey();
  try {
    const res = await fetch(`/subGrupo/subGrupos?key=${key}&page=${page}&limit=${limit}`);
    if (res.ok) {
      const { subGrupos, totalSubGrupos } = await res.json();
      const tabela = document.querySelector('#subGrupoFormContainer .table tbody');
      tabela.innerHTML = subGrupos.map(subGrupo => `
        <tr>
          <td class="limited-width">${subGrupo._grupoId.nome}</td>
          <td class="limited-width">${subGrupo.nome}</td>
          <td class="tdButton">
            <a href="#" class="btn-edit" data-id="${subGrupo._id}" data-grupo="${subGrupo._grupoId._id}" data-nome="${subGrupo.nome}" onclick="return editarSubGrupoClick(this)" title="Editar subGrupo">Editar</a>
          </td>
          <td class="tdButton">
            <a class="text-danger" href="#" onclick="return excluirSubGrupoClick('${subGrupo._id}')" title="Excluir este subGrupo">Excluir</a>
          </td>
        </tr>
      `).join('');

      const totalPaginas = Math.ceil(totalSubGrupos / limit);
      const pagination = document.querySelector('.pagination');
      pagination.innerHTML = gerarPaginacao('subGrupo', page, totalPaginas, limit);
    } else {
      console.error('Erro ao carregar os subGrupos!');
    }
  } catch (error) {
    console.error('Erro:', error);
  }
}

/**
 * Edita um subGrupo existente.
 * @param {HTMLElement} element - Elemento HTML que disparou o evento.
 * @return {boolean} - Retorna false para evitar o comportamento padrão do link.
 */
function editarSubGrupoClick(element) {
  const subGrupoId = $(element).data('id');
  const subGrupoGrupo = $(element).data('grupo');
  const subGrupoNome = $(element).data('nome');

  $('#tituloModalSubGrupo').text('Editar SubGrupo');
  $('#subTituloModalSubGrupo').text('Edite os informações do SubGrupo abaixo.');

  $('#subGrupoForm').attr('action', '/subGrupo/edit/' + subGrupoId);

  carregarGruposNoSelect().then(() => {
    $('#subGrupoGrupo').val(subGrupoGrupo);
    $('#nomeId').val(subGrupoNome);
    $('#subGrupo').modal('show');
  });

  return false;
}

/**
 * Registra um novo subGrupo.
 * @return {boolean} - Retorna false para evitar o comportamento padrão do link.
 */
function registrarNovoSubGrupoClick() {
  $('#subGrupoGrupo').val('');
  $('#nomeId').val('');

  $('#tituloModalSubGrupo').text('Cadastrar SubGrupo');
  $('#subTituloModalSubGrupo').text('Cadastre um novo SubGrupo abaixo.');

  $('#subGrupoForm').attr('action', '/pagPrincipal/subGrupo/register');

  carregarGruposNoSelect().then(() => {
    $('#subGrupo').modal('show');
  });

  return false;
}

/**
 * Exclui um subGrupo.
 * @param {string} id - ID da subGrupo a ser excluído.
 * @return {boolean} - Retorna false para evitar o comportamento padrão do link.
 */
async function excluirSubGrupoClick(id) {
  try {
    const result = window.confirm("Deseja realmente excluir este subGrupo?");
    if (result) {
      const res = await fetch(`/subGrupo/delete/${id}`, {
        method: 'GET'
      });

      if (res.ok) {
        console.log('Tentando carregar registros...', paginaAtual, registrosPorPag);
        await carregarRegistros('subGrupo', paginaAtual, registrosPorPag);
      } else {
        const result = await res.json();
        console.error('Erro:', result.error);
      }
    }
  } catch (error) {
    console.error('Erro:', error);
  }

  return false;
}

async function carregarGruposNoSelect() {
  const key = await getKey();
  try {
    const res = await fetch(`/grupo/grupos?key=${key}`);
    if (res.ok) {
      const { grupos } = await res.json();
      const select = document.getElementById('subGrupoGrupo');
      select.innerHTML = grupos.map(grupo => `
        <option value="${grupo._id}">${grupo.nome}</option>
      `).join('');
    } else {
      console.error('Erro ao carregar os grupos!');
    }
  } catch (error) {
    console.error('Erro:', error);
  }
}
 
/**Rotinas de unidade de medidas
 * Carrega as unidade de medidas da base de dados e atualiza a tabela de unidade de medidas.
 * @param {number} page - Número da página atual.
 * @param {number} limit - Número de registros por página.
 */
async function carregarUnidadeMedidas(page, limit) {
  const key = await getKey();
  try {
    const res = await fetch(`/unidadeMedida/unidadeMedidas?key=${key}&page=${page}&limit=${limit}`);
    if (res.ok) {
      const { unidadeMedidas, totalUnidadeMedida } = await res.json();
      const tabela = document.querySelector('#unidadeMedidaFormContainer .table tbody');
      tabela.innerHTML = unidadeMedidas.map(unidadeMedida => `
        <tr>
          <td class="limited-width">${unidadeMedida.descricao}</td>
          <td class="limited-width">${unidadeMedida.sigla}</td>
          <td class="limited-width">${unidadeMedida.podeFracionar}</td>
          <td class="tdButton">
            <a href="#" class="btn-edit" data-id="${unidadeMedida._id}" data-descricao="${unidadeMedida.descricao}" data-sigla="${unidadeMedida.sigla}" data-podefracionar="${unidadeMedida.podeFracionar}" onclick="return editarUnidadeMedidaClick(this)" title="Editar unidadeMedida">Editar</a>
          </td>
          <td class="tdButton">
            <a class="text-danger" href="#" onclick="return excluirUnidadeMedidaClick('${unidadeMedida._id}')" title="Excluir este unidadeMedida">Excluir</a>
          </td>
        </tr>
      `).join('');

      const totalPaginas = Math.ceil(totalUnidadeMedida / limit);
      const pagination = document.querySelector('.pagination');
      pagination.innerHTML = gerarPaginacao('unidadeMedida', page, totalPaginas, limit);
    } else {
      console.error('Erro ao carregar as unidadeMedidas!');
    }
  } catch (error) {
    console.error('Erro:', error);
  }
}

/**
 * Edita uma unidade de medida existente.
 * @param {HTMLElement} element - Elemento HTML que disparou o evento.
 * @return {boolean} - Retorna false para evitar o comportamento padrão do link.
 */
function editarUnidadeMedidaClick(element) {
  const unidadeMedidaId = $(element).data('id');
  const unidadeMedidaDescricao = $(element).data('descricao');
  const unidadeMedidaSigla = $(element).data('sigla');
  const unidadeMedidaPodeFracionar = $(element).data('podefracionar') === 'Sim';

  $('#unidadeMedidaId').val(unidadeMedidaId);
  $('#unidadeMedidaDescricao').val(unidadeMedidaDescricao);
  $('#unidadeMedidaSigla').val(unidadeMedidaSigla);
  $('#unidadeMedidaPodeFracionar').prop('checked', unidadeMedidaPodeFracionar);

  $('#tituloModalUnidadeMedida').text('Editar Unidade de medida');
  $('#subTituloModalUnidadeMedida').text('Edite as informações da unidade de medida abaixo.');

  $('#unidadeMedidaForm').attr('action', '/unidadeMedida/edit/' + unidadeMedidaId);

  $('#unidadeMedida').modal('show');

  return false;
}

/**
 * Registra uma nova unidade de medida.
 * @return {boolean} - Retorna false para evitar o comportamento padrão do link.
 */
function registrarNovaUnidadeMedidaClick() {
  $('#unidadeMedidaId').val('');
  $('#unidadeMedidaDescricao').val('');
  $('#unidadeMedidaSigla').val('');
  $('#unidadeMedidaPodeFracionar').prop('checked', false);

  $('#tituloModalUnidadeMedida').text('Cadastrar Unidade de medida');
  $('#subTituloModalUnidadeMedida').text('Cadastre uma nova Unidade de medida abaixo.');

  $('#unidadeMedidaForm').attr('action', '/pagPrincipal/unidadeMedida/register');

  $('#unidadeMedida').modal('show');

  return false;
}

/**
 * Exclui uma unidade de medida.
 * @param {string} id - ID da unidade de medida a ser excluída.
 * @return {boolean} - Retorna false para evitar o comportamento padrão do link.
 */
async function excluirUnidadeMedidaClick(id) {
  try {
    const result = window.confirm("Deseja realmente excluir esta unidade de medida?");
    if (result) {
      const res = await fetch(`/unidadeMedida/delete/${id}`, {
        method: 'GET'
      });

      if (res.ok) {
        console.log('Tentando carregar registros...', paginaAtual, registrosPorPag);
        await carregarRegistros('unidadeMedida', paginaAtual, registrosPorPag);
      } else {
        const result = await res.json();
        console.error('Erro:', result.error);
      }
    }
  } catch (error) {
    console.error('Erro:', error);
  }

  return false;
}

/**Rotinas de MARCAS
 * Carrega as marcas da base de dados e atualiza a tabela de marcas.
 * @param {number} page - Número da página atual.
 * @param {number} limit - Número de registros por página.
 */
async function carregarMarcas(page, limit) {
  const key = await getKey();
  try {
    const res = await fetch(`/marca/marcas?key=${key}&page=${page}&limit=${limit}`);
    if (res.ok) {
      const { marcas, totalMarcas } = await res.json();
      const tabela = document.querySelector('#marcaFormContainer .table tbody');
      tabela.innerHTML = marcas.map(marca => `
        <tr>
          <td class="limited-width">${marca.nome}</td>
          <td class="tdButton">
            <a href="#" class="btn-edit" data-id="${marca._id}" data-nome="${marca.nome}" onclick="return editarMarcaClick(this)" title="Editar marca">Editar</a>
          </td>
          <td class="tdButton">
            <a class="text-danger" href="#" onclick="return excluirMarcaClick('${marca._id}')" title="Excluir este marca">Excluir</a>
          </td>
        </tr>
      `).join('');

      const totalPaginas = Math.ceil(totalMarcas / limit);
      const pagination = document.querySelector('.pagination');
      pagination.innerHTML = gerarPaginacao('marca', page, totalPaginas, limit);
    } else {
      console.error('Erro ao carregar as marcas!');
    }
  } catch (error) {
    console.error('Erro:', error);
  }
}

/**
 * Edita uma marca existente.
 * @param {HTMLElement} element - Elemento HTML que disparou o evento.
 * @return {boolean} - Retorna false para evitar o comportamento padrão do link.
 */
function editarMarcaClick(element) {
  const marcaId = $(element).data('id');
  const marcaNome = $(element).data('nome');

  $('#marcaId').val(marcaNome);

  $('#tituloModalMarca').text('Editar Marca');
  $('#subTituloModalMarca').text('Edite as informações da marca abaixo.');

  $('#marcaForm').attr('action', '/marca/edit/' + marcaId);

  $('#marca').modal('show');

  return false;
}

/**
 * Registra uma nova marca.
 * @return {boolean} - Retorna false para evitar o comportamento padrão do link.
 */
function registrarNovaMarcaClick() {
  $('#marcaId').val('');

  $('#tituloModalMarca').text('Cadastrar Marca');
  $('#subTituloModalMarca').text('Cadastre uma nova marca abaixo.');

  $('#marcaForm').attr('action', '/pagPrincipal/marca/register');

  $('#marca').modal('show');

  return false;
}

/**
 * Exclui uma marca.
 * @param {string} id - ID da marca a ser excluída.
 * @return {boolean} - Retorna false para evitar o comportamento padrão do link.
 */
async function excluirMarcaClick(id) {
  try {
    const result = window.confirm("Deseja realmente excluir esta marca?");
    if (result) {
      const res = await fetch(`/marca/delete/${id}`, {
        method: 'GET'
      });

      if (res.ok) {
        console.log('Tentando carregar registros...', paginaAtual, registrosPorPag);
        await carregarRegistros('marca', paginaAtual, registrosPorPag);
      } else {
        const result = await res.json();
        console.error('Erro:', result.error);
      }
    }
  } catch (error) {
    console.error('Erro:', error);
  }

  return false;
}

/**Rotina de USUÁRIOS
 * Função assíncrona para enviar o formulário de usuário.
 * 
 * @param {Event} event - O evento de submissão do formulário.
 * @throws {Error} - Lança um erro se ocorrer algum problema durante as requisições.
 */
async function submitUsuarioForm(event) {
  event.preventDefault();

  const unidadeId = $('#usuarioUnidade').val();
  const setorId = $('#usuarioSetor').val();
  const key = await getKey();

  try {
    console.log('Enviando dados para /setorPorUnidade/setoresPorUnidade:', { key, _setorId: setorId, _unidadeId: unidadeId });
    const res = await fetch('/setorPorUnidade/setoresPorUnidade', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ key, _setorId: setorId, _unidadeId: unidadeId })
    });

    if (res.ok) {
      const { setorPorUnidade } = await res.json();

      const form = event.target;
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      const usuarioData = {
        key: key,
        nome: data.nome,
        sobreNome: data.sobreNome,
        email: data.email,
        usuario: data.usuario,
        password: data.password,
        _cargoId: data._cargoId,
        _setorPorUnidadeId: setorPorUnidade._id
      };

      const action = form.getAttribute('action');
      const response = await fetch(action, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuarioData)
      });

      if (response.ok) {
        console.log('Usuário salvo com sucesso.');
        $('#usuarioModal').modal('hide');
        await carregarRegistros('usuario', paginaAtual, registrosPorPag);
      } else {
        const result = await response.json();
        console.error('Erro ao salvar usuário:', result.error);
        window.alert('Erro: ' + result.errors.join('\n'));
      }
    } else {
      const result = await res.json();
      console.error('Erro ao buscar ou criar SetorPorUnidade:', result.error);
      window.alert('Erro: ' + result.errors.join('\n'));
    }
  } catch (error) {
    console.error('Erro:', error);
    window.alert('Erro: ' + error.message);
  }
}

/**
 * Abre o modal de registro de um novo usuário.
 * @return {boolean} - Retorna false para evitar o comportamento padrão do link.
 */
function registrarNovoUsuarioClick() {
  $('#usuarioNome').val('');
  $('#usuarioSobrenome').val('');
  $('#usuarioEmail').val('');
  $('#usuarioUsuario').val('');
  $('#usuarioSenha').val('');
  $('#usuarioCargo').val('');
  $('#usuarioUnidade').val('');
  $('#usuarioSetor').val('');

  $('#tituloModalUsuario').text('Cadastrar Usuário');
  $('#usuarioForm').attr('action', '/usuario/register');

  carregarCargosSelect().then(() => {
    carregarUnidadesSelect().then(() => {
      carregarSetoresSelect().then(() => {
        $('#usuarioModal').modal('show');
      });
    });
  });

  return false;
}

/**
 * Edita um usuário existente.
 * @param {HTMLElement} element - Elemento HTML que disparou o evento.
 * @return {boolean} - Retorna false para evitar o comportamento padrão do link.
 */
function editarUsuarioClick(element) {
  const usuarioId = $(element).data('id');
  const usuarioNome = $(element).data('nome');
  const usuarioSobrenome = $(element).data('sobrenome');
  const usuarioEmail = $(element).data('email');
  const usuarioUsuario = $(element).data('usuario');
  const usuarioCargo = $(element).data('cargo');
  const usuarioUnidade = $(element).data('unidade');
  const usuarioSetor = $(element).data('setor');

  $('#usuarioNome').val(usuarioNome);
  $('#usuarioSobrenome').val(usuarioSobrenome);
  $('#usuarioEmail').val(usuarioEmail);
  $('#usuarioUsuario').val(usuarioUsuario);

  $('#tituloModalUsuario').text('Editar Usuário');
  $('#usuarioForm').attr('action', '/usuario/edit/' + usuarioId);

  carregarCargosSelect().then(() => {
    $('#usuarioCargo').val(usuarioCargo);
    carregarUnidadesSelect().then(() => {
      $('#usuarioUnidade').val(usuarioUnidade);
      carregarSetoresSelect().then(() => {
        $('#usuarioSetor').val(usuarioSetor);
        $('#usuarioModal').modal('show');
      });
    });
  });

  return false;
}


/**
 * Carrega a lista de usuários e atualiza a tabela e paginação na interface.
 *
 * @param {number} page - O número da página atual.
 * @param {number} limit - O número de usuários por página.
 */
async function carregarUsuarios(page, limit) {
  const key = await getKey();
  try {
    const res = await fetch(`/usuario/usuarios?key=${key}&page=${page}&limit=${limit}`);
    if (res.ok) {
      const { usuarios, totalUsuarios } = await res.json();
      const tabela = document.querySelector('#usuarioFormContainer .table tbody');
      tabela.innerHTML = usuarios.map(usuario => `
        <tr>
          <td class="limited-width">${usuario.nome}</td>
          <td class="limited-width">${usuario.sobreNome}</td>
          <td class="limited-width">${usuario.email}</td>
          <td class="limited-width">${usuario.usuario}</td>
          <td class="limited-width">${usuario._cargoId ? usuario._cargoId.nome : ''}</td>
          <td class="limited-width">${usuario._setorPorUnidadeId && usuario._setorPorUnidadeId._unidadeId ? usuario._setorPorUnidadeId._unidadeId.nome : ''}</td>
          <td class="limited-width">${usuario._setorPorUnidadeId && usuario._setorPorUnidadeId._setorId ? usuario._setorPorUnidadeId._setorId.nome : ''}</td>
          <td class="tdButton">
            <a href="#" class="btn-edit" data-id="${usuario._id}" data-nome="${usuario.nome}" data-sobrenome="${usuario.sobreNome}" data-email="${usuario.email}" data-usuario="${usuario.usuario}" data-cargo="${usuario._cargoId ? usuario._cargoId._id : ''}" data-unidade="${usuario._setorPorUnidadeId && usuario._setorPorUnidadeId._unidadeId ? usuario._setorPorUnidadeId._unidadeId._id : ''}" data-setor="${usuario._setorPorUnidadeId && usuario._setorPorUnidadeId._setorId ? usuario._setorPorUnidadeId._setorId._id : ''}" data-setorporunidadeid="${usuario._setorPorUnidadeId ? usuario._setorPorUnidadeId._id : ''}" onclick="return editarUsuarioClick(this)" title="Editar usuário">Editar</a>
          </td>
          <td class="tdButton">
            <a class="text-danger" href="#" onclick="return excluirUsuarioClick('${usuario._id}')" title="Excluir este usuário">Excluir</a>
          </td>
        </tr>
      `).join('');

      const totalPaginas = Math.ceil(totalUsuarios / limit);
      const pagination = document.querySelector('.pagination');
      pagination.innerHTML = gerarPaginacao('usuario', page, totalPaginas, limit);
    } else {
      console.error('Erro ao carregar os usuários!');
    }
  } catch (error) {
    console.error('Erro:', error);
  }
}

/**
 * Exclui um usuário existente.
 * @param {string} id - ID do usuário a ser excluído.
 * @return {boolean} - Retorna false para evitar o comportamento padrão do link.
 */
async function excluirUsuarioClick(id) {
  try {
    const result = window.confirm("Deseja realmente excluir este usuário?");
    if (result) {
      const res = await fetch(`/usuario/delete/${id}`, {
        method: 'POST'
      });

      if (res.ok) {
        console.log('Tentando carregar registros...', paginaAtual, registrosPorPag);
        await carregarRegistros('usuario', paginaAtual, registrosPorPag);
      } else {
        const result = await res.json();
        console.error('Erro:', result.error);
      }
    }
  } catch (error) {
    console.error('Erro:', error);
  }

  return false;
}

/**
 * Carrega os cargos no select.
 */
async function carregarCargosSelect() {
  const key = await getKey();
  try {
    const res = await fetch(`/cargo/cargos?key=${key}`);
    if (res.ok) {
      const { cargos } = await res.json();
      const select = document.getElementById('usuarioCargo');
      select.innerHTML = cargos.map(cargo => `
        <option value="${cargo._id}">${cargo.nome}</option>
      `).join('');
    } else {
      console.error('Erro ao carregar os cargos!');
    }
  } catch (error) {
    console.error('Erro:', error);
  }
}

/**
 * Carrega as unidades no select.
 */
async function carregarUnidadesSelect() {
  const key = await getKey();
  try {
    const res = await fetch(`/unidade/unidades?key=${key}`);
    if (res.ok) {
      const { unidades } = await res.json();
      const select = document.getElementById('usuarioUnidade');
      select.innerHTML = unidades.map(unidade => `
        <option value="${unidade._id}">${unidade.nome}</option>
      `).join('');
    } else {
      console.error('Erro ao carregar as unidades!');
    }
  } catch (error) {
    console.error('Erro:', error);
  }
}

/**
 * Carrega os setores no select.
 */
async function carregarSetoresSelect() {
  const key = await getKey();
  try {
    const res = await fetch(`/setor/setores?key=${key}`);
    if (res.ok) {
      const { setores } = await res.json();
      const select = document.getElementById('usuarioSetor');
      select.innerHTML = setores.map(setor => `
        <option value="${setor._id}">${setor.nome}</option>
      `).join('');
    } else {
      console.error('Erro ao carregar os setores!');
    }
  } catch (error) {
    console.error('Erro:', error);
  }
}

/**Rotinas ds Produtos
 * Carrega as produtos da base de dados e atualiza a tabela de produtos.
 * @param {number} page - Número da página atual.
 * @param {number} limit - Número de registros por página.
 */
async function carregarProdutos(page, limit) {
  const key = await getKey();
  try {
    const res = await fetch(`/produto/produtos?key=${key}&page=${page}&limit=${limit}`);
    if (res.ok) {
      const { produtos, totalProdutos } = await res.json();
      const tabela = document.querySelector('#produtoFormContainer .table tbody');
      tabela.innerHTML = produtos.map(produto => `
        <tr>
          <td class="limited-width">${produto._marcaId.nome}</td>
          <td class="limited-width">${produto._subGrupoId.nome}</td>
          <td class="limited-width">${produto.nome}</td>
          <td class="limited-width">${produto.descricao}</td>
          <td class="limited-width">${produto._unidadeMedidaId.sigla}</td>
          <td class="limited-width">${produto.quantidadeEstoque}</td>
          <td class="limited-width">${produto.valorUnitario}</td>
          <td class="tdButton">
            <a href="#" class="btn-edit" data-id="${produto._id}" data-marca="${produto._marcaId._id}" data-subgrupo="${produto._subGrupoId._id}" data-nome="${produto.nome}" data-descricao="${produto.descricao}" data-unidade="${produto._unidadeMedidaId._id}" data-quantidade="${produto.quantidadeEstoque}" data-valor="${produto.valorUnitario}" onclick="return editarProdutoClick(this)" title="Editar produto">Editar</a>
          </td>
          <td class="tdButton">
            <a class="text-danger" href="#" onclick="return excluirProdutoClick('${produto._id}')" title="Excluir este produto">Excluir</a>
          </td>
      </tr>
      `).join('');

      const totalPaginas = Math.ceil(totalProdutos / limit);
      const pagination = document.querySelector('.pagination');
      pagination.innerHTML = gerarPaginacao('produto', page, totalPaginas, limit);
    } else {
      console.error('Erro ao carregar os produtos!');
    }
  } catch (error) {
    console.error('Erro:', error);
  }
}


/**
 * Carrega os subgrupos em um elemento <select> no DOM.
 * 
 * Esta função obtém uma chave através da função `getKey`, faz uma requisição
 * para buscar os subgrupos e popula um elemento <select> com os subgrupos recebidos.
 */
async function carregarSubGruposNoSelect() {
  const key = await getKey();
  try {
    const res = await fetch(`/subGrupo/subGrupos?key=${key}`);
    if (res.ok) {
      const { subGrupos } = await res.json();
      const select = document.getElementById('produtoSubGrupo');
      select.innerHTML = subGrupos.map(subGrupo => `
        <option value="${subGrupo._id}">${subGrupo.nome}</option>
      `).join('');
    } else {
      console.error('Erro ao carregar os subGrupos!');
    }
  } catch (error) {
    console.error('Erro:', error);
  }
}

/**
 * Carrega as unidades de medida em um elemento <select> no DOM.
 * 
 * Esta função obtém uma chave de API através da função `getKey`, 
 * faz uma requisição para buscar as unidades de medida e, 
 * se bem-sucedida, popula um elemento <select> com as opções 
 * correspondentes.
 */
async function carregarUnidadeMedidasNoSelect() {
  const key = await getKey();
  try {
    const res = await fetch(`/unidadeMedida/unidadeMedidas?key=${key}`);
    if (res.ok) {
      const { unidadeMedidas } = await res.json();
      const select = document.getElementById('produtoUnidadeMedida');
      select.innerHTML = unidadeMedidas.map(unidadeMedida => `
        <option value="${unidadeMedida._id}">${unidadeMedida.sigla}</option>
      `).join('');
    } else {
      console.error('Erro ao carregar as unidadeMedidas!');
    }
  } catch (error) {
    console.error('Erro:', error);
  }
}

/**
 * Função assíncrona para carregar as marcas em um elemento <select> no DOM.
 * 
 * Esta função obtém uma chave de acesso através da função `getKey()`, faz uma requisição
 * à API para buscar as marcas disponíveis e popula um elemento <select> com as opções
 * correspondentes.
*/
async function carregarMarcasNoSelect() {
  const key = await getKey();
  try {
    const res = await fetch(`/marca/marcas?key=${key}`);
    if (res.ok) {
      const { marcas } = await res.json();
      const select = document.getElementById('produtoMarca');
      select.innerHTML = marcas.map(marca => `
        <option value="${marca._id}">${marca.nome}</option>
      `).join('');
    } else {
      console.error('Erro ao carregar as marcas!');
    }
  } catch (error) {
    console.error('Erro:', error);
  }
}

function editarProdutoClick(element) {
  const produtoId = $(element).data('id');
  const produtoMarca = $(element).data('marca');
  const produtoSubGrupo = $(element).data('subgrupo');
  const produtoNome = $(element).data('nome');
  const produtoDescricao = $(element).data('descricao');
  const produtoUnidade = $(element).data('unidade');
  const produtoQuantidade = $(element).data('quantidade');
  const produtoValor = $(element).data('valor');

  $('#tituloModalProduto').text('Editar Produto');
  $('#subTituloModalProduto').text('Edite as informações do Produto abaixo.');

  $('#produtoForm').attr('action', '/produto/edit/' + produtoId);

  carregarMarcasNoSelect().then(() => {
    $('#produtoMarca').val(produtoMarca);
    carregarSubGruposNoSelect().then(() => {
      $('#produtoSubGrupo').val(produtoSubGrupo);
      carregarUnidadeMedidasNoSelect().then(() => {
        $('#produtoNome').val(produtoNome);
        $('#produtoDescricao').val(produtoDescricao);
        $('#produtoUnidadeMedida').val(produtoUnidade);
        $('#quantidadeEstoqueId').val(produtoQuantidade);
        $('#valorUnitarioProduto').val(produtoValor);
        $('#produto').modal('show');
      });
    });
  });

  return false;
}

function registrarNovoProdutoClick() {
  $('#produtoMarca').val('');
  $('#produtoSubGrupo').val('');
  $('#produtoNome').val('');
  $('#produtoDescricao').val('');
  $('#produtoUnidadeMedida').val('');
  $('#quantidadeEstoqueId').val('');
  $('#valorUnitarioProduto').val('');

  $('#tituloModalProduto').text('Cadastrar Produto');
  $('#subTituloModalProduto').text('Cadastre um novo Produto abaixo.');

  $('#produtoForm').attr('action', '/pagPrincipal/produto/register');

  carregarMarcasNoSelect().then(() => {
    carregarSubGruposNoSelect().then(() => {
      carregarUnidadeMedidasNoSelect().then(() => {
        $('#produto').modal('show');
      });
    });
  });

  return false;
}

async function excluirProdutoClick(id) {
  try {
    const result = window.confirm("Deseja realmente excluir este produto?");
    if (result) {
      const res = await fetch(`/produto/delete/${id}`, {
        method: 'GET'
      });

      if (res.ok) {
        console.log('Tentando carregar registros...', paginaAtual, registrosPorPag);
        await carregarRegistros('produto', paginaAtual, registrosPorPag);
      } else {
        const result = await res.json();
        console.error('Erro:', result.error);
      }
    }
  } catch (error) {
    console.error('Erro:', error);
  }

  return false;
}


// TELA DE LOADING
// window.addEventListener("load", () => {
//   const loadingScreen = document.getElementById("telaDeLoading");
//   const mainContent = document.getElementById("main-content");

//   setTimeout(() => {
//     loadingScreen.style.display = "none";
//     mainContent.style.display = "block";
//   }, 2000);
// });
