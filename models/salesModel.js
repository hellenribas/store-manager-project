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

  return {
    id: product.insertId,
  };
};

const convertFormat = (sales, all) => sales.map((el) => {
      if (all) {
        return {
          date: el.date,
          id: el.id,
          productId: el.product_id,
          quantity: el.quantity,
          saleId: el.sale_id,
        };
      }
  return {
    date: el.date,
    productId: el.product_id,
    quantity: el.quantity,
  };
    });

const getSalesModel = async () => {
  const [sales] = await connection
    .execute(
      `SELECT * FROM StoreManager.sales_products AS product 
    INNER JOIN StoreManager.sales AS sales
    ON product.sale_id = sales.id
    ORDER BY sale_id ASC, product_id ASC;`,
  );

  return convertFormat(sales, true);
};

const getSaleIdModel = async (id) => {
  const [sales] = await connection
    .execute(
      `SELECT product_id, quantity, date FROM StoreManager.sales_products AS product 
    INNER JOIN StoreManager.sales AS sales
    ON product.sale_id = sales.id
    WHERE sale_id = ?
    ORDER BY sale_id ASC, product_id ASC;`, [id],
    );
  const result = convertFormat(sales, false);
  return result;
};

module.exports = {
  insertSalesModel,
  salesDate,
  getSalesModel,
  getSaleIdModel,
  convertFormat
};
