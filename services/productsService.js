const productModel = require('../models/productsModel');

const getProductsAllService = async () => {
  const products = await productModel.getProductsAllModel();
  if (!products) return [];

  return products;
};

const getProductIdService = async (id) => {
  const [product] = await productModel.getProductsIdModel(id);
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
    };
  }
  if (product.name.length < 5) {
    return {
      error: {
        message: '"name" length must be at least 5 characters long',
      },
      status: 422,
    };
  }
  const response = await productModel.createProductModel(product);
  return response;
};

const updateService = async (id, product) => {
  if (!product.name) {
    return { error: { message: '"name" is required' }, status: 400 };
  }
  if (product.name.length < 5) {
    return { error: { message: '"name" length must be at least 5 characters long' }, status: 422 };
  }

  const {
    name,
  } = product;

  const response = await productModel.updateModel(id, name);
  console.log(response);

  if (!response) return [];
  return {
    id: response.id,
    name: response.product_name,
  };
};

const deleteService = async (id) => {
  const idProduct = await productModel.deleteModel(id);
  if (!id) return [];

  return idProduct;
};

module.exports = {
  getProductsAllService,
  getProductIdService,
  createProductService,
  updateService,
  deleteService,
};
