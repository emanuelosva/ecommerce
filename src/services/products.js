const productsMocks = require('../api/utils/mocks/products');

class ProductServices {
  constructor() { };

  async getProducts({ tag }) {
    return Promise.resolve(productsMocks);
  };

  async getProduct({ productId }) {
    return Promise.resolve(productsMocks[0]);
  };

  async createProduct({ product }) {
    return Promise.resolve(productsMocks[0]);
  };

  async updateProduct({ productId, product }) {
    return Promise.resolve(productsMocks[0]);
  };

  async deleteProduct({ productId }) {
    return Promise.resolve(productsMocks[0]);
  };

};

module.exports = ProductServices;
