const express = require('express');
const path = require('path');
const supertest = require('supertest');

const testServer = (route) => {
  const app = express();
  app.use('/static', express.static(`${__dirname}/../public`))
  app.set('views', `${__dirname}/../views`);
  app.set('view engine', 'pug');
  route(app);

  return supertest(app);
};

module.exports = testServer;
