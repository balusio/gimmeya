const express = require('express');
/**
 * Middleware for apply cors
 */
module.exports = () => {
  const app = express();
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    // eslint-disable-next-line max-len
    res.header('Access-Control-Allow-Headers', 'Authorization, Authentication, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });
  return app;
};
