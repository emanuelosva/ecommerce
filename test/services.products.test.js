const assert = require('assert');
const proxyquire = require('proxyquire');
const { describe } = require('mocha');

const {
  createStub,
  getAllStub,
  MongoLibMock
} = require('../src/utils/mocks/mongoLib');

const {
  productsMock,
  filterProductMock
} = require('../src/utils/mocks/products');


// **Services Tests**
describe('services - products', () => {
  const ProductServices = proxyquire('../src/services/products', {
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
})