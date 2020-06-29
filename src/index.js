const express = require('express');
const path = require('path');

// Template routes
const productsTemplateRouter = require('./routes/products');

// Api routes
const apiRouter = require('./api');

const app = express();

// Static files
app.use('/static', express.static(path.join(__dirname, 'public')));

// Set template engine by Pug
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Router Template
app.use('/products', productsTemplateRouter);

// Router Api
app.use('/api', apiRouter);

const server = app.listen(3000, () => {
  console.log(`App listening at http://localhost:${server.address().port}`);
});
