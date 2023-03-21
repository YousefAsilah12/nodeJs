const jwt = require('jsonwebtoken');
require('dotenv').config()

const auth = async (req, res, next) => {
  console.log("hello");
  const cookie = req.cookies;
  const token = cookie.jwt;
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