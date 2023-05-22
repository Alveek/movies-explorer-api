const jwt = require('jsonwebtoken');
const config = require('../config');
const { Unauthorized } = require('../errors');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new Unauthorized('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, config.jwtSecret);
  } catch (err) {
    next(new Unauthorized('Необходима авторизация'));
  }

  req.user = payload;

  return next();
};
