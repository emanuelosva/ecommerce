const assert = require('assert');
const proxyquire = require('proxyquire');
const { describe } = require('mocha');

const {
  getAllStub,
  getStub,
  createStub,
  updateStub,
  deleteStub,
  MongoLibMock
} = require('../utils/mocks/mongoLib');

const {
  productsMock,
  filterProductMock
} = require('../utils/mocks/products');


// **Services Tests**
describe('services - products', () => {
  const ProductServices = proxyquire('../services/products', {
    '../lib/mongo': MongoLibMock
  });

  const productServices = new ProductServices();

  //
  describe('when getProducts method is called', async () => {
    it('should call the getAll MogoLib method', async () => {
      await productServices.getProducts({});
      assert.strictEqual(getAllStub.called, true);
    });

    it('should return an Array of products', async () => {
      const result = await productServices.getProducts({});
      const expected = productsMock;
      assert.deepEqual(result, expected)
    })
  });

  describe('when getProducts method is called with tags', async () => {
    it('should call the getAll MongoLib method with tag args', async () => {
      const result = await productServices.getProducts({ tags: ['expensive'] });
      const tagQuery = { tags: { $in: ['expensive'] } };
      assert.strictEqual(getAllStub.calledWith('products', tagQuery), true);
    });

    it('should return an Array with products filtered by the tag', async () => {
      const result = await productServices.getProducts({ tags: ['expensive'] });
      const expected = filterProductMock('expensive');
      assert.deepEqual(result, expected);
    });
  });

  describe('when getProduct method is called', async () => {
    it('should call get MongoLib method', async () => {
      await productServices.getProduct({});
      assert.strictEqual(getStub.called, true)
    });

    it('should return only one product', async () => {
      const result = await productServices.getProduct({});
      const expected = productsMock[0];
      assert.strictEqual(result, expected);
    });
  });

  describe('when createProduct method is called', async () => {
    it('should call create MongoLib method', async () => {
      await productServices.createProduct({});
      assert.strictEqual(createStub.called, true)
    });

    it('should return a new product id', async () => {
      const result = await productServices.createProduct({});
      const expected = '6bedb1267d1ca7f3053e2875';
      assert.strictEqual(result, expected);
    });
  });

  describe('when updateProduct method is called', async () => {
    it('should call update MongoLib method', async () => {
      await productServices.updateProduct({});
      assert.strictEqual(updateStub.called, true)
    });

    it('should return a updated product id', async () => {
      const result = await productServices.updateProduct({});
      const expected = '6bedb1267d1ca7f3053e2875';
      assert.strictEqual(result, expected);
    });
  });

  describe('when deleteProduct method is called', async () => {
    it('should call delete MongoLib method', async () => {
      await productServices.deleteProduct({});
      assert.strictEqual(deleteStub.called, true)
    });

    it('should return a deleted product id', async () => {
      const result = await productServices.deleteProduct({});
      const expected = '6bedb1267d1ca7f3053e2875';
      assert.strictEqual(result, expected);
    });
  });

})