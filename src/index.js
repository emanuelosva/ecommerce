const express = require('express');
const slash = require('express-slash');
const bodyParser = require('body-parser');
const boom = require('boom');
const path = require('path');
const config = require('./config');
const isRequestAjaxOrApi = require('./utils/isRequestAjaxOrApi')
const {
  logErrors,
  wrapErrors,
  clientErrorHandler,
  errorHandler
} = require('./utils/middlewares/errorHandlers')

// Template routes
const productsTemplateRouter = require('./routes/products');

// Api routes
const apiRouter = require('./api');

// App
const app = express();
app.enable('strict routing')

const router = express.Router({
  caseSensitive: app.get('case sensitive routing'),
  strict: app.get('strict routing')
});

// App midlewares settings
app.use(router)
app.use(slash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static files
app.use('/static', express.static(path.join(__dirname, 'public')));

// Set view engine by Pug
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Router Template
app.use('/products', productsTemplateRouter);
app.get('/', (req, res) => res.redirect('/products'))

// Router Api
app.use('/api', apiRouter);

// 404
app.use((req, res, next) => {
  if (isRequestAjaxOrApi(req)) {
    const {
      output: { statusCode, payload }
    } = boom.notFound();

    res.status(statusCode).json(payload);
  }

  res.status(404).render('404');
});

// Error handlers
app.use(logErrors);
app.use(wrapErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

// Server
const server = app.listen(config.port, () => {
  console.log(`App listening at http://localhost:${server.address().port}`);
});
