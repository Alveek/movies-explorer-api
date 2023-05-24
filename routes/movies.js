const moviesRouter = require('express').Router();
const { celebrate } = require('celebrate');
const authDeleteMovie = require('../middlewares/authDeleteMovie');

const {
  createMovieValidation,
  deleteMovieValidation,
} = require('../utils/validation');

const {
  createMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/movies');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', celebrate(createMovieValidation), createMovie);

moviesRouter.delete(
  '/:_id',
  celebrate(deleteMovieValidation),
  authDeleteMovie,
  deleteMovie,
);

module.exports = moviesRouter;
