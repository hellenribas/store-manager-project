const {
  expect
} = require('chai');

const sinon = require('sinon');

const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');

describe("testing the functions of getting products in services' file", () => {
  describe('success case', () => {

    before(() => {
      const products = [{
          id: 1,
          name: 'Martelo de Thor'
        },
        {
          id: 2,
          name: 'Traje de encolhimento'
        },
      ];

      sinon.stub(productsModel, 'getProductsAllModel').resolves(products);
    });

    after(() => {
      productsModel.getProductsAllModel.restore();
    });

    it('return a object', async () => {
      const response = await productsService.getProductsAllService();
      console.log(response);
      
      expect(response).to.be.an('array');
    });

    it('return a object', async () => {
      const response = await productsService.getProductsAllService();

      expect(response.length).not.to.be.equal(0);
    });

  });

  describe('no success case', () => {

    before(() => {
      sinon.stub(productsModel, 'getProductsAllModel').returns();
    });

    after(() => {
      productsModel.getProductsAllModel.restore();
    });

    it('return a object', async () => {
      const response = await productsService.getProductsAllService();

      expect(response.length).to.be.equal(0);
    });
  });
})
