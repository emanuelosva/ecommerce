const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const config = require('./config');
const {
  logErrors,
  clientErrorHandler,
  errorHandler
} = require('./utils/middlewares/errorHandlers')

// Template routes
const productsTemplateRouter = require('./routes/products');

// Api routes
const apiRouter = require('./api');

// App
const app = express();

// App midlewares settings
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

// Error handlers
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

// Server
const server = app.listen(config.port, () => {
  console.log(`App listening at http://localhost:${server.address().port}`);
});
