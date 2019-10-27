const axios = require('axios');
const express = require('express');

module.exports = () => {
  const router = express.Router();
  router.get('/', (req, res) => {
    axios.get(`${process.env.API_URL}/token`, {
      params: {
        userName: req.username,
        password: req.password,
      },
    }).then((response) => {
      res.status(200);
      res.send({
        authR: response.access_token,
        authN: axios.defaults.gets.common.Authorization,
      });
    }).cath((error) => {
      if (error.code === 'INVALID_TOKEN') {
        res.status(500);
        res.send({ error: 'internal server error, try again' });
      } else {
        res.status(403);
        res.send({ error: 'INVALID_CREDENTIALS' });
      }
    });
  });
  return router;
};
