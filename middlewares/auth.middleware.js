const jwt = require('jsonwebtoken');
require("dotenv").config()

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json('access denied: no authorization header provided');
  }

  const [type, token] = authorization.split(' ');

  if (type !== 'Bearer') {
    return res.status(401).json('Wrong token type');
  }

  try {
    req.user = await jwt.verify(token, process.env.SECRET_JWT_KEY);

    next();
  } catch (e) {
    return res.status(401).json('Authentication failed: ' + e.toString());
  }
};
