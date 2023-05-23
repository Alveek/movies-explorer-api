const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

const User = require('../models/user');
const customError = require('../errors');

const checkUser = (user, res) => {
  if (!user) {
    throw new customError.NotFound('Нет пользователя с таким id');
  }
  return res.send(user);
};

const createUser = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        email: req.body.email,
        password: hash,
        name: req.body.name,
      })
        .then((newUser) => {
          res.status(201).send({
            email: newUser.email,
            name: newUser.name,
          });
        })
        .catch((error) => {
          if (error.code === 11000) {
            next(
              new customError.Conflict(
                'Пользователь с такой почтой уже зарегистрирвован',
              ),
            );
          } else if (error.name === 'ValidationError') {
            next(
              new customError.BadRequest(
                'Некорректные данные при создании нового пользователя',
              ),
            );
          } else {
            next(error);
          }
        });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new customError.Unauthorized('Неверные почта или пароль');
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return next(
            new customError.Unauthorized('Неверные почта или пароль'),
          );
        }
        const token = jwt.sign({ _id: user._id }, config.jwtSecret, {
          expiresIn: '7d',
        });
        return res.send({ token });
      });
    })
    .catch(next);
};

const getMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(
          new customError.BadRequest(
            'Некорректные данные при создании нового пользователя',
          ),
        );
      } else {
        next(error);
      }
    });
};

const updateProfile = (req, res, next) => {
  const owner = req.user._id;
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    owner,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((user) => checkUser(user, res))
    .catch((error) => {
      if (error.code === 11000) {
        next(
          new customError.Conflict(
            'Пользователь с такой почтой уже зарегистрирвован',
          ),
        );
      } else if (error.name === 'ValidationError') {
        next(
          new customError.BadRequest(
            'Некорректные данные при создании нового пользователя',
          ),
        );
      } else {
        next(error);
      }
    });
};

module.exports = {
  login,
  createUser,
  updateProfile,
  getMe,
};
