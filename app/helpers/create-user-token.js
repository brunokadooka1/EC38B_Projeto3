const jwt = require ('jsonwebtoken');
const JWT_SECRET = 'ec38b';

createUserToken = async (user, req, res) => {
  
  const token = jwt.sign({
    name: user.name,
    id: user._id,
    admin: user.admin
  }, JWT_SECRET);

  // return token
  res.status(200).json({
    message: "Você está autenticado!",
    token: token,
    userId: user._id,
    userName: user.name,
    userAdmin: user.admin
  })

}

module.exports = createUserToken;