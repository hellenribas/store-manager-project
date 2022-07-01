const express = require('express');

const router = express.Router();
const {
  getProductsAllController, getProductIdController,
  createProduct,
} = require('../controllers/productsController');

const {
  insertSales,
} = require('../controllers/salesController');

router.get('/products', getProductsAllController);
router.post('/products', createProduct);
router.get('/products/:id', getProductIdController);
router.post('/sales', insertSales);

module.exports = router;