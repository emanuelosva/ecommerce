const { Router } = require('express');

// Mock
const ProductServices = require('../../services/products');

const productService = new ProductServices();

const router = Router();

router.get('/', async (req, res, next) => {
  const { tags } = req.query;
  try {
    const products = await productService.getProducts({ tag: tags });

    res.status(200).json({
      data: products,
      message: "Products List"
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:productId', async (req, res, next) => {
  const { productId } = req.params;
  try {
    const product = await productService.getProduct({ productId });

    res.status(200).json({
      data: product,
      message: "Products retrieve"
    });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  const { body: product } = req;
  try {
    const newProduct = await productService.createProduct({ product })

    res.status(201).json({
      data: newProduct,
      message: "Product created"
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:productId', async (req, res, next) => {
  const { productId } = req.params;
  const { body: product } = req;

  try {
    const updatedProduct = await productService.createProduct({ productId, product })

    res.status(200).json({
      data: updatedProduct,
      message: "Product updated"
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:productId', async (req, res, next) => {
  const { productId } = req.params;
  try {
    const deletedProduct = await productService.createProduct({ productId })

    res.status(200).json({
      data: deletedProduct,
      message: "Product deleted"
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
