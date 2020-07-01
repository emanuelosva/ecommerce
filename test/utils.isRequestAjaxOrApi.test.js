const assert = require('assert');
const isRequestAjaxOrApi = require('../utils/isRequestAjaxOrApi');
const { describe } = require('mocha');

// **Utils isRequestAjaxOrApi test**
describe('utils - isRequestAjaxOrApi', () => {
  describe('when req accepts html and is not XMLHttpRequest', () => {
    it('should return false', () => {
      const req = {
        accepts: () => true,
        xhr: false,
      };

      const result = isRequestAjaxOrApi(req);
      const expected = false;
      assert.strictEqual(result, expected);
    });
  });

  describe('when req does not accepts html and is not XMLHttpRequest', () => {
    it('should return true', () => {
      const req = {
        accepts: () => false,
        xhr: false,
      };

      const result = isRequestAjaxOrApi(req);
      const expected = true;
      assert.strictEqual(result, expected);
    });
  });

  describe('when req does not accept html and is XMLHttpRequest', () => {
    it('should return true', () => {
      const req = {
        accepts: () => false,
        xhr: true,
      };

      const result = isRequestAjaxOrApi(req);
      const expected = true;
      assert.strictEqual(result, expected);
    });
  });

  describe('when req accepts html and is an XMLHttpRequest', () => {
    it('should return true', () => {
      const req = {
        accepts: () => true,
        xhr: true,
      };

      const result = isRequestAjaxOrApi(req);
      const expected = true;
      assert.strictEqual(result, expected);
    });
  });

});
