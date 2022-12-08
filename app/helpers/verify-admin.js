const jwt = require ('jsonwebtoken');
const getToken = require('./get-token');
const JWT_SECRET = 'ec38b';
const User = require ('../models/User');

// middleware validação de token
const checkAdmin = (req, res, next) => {

  if (!req.headers.authorization) {
    return res.status(401).json({message:"Acesso negado!"});
  }

  const token = getToken(req);

  if (!token) {
    return res.status(401).json({message:"Acesso negado!"});
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    console.log(req.user);
    if (!req.user.admin) {
      return res.status(401).json({message:"Você não tem o privilégio de Administrador!"});
    }


    next();
  } catch(err) {
    return res.status(400).json({message: "Token inválido!"});
  }

}

module.exports = checkAdmin;