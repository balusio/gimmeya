const express = require('express');
const redisService = require('../services/redis-service');

module.exports = () => {
  const router = express.Router();
  router.get('/', (req, res) => {
    const response = {
      key: 'val'
    }
    if(req.query.timeX) { 
      redisService.setAsync('timeX',req.query.timeX).then((response)=> {
        response.timeX = response;
      })
    }
  });
  return router;
};
