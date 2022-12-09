const Movie = require("../models/Movie")

//helpers
const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');
const ObjectId = require('mongoose').Types.ObjectId;


module.exports = class UserController {

  static async create (req, res) {
    
    const { name, year, genre } = req.body; 

    // Validações
    if (!name) {
      res.status(422).json({message: 'O campo Nome é obrigatório!'});
      return;
    }

    if (!year) {
      res.status(422).json({message: 'O campo Ano é obrigatório!'});
      return;
    }

    if (!genre) {
      res.status(422).json({message: 'O campo Genero é obrigatório!'});
      return;
    }

    //verificando a existencia de duplicidade
    const movieDuplicate = await Movie.findOne({name: name, year: year, genre: genre});

    if (movieDuplicate) {
      res.status(422).json({
        message: "Filme já cadastrado!",
        movieDuplicate
      });
      return;
    }

    // Retornando usuário
    const token = getToken(req);
    const user = await getUserByToken (token);

    // Criando um objeto filme
    const movie = new Movie({
      name,
      year,
      genre,
      user: {
        _id: user._id,
        name: user.name,
        admin: user.admin
      }
    })

    try {
      
      const newMovie = await movie.save();
      res.status(201).json({message:"Filme cadastrado com sucesso!", newMovie});

    } catch (error) {
      res.status(500).json({message:error});
    }

  }

  static async getAll(req, res) {
    const movies = await Movie.find().sort('-createdAt');

    res.status(200).json({movies:movies});
  }

  static async getMovieByName(req, res) {
    const name = req.params.name;

    if (name === null || name === "") {
      res.status(422).json({message:"Nome inválido!"});
      return;
    }

    try {
      const movies = await Movie.find({name: name});
      res.status(200).json({movies:movies});
    } catch (error) {
      res.status(401).json({message:error});
    }
  }

  static async getMovieById(req, res) {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      res.status(422).json({message:"Id inválido!"});
      return;
    }

    const movie = await Movie.find({ _id: id });

    if (!movie || movie == "") {
      res.status(404).json({message: "Filme não encontrado!"});
      return;
    }

    res.status(200).json({movie: movie});
  }

}