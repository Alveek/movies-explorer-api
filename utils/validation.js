const { Joi } = require('celebrate');
const { urlRegEx } = require('./constants');

const signinValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'string.email': 'Введена некорректная почта',
      'any.required': 'Почта не должна быть пустой',
    }),
    password: Joi.string().required().messages({
      'any.required': 'Пароль не должен быть пустым',
    }),
  }),
};

const signupValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'string.email': 'Введена некорректная почта',
      'any.required': 'Почта не должна быть пустой',
    }),
    password: Joi.string().required().messages({
      'any.required': 'Пароль не должен быть пустым',
    }),
    name: Joi.string().min(2).max(30).required()
      .messages({
        'string.min': 'Поле "имя" не должно быть меньше 2 символов',
        'string.max': 'Поле "имя" не должно быть больше 30 символов',
        'any.required': 'Поле "имя" не должно быть пустым',
      }),
  }),
};

const updateProfileValidation = {
  body: Joi.object({
    name: Joi.string().min(2).max(30).required()
      .messages({
        'string.min': 'Поле "имя" не должно быть меньше 2 символов',
        'string.max': 'Поле "имя" не должно быть больше 30 символов',
        'any.required': 'Поле "имя" не должно быть пустым',
      }),
    email: Joi.string().email().required().messages({
      'string.email': 'Введена некорректная почта',
    }),
  }),
};

const createMovieValidation = {
  body: Joi.object({
    country: Joi.string()
      .messages({
        'any.required': 'Поле не должно быть пустым',
      })
      .required(),
    director: Joi.string()
      .messages({
        'any.required': 'Поле не должно быть пустым',
      })
      .required(),
    duration: Joi.number()
      .messages({
        'any.required': 'Поле не должно быть пустым',
      })
      .required(),
    year: Joi.string()
      .messages({
        'any.required': 'Поле не должно быть пустым',
      })
      .required(),
    description: Joi.string()
      .messages({
        'any.required': 'Поле не должно быть пустым',
      })
      .required(),
    image: Joi.string()
      .regex(urlRegEx)
      .messages({
        'string.dataUri': 'Невалидная ссылка',
        'any.required': 'Поле не должно быть пустым',
      })
      .required(),
    trailerLink: Joi.string()
      .regex(urlRegEx)
      .messages({
        'string.dataUri': 'Невалидная ссылка',
      })
      .required(),
    thumbnail: Joi.string()
      .regex(urlRegEx)
      .messages({
        'string.dataUri': 'Невалидная ссылка',
      })
      .required(),
    nameRU: Joi.string()
      .messages({
        'any.required': 'Поле не должно быть пустым',
      })
      .required(),
    nameEN: Joi.string()
      .messages({
        'any.required': 'Поле не должно быть пустым',
      })
      .required(),
    movieId: Joi.number()
      .messages({
        'any.required': 'Поле не должно быть пустым',
      })
      .required(),
  }),
};

const deleteMovieValidation = {
  params: Joi.object({
    _id: Joi.string().hex().length(24).messages({
      'string.hex': 'Некорректный id',
    }),
  }),
};

module.exports = {
  updateProfileValidation,
  signinValidation,
  signupValidation,
  createMovieValidation,
  deleteMovieValidation,
};
