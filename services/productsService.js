const {
  getProductsAllModel,
  getProductsIdModel,
  createProductModel,
} = require('../models/productsModel');

const getProductsAllService = async () => {
  const products = await getProductsAllModel();
  if (!products) return [];

  return products;
};

const getProductIdService = async (id) => {
  const [product] = await getProductsIdModel(id);
  if (!product) return [];
  return product;
};

const createProductService = async (product) => {
  const response = await createProductModel(product);
  return response;
};

module.exports = {
  getProductsAllService,
  getProductIdService,
  createProductService,
};