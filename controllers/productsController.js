const {
  getProductsAllService,
  getProductIdService,
  createProductService,
} = require('../services/productsService');

const getProductsAllController = async (_req, res) => {
  try {
    const product = await getProductsAllService();
    if (!product) {
      res.status(402).json({
        message: 'Product not found',
      });
    }
    return res.status(200).json(product);
  } catch (err) {
    console.log(err);
  }
};

const getProductIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await getProductIdService(id);
    console.log(product);
    if (!product || product.length === 0) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }
    return res.status(200).json(product);
  } catch (err) {
    console.log(err);
  }
};

const createProduct = async (req, res) => {
  try {
    const product = req.body;
    const result = await createProductService(product);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};
 
module.exports = {
  getProductsAllController,
  getProductIdController,
  createProduct,
};