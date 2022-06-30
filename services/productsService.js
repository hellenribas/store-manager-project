const {
  getProductsAllModel,
  getProductsIdModel,
  createProductModel,
} = require('../models/productsModel');
const { productValidate } = require('./productsValidate');

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
  if (!product.name) {
    return {
      error: {
      
        message: '"name" is required',
      },
      status: 400,
    }
  }

  if (product.name.length < 5) {
    return {
      error: 
      {
      message: '"name" length must be at least 5 characters long'
      }
      ,
      status: 422,
    }
  }

  const response = await createProductModel(product);
  return response;
};

module.exports = {
  getProductsAllService,
  getProductIdService,
  createProductService,
};