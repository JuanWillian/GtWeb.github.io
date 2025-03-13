var key = 'ad0c0749e023d44bd92c1e56ca0b3e3c';
function formUnidade() {
  let form = "";
  form += '<form class="row g-3 formulario">';
  form += ' <div class="col-md-6">';
  form += '  <label for="nomeEmpresa">Empresa da unidade</label>';
  form += ' <input id="nomeEmpresa" class="form-control" type="text" />';
  form += " </div>";
  form += ' <div class="col-md-6">';
  form += '   <label for="cidade">Cidade</label>';
  form += '   <select class="form-select">';
  form += '   <option value="1">Salvador</option>';
  form += '   <option value="2">Lauro de Freita</option>';
  form += '   <option value="3">Feira de Santana</option>';
  form += '   <option value="4">Jacobina</option>';
  form += "   </select>";
  form += " </div>";
  form += ' <div class="col-md-6">';
  form += '   <label for="ruaUnidade">Rua</label>';
  form += '   <input id="rua" class="form-control" type="text" />';
  form += " </div>";
  form += ' <div class="col-md-6">';
  form += '   <label for="numeroEnderecoUnidade">Número do endereço:</label>';
  form += '   <input id="nomeEmpresa" class="form-control" type="number" />';
  form += " </div>";
  form += ' <div>';
  form += '   <button type="submit" class="btn btnCadastro mt-2">Cadastrar</button>';
  form += '</div>';
  form += "</form>";
  document.getElementById("forms").innerHTML = form;
}

function formSetor() {
  let form = "";
  form += '<form class="row g-3 formulario">';
  form += ' <div class="col-md-12">';
  form += '  <label for="nomeSetor">Nome</label>';
  form += ' <input id="nomeSetor" class="form-control" type="text" />';
  form += " </div>";
  form += '<div class="col-12">';
  form += ' <label for="descSetor">Descrição</label>';
  form += '<input id="descSetor" class="form-control p-5" type="text"/>';
  form += "</div>";
  form += ' <div>';
  form += '   <button type="submit" class="btn btnCadastro mt-2">Cadastrar</button>';
  form += '</div>';
  form += "</form>";
  document.getElementById("forms").innerHTML = form;
}

function formUsuario() {
  let form = "";
  form += ' <form class="row g-3 formulario">';
  form += '<div class="col-md-6">';
  form += '<label for="nome" class="form-label">Nome</label>';
  form +=
    ' <input type="text" class="form-control" id="nome" placeholder="Insira o nome"/>';
  form += "</div>";
  form += '<div class="col-md-6">';
  form += '<label for="sobrenome" class="form-label">Sobrenome</label>';
  form +=
    ' <input type="text" class="form-control" id="sobrenome" placeholder="Insira o sobrenome" />';
  form += "</div>";
  form += '<div class="col-md-6">';
  form += '<label for="email" class="form-label">Email</label>';
  form +=
    ' <input type="email" class="form-control" id="email" placeholder="Insira o E-mail"/>';
  form += "</div>";

  form += '<div class="col-md-6">';
  form += '<label for="usuario" class="form-label">Usuário</label>';
  form +=
    ' <input type="text" class="form-control" id="usuario" placeholder="Insira o nome de usuário" />';
  form += "</div>";

  form += '<div class="col-md-6">';
  form += '<label for="senha" class="form-label">Senha</label>';
  form +=
    ' <input type="password" class="form-control" id="senha" placeholder="Insira a senha"/>';
  form += "</div>";

  form += ' <div class="col-md-6" style="margin-top:24px">';
  form += '   <label for="cargo">Cargo</label>';
  form += '   <select class="form-select">';
  form += '   <option value="1">Líder</option>';
  form += '   <option value="2">Supervisor</option>';
  form += '   <option value="3">Funcionário Padrão</option>';
  form += "   </select>";
  form += " </div>";

  form += '<div class="col-12">';
  form += '<button type="submit" class="btn btnCadastro">Cadastrar</button>';
  form += "</div>";
  form += "</form>";
  document.getElementById("forms").innerHTML = form;
}

function formExecucao() {
  let form = "";
  form += '<form class="row g-3 formulario" >';
  form += ' <div class="col-md-12">';
  form += '   <label for="tituloExecucao">Titulo</label>';
  form += '   <input id="tituloExecucao" class="form-control" type="text"/>';
  form += " </div>";
  form += ' <div class="col-12">';
  form += '   <label for="descExecucao">Descrição</label>';
  form += '   <input id="descExecucao" class="form-control p-5" type="text">';
  form += "   </div>";
  form += ' <div>';
  form += '   <button type="submit" class="btn btnCadastro mt-2">Cadastrar</button>';
  form += '</div>';
  form += " </form>";
  document.getElementById("forms").innerHTML = form;
}

function formAtvd() {
  let form = "";
  form += '  <form class="row g-3 formulario" >';
  form += ' <div class="col-md-12">';
  form += ' <label for="nomeAtvd">Nome</label>';
  form += ' <input id="nomeAtvd" class="form-control" type="text" />';
  form += ' </div>';
  form += ' <div class="col-12">';
  form += '<label for="descAtvd">Descrição</label>';
  form += '<input id="descAtvd" class="form-control p-5" type="text" />';
  form += '  </div>';
  form += '<div class="col-md-12">';
  form += '<label for="localAtvd">Local</label>';
  form += ' <select class="form-select" id="localAtvd">';
  form += ' <option value="1">Banheiro</option>';
  form += '<option value="2">Corredor</option>';
  form += ' <option value="3">Ala 3</option>';
  form += '</select>';
  form += '</div>';
  form += ' <div>';
  form += '   <button type="submit" class="btn btnCadastro mt-2">Cadastrar</button>';
  form += '</div>';
  form += '</form>';
  document.getElementById("forms").innerHTML = form;
}

function formGpProduto() {
  let form = "";
  form += ' <form class="row g-3 formulario" >';
  form += '<div class="col-md-6">';
  form += '<label for="subGrupo">Sub-Grupo</label>';
  form += ' <select class="form-select">';
  form += ' <option value="1">Alvejante</option>';
  form += ' <option value="2">Água sanitária</option>';
  form += " </select>";
  form += "</div>";
  form += ' <div class="col-md-6">';
  form += '<label for="nomeGrupo">Nome</label>';
  form += ' <input id="nomeGrupo" class="form-control" type="text">';
  form += "</div>";
  form += '<div class="col-md-12">';
  form += ' <label for="descGrupo">Descrição</label>';
  form += ' <input id="descGrupo" class="form-control p-2" type="text">';
  form += "</div>";
  form += '<div class="col-md-6">';
  form += '<label for="localAtvd">Unidade de medida</label>';
  form += ' <select class="form-select">';
  form += ' <option value="1">Litro(l)</option>';
  form += ' <option value="2">Militro(ml)</option>';
  form += ' <option value="3">Kilograma(kg)</option>';
  form += ' <option value="4">Grama(g)</option>';
  form += " </select>";
  form += "</div>";
  form += ' <div class="col-md-6">';
  form += '   <label for="qtd">Quantidade em estoque:</label>';
  form += '   <input id="qtdProd" class="form-control" type="number" />';
  form += " </div>";
  form += ' <div>';
  form += '   <button type="submit" class="btn btnCadastro mt-2">Cadastrar</button>';
  form += '</div>';
  form += "</form>";
  form += "";

  document.getElementById("forms").innerHTML = form;
}

function formUsuarioERP() {
  let form = "";
  form += '<form class="row g-3 formulario" id="usuarioERPForm">';
  form += '<div class="col-md-6">';
  form += '<label for="usuarioERP" class="form-label">Usuário ERP</label>';
  form += '<input type="text" class="form-control" id="usuarioERP" name="usuario" placeholder="Insira o usuário ERP"/>';
  form += '</div>';
  form += '<div class="col-md-6">';
  form += '<label for="senhaERP" class="form-label">Senha ERP</label>';
  form += '<input type="password" class="form-control" id="senhaERP" name="senha" placeholder="Insira a senha ERP"/>';
  form += '</div>';
  form += '<div class="col-12 botoesForm">';
  form += '<button type="submit" class="btn btnCadastro mt-2">Cadastrar</button>';
  form += '<button class="btn btnCadastro mt-2" onclick="carregarTabela(`Usuarios`)">Voltar</button>';
  form += '</div>';
  form += '</form>';

  document.getElementById("forms").innerHTML = form;

  document.getElementById("usuarioERPForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    const usuario = document.getElementById("usuarioERP").value;
    const password = document.getElementById("senhaERP").value;
    try {
      const res = await fetch(`/login/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ key, usuario, password })
      });

    } catch (error) {
      console.error('Erro:', error);
    }
  });
}

// Rotinas de Usuários ERP
/**
 * Carrega entidades da base de dados e atualiza a tabela de usuários.
 * @param {string} entidade - Nome da entidade a ser carregada.
 * @return {Promise<void>}
 */
async function carregarEntidades(entidade) {
  try {
    const res = await fetch(`/getLista${entidade}?key=${key}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (res.ok) {
      const usuarios = await res.json();
      const tbody = document.querySelector("#tabelaUsuarios tbody");
      tbody.innerHTML = '';

      usuarios.forEach(usuario => {
        const tr = document.createElement('tr');
        const tdNome = document.createElement('td');
        tdNome.innerHTML = usuario.usuario;

        tr.appendChild(tdNome);
        tbody.appendChild(tr);
      });
    } else {
      console.error('Erro ao carregar usuários!');
    }
  } catch (error) {
    console.error('Erro:', error);
  }
}

/**
 * Carrega a tabela de uma entidade específica.
 * @param {string} entidade - Nome da entidade a ser carregada.
 * @return {void}
 */
function carregarTabela(entidade) {
  let form = '';
  form += '<div class="mainFormContainer ">';
  form += '<div class="cabecalhoForm ">';
  form += '<button class="btn btnCadastro " onclick="formUsuarioERP()"><i class="bi bi-plus-lg"></i></button>';
  form += '<button class="btn btnCadastro " ><i class="bi bi-trash-fill"></i></button>';
  form += '</div>';

  form += '<table id="tabelaUsuarios" class="table table-striped">';
  form += '<thead >';
  form += '<tr>';
  form += '<th>Nome</th>';
  form += '</tr>';
  form += '</thead>';
  form += '<tbody class="table-group-divider">';
  form += '</tbody>';
  form += '</table>';
  form += '</div>';
  document.getElementById("forms").innerHTML = form;
  carregarEntidades(entidade);
}

let paginaAtual = 1;
let registrosPorPag = 10;

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
 * @return {Promise<void>}
 */
async function carregarRegistros(entidade, page, limit) {
  switch (entidade) {
    case 'setor':
      await carregarSetores(page, limit);
      break;
    /*
     * TODO falta adicionar as outras entidades como opção     
     */
    default:
      console.error('Entidade desconhecida:', entidade);
  }
}

/**
 * Carrega um formulário específico.
 * @param {string} formulario - Nome do formulário a ser carregado.
 */
async function carregarFormulario(formulario) {
  try {
    const res = await fetch(`/partials/${formulario}`);
    if (res.ok) {
      const html = await res.text();
      document.getElementById('forms').innerHTML = html;
      console.log(`Form carregado: ${formulario}`);
      if (formulario === 'setorLista') {
        console.log('Carregando setores...');
        await carregarRegistros("setor", paginaAtual, registrosPorPag);
        console.log('Setores carregados');
      }
      /*
     * TODO falta adicionar as outras entidades como opção     
     */
    } else {
      console.error('Erro ao carregar o formulário!');
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

  if (data.nome && typeof data.nome === 'string') {
    data.nome = data.nome.charAt(0).toUpperCase() + data.nome.slice(1);
  }

  data.key = key;
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

/**
 * Carrega os setores da base de dados e atualiza a tabela de setores.
 * @param {number} page - Número da página atual.
 * @param {number} limit - Número de registros por página.
 */
async function carregarSetores(page, limit) {
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

  $('#tituloModal').text('Editar Setor');
  $('#subTituloModal').text('Edite as informações do setor abaixo.');

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

  $('#tituloModal').text('Cadastrar Setor');
  $('#subTituloModal').text('Cadastre um novo setor abaixo.');

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

// TELA DE LOADING
// window.addEventListener("load", () => {
//   const loadingScreen = document.getElementById("telaDeLoading");
//   const mainContent = document.getElementById("main-content");

//   setTimeout(() => {
//     loadingScreen.style.display = "none";
//     mainContent.style.display = "block";
//   }, 2000);
// });