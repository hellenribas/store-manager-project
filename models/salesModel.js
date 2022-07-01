const connection = require('../helpers/connection');

const salesDate = async () => {
  const [sale] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );
  return {
    saleId: sale.insertId,
  };
};

const insertSalesModel = async (salesId, productId, quantity) => {
  const [product] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [salesId, productId, quantity],
  );
  // console.log(product);
  return {
    id: product.insertId,
  };
};

module.exports = {
  insertSalesModel,
  salesDate,
};