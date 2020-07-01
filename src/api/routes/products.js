const { Router } = require('express');
const passport = require('passport');

const cacheResponse = require('../../utils/cacheResponse');
const {
  FIVE_MINUTES_IN_SECODS,
  SIXTY_MINUTES_IN_SECODS
} = require('../../utils/time');

// Validation middleware
const validation = require('../../utils/middlewares/validationHandler');
const {
  productIdSchema,
  productTagSchema,
  createProductSchema,
  updateProductSchema,
} = require('../../utils/schemas/products');

// JWT strategy 
require('../../utils/auth/strategies/jwt')

// Services
const ProductServices = require('../../services/products');
const productService = new ProductServices();

const apiProduct = (app) => {

  const router = Router();
  app.use('/api/products', router);

  router.get('/',
    validation({ tags: productTagSchema }, 'query'),
    async (req, res, next) => {
      cacheResponse(res, FIVE_MINUTES_IN_SECODS);
      const { tags } = req.query;
      try {
        const products = await productService
          .getProducts({ tags: tags });

        res.status(200).json({
          data: products,
          message: "Products List"
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.get('/:productId',
    validation({ productId: productIdSchema }, 'params'),
    async (req, res, next) => {
      cacheResponse(res, SIXTY_MINUTES_IN_SECODS);
      const { productId } = req.params;
      try {
        const product = await productService
          .getProduct({ productId });

        res.status(200).json({
          data: product,
          message: "Products retrieve"
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post('/',
    validation(createProductSchema),
    async (req, res, next) => {
      const { body: product } = req;
      try {
        const newProduct = await productService
          .createProduct({ product })

        res.status(201).json({
          data: newProduct,
          message: "Product created"
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.put('/:productId',
    passport.authenticate('jwt', { session: false }),
    validation({ productId: productIdSchema }, 'params'),
    validation(updateProductSchema),
    async (req, res, next) => {
      const { productId } = req.params;
      const { body: product } = req;

      try {
        const updatedProduct = await productService
          .updateProduct({ productId, product })

        res.status(200).json({
          data: updatedProduct,
          message: "Product updated"
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete('/:productId',
    passport.authenticate('jwt', { session: false }),
    validation({ productId: productIdSchema }, 'params'),
    async (req, res, next) => {
      const { productId } = req.params;
      try {
        const deletedProduct = await productService
          .deleteProduct({ productId })

        res.status(200).json({
          data: deletedProduct,
          message: "Product deleted"
        });
      } catch (error) {
        next(error);
      }
    }
  );
};

module.exports = apiProduct;
