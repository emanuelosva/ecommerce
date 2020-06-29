const { Router } = require('express');

const router = Router();

const products = [
  {
    name: "Tenis",
    price: 75,
  },
  {
    name: "Playera",
    price: 23,
  },
];

router.get('/', (req, res) => {
  res.render('products', { products: products });
});

module.exports = router;
