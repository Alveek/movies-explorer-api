const usersRouter = require('express').Router();
const { celebrate } = require('celebrate');

const { updateProfileValidation } = require('../utils/validation');

const { updateProfile, getMe } = require('../controllers/users');

usersRouter.get('/me', getMe);
usersRouter.patch('/me', celebrate(updateProfileValidation), updateProfile);

module.exports = usersRouter;
