const express = require('express');

const router = express.Router();
const {
  getProductsAllController, getProductIdController,
  createProduct,
} = require('../controllers/productsController');

const {
  insertSales,
  getSalesController,
  getSaleIdController,
} = require('../controllers/salesController');

router.get('/products', getProductsAllController);
router.get('/products/:id', getProductIdController);
router.post('/products', createProduct);
router.get('/sales', getSalesController);
router.get('/sales/:id', getSaleIdController);
router.post('/sales', insertSales);

module.exports = router;