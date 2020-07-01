const { productsMock, filterProductMock } = require('./products')
const sinon = require('sinon');


// Find all simulation
const getAllStub = sinon.stub();
getAllStub
  .withArgs('products')
  .resolves(productsMock);

// Filter products by query simulation 
const tagQuery = { tags: { $in: ["expensive"] } };
getAllStub
  .withArgs('products', tagQuery)
  .resolves(filterProductMock('expensive'));

// Create item simulation
const createStub = sinon.stub()
  .resolves('6bedb1267d1ca7f3053e2875');


class MongoLibMock {
  constructor() { }

  getAll(collection, query) {
    return getAllStub(collection, query);
  }

  create(collection, data) {
    return createStub(collection, data);
  }
}

module.exports = {
  getAllStub,
  createStub,
  MongoLibMock
};
