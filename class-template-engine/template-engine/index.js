const express = require('express');
const expressJsx = require('./expressJsx')

const app = express();

// Set template engine system
app.engine("jsx", expressJsx);
app.set('views', './views');
app.set('view engine', 'jsx');

// Render the route by file index
app.get('/', (req, res) => {
  res.render('index', { hello: 'Hola', world: 'mundo!' });
});

const server = app.listen(3000, () => {
  console.log(`Listening at http://localhost:${server.address().port}`);
});
