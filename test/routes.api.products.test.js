const { describe } = require('mocha');
const assert = require('assert');
const proxyquire = require('proxyquire');
const testServer = require('../utils/testServer');

const {
  productsMock,
  ProductServiceMock,
  filterProductMock
} = require('../utils/mocks/products');


// **EndPoint Tests**
describe('routes - api - products', () => {
  // Products api router
  const route = proxyquire('../api/routes/products', {
    '../../services/products': ProductServiceMock
  });
  const request = testServer(route);

  // GET validations
  describe('GET /products', () => {
    it('should response with status 200', (done) => {
      request.get('/api/products').expect(200, done);
    });

    it('should respond with Content-Type json', (done) => {
      request.get('/api/products').expect('Content-type', /json/, done);
    });

    it('should response with no error', (done) => {
      request.get('/api/products').end((err, res) => {
        assert.strictEqual(err, null);
        done();
      })
    });

    it('should responde with the lsit of products', (done) => {
      request.get('/api/products').end((err, res) => {
        assert.deepEqual(res.body, {
          data: productsMock,
          message: 'Products List'
        });
        done();
      })
    });

  });

  describe('GET /products/productID', () => {
    it('should response with status 200', (done) => {
      request.get('/api/products/5efa47bc4329a3342cf1500e')
        .expect(200, done);
    });

    it('should respond with Content-Type json', (done) => {
      request.get('/api/products/5efa47bc4329a3342cf1500e')
        .expect('Content-type', /json/, done);
    });

    it('should response with no error', (done) => {
      request.get('/api/products/5efa47bc4329a3342cf1500e')
        .end((err, res) => {
          assert.strictEqual(err, null);
          done();
        })
    });

    it('should response with only one product', (done) => {
      request.get('/api/products/5efa47bc4329a3342cf1500e')
        .end((err, res) => {
          assert.deepEqual(res.body, {
            data: productsMock[0],
            message: 'Products retrieve'
          })
          done();
        })
    })
  });

  describe('POST /products', () => {
    it('should response with status 201', (done) => {
      request.post('/api/products').expect(201, done)
    });

    it('should response with Content-Type json', (done) => {
      request.post('/api/products').expect('Content-type', /json/, done)
    });

    it('should response with no error', (done) => {
      request.post('/api/products').end((err, res) => {
        assert.strictEqual(err, null);
        done();
      })
    });

    it('should response with productId', (done) => {
      request.post('/api/products').end((err, res) => {
        assert.deepEqual(res.body, {
          data: '6bedb1267d1ca7f3053e2875',
          message: "Product created"
        })
        done();
      })
    });

  });

});
