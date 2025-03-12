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

// Fechar modal
function botaoCancelarClick(nomeModal) {
  $('#' + nomeModal).modal('hide');

  return false;
}

let currentPage = 1;
let recordsPerPage = 10;
// Carregar Formulários
async function carregarFormulario(formulario) {
  try {
    console.log(`Fetching form: ${formulario}`);
    const res = await fetch(`/partials/${formulario}`);
    if (res.ok) {
      const html = await res.text();
      document.getElementById('forms').innerHTML = html;
      console.log(`Form loaded: ${formulario}`);
      if (formulario === 'setorLista') {
        console.log('Loading setores...');
        await carregarSetores(currentPage, recordsPerPage);
        console.log('Setores loaded');
      }
    } else {
      console.error('Erro ao carregar o formulário!');
    }
  } catch (error) {
    console.error('Erro:', error);
  }
}

// SETORES 
async function carregarSetores(page, limit) {
  try {
    const res = await fetch(`/setor/setores?page=${page}&limit=${limit}`);
    if (res.ok) {
      const { setores, totalSetores } = await res.json();
      const tabela = document.querySelector('#setorFormContainer .table tbody');
      tabela.innerHTML = setores.map(setor => `
        <tr>
          <td class="limited-width">${setor.nome}</td>
          <td class="limited-width">${setor.descricao}</td>
          <td class="tdButton">
            <a href="#" class="btn-edit" data-id="${setor._id}" data-nome="${setor.nome}" data-descricao="${setor.descricao}" onclick="return botaoListaSetorEditarClick(this)" title="Editar setor">Editar</a>
          </td>
          <td class="tdButton">
            <a class="text-danger" href="#" onclick="return excluirSetor('${setor._id}')" title="Excluir este setor">Excluir</a>
          </td>
        </tr>
      `).join('');

      const totalPages = Math.ceil(totalSetores / limit);
      const pagination = document.querySelector('.pagination');
      pagination.innerHTML = `
        <li class="page-item rounded-left ${page === 1 ? 'disabled' : ''}">
          <a class="page-link" href="#" aria-label="Previous" onclick="carregarSetores(${page - 1}, ${limit})">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        ${Array.from({ length: totalPages }, (_, i) => `
          <li class="page-item ${page === i + 1 ? 'active' : ''}">
            <a class="page-link" href="#" onclick="carregarSetores(${i + 1}, ${limit})">${i + 1}</a>
          </li>
        `).join('')}
        <li class="page-item rounded-right ${page === totalPages ? 'disabled' : ''}">
          <a class="page-link" href="#" aria-label="Next" onclick="carregarSetores(${page + 1}, ${limit})">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      `;
    } else {
      console.error('Erro ao carregar os setores!');
    }
  } catch (error) {
    console.error('Erro:', error);
  }
}

function recordsPerPageChange() {
  const recordsPerPageSelect = document.querySelector('#recordsPerPage');
  if (recordsPerPageSelect) {
    recordsPerPage = parseInt(recordsPerPageSelect.value, 10);
    currentPage = 1; // Resetar para a primeira página sempre que a quantidade de registros por página mudar
    carregarSetores(currentPage, recordsPerPage);
  }
}

function botaoListaSetorEditarClick(element) {
  const setorId = $(element).data('id');
  const setorNome = $(element).data('nome');
  const setorDescricao = $(element).data('descricao');

  $('#setorId').val(setorNome);
  $('#setorDescricao').val(setorDescricao);

  // Atualizar o título e a descrição do formulário
  $('#tituloModal').text('Editar Setor');
  $('#subTituloModal').text('Edite as informações do setor abaixo.');

  // Defina a ação do formulário para edição
  $('#setorForm').attr('action', '/setor/edit/' + setorId);

  $('#setor').modal('show');

  return false;
}

function botaoListaSetorNovoClick() {
  $('#setorId').val('');
  $('#setorDescricao').val('');

  // Atualizar o título e a descrição do formulário
  $('#tituloModal').text('Cadastrar Setor');
  $('#subTituloModal').text('Cadastre um novo setor abaixo.');

  // Defina a ação do formulário para registro
  $('#setorForm').attr('action', '/pagPrincipal/setor/register');

  $('#setor').modal('show');

  return false;
}

async function submitSetorForm(event) {
  event.preventDefault();
  const form = event.target;
  const action = form.getAttribute('action');
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const res = await fetch(action, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      $('#setor').modal('hide');
      await carregarSetores(currentPage, recordsPerPage);
      window.alert('Setor salvo com sucesso!');
    } else {
      const result = await res.json();
      window.alert('Erro: ' + result.errors.join('\n'));
    }
  } catch (error) {
    console.error('Erro:', error);
  }
}

async function excluirSetor(id) {
  try {
    const result = window.confirm("Deseja realmente excluir este setor?");
    if (result) {
      const res = await fetch(`/setor/delete/${id}`, {
        method: 'GET'
      });

      if (res.ok) {
        await carregarSetores(currentPage, recordsPerPage);
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