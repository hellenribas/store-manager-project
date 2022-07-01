const {
  insertSalesService,
} = require('../services/salesService');

const insertSales = async (req, res) => {
  try {
    const products = req.body;
    const result = await insertSalesService(products);
    if (result.status) {
      return res.status(result.status).json(result.error);
    }
    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  insertSales,
};