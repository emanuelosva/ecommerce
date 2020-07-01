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

// Get product query simulation
const getStub = sinon.stub()
  .resolves(productsMock[0])

// Create item simulation
const createStub = sinon.stub()
  .resolves('6bedb1267d1ca7f3053e2875');

// Update item simulation
const updateStub = sinon.stub()
  .resolves('6bedb1267d1ca7f3053e2875');

// Update item simulation
const deleteStub = sinon.stub()
  .resolves('6bedb1267d1ca7f3053e2875');

class MongoLibMock {
  constructor() { }

  getAll(collection, query) {
    return getAllStub(collection, query);
  }

  get(collection, id) {
    return getStub(collection, id);
  }

  create(collection, data) {
    return createStub(collection, data);
  }

  update(collection, id, data) {
    return updateStub(collection, id, data);
  }

  delete(collection, id) {
    return deleteStub(collection, id);
  }
}

module.exports = {
  getAllStub,
  getStub,
  createStub,
  updateStub,
  deleteStub,
  MongoLibMock
};
