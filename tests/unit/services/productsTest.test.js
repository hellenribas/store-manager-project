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

    it('return length', async () => {
      const response = await productsService.getProductsAllService();
      expect(response.length > 0).to.be.equal(true);
    });

  });
  describe('not sucess getAllServices', () => {
    before(() => {
      let notProduct = [];

      sinon.stub(productsModel, 'getProductsAllModel').resolves(notProduct);
    });

    after(() => {
      productsModel.getProductsAllModel.restore();
    });

    it('return array.length equal 0', async () => {
      const response = await productsService.getProductsAllService();
      expect(response.length === 0).to.be.equal(true);
    });
  })
});

describe("testing product by id in database", () => {
  describe('success case products', () => {

    before(() => {
      const product = [{
        id: 1,
        name: 'Martelo de Thor',
      }, ];

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

describe("testing validate", () => {
  describe('success case create product', () => {

    const result = {
      id: 1,
      name: 'Martelo do Thor',
    };

    const notName = {
      id: 1,
      name: '',
    };

    const invalidName = {
      id: 1,
      name: 'pro',
    }

    before(() => {

      sinon.stub(productsModel, 'createProductModel').resolves(result);
    });

    after(() => {
      productsModel.createProductModel.restore();
    });

    it('return a object', async () => {
      const response = await productsService.createProductService(result);

      expect(response).to.be.an('object');
    });

    it('return a property id', async () => {
      const response = await productsService.createProductService(result);

      expect(response).to.have.a.property('id');
    });

    it('Not return a property name', async () => {
      const response = await productsService.createProductService(notName);

      expect(response.status).to.be.equal(400);
    });

    it('Not return a property name', async () => {
      const response = await productsService.createProductService(invalidName);

      expect(response.status).to.be.equal(422);
    });

  });
});
