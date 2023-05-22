const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const limiter = require('./utils/limiter');
const cors = require('./middlewares/cors');
const auth = require('./middlewares/auth');
const centralizedErrorController = require('./middlewares/centralizedErrorController');
const authRouter = require('./routes/auth');
const router = require('./routes');
const connectDB = require('./db');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { NotFound } = require('./errors');

const { PORT = 3000 } = process.env;
const app = express();

// mongoose.connect(CONNECT);
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());

app.use(requestLogger);
app.use(cors);

app.use(authRouter);
// app.use(limiter);
app.use(auth);
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
