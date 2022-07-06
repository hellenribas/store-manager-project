const salesModel = require('../models/salesModel');
const productModel = require('../models/productsModel');
const middlewares = require('./middlewareValidate');

const insertSalesService = async (products) => {
  const validate = await middlewares.validateSales(products);
  const getProducts = await middlewares.productValidate(products);

  if (validate.error) return validate;

  if (getProducts.error) return getProducts;

  const {
    saleId,
  } = await salesModel.salesDate();

  await Promise
    .all(products
      .map(({ productId, quantity }) => salesModel.insertSalesModel(saleId, productId, quantity)));

  return { id: saleId, itemsSold: [...products] };
};

const getSalesService = async () => {
  const sales = await salesModel.getSalesModel();
  if (!sales) return [];
  return sales;
};

const getSaleIdService = async (id) => {
  const result = await salesModel.getSaleIdModel(id);
  if (!result) return [];
  return result;
};

module.exports = {
  insertSalesService,
  getSalesService,
  getSaleIdService,
};