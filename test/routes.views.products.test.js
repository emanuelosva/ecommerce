const { describe } = require('mocha');
const assert = require('assert');
const proxyquire = require('proxyquire');
const { ProductServiceMock } = require('../utils/mocks/products');
const testServer = require('../utils/testServer');

describe('routes - views - products', () => {
  const route = proxyquire('../routes/products', {
    '../services/products': ProductServiceMock
  });
  const request = testServer(route);

  describe('GET /products', () => {
    it('should response with status 200', (done) => {
      request.get('/products').expect(200, done);
    });

    it('should response with Content-type text/html', (done) => {
      request.get('/products').expect('Content-type', /html/, done);
    });

    it('should response with no error', (done) => {
      request.get('/products').end((err, res) => {
        assert.strictEqual(err, null);
        done();
      })
    });
  })
});
