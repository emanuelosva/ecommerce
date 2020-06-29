const { Router } = require('express');
const ProductsService = require('../services/products')
const e = require('express');

// Router initialization
const router = Router();

// Data service
const productsService = new ProductsService();

// Routes
router.get('/', async (req, res, next) => {
  const { tags } = req.query;
  try {
    const products = await productsService.getProducts({ tags: tags });
    res.render('products', { products });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
