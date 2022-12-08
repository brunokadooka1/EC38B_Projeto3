const URL_REGISTER = "https://webproject3.herokuapp.com/users/register";

var btnCadastrar = document.getElementById('btnCadastrar');
var btnCancelar = document.getElementById('btnCancelar');
var textName = document.getElementById('textName');
var textEmail = document.getElementById('textEmail');
var textPassword = document.getElementById('textPassword');
var textConfirmPassword = document.getElementById('textConfirmPassword');
var btnNovoCadastro = document.getElementById('txtNovoCadastro');

btnCancelar.addEventListener('click', function() {
  var containerLogin = document.getElementById("content-login");
      containerRegister = document.getElementById("content-register");
      
  containerLogin.className = "content-login show";
  containerRegister.className = "content-register show-false"
});


btnNovoCadastro.addEventListener('click', function() {
  var containerLogin = document.getElementById("content-login");
      containerRegister = document.getElementById("content-register");

  containerLogin.className = "show-false";
  containerRegister.className = "content-register show"
});

btnCadastrar.addEventListener('click', async function() {
  var admin = getPrivilegio();

  axios
  .post(URL_REGISTER, {
    name: textName.value,
    email: textEmail.value,
    password: textPassword.value,
    confirmPassword: textConfirmPassword.value,
    admin: admin
  })
  .then(function(response) {
    if (response.status == 200) {
      var msg = "Usuário cadastrado!";
      var status = response.status;
      messageSuccess (status, msg);
      textName.value = "";
      textEmail.value = "";
      textPassword.value = "";
      textConfirmPassword.value = "";
    }
  })
  .catch (function (error) {
    console.log(error);
    var status = error.response.status;
    var msg = error.response.data.message;
    messageError(status, msg);
    document.getElementById('optionAdmin').checked = true;
  });

});


function messageError (status, msg) {
  // msg = "Error " + status + ": " + msg;
  var messageError = document.getElementById('content-message-error');
  var labelError = document.getElementById('labelError');

  messageError.className = "content-message-error show painel-fixed";
  labelError.innerHTML = "Error " + status + ": " + msg;
  setTimeout(() => {
    messageError.className = "content-message-error"
  }, 3000);
}

function messageSuccess (status, msg) {
  var messageSuccess = document.getElementById('content-message-success');
  var labelSuccess = document.getElementById('labelSuccess');

  messageSuccess.className = "content-message-success show painel-fixed";
  labelSuccess.innerHTML = "Status " + status + ": " + msg;

  setTimeout(() => {
    messageSuccess.className = "content-message-success"
  }, 3000);
}

function getPrivilegio () {
  let privilegios = Array.from(document.getElementsByName('privilegio'));
  let isAdmin = false;
  privilegios.forEach(privilegio => {
    if (privilegio.checked == true) {
      isAdmin = privilegio.attributes['isadmin'].nodeValue === "true";
    }
  });
  return isAdmin;
}