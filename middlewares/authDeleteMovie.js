const Movie = require('../models/movie');
const customError = require('../errors');

module.exports = (req, res, next) => {
  Movie.findById({ _id: req.params._id })
    .then((movie) => {
      // console.log(movie.owner);
      if (!movie) {
        next(new customError.NotFound('Фильма с указанным id не существует'));
      } else if (movie.owner.toHexString() !== req.user._id) {
        next(
          new customError.Forbidden('У вас нет прав на удаление чужого фильма'),
        );
      }
      return next();
    })
    .catch(next);
};
