const usersRouter = require('express').Router();
const { celebrate } = require('celebrate');

const { editProfileValidation } = require('../utils/validation');

const { editProfile, getMe } = require('../controllers/users');

usersRouter.get('/me', getMe);
usersRouter.patch('/me', celebrate(editProfileValidation), editProfile);

module.exports = usersRouter;
