'use strict';

/**
 * Wrapper for tests that should reject.
 * @function
 * @param {function} thunk - Code to execute that should Promise.reject
 * @param {string|Error|RegExp} reason - Expected value that thunk should reject with
 * @returns {Promise} Resolves after checking expectations.
 */
let shouldReject = (thunk, reason) => {
  return thunk()
    .then(() => fail('should have rejected'))
    .catch((error) => {
      if(reason instanceof RegExp) {
        expect(error.match(reason)).not.toBe(null);
      }
      else {
        if(typeof reason === 'string' && typeof error !== 'string') {
          error = error.message;
        }

        expect(error).toEqual(reason);
      }
    });
};

/**
 * Wrapper for tests that should resolve.
 * @function
 * @param {function} thunk - Code to execute that should Promise.resolve
 * @param {object} [expectedValue] - Expected value that thunk should resolve with
 * @param {function} [matcher] - Custom matcher function of the form (expected, actual) => Boolean.
 * @returns {Promise} Resolves after checking expectations.
 */
let shouldResolve = (thunk, expectedValue, matcher) => {
  return thunk()
    .then((value) => {
      if(matcher) {
        expect(matcher(expectedValue, value)).toBe(true);
      }
      else {
        expect(value).toEqual(expectedValue);
      }
    });
};

/**
 * Will automatically wrap test in a `catch` block to catch any errors
 * and call `done` afterwards.
 * Use this in place of `(done) => { <TEST> }`.
 * @function
 * @param {function} thunk - asynchronous test that returns a Promise
 * @returns {Promise} Resolves after running test
 */
let asyncTest = (thunk) => (done) => {
  return thunk()
    .catch(fail)
    .then(done);
};

module.exports = {
  asyncTest: asyncTest,
  shouldReject: shouldReject,
  shouldResolve: shouldResolve
};
