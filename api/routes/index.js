const express = require('express');
const login = require('./login');

module.exports = () => {
  const router = express.Router();
  router.use('/', (req, res) => {
    res.send('MORNING');
  });
  router.use('/login', login());

  router.use((err, req, res, next) => {
    res.status(500).send({
      error: err,
    });
    next();
  });

  return router;
};
