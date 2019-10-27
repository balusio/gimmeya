const express = require('express');
const loggerRequest = require('./logAction');
/**
 * Middleware Redis getter for functions
 */
module.exports = () => {
  const app = express();
  app.use(async (req, res, next) => {
    await loggerRequest(req);
    next();
  });
  return app;
};
