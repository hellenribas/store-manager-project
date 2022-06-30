const {
  expect
} = require('chai');

const sinon = require('sinon');

const productsService = require('../../../services/productsService');
const productsController = require('../../../controllers/productsController');

describe("testing the functions of getting products in controller' file", () => {
  describe('success case', () => {
    const res = {};
    const req = {};
  
        const products = [{
            id: 1,
            name: 'Martelo de Thor'
          },
          {
            id: 2,
            name: 'Traje de encolhimento'
          },
        ];

    before(() => {
      res.status = sinon.stub().returns(res);
      res.send = sinon.stub().returns(products);

      sinon.stub(productsService, 'getProductsAllService').resolves(res)
    });

    after(() => {
      productsService.getProductsAllService.restore();
    });

    it('return status 200', async () => {
      await productsController.getProductsAllController(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });
})