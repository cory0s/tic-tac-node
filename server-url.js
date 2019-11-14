'use strict';

let SERVER_URL = 'https://frozen-savannah-62051.herokuapp.com';
//let SERVER_URL = 'http://localhost:3000';

if (process.env.NODE_ENV === 'development') {
  SERVER_URL = 'http://127.0.0.1:3000';
}

module.exports = SERVER_URL;