const mongoose = require('mongoose');
const { urlRegEx } = require('../utils/constants');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },

    director: {
      type: String,
      required: true,
    },

    duration: {
      type: Number,
      required: true,
    },

    year: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
      validate: {
        validator: (v) => urlRegEx.test(v),
        message: 'Невалидная ссылка',
      },
    },

    trailerLink: {
      type: String,
      required: true,
      validate: {
        validator: (v) => urlRegEx.test(v),
        message: 'Невалидная ссылка',
      },
    },

    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator: (v) => urlRegEx.test(v),
        message: 'Невалидная ссылка',
      },
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },

    movieId: {
      type: Number,
      required: true,
    },

    nameRU: {
      type: String,
      required: true,
    },

    nameEN: {
      type: String,
      required: true,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('movie', movieSchema);
