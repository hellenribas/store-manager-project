const connection = require('../helpers/connection');

const getProductsAllModel = async () => {
  const [products] = await connection.execute('SELECT * FROM StoreManager.products');

  return products;
};

const getProductsIdModel = async (id) => {
  const [products] = await connection
    .execute('SELECT * FROM StoreManager.products WHERE id = ?',
      [id]);
  return products;
};

const createProductModel = async ({
  name,
}) => {
  const [product] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [name],
  );

  const result = {
    id: product.insertId,
    name,
  };

  return result;
};

module.exports = {
  getProductsAllModel,
  getProductsIdModel,
  createProductModel,
};
