const jwt = require('jsonwebtoken');
const config = require('../config');

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, config.jwtSecret, {
    expiresIn: '30d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: config.nodeEnv !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

module.exports = generateToken;
