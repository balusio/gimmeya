const express = require('express');
const axios = require('axios');
const redisService = require('../services/redis-service');

/**
 * Map controller handles all request related to the map and
 * cache the last request from specific user id 
 * the header authorization + string 'last_request' and lasts coordinates will check if 
 * the last request is setted and will return it to the app without going to the API
 */

module.exports = (req,res) => {
  const uuid = axios.defaults.headers.common.Authorization;
  //the last_request is related to the uniqueid and the last coordinates requested by the user
  redisService.getKey(`${uuid}:last_request:${req.body.coord[0]},${req.body.coord[1]}`).then((response) =>{
    if(response){
      res.send(response);
    } else{
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
        // get the general timeX on the response
        // set the response with key[uuid + last_query + coords] inside redis
        // set the expire time to be used based on timeX
        redisService.getKey(`timeX`).then(async (timeX) =>{
         const request = await redisService.setKey(`${uuid}:last_request:${req.body.coord[0]},${req.body.coord[1]}`, JSON.stringify(response.data));
         if(request){-
          redisService.expireKey(`${uuid}:last_request:${req.body.coord[0]},${req.body.coord[1]}`, timeX);
         }
        });
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
    }
    
  });

 
};

