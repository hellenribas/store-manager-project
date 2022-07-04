const productService = require('../services/productsService');

const getProductsAllController = async (_req, res) => {
  try {
    const product = await productService.getProductsAllService();
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
  try {
    const {
      id,
    } = req.params;
    const product = await productService.getProductIdService(id);
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
    const result = await productService.createProductService(product);
    if (result.status) {
      return res.status(result.status).json(result.error);
    }
    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

const updateController = async (req, res) => {
  try {
    const {
      id,
    } = req.params;
    const product = req.body;
    const result = await productService.updateService(id, product);

    if (!result || result.length === 0) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }
    if (result.status) {
      return res.status(result.status).json(result.error);
    }
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
  }
};

const deleteController = async (req, res) => {
  try {
    const {
      id,
    } = req.params;
    const result = await productService.deleteService(id);

    if (!result || result.length === 0) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }
    return res.status(204).end();
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getProductsAllController,
  getProductIdController,
  createProduct,
  updateController,
  deleteController,
};
