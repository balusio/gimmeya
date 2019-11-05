const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const routes = require('./routes');
const logger = require('./middlewares/loggerMiddleware');
const auth = require('./middlewares/authMiddleware');
;
const app = express();
const port = 3000;
/**
 * @type {Array} whitelist defined to have Cors Enabled 
 */
const whitelist = ['http://localhost:8080', 'http://localhost:4200'];

/**
 * @type {Object} corsOptions Used by cors module to have propeties setted
 * @see https://www.npmjs.com/package/cors
 */
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  'Cache-Control': 'max-age=86400',
  "methods": "GET, POST, OPTIONS, PUT, DELETE",
  'Access-Control-Allow-Headers': 'Authorization, Authentication, Content-Type, Accept, Access-Control-Allow-Request-Method'
}

app.use(express.urlencoded({ extended: false }),cookieParser(), express.json(), cors(corsOptions), logger(), auth(), routes());
app.disable('x-powered-by');
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Gimmeya App listening on port ${port}! \n @balusio was here`));

module.exports = app;
