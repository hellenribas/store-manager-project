const {
  insertSalesService,
  getSalesService,
  getSaleIdService,
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

const getSalesController = async (_req, res) => {
  try {
    const sales = await getSalesService(); 
    res.status(200).json(sales);
  } catch (err) {
    console.error(err);
  }
}

const getSaleIdController = async (req, res) => {
  try {
      const { id } = req.params;
    const sales = await getSaleIdService(id);
    if (!sales || sales.length === 0) {
      return res.status(404).json({
        message: "Sale not found"
      });
    }
      return res.status(200).json(sales);
    } catch (err) {
      console.error(err);
    }
}

module.exports = {
  insertSales,
  getSalesController,
  getSaleIdController,
};
