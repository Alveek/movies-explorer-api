const Movie = require('../models/movie');
const customError = require('../errors');

module.exports = (req, res, next) => {
  Movie.findById({ _id: req.params.movieId })
    .then((movie) => {
      // console.log(movie.owner);
      if (!movie) {
        next(new customError.NotFound('Карточки с указанным id не существует'));
      } else if (movie.owner.toHexString() !== req.user._id) {
        next(
          new customError.Forbidden('У вас нет прав на удаление чужой карточки')
        );
      }
      return next();
    })
    .catch(next);
};
