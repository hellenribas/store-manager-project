const {
  expect
} = require('chai');
const connection = require('../../../helpers/connection');

const sinon = require('sinon');

const productsModel = require('../../../models/productsModel');

describe('testing the functions of getting products in the database', () => {
  describe('success case', () => {

    before(async () => {
      const products = [{
        id: 1,
        name: 'exemplo de produto'
      }];
      sinon.stub(connection, 'execute').returns(products);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('return a object', async () => {
      const response = await productsModel.getProductsAllModel();

      expect(response).to.be.a('object')
    });

    it('my object has name and id property', async () => {
      const response = await productsModel.getProductsAllModel();

      expect(response).to.have.a.property('name');
      expect(response).to.have.a.property('id');
    });

  });
});

describe('testing product by id in database', () => {
  describe('success case product id', () => {
    const ID = 1;
    before(() => {
      const product = [{
        id: 1,
        name: 'exemplo de produto'
      }];

      sinon.stub(connection, 'execute').returns(product);
    });

    after(() => {
      connection.execute.restore();
    });

    it('return a object', async () => {
      const response = await productsModel.getProductsIdModel(ID);
      expect(response).to.be.a('object')
    });

    it('my object has name and id property', async () => {
      const response = await productsModel.getProductsIdModel(ID);

      expect(response).to.have.a.property('name');
      expect(response).to.have.a.property('id');
    });

  });
});

describe('testing insert product', () => {
  const NAME = { "name": 'produto 1' }
  const productId = [{ insertId: 1 }];
  before(() => {
    sinon.stub(connection, 'execute').returns(productId);
  });

  after(() => {
    connection.execute.restore();
  });
  it('return is object', async () => {
    const result = await productsModel.createProductModel(NAME);
    console.log(result);
    expect(typeof result).to.be.equal('object');
    expect(result).have.property('id');
    expect(result).have.property('name');

  })
});

