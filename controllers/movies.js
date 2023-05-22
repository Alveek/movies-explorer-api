const Movie = require('../models/movie');
const customError = require('../errors');

const getMovies = (req, res, next) => {
  Movie.find({})
    .populate(['owner'])
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
  const { movieId } = req.params;

  Movie.deleteOne({ _id: movieId })
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
