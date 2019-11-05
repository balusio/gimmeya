const express = require('express');
const axios = require('axios');
const redis = require("redis");

/**
 * Check the cookie UUID, if is isset on the header
 * means the user previously logged into the app, otherwise is making a new login,
 * in case the authentications is setted up, should continue to the normal flow,
 * otherwise will check the authorization and pass to the header axios
 * to be consumed on the login step
 */
module.exports = () => {
  const app = express();
  const client = redis.createClient();
  app.use((req, res, next) => {

    if(req.headers.authorization){
      /**
       * the User has enter previously into the app, set the Auth and authentication 
       * headers based on the UUID into redis
       */
      client.hget(req.headers.authorization, 'authorization',(err,object) =>{ 
        axios.defaults.headers.common.Authorization = object;
      });
      client.hget(req.headers.authorization, 'authentication', (err,object) => {
        axios.defaults.headers.common.Authentication = object;
        next();
      });
     
    } else {
      /**
       * the user hasn't logged never, will get the Authentication, this id will become the unique hash for the current user inside 
       * redis
       * the API requires authentication and Authorization, till now we only want to save the authentication
       */
      axios.get(`${process.env.API_URL}tokens`, {
        params: {
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
        },
      }).then((response) => {
        client.setnx('loggedUsers', 0);
        client.incr('loggedUsers');
        // pass as headers auth the response to be handled by all the new queries on axios library
        axios.defaults.headers.common.Authorization = response.data.access_token;
        // set the header to provide logged actions to next routes
        req.headers.authorization = response.data.access_token;
        client.hset(response.data.access_token, 'authentication', response.data.access_token);
        next();
      }).catch(() => {
        res.status(500);
        res.send({ error: 'internal server error' });
      });
    }
  });
  return app;
};
