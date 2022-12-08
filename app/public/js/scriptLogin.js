const URL_API_LOGIN = "https://reqres.in/api/login";

var btnAcessar = document.getElementById('btnAcessar');
    messageError = document.getElementById('content-message-error');
    labelError = document.getElementById('labelError');
    messageSuccess = document.getElementById('content-message-success');
    labelSuccess = document.getElementById('labelSuccess');
    txtEmail = document.getElementById('txtEmail');
    txtSenha = document.getElementById('txtSenha');
    textWelcome = document.getElementById("text-welcome");


btnAcessar.addEventListener('click', function () {
  if (verificaCamposBrancos())
    return ;

  if (camposInvalidos())
    return ;

  mantenhaLogado()
  
  axios
  .post(URL_API_LOGIN, { email: txtEmail.value, password: txtSenha.value})
  .then(function(response) {
    if (response.status == 200) {
      realizaLogin (txtEmail.value, response.data.token);
    } 
  })
  .catch (function (error) {
    messageError.className = "content-message-error show";
    labelError.innerHTML = "Error " + error.response.status + ": falha ao tentar o login!!";
    txtSenha.value = '';
    txtEmail.value = '';
    setTimeout(() => {
      messageError.className = "content-message-error"
    }, 3000);
  });

});


function realizaLogin (email, token) {
  var containerLogin = document.getElementById("content-login");
      headerLogado = document.getElementById("header-logado");
      contentBody = document.getElementById("content-body");
      contentData = document.getElementById("content-data");
      navegador = document.getElementById("nav-header");
      formLogin = document.getElementById("form-login-header");

  containerLogin.className = "show-false";
  /*Implementar a tela de logado*/
  headerLogado.className = "area-logada show";
  contentBody.className = "content-body text-default-disney show";
  contentData.className = "content-data show";
  navegador.className = "show-false";
  formLogin.className = "show-false";

  textWelcome.innerHTML = "Seja bem vindo, " + email;

  sessionStorage.setItem("login", 1);
  sessionStorage.setItem("email", email);
  sessionStorage.setItem("token", token);

  messageSuccess.className = "content-message-success show";
  labelSuccess.innerHTML = "Login realizado com sucesso!";

  setTimeout(() => {
    messageSuccess.className = "content-message-success"
  }, 3000);

  return;
}

function mantenhaLogado() {
  var containerLogin = document.getElementById("content-login");
  headerLogado = document.getElementById("header-logado");
  contentBody = document.getElementById("content-body");
  contentData = document.getElementById("content-data");
  navegador = document.getElementById("nav-header");
  formLogin = document.getElementById("form-login-header");
  containerAnuncio = document.getElementById("content-anuncio");
  containerCarrosel = document.getElementById("background-carrosel");

  if (sessionStorage.getItem("login") == 1 && sessionStorage.getItem("token") != '') {
    /*Tratar e levar a tela de logado*/
    containerLogin.className = "show-false";
    /*Implementar a tela de logado*/
    headerLogado.className = "area-logada show";
    contentBody.className = "content-body text-default-disney show";
    contentData.className = "content-data show";
    navegador.className = "show-false";
    formLogin.className = "show-false";
    containerAnuncio.className = "show-false";
    containerCarrosel.className = "show-false";
  }
  textWelcome.innerHTML = "Seja bem vindo, " + sessionStorage.getItem('email');
  return;
}

function verificaCamposBrancos () {
  if (txtEmail.value == '') {
    messageError.className = "content-message-error show";
    labelError.innerHTML = "O campo de Email está em branco!";
    setTimeout(() => {
      messageError.className = "content-message-error"
    }, 3000);
    return true;
  } 
  else if (txtSenha.value == '') {
    messageError.className = "content-message-error show";
    labelError.innerHTML = "O campo de Senha está em branco!";
    setTimeout(() => {
      messageError.className = "content-message-error"
    }, 3000);
    return true;
  }
  return false;
}

function camposInvalidos () {
  if (txtEmail.value.length < 3) {
    messageError.className = "content-message-error show";
    labelError.innerHTML = "O campo de Email é inválido <br>Preencha corretamente!";
    setTimeout(() => {
      messageError.className = "content-message-error"
    }, 3000);
    return true;
  } 
  else if (txtSenha.value.length < 3) {
    messageError.className = "content-message-error show";
    labelError.innerHTML = "O campo de Senha é inválido <br>Preencha corretamente!";
    setTimeout(() => {
      messageError.className = "content-message-error"
    }, 3000);
    return true;
  }
  return false;
}