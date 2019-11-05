axios = require('axios');
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
    console.log(req.body.coord);
    const coords = `${req.body.coord[0]},${req.body.coord[1]}`;
    axios.get(`${process.env.API_URL}search/restaurants`, {
      params: {
        country: 1,
        point: coords,
        max: 20,
        fields: 'coordinates,deliveryTimeMaxMinutes,link,name,logo,ratingScore,topCategories,opened'
      },
    }).then((response) => {
      res.status(200);
      res.send(response.data);
    }).catch((error) => {
      console.log(error)
      if (error.code === 'INVALID_TOKEN') {
        res.status(500);
        res.send({ error: 'internal server error, try again' });
      } else {
        res.status(403);
        res.send({ error: 'Error on points' });
      }
    });
  });
  return router;
};
