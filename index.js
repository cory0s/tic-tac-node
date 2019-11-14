'use strict';
/**
*  index.js
* @module /index.js
* starts up server on a predefined port, or on localhost 3000 otherwise
*/
const PORT = process.env.PORT || 3000
const { start } = require('./server.js');

start(PORT);