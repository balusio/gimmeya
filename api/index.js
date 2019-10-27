const express = require('express');
const routes = require('./routes');
const cors = require('./middlewares/cors');
const logger = require('./middlewares/loggerMiddleware');
const auth = require('./middlewares/authMiddleware');

const app = express();
const port = 3000;

app.disable('x-powered-by');
app.use(cors(), logger(), auth(), routes());
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Gimmeya App listening on port ${port}! \n @balusio was here`));

module.exports = app;
