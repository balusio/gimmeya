const axios = require('axios');
const express = require('express');
const redis = require("redis");
/**
 * Loggin process: at this point the Authorization token for the app is setted by the AuthMiddleware
 * this proccess handles the login with user and password
 * @return {object}
 * @listen {string} client hset the current user authorization token.
 */
module.exports = () => {
  const router = express.Router();
  const client = redis.createClient();
  router.post('/', (req, res) => {
    console.o
    axios.get(`${process.env.API_URL}tokens`, {
      params: {
        userName: req.body.username,
        password: req.body.password,
      },
    }).then((response) => {
      const uuid = req.headers.authorization;
      client.hset(uuid, 'authorization', response.data.access_token);
      client.hset(uuid, 'username', req.body.username);
      res.status(200);
      res.send({user_hash: uuid });
      
    }).catch((error) => {
      console.log('EEERRROOR', error.config.headers);
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
