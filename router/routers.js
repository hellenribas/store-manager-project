const express = require('express');

const router = express.Router();
const {
  getProductsAllController, getProductIdController,
  createProduct,
  updateController,
} = require('../controllers/productsController');

const {
  insertSales,
  getSalesController,
  getSaleIdController,
} = require('../controllers/salesController');

router.get('/products', getProductsAllController);
router.post('/products', createProduct);
router.get('/products/:id', getProductIdController);
router.get('/sales', getSalesController);
router.get('/sales/:id', getSaleIdController);
router.post('/sales', insertSales);
router.put('/products/:id', updateController);

module.exports = router;