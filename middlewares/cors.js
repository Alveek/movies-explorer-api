// const allowedCors = [
//   'https://api.ak-movies-explorer.nomoredomains.monster',
//   'http://api.ak-movies-explorer.nomoredomains.monster',
//   'localhost:3000',
//   'http://localhost:3000',
//   'http://localhost:3001',
// ];

// module.exports = (req, res, next) => {
//   const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
//   const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную
//   const requestHeaders = req.headers['access-control-request-headers'];
//   const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
//   // проверяем, что источник запроса есть среди разрешённых
//   if (allowedCors.includes(origin)) {
//     // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
//     res.header('Access-Control-Allow-Origin', origin);
//   }

//   if (method === 'OPTIONS') {
//     // разрешаем кросс-доменные запросы любых типов (по умолчанию)
//     res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
//     // разрешаем кросс-доменные запросы с этими заголовками
//     res.header('Access-Control-Allow-Headers', requestHeaders);
//     // завершаем обработку запроса и возвращаем результат клиенту
//     return res.end();
//   }

//   return next();
// };

module.exports = (req, res, next) => {
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  // Set the Access-Control-Allow-Origin header to allow all origins
  res.header('Access-Control-Allow-Origin', '*');

  if (method === 'OPTIONS') {
    // Allow all types of cross-origin requests (by default)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    // Allow cross-origin requests with these headers
    res.header('Access-Control-Allow-Headers', requestHeaders);
    // End the request processing and return the result to the client
    return res.end();
  }

  return next();
};
