const productValidate = async (products, functions) => {
  const getProduct = await functions;
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
const validateSales = async (products) => {
  if (products.some((product) => !product.productId)) {
    return {
      error: {
        message: '"productId" is required',
      },
      status: 400,
    };
  }

  if (products.some((product) => product.quantity <= 0)) {
    return {
      error: { message: '"quantity" must be greater than or equal to 1' }, status: 422 };
  }

  if (products.some((product) => !product.quantity)) {
    return { error: { message: '"quantity" is required' }, status: 400 };
  }
  return [];
};

module.exports = {
  validateSales,
  productValidate,
};