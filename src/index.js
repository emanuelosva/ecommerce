const express = require('express');
const debug = require('debug')('app:server');
const bodyParser = require('body-parser');
const cors = require('cors')
const boom = require('boom');
const helmet = require('helmet');
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
const authApiRouter = require('./api/routes/auth');
const productsApiRouter = require('./api/routes/products');

// App
const app = express();

// App midlewares settings
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static files
app.use('/static', express.static(path.join(__dirname, 'public')));

// Set view engine by Pug
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Router Template
productsTemplateRouter(app)
app.get('/', (req, res) => res.redirect('/products'))

// Router Api
productsApiRouter(app);
app.use('/api/auth', cors(), authApiRouter);

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
  debug(`App listening at http://localhost:${server.address().port}`);
});
