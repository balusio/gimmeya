const axios = require('axios');
const express = require('express');
/**
 * Loggin process: at this point the Authorization token for the app is setted by the AuthMiddleware
 * this proccess handles the login with user and password
 * @return {object}
 * @return {property} authR the current user authorization token.
 * @return {property} authN the application token authorization now became the authentication token
 */
module.exports = () => {
  const router = express.Router();
  router.post('/', (req, res) => {
    axios.get(`${process.env.API_URL}tokens`, {
      params: {
        userName: req.body.username,
        password: req.body.password,
      },
    }).then((response) => {
      res.status(200);
      res.send({
        authR: response.data.access_token,
        authN: axios.defaults.headers.common.Authorization,
      });
    }).catch((error) => {
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
