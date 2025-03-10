"use strict";

require('dotenv').config();
var config = {
  development: {
    mongoUri: process.env.MONGO_URI
  },
  test: {
    mongoUri: process.env.MONGO_URI_TEST
  },
  production: {
    mongoUri: process.env.MONGO_URI_PROD
  }
};
module.exports = config;