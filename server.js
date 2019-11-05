const express = require('express');
const path = require('path');

const app = express();
const port = 8080;
/**
 * Simple server to serve public files and read parameters on the maps
 */
app.use('/', express.static(path.resolve('dist')));

app.get('*', (request, response) => {
  response.sendFile(path.resolve('dist', 'index.html'));
});


app.listen(port, () => console.log(`Listening on port ${port}!`));
