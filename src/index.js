const express = require('express');
const path = require('path');

const productsRouter = require('./routes/products');

const app = express();

// Static files
app.use('/static', express.static(path.join(__dirname, 'public')));

// Set template engine by Pug
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Router
app.use('/products', productsRouter);

const server = app.listen(3000, () => {
  console.log(`App listening at http://localhost:${server.address().port}`);
});
