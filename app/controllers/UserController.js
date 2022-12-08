const User = require ('../models/User');
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');
const JWT_SECRET = 'ec38b';

// Helpers
const createUserToken = require('../helpers/create-user-token');
const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');

module.exports = class UserController {

  static async register (req, res) {
    // Tem de aparecer no postman
    //res.json('Hello World, funcao register!');
    const {name, email, password, confirmPassword, admin} = req.body;

    // Validações
    if (!name) {
      res.status(422).json({message: 'O campo nome é obrigatório!'});
      return;
    }

    if (!email) {
      res.status(422).json({message: 'O campo e-mail é obrigatório!'});
      return;
    }

    if (!password) {
      res.status(422).json({message: 'O campo senha é obrigatório!'});
      return;
    }

    if (!confirmPassword) {
      res.status(422).json({message: 'O campo confirmação de senha é obrigatório!'});
      return;
    }

    if (password !== confirmPassword) {
      res.status(422).json({message: 'A senha e a confirmação precisam ser iguais!'});
      return;
    }

    if (!admin) {
      res.status(422).json({message: 'O campo admin é obrigatório!'});
      return;
    }

    // Checando se o usuário existe
    const userExists = await User.findOne({email:email})

    if (userExists) {
      res.status(422).json({message: 'Este e-mail já foi cadastrado!'});
      return;
    }

    // Criptografando a senha
    const salt = await bcrypt.genSalt(12); // Estender a senha para dificultar ainda mais
    const passwordHash = await bcrypt.hash(password, salt);

    // Criando usuário
    const user = new User({
      name,
      email,
      password: passwordHash,
      admin
    });

    try {
      const newUser = await user.save();
      await createUserToken(newUser, req, res);
    } catch (error) {
      res.status(500).json({message: error});
    }

  }

  static async login (req, res) {
    const { email, password } = req.body;

    //Validações
    if (!email) {
      res.status(422).json({message: 'O e-mail é obrigatório!'});
      return;
    }

    if (!password) {
      res.status(422).json({message: 'A senha é obrigatório!'});
      return;
    }

    //verificando a existencia do usuário
    const user = await User.findOne({email: email});

    if (!user) {
      res.status(422).json({
        message: "E-mail não cadastrado!"
      });
      return;
    }

    // Descriptografando a senha
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      res.status(422).json({
        message: "Senha inválida!"
      });
      return;
    }

    await createUserToken(user, req, res);
  }

  // Função para manter o usuário logado no sistema
  static async checkUser (req, res) {
    let currentUser;
    //console.log(req.headers.authorization);

    if (req.headers.authorization) {

      const token = getToken(req);
      const user = await getUserByToken(token);
      currentUser = user;
      currentUser.password = undefined;
    } else {
      currentUser = null;
    }

    res.status(200).send(currentUser);
  }
}