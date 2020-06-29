const { Router } = require('express');

// Validation middleware
const validation = require('../../utils/middlewares/validationHandler');
const {
  productIdSchema,
  productTagSchema,
  createProductSchema,
  updateProductSchema,
} = require('../../utils/schemas/products');


// Services
const ProductServices = require('../../services/products');
const productService = new ProductServices();

const router = Router();

router.get('/',
  validation({ tags: productTagSchema }, 'query'),
  async (req, res, next) => {
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

module.exports = router;
