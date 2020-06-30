/**
 *@fileoverview Principal Router for Api
 *
*/

const express = require('express');
const productsApiRouter = require('./routes/products');
const authApiRouter = require('./routes/auth');

const router = express();

// Api Router
router.use('/products', productsApiRouter);
router.use('/auth', authApiRouter);

module.exports = router;
