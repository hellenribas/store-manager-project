const {
  expect
} = require('chai');

const sinon = require('sinon');

const salesService = require('../../../services/salesService');

const productModel = require('../../../models/productsModel');

const salesModel = require('../../../models/salesModel');

const middlewares = require('../../../services/middlewareValidate');

// describe('testing validateSales', () => {
//   const notProduct = [{
//     "quantity": 1
//   }];
//   const notQuantity = [{
//     "productId": 1,
//   }, ];
//   const quantityLength = [{
//     "productId": 1,
//     "quantity": 0
//   }, ];
//   const sucess = [{
//     "productId": 1,
//     "quantity": 10
//   }, ];

//   it('quantity not exist return status 400 and message error', async () => {
//     const response = await salesService.validateSales(notProduct);
//     expect(response.error.message).to.be.equal('"productId" is required');
//     expect(response.status).to.be.equal(400);
//   });
//   it('productId not exist return status 400 and message error', async () => {
//     const response = await salesService.validateSales(notQuantity);
//     expect(response.error.message).to.be.equal('"quantity" is required');
//     expect(response.status).to.be.equal(400);
//   });
//   it('quantity.length invalid return status 422 and message error', async () => {
//     const response = await salesService.validateSales(quantityLength);
//     expect(response.error.message).to.be.equal('"quantity" must be greater than or equal to 1');
//     expect(response.status).to.be.equal(422);
//   });
//   it('success validate case', async () => {
//     const response = await salesService.validateSales(sucess);
//     expect(response.length).to.be.equal(0);
//   });
// });

// describe('testing productValidate', () => {
//   const returnProduct = [{
//       id: 1,
//       name: 'Produto 1'
//     },
//     {
//       id: 2,
//       name: 'Produto 2'
//     },
//   ];

//   const products = [{
//       "productId": 1,
//       "quantity": 1
//     },
//     {
//       "productId": 2,
//       "quantity": 5
//     }
//   ]

//   const notProducts = [{
//       "productId": 1000,
//       "quantity": 1
//     },
//     {
//       "productId": 2,
//       "quantity": 5
//     }
//   ]
//   before(() => {

//     sinon.stub(productModel, 'getProductsAllModel').resolves(returnProduct);
//   });

//   after(() => {
//     productModel.getProductsAllModel.restore();
//   });

//   it('return a array', async () => {
//     const response = await salesService.productValidate(products);
//     expect(response.length).to.be.equal(0);
//   });
//   it('return a status and error message', async () => {
//     const response = await salesService.productValidate(notProducts);
//     expect(response.error.message).to.be.equal('Product not found');
//   });
//   it('return a status and error message', async () => {
//     const response = await salesService.productValidate(notProducts);
//     expect(response.status).to.be.equal(404);
//   });
// });

describe('testing productValidate', () => {
  describe('sucess insert case', () => {
    const resultArray = [];
    const returnId = {
      id: 1,
    };
    const product = [{
      productId: 1,
      quantity: 1
    }];
    
    const salesId = {
      saleId: 1,
    };

    const productAll = [{
        "id": 1,
        "name": "Produto 1",
      }
    ]

    before(() => {

      sinon.stub(middlewares, 'productValidate').resolves(resultArray);
      sinon.stub(middlewares, 'validateSales').resolves(resultArray);
      sinon.stub(salesModel, 'insertSalesModel').resolves(returnId);
      sinon.stub(salesModel, 'salesDate').resolves(salesId);
      sinon.stub(productModel, 'getProductsAllModel').resolves(productAll);
    });

    after(() => {
      middlewares.productValidate.restore();
      middlewares.validateSales.restore();
      salesModel.insertSalesModel.restore();
      salesModel.salesDate.restore();
      productModel.getProductsAllModel.restore();
    });
    it('return a object', async () => {
      const result = await salesService.insertSalesService(product);
      expect(result).to.be.an('object');
    });
    it('return a object with property id', async () => {
      const result = await salesService.insertSalesService(product);
      expect(result).to.have.property('id');
    });
  });
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