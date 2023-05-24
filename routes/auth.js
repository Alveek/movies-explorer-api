const authRouter = require('express').Router();
const { celebrate } = require('celebrate');
const { login, createUser } = require('../controllers/users');
const { signinValidation, signupValidation } = require('../utils/validation');

authRouter.post('/signup', celebrate(signupValidation), createUser);
authRouter.post('/signin', celebrate(signinValidation), login);

module.exports = authRouter;
