const {
  expect
} = require('chai');

const sinon = require('sinon');

const salesService = require('../../../services/salesService');

const salesModel = require('../../../models/salesModel');

const middlewares = require('../../../services/middlewareValidate');

describe('testing productValidate', () => {
   describe('no sucess insert case', () => {
     const resultErrorValidate = {
       error: {
         message: '"productId" is required'
       },
       status: 400,
     };

     const resultError2 = {
       error: {
         message: 'Product not found',
       },
       status: 404,
     };
     const product = [{
       productId: 9999,
       quantity: 1
     }];

     before(() => {
       sinon.stub(middlewares, 'validateSales').resolves(resultErrorValidate);
       sinon.stub(middlewares, 'productValidate').resolves(resultError2);
     });

     after(() => {
       middlewares.validateSales.restore();
       middlewares.productValidate.restore();
     });
     it('return error', async () => {
       const result = await salesService.insertSalesService(product);
       expect(result).to.have.property('error');
     });
   });
});

describe('testing getSalesService', () => {
  const product = [{
    date: '2022-07-06T19:16:31.000Z',
    id: 1,
    productId: 2,
    quantity: 7,
    saleId: 1
  }];

  before(() => {

    sinon.stub(salesModel, 'getSalesModel').resolves(product);
  });

  after(() => {
    salesModel.getSalesModel.restore();
  });
  
  it('return a array', async () => {
    const response = await salesService.getSalesService();
    expect(response.length > 0).to.be.equal(true);
  });
});

describe('testing getSaleIdService', () => {
  const product = [{
    date: '2022-07-06T19:16:31.000Z',
    id: 1,
    productId: 2,
    quantity: 7,
    saleId: 1
  }];

  const ID = 1;
  before(() => {

    sinon.stub(salesModel, 'getSaleIdModel').resolves(product);
  });

  after(() => {
    salesModel.getSaleIdModel.restore();
  });

  it('return a array', async () => {
    const response = await salesService.getSaleIdService(ID);
    expect(response.length > 0).to.be.equal(true);
  });
});