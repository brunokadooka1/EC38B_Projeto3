btnAcesso = document.getElementById("btnAcesso");
containerAnuncio = document.getElementById("content-anuncio");
containerCarrosel = document.getElementById("background-carrosel");
containerLogin = document.getElementById("content-login");
navegador = document.getElementById("nav-header");
txtEmail = document.getElementById('txtEmail');
txtSenha = document.getElementById('txtSenha');


btnAcesso.addEventListener('click', function () {
  
  if (btnAcesso.innerHTML == 'Voltar para pagina inicial') {
    btnAcesso.innerHTML = 'Acessar sua conta';
    containerAnuncio.className = "content-anuncio";
    containerCarrosel.className = "background-carrosel";
    containerLogin.className = "content-login";
  }
  else if (btnAcesso.innerHTML == 'Acessar sua conta') {
    btnAcesso.innerHTML = 'Voltar para pagina inicial';
    containerAnuncio.className = "show-false";
    containerCarrosel.className = "show-false";
    containerLogin.className = "content-login show";
    txtEmail.value = '';
    txtSenha.value = '';
  }

})