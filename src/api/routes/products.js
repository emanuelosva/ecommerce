const { Router } = require('express');

// Mock
const productMock = require('../utils/mocks/products');

const router = Router();

router.get('/', (req, res) => {
  const { query } = req.query;
  res.status(200).json({
    data: productMock,
    message: "Products List"
  });
});

router.get('/:productId', (req, res) => {
  const { productId } = req.params;

  res.status(200).json({
    data: productMock[0],
    message: "Products retrieve"
  });
});

router.post('/:productId', (req, res) => {
  res.status(201).json({
    data: productMock[0],
    message: "Product created"
  });
});

router.put('/:productId', (req, res) => {
  res.status(200).json({
    data: productMock[0],
    message: "Product ipdated"
  });
});

router.delete('/:productId', (req, res) => {
  res.status(200).json({
    data: productMock[0],
    message: "Product deleted"
  });
});

module.exports = router;
