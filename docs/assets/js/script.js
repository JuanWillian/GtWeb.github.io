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
  form += '<button type="submit" class="btn btn-primary mt-2">Cadastrar</button>';
  form += "</div>";
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
  form += '<label for="senha" class="form-label">Senha</label>';
  form +=
    ' <input type="password" class="form-control" id="senha" placeholder="Insira a senha"/>';
  form += "</div>";
  form += '<div class="col-12">';
  form += "</div>";
  form += '<label for="endereco" class="form-label">Endereço</label>';
  form +=
    '<input type="text" class="form-control" id="endereco" placeholder="Insira o Endereço"/>';
  form += "</div>";
  form += '<div class="col-12">';
  form += ' <label for="cidade" class="form-label">Cidade</label>';
  form += ' <input type="text" class="form-control" id="cidade"/>';
  form += "</div>";

  form += '<div class="col-md-4">';
  form += ' <label for="estado" class="form-label">Estado</label>';
  form += ' <select id="estado" class="form-select">';
  form += "<option selected>Escolha</option>";
  form += " <option>...</option>";
  form += "</select>";
  form += "</div>";
  form += '<div class="col-12">';
  form += '<button type="submit" class="btn btn-primary">Cadastrar</button>';
  form += "</div>";
  form += "</form>";
  document.getElementById("forms").innerHTML = form;
}
function formExecucao() {
  let form = "";
  form += '<form class="row g-3">';
  form += ' <div class="col-6">';
  form += ' <label for="tituloExecucao">Titulo</label>';
  form += ' <input id="tituloExecucao" class="form-control" type="text"/>';
  form += " </div>";
  form += '<div class="col-12">';
  form += ' <label for="descExecucao">Descrição</label>';
  form += '<input id="descExecucao" class="form-control p-5" type="text">';
  form += '<button type="submit" class="btn btn-primary mt-2">Cadastrar</button>';
  form += " </div>";
  form += " </form>";
  document.getElementById("forms").innerHTML = form;
}
function formAtvd() {
  let form = "";
  form += '  <form class="row g-3">';
  form += ' <div class="col-6">';
  form += ' <label for="nomeAtvd">Nome</label>';
  form += ' <input id="nomeAtvd" class="form-control" type="text" />';
  form += "</div>";
  form += ' <div class="col-12">';
  form += '<label for="descAtvd">Descrição</label>';
  form += '<input id="descAtvd" class="form-control p-5" type="text" />';
  form += "  </div>";
  form += '<div class="col-6">';
  form += '<label for="localAtvd">Local</label>';
  form += ' <select class="form-select" id="localAtvd">';
  form += ' <option value="1">Banheiro</option>';
  form += '<option value="2">Corredor</option>';
  form += ' <option value="3">Ala 3</option>';
  form += "</select>";
  form += '<button type="submit" class="btn btn-primary mt-2">Cadastrar</button>';
  form += "</div>";
  form += "</form>";
  document.getElementById("forms").innerHTML = form;
}
function formGpProduto() {
  let form = "";
  form += ' <form class="row g-3">';
  form += ' <div class="col-6">';
  form += '<label for="nomeGrupo">Nome</label>';
  form += ' <input id="nomeGrupo" class="form-control" type="text">';
  form += "   </div>";
  form += '<div class="row g-3">';
  form += ' <label for="descGrupo">Descrição</label>';
  form += ' <input id="descGrupo" class="form-control p-5" type="text">';
  form += '<button type="submit" class="btn btn-primary mt-2">Cadastrar</button>';
  form += "</div>";
  form += "</form>";
  form += "";
  document.getElementById("forms").innerHTML = form;
}
