axios = require('axios');
const express = require('express');
const mapController = require('../controllers/map-controller');
/**
 * Map route handler  delegate all to the mapController
 */
module.exports = () => {
  const router = express.Router();
  router.post('/', (req, res) => { mapController(req,res); });
  return router;
};
