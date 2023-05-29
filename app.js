const express = require('express');
const helmet = require('helmet');
const { errors } = require('celebrate');
const limiter = require('./utils/limiter');
const centralizedErrorController = require('./middlewares/centralizedErrorController');

const router = require('./routes');
const connectDB = require('./db');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { NotFound } = require('./errors');

const { PORT = 3000 } = process.env;
const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.use(requestLogger);

app.use(limiter);
app.use(router);

app.use((req, res, next) => {
  next(new NotFound('Запрошен несуществующий роут'));
});

app.use(errorLogger);
app.use(errors());

app.use(centralizedErrorController);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
