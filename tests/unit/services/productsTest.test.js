const {
  expect
} = require('chai');

const sinon = require('sinon');

const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');

describe("testing the functions of getting products in services' file", () => {
  describe('success case products', () => {

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
      expect(response).to.be.an('array');
    });

    it('return a object', async () => {
      const response = await productsService.getProductsAllService();

      expect(response.length).not.to.be.equal(0);
    });

  });
});

describe("testing product by id in database", () => {
  describe('success case products', () => {

    before(() => {
      const product = [{
          id: 1,
          name: 'Martelo de Thor',
        },
       ];

      sinon.stub(productsModel, 'getProductsIdModel').resolves(product);
    });

    after(() => {
      productsModel.getProductsIdModel.restore();
    });

    it('return a object', async () => {
      const response = await productsService.getProductIdService(1);
      expect(response).to.be.an('object');
    });

    it('return a object', async () => {
      const response = await productsService.getProductIdService(1);

      expect(response.length).not.to.be.equal(0);
    });

  });
});