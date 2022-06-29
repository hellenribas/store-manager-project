const {
  getProductsAllModel,
  getProductsIdModel,
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

module.exports = {
  getProductsAllService,
  getProductIdService,
};