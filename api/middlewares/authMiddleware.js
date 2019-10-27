const express = require('express');
const axios = require('axios');

module.exports = () => {
  const app = express();
  app.use((req, res, next) => {
    /**
     * Check the authentication method, if is isset on the header
     * means the user previously logged into the app, otherwise is making a new login,
     * in case the authentications is setted up, should continue to the normal flow,
     * otherwise will check the authorization and pass to the header
     * to be consumed on the login step
     */
    if (req.headers.Authorization) {
      if (req.headers.Authentication) {
        axios.defaults.gets.common.Authentication = req.header('Authentication');
      }
      axios.defaults.gets.common.Authorization = req.header('Authorization');
      next();
    } else {
      // Always set the Authentication, login will handle it as `Authorization `
      // then will be returned the logged user with authorization and authentication
      axios.get(`${process.env.API_URL}tokens`, {
        params: {
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
        },
      }).then((response) => {
        axios.defaults.headers.common.Authorization = response.data.access_token;
        next();
      }).catch(() => {
        res.status(500);
        res.send({ error: 'internal server error' });
      });
    }
  });
  return app;
};
