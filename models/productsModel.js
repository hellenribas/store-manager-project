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

const updateModel = async (id, name) => {
  await connection
    .execute('UPDATE StoreManager.products SET name=? WHERE id=?',
      [name, id]);
  const [
    [product],
  ] = await connection
    .execute('SELECT id, name product_name FROM StoreManager.products WHERE id = ?',
      [id]);
  return product;
};

module.exports = {
  getProductsAllModel,
  getProductsIdModel,
  createProductModel,
  updateModel,
};
