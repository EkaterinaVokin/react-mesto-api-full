const allowedCors = ['http://mesto.vokin.nomoredomains.icu']; // домен который разрешен

// простые CORS-запросы
const simpleRequest = (req, res, next) => {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  if (allowedCors.includes(origin)) { // проверяем, что источник запроса есть среди разрешённых
    res.headers('Access-Control-Allow-Origin', origin); // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
  }
  next(); // Если источник запроса не найден,браузер сам заблокирует запрос
};

// сложные CORS-запросы
// eslint-disable-next-line consistent-return
const complexRequest = (req, res, next) => {
  const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE'; // Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)
  const requestHeaders = req.headers['access-control-request-headers']; // сохраняем список заголовков исходного запроса
  if (method === 'OPTIONS') { // Если это предварительный запрос, добавляем нужные заголовки
    res.headers('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.headers('Access-Control-Allow-Headers', requestHeaders);
    return res.end(); // завершаем обработку запроса и возвращаем результат клиенту
  }
  next();
};

module.exports = {
  simpleRequest,
  complexRequest,
};
