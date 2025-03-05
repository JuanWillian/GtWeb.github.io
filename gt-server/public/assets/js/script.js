function formUnidade() {
  let form = "";
  form += '<form class="row g-3 ">';
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
  form += '<form class="row g-3 ">';
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
  form += '<form class="row g-3">';
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
  form += '  <form class="row g-3">';
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
  form += ' <form class="row g-3">';
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
  form += '<form class="row g-3" id="usuarioERPForm">';
  form += '<div class="col-md-6">';
  form += '<label for="usuarioERP" class="form-label">Usuário ERP</label>';
  form += '<input type="text" class="form-control" id="usuarioERP" name="usuario" placeholder="Insira o usuário ERP"/>';
  form += '</div>';
  form += '<div class="col-md-6">';
  form += '<label for="senhaERP" class="form-label">Senha ERP</label>';
  form += '<input type="password" class="form-control" id="senhaERP" name="senha" placeholder="Insira a senha ERP"/>';
  form += '</div>';
  form += '<div class="col-12">';
  form += '<button type="submit" class="btn btnCadastro mt-2">Cadastrar</button>';
  form += '</div>';
  form += '</form>';
  document.getElementById("forms").innerHTML = form;

  document.getElementById("usuarioERPForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    const usuario = document.getElementById("usuarioERP").value;
    const senha = document.getElementById("senhaERP").value;
    const key = 'ad0c0749e023d44bd92c1e56ca0b3e3c'; // Adicione a chave aqui

    try {
      const response = await fetch(`/setUsuario?key=${key}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ usuario, senha })
      });

      if (response.ok) {
        alert('Usuário cadastrado com sucesso!');
      } else {
        alert('Erro ao cadastrar usuário!');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao cadastrar usuário!');
    }
  });
}