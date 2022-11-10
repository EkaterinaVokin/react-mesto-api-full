const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet'); // модуль для защиты приложения известных веб-уязвимостей
const auth = require('./middlewares/auth');
const centerErrors = require('./middlewares/ centerErrors'); // модуль обработка централизованных ошибок
const NotFoundError = require('./errors/not-found-err');
const routes = require('./routes/index'); // импортировать роуты регистарция и авторизация
const { requestLogger, errorLogger } = require('./middlewares/logger'); // логеры ошибок

const app = express();

app.use(express.json());

app.use(helmet()); // безопасность

app.use(cookieParser()); // подключаем парсер кук как мидлвэр

const { PORT = 3000 } = process.env;

app.use(requestLogger); // подключаем логгер запросов

// регистрация и авторизация
app.use(routes);

app.use('/', auth, require('./routes/users'));
app.use('/', auth, require('./routes/cards'));

// обработка несуществующих маршрутов
app.use('*', (req, res, next) => {
  next(new NotFoundError(`Запрашиваемый ресурс ${req.baseUrl} не найден`));
});

app.use(errorLogger); // подключаем логгер ошибок

mongoose.connect('mongodb://localhost:27017/mestodb');

// обработчики ошибок
app.use(errors()); // обработчик ошибок celebrate

// обработчки централизованных ошибок
app.use(centerErrors);

app.listen(PORT, () => {
  console.log('Сервер запущен на порту:', PORT);
});
