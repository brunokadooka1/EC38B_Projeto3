const URL_API_LOGIN = "https://webproject3.herokuapp.com/users/login";

var btnAcessar = document.getElementById('btnAcessar');
    contentError = document.getElementById('content-message-error');
    labelError = document.getElementById('labelError');
    contentSuccess = document.getElementById('content-message-success');
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
      realizaLogin (response.data);
    } 
  })
  .catch (function (error) {
    contentError.className = "content-message-error show";
    labelError.innerHTML = "Error " + error.response.status + ": falha ao tentar o login!!";
    txtSenha.value = '';
    txtEmail.value = '';
    setTimeout(() => {
      contentError.className = "content-message-error"
    }, 3000);
  });

});


function realizaLogin (data) {
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

  if (data.userAdmin)
    privilegio = "Adminstrador"
  else 
    privilegio = "Convidado"

  welcome = "Seja bem vindo, " + data.userName + " - Privilégio: " + privilegio;
  textWelcome.innerHTML = welcome;

  sessionStorage.setItem("login", 1);
  sessionStorage.setItem("id", data.userId);
  sessionStorage.setItem("token", data.token);
  sessionStorage.setItem("name", data.userName);

  contentSuccess.className = "content-message-success show";
  labelSuccess.innerHTML = "Login realizado com sucesso!";

  setTimeout(() => {
    contentSuccess.className = "content-message-success"
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


    if (sessionStorage.getItem("token"))
      privilegio = "Adminstrador"
    else 
      privilegio = "Convidado"

    welcome = "Seja bem vindo, " + sessionStorage.getItem("name") + " - Privilégio: " + privilegio;
    textWelcome.innerHTML = welcome;
  }
}

function verificaCamposBrancos () {
  if (txtEmail.value == '') {
    contentError.className = "content-message-error show";
    labelError.innerHTML = "O campo de Email está em branco!";
    setTimeout(() => {
      contentError.className = "content-message-error"
    }, 3000);
    return true;
  } 
  else if (txtSenha.value == '') {
    contentError.className = "content-message-error show";
    labelError.innerHTML = "O campo de Senha está em branco!";
    setTimeout(() => {
      contentError.className = "content-message-error"
    }, 3000);
    return true;
  }
  return false;
}

function camposInvalidos () {
  if (txtEmail.value.length < 3) {
    contentError.className = "content-message-error show";
    labelError.innerHTML = "O campo de Email é inválido <br>Preencha corretamente!";
    setTimeout(() => {
      contentError.className = "content-message-error"
    }, 3000);
    return true;
  } 
  else if (txtSenha.value.length < 3) {
    contentError.className = "content-message-error show";
    labelError.innerHTML = "O campo de Senha é inválido <br>Preencha corretamente!";
    setTimeout(() => {
      contentError.className = "content-message-error"
    }, 3000);
    return true;
  }
  return false;
}