const { Router } = require('express');

const router = Router();

const products = require('../api/utils/mocks/products');

router.get('/', (req, res) => {
  res.render('products', { products: products });
});

module.exports = router;
