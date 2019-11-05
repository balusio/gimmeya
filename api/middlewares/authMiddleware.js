const express = require('express');
const axios = require('axios');
const redis = require("redis");


module.exports = () => {
  const app = express();
  const client = redis.createClient();
  let uuid = null;
  app.use((req, res, next) => {
    /**
     * Check the cookie UUID, if is isset on the header
     * means the user previously logged into the app, otherwise is making a new login,
     * in case the authentications is setted up, should continue to the normal flow,
     * otherwise will check the authorization and pass to the header axios
     * to be consumed on the login step
     */
    if(req.headers.authorization){
      console.log('ENTERED BY loggin');
      client.hget(req.headers.authorization, 'authorization',(err,object) =>{ 
        console.log(object);
        axios.defaults.headers.common.Authorization = object;
      });
      client.hget(req.headers.authorization, 'authentication', (err,object) => {
        axios.defaults.headers.common.Authentication = object;
        next();
      });
     
    } else {
      // Always set the Authentication, login will handle it as `Authorization `
      // then will be returned the logged user with authorization and authentication
      axios.get(`${process.env.API_URL}tokens`, {
        params: {
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
        },
      }).then((response) => {
        if(!client.setnx('loggedUsers', 0)) {
          client.incr('loggedUsers');
        } 
        axios.defaults.headers.common.Authorization = response.data.access_token;
        req.headers.authorization = response.data.access_token;
        client.hset(response.data.access_token, 'authentication', response.data.access_token);
        console.log(axios.defaults.headers.common.Authorization, ' UUID AND GO TO LOGIN');
        next();
      }).catch(() => {
        res.status(500);
        res.send({ error: 'internal server error' });
      });
    }
  });
  return app;
};
