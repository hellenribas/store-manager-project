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
  describe('no sucess case get products', () => {
    const res = {};
    const req = {};

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      sinon.stub(productsService, 'getProductsAllService').resolves(undefined)
    });

    after(() => {
      productsService.getProductsAllService.restore();
    });

    it('return error', async () => {
      await productsController.getProductsAllController(req, res);
      expect(res.status.calledWith(402)).to.be.equal(true);
    });
  })
})

describe("testing the functions of getting products with id", () => {
  describe('success case', () => {
    const res = {};
    const req = {};
    const ID = 1;

    const products = [{
      id: 1,
      name: 'Martelo de Thor'
    }];

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(products);
      req.params = sinon.stub().returns(ID);

      sinon.stub(productsService, 'getProductIdService').resolves(products);
    });

    after(() => {
      productsService.getProductIdService.restore();
    });

    it('return status 200', async () => {
      await productsController.getProductIdController(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });
  describe('no sucess case get product id', () => {
    const res = {};
    const req = {};
    const id = 999;
    before(() => {
      req.params = sinon.stub().returns({
        id
      });
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      sinon.stub(productsService, 'getProductIdService').resolves([])
    });

    after(() => {
      productsService.getProductIdService.restore();
    });

    it('return error', async () => {
      await productsController.getProductIdController(req, res);
      expect(res.status.calledWith(404)).to.be.equal(true);
    });
  })
})

describe('testing insert product', () => {
  const res = {};
  const req = {};
  const ID = 1;
  const result = {
    id: 4,
    name: 'ProdutoNovo'
  };
  const product = {
    name: 'Produto1'
  };
  describe('success case insert product', () => {
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(product);
      req.params = sinon.stub().returns(ID);

      sinon.stub(productsService, 'createProductService').resolves(result);
    });

    after(() => {
      productsService.createProductService.restore();
    });

    it('return status 201', async () => {
      await productsController.createProduct(req, res);
      expect(res.status.calledWith(201)).to.be.equal(true);
    })
  });

  describe('no sucess insert product', () => {
    const result = {
      error: {
        message: '"name" is required',
      },
      status: 400,
    }
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      req.body = sinon.stub().returns(ID);

      sinon.stub(productsService, 'createProductService').resolves(result);
    });

    after(() => {
      productsService.createProductService.restore();
    });

    it('return status 400', async () => {
      await productsController.createProduct(req, res);
      expect(res.status.calledWith(400)).to.be.equal(true);
    })
  })
});

describe('testing update product', () => {
  const result = {
    "id": 1,
    "name": "Produto 1"
  }
  const res = {};
  const req = {};
  const ID = 1;
  describe('sucess update case', () => {
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      req.params = sinon.stub().returns(ID);

      sinon.stub(productsService, 'updateService').resolves(result);
    });

    after(() => {
      productsService.updateService.restore();
    });

    it('return a object', async () => {
      const result = await productsController.updateController(req, res);
      expect(result).to.be.an('object');
    });
  });
  describe('no sucess case', () => {
    const error = {
      error: {
        message: '"name" is required'
      },
      status: 400
    }
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      req.params = sinon.stub().returns(ID);
      sinon.stub(productsService, 'updateService').resolves(error);
    });

    after(() => {
      productsService.updateService.restore();
    });

    it('return error status', async () => {
      await productsController.updateController(req, res);
      expect(res.status.calledWith(400)).to.be.equal(true);
    });
  });
  describe('product is not found', () => {
    const notFound = [];
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      req.params = sinon.stub().returns(ID);
      sinon.stub(productsService, 'updateService').resolves(notFound);
    });

    after(() => {
      productsService.updateService.restore();
    });
  
    it('return status 404', async () => {
      await productsController.updateController(req, res);
      expect(res.status.calledWith(404)).to.be.equal(true);
    });
  });
});

describe('testing delete product', () => {
  const result = [{ insertId: 1 }];
    const res = {};
    const req = {};
    const ID = 1;
  describe('success delete case', () => {
    
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      req.params = sinon.stub().returns(ID);

      sinon.stub(productsService, 'deleteService').resolves(result);
    });

    after(() => {
      productsService.deleteService.restore();
    });
    it('return status 204', async () => {
      await productsController.deleteController(req, res);
      expect(res.status.calledWith(204)).to.be.equal(true);
    });
  });
    describe('product is not found', () => {
      const notFound = [];
      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        req.params = sinon.stub().returns(ID);
        sinon.stub(productsService, 'deleteService').resolves(notFound);
      });

      after(() => {
        productsService.deleteService.restore();
      });

      it('return status 404', async () => {
        await productsController.deleteController(req, res);
        expect(res.status.calledWith(404)).to.be.equal(true);
      });
    });
})
