const jwt = require('jsonwebtoken');
require('dotenv').config()

const auth = async (req, res, next) => {
  const cookie = req.cookies;
  const token = cookie.jwt;
  console.log("hello");
  if (!token) {
    return res.status(401).send({
      message: 'Unauthorized'
    });
  }
  try {
    const decryptToken = jwt.verify(token, process.env.JWTSECRET);
    if (decryptToken) {
      next();
    }
  } catch (e) {
    return res.status(401).send({
      message: 'Unauthorized'
    });
  }
}

module.exports = auth;