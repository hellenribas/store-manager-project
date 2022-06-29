const {
  expect
} = require('chai');
const connection = require('../../../helpers/connection');

const sinon = require('sinon');

const {
  getProductsAllModel
} = require('../../../models/productsModel');

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
    const response = await getProductsAllModel();

    expect(response).to.be.a('object')
  });
  
  it('my object has name and id property', async () => {
    const response = await getProductsAllModel();

    expect(response).to.have.a.property('name');
    expect(response).to.have.a.property('id');
  });
  
  })
  describe('case of no success', () => {

  })
})