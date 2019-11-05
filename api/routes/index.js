const express = require('express');
const login = require('./login');
const maps = require('./maps.js');

module.exports = () => {
  const router = express.Router();
  router.use('/login', login());

  router.use('/maps', maps());

  router.use((err, req, res, next) => {
    res.status(500).send({
      error: err,
    });
    next();
  });

  return router;
};
