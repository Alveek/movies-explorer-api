const Movie = require('../models/movie');
const customError = require('../errors');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const { _id } = req.user;

  Movie.create({ ...req.body, owner: _id })
    .then((newMovie) => {
      res.send(newMovie);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new customError.BadRequest('Переданы некорректные данные.'));
      } else {
        next(error);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.deleteOne({ _id: req.params._id })
    .then((movie) => {
      if (movie.deletedCount === 0) {
        throw new customError.NotFound('Фильм с указанным _id не найден.');
      }
      return res.send({ message: 'Фильм удален' });
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
