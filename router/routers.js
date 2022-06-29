const express = require('express');

const router = express.Router();
const {
  getProductsAllController, getProductIdController,
} = require('../controllers/productsController');

router.get('/products', getProductsAllController);
router.get('/products/:id', getProductIdController);

module.exports = router;