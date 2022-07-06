// const {
//   expect
// } = require('chai');

// const sinon = require('sinon');

// const validate = require('../../../services/middlewareValidate');

// const productModel = require('../../../models/productsModel');

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
//     const response = await validate.validateSales(notProduct);
//     expect(response.error.message).to.be.equal('"productId" is required');
//     expect(response.status).to.be.equal(400);
//   });
//   it('productId not exist return status 400 and message error', async () => {
//     const response = await validate.validateSales(notQuantity);
//     expect(response.error.message).to.be.equal('"quantity" is required');
//     expect(response.status).to.be.equal(400);
//   });
//   it('quantity.length invalid return status 422 and message error', async () => {
//     const response = await validate.validateSales(quantityLength);
//     expect(response.error.message).to.be.equal('"quantity" must be greater than or equal to 1');
//     expect(response.status).to.be.equal(422);
//   });
//   it('success validate case', async () => {
//     const response = await validate.validateSales(sucess);
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
//     const response = await validate.productValidate(products);
//     expect(response.length).to.be.equal(0);
//   });
//   it('return a status and error message', async () => {
//     const response = await validate.productValidate(notProducts);
//     expect(response.error.message).to.be.equal('Product not found');
//   });
//   it('return a status and error message', async () => {
//     const response = await validate.productValidate(notProducts);
//     expect(response.status).to.be.equal(404);
//   });
// });