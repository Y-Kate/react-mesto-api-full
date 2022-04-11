const express = require('express');
require('dotenv').config();

const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const router = require('./routes/index');

const { PORT = 3000 } = process.env;
const app = express();
const handlerErrors = require('./middlewares/errors');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(cookieParser()); // подключаем парсер кук как мидлвэр
app.use('/', router);
app.use(errors());
app.use(handlerErrors);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
