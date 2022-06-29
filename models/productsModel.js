const connection = require('../helpers/connection');

const getProductsAllModel = async () => {
  const [products] = await connection.execute('SELECT * FROM StoreManager.products');
  return products;
}

const getProductsIdModel = async (id) => {
  const [products] = await connection.execute('SELECT * FROM StoreManager.products WHERE id = ?', [id]);
  return products;
}

module.exports = {
  getProductsAllModel,
  getProductsIdModel,
}