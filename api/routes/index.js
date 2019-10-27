const express = require('express');
const login = require('./login');

module.exports = () => {
  const router = express.Router();
  router.use('/login', login());

  router.use((err, req, res, next) => {
    res.status(500).send('Something broke!');
    next();
  });

  return router;
};
