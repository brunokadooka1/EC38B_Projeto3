const URL_REGISTER = "http://localhost:5000/users/register";

var btnCadastrar = document.getElementById('btnCadastrar');
var btnCancelar = document.getElementById('btnCancelar');
var textName = document.getElementById('textName');
var textEmail = document.getElementById('textEmail');
var textPassword = document.getElementById('textPassword');
var textConfirmPassword = document.getElementById('textConfirmPassword');

btnCadastrar.addEventListener('click', async function() {
  var admin = setAdmin();

  axios
  .post(URL_REGISTER, {
    name: textName.value,
    email: textEmail.value,
    password: textPassword.value,
    confirmPassword: textConfirmPassword.value,
    admin: admin
  })
  .then(function(response) {
    
  })
  .catch (function (error) {
    console.log(error);
    var status = error.response.status;
    var msg = error.response.data.message;
    messageError(status, msg);
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

function setAdmin () {
  if (document.getElementById('optionAdmin').checked)
    return true;

  return false;  
}