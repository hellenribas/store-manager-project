const {
  expect
} = require('chai');
const {
  array
} = require('joi');

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

    it('Not return a property name.length', async () => {
      const response = await productsService.createProductService(invalidName);

      expect(response.status).to.be.equal(422);
    });

  });
});

describe('testing update', () => {
  describe('success case and validate update product', () => {
    const result = {
      id: 1,
      product_name: 'produto 1',
    }
    before(() => {
      sinon.stub(productsModel, 'updateModel').resolves(result);
    });

    after(() => {
      productsModel.updateModel.restore();
    });
  })

  const product = {
    "name": "produto 1",
  };

  const notName = {
    "name": "",
  };
  const ID = 1;
  const invalidName = {
    name: 'pro',
  }

  it('Not return a property name', async () => {
    const response = await productsService.updateService(ID, notName);

    expect(response.status).to.be.equal(400);
  });

  it('Not return a property name.length', async () => {
    const response = await productsService.updateService(ID, invalidName);

    expect(response.status).to.be.equal(422);
  });

  it('result is a object', async () => {
    const returnProduct = await productsService.updateService(ID, product);
    expect(typeof returnProduct).to.be.equal('object');
  });
});

describe('not result', () => {
  const ID = 999;
  const product = {
    "name": "produto 1"
  };
  before(() => {
    const productArray = undefined;

    sinon.stub(productsModel, 'updateModel').resolves(productArray);
  });

  after(() => {
    productsModel.updateModel.restore();
  });
  it('return not exist', async () => {
    const result = await productsService.updateService(ID, product);
    expect(result.length).to.be.equal(0);
  })
});

describe('testing function delete product', () => {
  const productRemoved = [{
    id: 1,
    name: 'Martelo'
  }];
  const ID = 1;
  describe('sucess case', () => {
    before(() => {

      sinon.stub(productsModel, 'deleteModel').resolves(productRemoved);
    });

    after(() => {
      productsModel.deleteModel.restore();
    });

    it('return a length greater than 0', async () => {
      const product = await productsService.deleteService(ID);
      expect(product.length > 0).to.be.equal(true)
    })
  })
})
