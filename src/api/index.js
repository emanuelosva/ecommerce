/**
 *@fileoverview Principal Router for Api
 *
*/

const express = require('express');
const productsApiRouter = require('./routes/products');

const router = express();

// Api Router
router.use('/products', productsApiRouter);

module.exports = router;
