const {
  expect
} = require('chai');

const sinon = require('sinon');

const salesService = require('../../../services/salesService');

// const productModel = require('../../../models/productsModel');

const salesModel = require('../../../models/salesModel');

const middlewares = require('../../../services/middlewareValidate');

describe('testing productValidate', () => {
  // describe('sucess insert case', () => {
  //   const resultArray = [];
  //   const returnId = {
  //     id: 1,
  //   };
  //   const product = [{
  //     productId: 1,
  //     quantity: 1
  //   }];
    
  //   const salesId = {
  //     saleId: 1,
  //   };

  //   const productAll = [{
  //       "id": 1,
  //       "name": "Produto 1",
  //     }
  //   ]

  //   before(() => {
  //     sinon.stub(middlewares, 'productValidate').resolves(resultArray);
  //     sinon.stub(middlewares, 'validateSales').resolves(resultArray);
  //     sinon.stub(salesModel, 'insertSalesModel').resolves(returnId);
  //     sinon.stub(salesModel, 'salesDate').resolves(salesId);
  //     sinon.stub(productModel, 'getProductsAllModel').resolves(productAll);
  //   });

  //   after(() => {
  //     sinon.restore();
  //   });
  
  //   it('return a object', async () => {
  //     const result = await salesService.insertSalesService(product);
  //     expect(result).to.be.an('object');
  //   });
  //   it('return a object with property id', async () => {
  //     const result = await salesService.insertSalesService(product);
  //     expect(result).to.have.property('id');
  //   });
  // });
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