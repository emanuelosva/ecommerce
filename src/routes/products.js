const { Router } = require('express');
const ProductsService = require('../services/products')
const axios = require('axios').default;

// Router initialization
const router = Router();

// Data service
const productsService = new ProductsService();

// Routes
router.get('/', async (req, res, next) => {
  const { tags } = req.query;
  try {
    // const products = await productsService.getProducts({ tags: tags });
    const productsRes = await axios.get('http://localhost:3000/api/products');
    const products = productsRes.data.data;

    res.render('products', { products });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
