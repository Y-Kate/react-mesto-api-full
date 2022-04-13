const express = require('express');

const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');
const cors = require('./middlewares/cors');
const { PORT } = require('./config');

const app = express();
const handlerErrors = require('./middlewares/errors');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(cors);
app.use(bodyParser.json()); // для собирания JSON-формата
app.use(cookieParser()); // подключаем парсер кук как мидлвэр
app.use(requestLogger); // подключаем логгер запросов

app.use('/', router);

app.use(errorLogger); // подключаем логгер ошибок
app.use(errors());
app.use(handlerErrors);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
