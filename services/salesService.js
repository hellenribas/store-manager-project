const {
  insertSalesModel,
  salesDate,
  getSalesModel,
  getSaleIdModel,
} = require('../models/salesModel');

const {
  getProductsAllModel,
} = require('../models/productsModel');

const validateSales = async (products) => {
  if (products.some((product) => !product.productId)) {
    return {
      error: { message: '"productId" is required' }, status: 400,
    };
  }

  if (products.some((product) => product.quantity <= 0)) {
    return {
      error: { message: '"quantity" must be greater than or equal to 1' }, status: 422,
    };
  }

  if (products.some((product) => !product.quantity)) {
    return {
      error: { message: '"quantity" is required' }, status: 400,
    };
  }
  return [];
};

const productValidate = async (products) => {
  const getProduct = await getProductsAllModel();
  const ids = getProduct.map((elem) => elem.id);
  if (products.some((el) => !ids.includes(el.productId))) {
    return {
      error: {
        message: 'Product not found',
      },
      status: 404,
    };
  }
  return [];
};

const insertSalesService = async (products) => {
  const validate = await validateSales(products);
  const getProducts = await productValidate(products);

  if (validate.error) return validate;

  if (getProducts.error) return getProducts;

  const {
    saleId,
  } = await salesDate();

  await Promise
    .all(products
      .map(({ productId, quantity }) => insertSalesModel(saleId, productId, quantity)));

  return { id: saleId, itemsSold: [...products] };
};

const getSalesService = async () => {
  const sales = await getSalesModel();
  if (!sales) return [];
  return sales;
};

const getSaleIdService = async (id) => {
  const result = await getSaleIdModel(id);
  if (!result) return [];
  return result;
};

module.exports = {
  insertSalesService,
  getSalesService,
  getSaleIdService,
};