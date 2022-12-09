const URL_CREATE_MOVIE = "https://webproject3.herokuapp.com/movies/create"

var txtMovieName = document.getElementById("textMovieName");
var txtMovieYear = document.getElementById("textMovieYear");
var txtMovieGenre = document.getElementById("textMovieGenre");
var btnCreate = document.getElementById("btnCreateCadastrar");
var btnCancelCreate = document.getElementById("btnCreateCancelar");
var btnCreateMovie = document.getElementById("btnCadastrarMovie");

btnCreate.addEventListener('click', () => {
  axios
  .post(URL_CREATE_MOVIE, {
    name: txtMovieName.value,
    year: txtMovieYear.value,
    genre: txtMovieGenre.value,
  })
  .then(function(response) {
    if (response.status == 200) {
      var msg = "Filme cadastrado!";
      var status = response.status;
      messageSuccess (status, msg);
      txtMovieName.value = "";
      txtMovieYear.value = "";
      txtMovieGenre.value = "";
    }
  })
  .catch (function (error) {
    console.log(error);
    var status = error.response.status;
    var msg = error.response.data.message;
    messageError(status, msg);
  });
});
