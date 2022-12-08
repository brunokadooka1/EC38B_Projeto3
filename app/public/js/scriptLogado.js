const URL_API_TITLES = "https://api.watchmode.com/v1/autocomplete-search/?apiKey=JBcfxHUEcJbDdxVcgVj7MorrC9nBkOc7wCLtkFlY";

const URL_API_TYPES = "https://api.watchmode.com/v1/list-titles/?apiKey=JBcfxHUEcJbDdxVcgVj7MorrC9nBkOc7wCLtkFlY";

var txtType = document.getElementById("comBox-search-type");
    txtTitulo = document.getElementById("txtSearch");
    btnSearch = document.getElementById("btnSearch");
    table = document.getElementById("table-data");
    btnLogout = document.getElementById("btnLogout");
    

/* Busca por titulo do filme, series ...*/
btnSearch.addEventListener('click', function () {
  if (validandoBuscaTitulo ())
    return;

  txtType.value = 'default';

  axios
  .get(URL_API_TITLES, {
      params: {
        search_value:txtTitulo.value,
        search_type: 2
      }
  })
  .then(function(response) {
    resetandoTable (response.data.results.length);
    response.data.results.forEach(element => {
      insereDadosTitulo(element);
    });
  })
  .catch (function (error) {
    /*Colocar no formulario de erro*/
    let msgError = error.response.status + ": " + error.code;
    console.log(msgError);
    console.log(error); 
  });
});


/*Busca por tipo de entretenimento*/
txtType.addEventListener('change', function () {

  if (validandoBuscaTipo())
    return ;
  
  txtTitulo.value = '';
  axios
  .get(URL_API_TYPES, {
      params: {
        types: txtType.value
      }
  })
  .then(function(response) {
    resetandoTable (response.data.titles.length)
    response.data.titles.forEach(element => {
      insereDadosTipos(element);
    });
  })
  .catch (function (error) {
    /*Colocar no formulario de erro*/
    let msgError = error.response.status + ": " + error.code;
    console.log(msgError);
    console.log(error); 
  });
});

function insereDadosTitulo (object) {
    tr = document.createElement("tr");
    th1 = document.createElement("th");
    th2 = document.createElement("th");
    th3 = document.createElement("th");
    th4 = document.createElement("th");

    th1.innerHTML = object.id;
    th2.innerHTML = object.name;
    th3.innerHTML = object.year;
    th4.innerHTML = object.type;

    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    tr.appendChild(th4);

    table.appendChild(tr);
}

function insereDadosTipos (object) {
  tr = document.createElement("tr");
  th1 = document.createElement("th");
  th2 = document.createElement("th");
  th3 = document.createElement("th");
  th4 = document.createElement("th");

  th1.innerHTML = object.id;
  th2.innerHTML = object.title;
  th3.innerHTML = object.year;
  th4.innerHTML = object.type;

  tr.appendChild(th1);
  tr.appendChild(th2);
  tr.appendChild(th3);
  tr.appendChild(th4);

  table.appendChild(tr);
}



function resetandoTable (value) {
  table.innerHTML = "";
  tr = document.createElement("tr");
  th1 = document.createElement("th");
  th2 = document.createElement("th");
  th3 = document.createElement("th");
  th4 = document.createElement("th");
  caption = document.createElement("caption");

  caption.innerHTML = "Dados retornados: " + value;
  caption.tagName = "info-data";

  th1.innerHTML = "ID/Código";
  th2.innerHTML = "Titulo da Mídia";
  th3.innerHTML = "Ano de Lançamento";
  th4.innerHTML = "Tipo do Entretenimento";

  tr.className = "table-header";

  tr.appendChild(th1);
  tr.appendChild(th2);
  tr.appendChild(th3);
  tr.appendChild(th4);

  table.appendChild(tr);
  table.appendChild(caption);
}


//Botao de Logout
btnLogout.addEventListener('click', function () {
  var containerLogin = document.getElementById("content-login");
  headerLogado = document.getElementById("header-logado");
  contentBody = document.getElementById("content-body");
  contentData = document.getElementById("content-data");
  navegador = document.getElementById("nav-header");
  formLogin = document.getElementById("form-login-header");
  containerAnuncio = document.getElementById("content-anuncio");
  containerCarrosel = document.getElementById("background-carrosel");
  btnAcesso = document.getElementById("btnAcesso");

  if (sessionStorage.getItem("login") == 1 && sessionStorage.getItem("token") != '') {
    /*Tratar e levar a tela de logado*/
    containerLogin.className = "show-false";
    /*Implementar a tela de logado*/
    headerLogado.className = "area-logada show-false";
    contentBody.className = "content-body text-default-disney show-false";
    contentData.className = "content-data show-false";
    navegador.className = "show";
    formLogin.className = "form-login-header show";
    containerAnuncio.className = "content-anuncio";
    containerCarrosel.className = "background-carrosel";
  }

  sessionStorage.removeItem('login');
  sessionStorage.removeItem('id');
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('name');
  
  btnAcesso.innerHTML = 'Acessar sua conta';
  return;
});


function validandoBuscaTitulo () {
  if (txtTitulo.value == '') {
    messageError.className = "content-message-error show";
    labelError.innerHTML = "Campo de busca titulo de filme em branco!";
    setTimeout(() => {
      messageError.className = "content-message-error"
    }, 3000);
    return true;
  }

  if (txtTitulo.value.length < 3) {
    messageError.className = "content-message-error show";
    labelError.innerHTML = "Campo de busca por titulo inválido!<br>Preencha com mais informações!";
    setTimeout(() => {
      messageError.className = "content-message-error"
    }, 3000);
    txtTitulo.value = '';
    return true;
  }

  return false;
}

function validandoBuscaTipo () {
  if (txtType.value == 'default') {
    messageError.className = "content-message-error show";
    labelError.innerHTML = "Campo de pesquisa por tipo de entretenimento inválido!<br>Escolha outra opção!";
    setTimeout(() => {
      messageError.className = "content-message-error"
    }, 3000);
    resetandoTable (response.data.titles.length);
    return true;
  }
  return false;
}