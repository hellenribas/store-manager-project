const express = require('express');

const router = express.Router();
const {
  getProductsAllController, getProductIdController,
  createProduct,
  // insertSales,
} = require('../controllers/productsController');

router.get('/products', getProductsAllController);
router.post('/products', createProduct);
router.get('/products/:id', getProductIdController);
// router.post('/sales', insertSales);

module.exports = router;