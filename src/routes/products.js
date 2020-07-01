const { Router } = require('express');
const config = require('../config');
const ProductsService = require('../services/products');
// const { ProductServiceMock } = require('../utils/mocks/products');
// const axios = require('axios').default;

// Data service
const productsService = new ProductsService();
// const productsService = new ProductServiceMock();

// Env
const DEV = config.env.dev;

// Routes
const viewsProducts = (app) => {
  // Router initialization
  const router = Router();
  app.use('/products', router);

  router.get('/', async (req, res, next) => {
    const { tags } = req.query;
    try {
      const products = await productsService.getProducts({ tags: tags });
      // const productsRes = await axios.get('http://localhost:3000/api/products');
      // const products = productsRes.data.data;

      res.status(200).render('products', { products, dev: DEV });
    } catch (error) {
      next(error);
    }
  });
}

module.exports = viewsProducts;
