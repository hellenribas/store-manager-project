const {
  expect
} = require('chai');
const connection = require('../../../helpers/connection');

const sinon = require('sinon');

const salesModel = require('../../../models/salesModel');

describe('testing salesDate', () => {
  describe('success insert case', () => {
    const sale = [{
      insertId: 100,
    }]
    before(() => {
      sinon.stub(connection, 'execute').returns(sale);
    });

    after(() => {
      connection.execute.restore();
    });

    it('return a object', async () => {
      const result = await salesModel.salesDate();
      expect(result).to.be.an('object');
    });
  });
});

describe('testing insertSalesModel', () => {
  const saleId = 1;
  const productId = 1;
  const quantity = 10;

  describe('success insert case', () => {
    const sale = [{
      insertId: 1,
    }]
    before(() => {
      sinon.stub(connection, 'execute').returns(sale);
    });

    after(() => {
      connection.execute.restore();
    });

    it('return a object', async () => {
      const result = await salesModel.insertSalesModel(saleId, productId, quantity);
      expect(result).to.be.an('object');
    });
  });
});

describe('testing convertFormat', () => {
  const sales = [{
    sale_id: 1,
    product_id: 1,
    quantity: 8,
    id: 1,
    date: '2022-07-06T18:12:42.000Z'
  }, ];

  describe('convert case', () => {
    it('return a array', async () => {
      const result = await salesModel.convertFormat(sales, true);
      expect(result).to.be.an('array');
    });

    it('return a object with saleId', async () => {
      const result = await salesModel.convertFormat(sales, true);
      expect(result[0]).to.have.property('saleId');
    });

    it('property saleId not exist', async () => {
      const result = await salesModel.convertFormat(sales, false);
      expect(result[0]).not.to.have.property('saleId');
    });
  });
});

describe('testing getSalesModel', () => {
  const sale = [[{
    sale_id: 1,
    product_id: 1,
    quantity: 8,
    id: 1,
    date: '2022-07-06T18:12:42.000Z'
  }]];
    before(() => {
      sinon.stub(connection, 'execute').returns(sale);
    });

    after(() => {
      connection.execute.restore();
    });
  
  it('success return sales', async () => {
    const response = await salesModel.getSalesModel();
    expect(response).to.be.an('array');
  });
});

describe('testing getSaleIdModel', () => {
  const sale = [
    [{
      sale_id: 1,
      product_id: 1,
      quantity: 8,
      id: 1,
      date: '2022-07-06T18:12:42.000Z'
    }]
  ];
  const ID = 1;
  before(() => {
    sinon.stub(connection, 'execute').returns(sale);
  });

  after(() => {
    connection.execute.restore();
  });

  it('success return sales id', async () => {
    const response = await salesModel.getSaleIdModel(ID);
    expect(response).to.be.an('array');
  });
});
