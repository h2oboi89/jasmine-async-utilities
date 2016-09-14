'use strict';

/**
 * Wrapper for tests that should reject.
 * @function
 * @param {function} thunk - Code to execute that should Promise.reject
 * @param {string|Error} reason - Expected value that thunk should reject with
 * @returns {Promise} Resolves after checking expectations.
 */
let shouldReject = (thunk, reason) => {
  return thunk
    .then(() => fail('should have rejected'))
    .catch((error) => expect(error).toEqual(reason));
};

/**
 * Wrapper for tests that should resolve.
 * @function
 * @param {function} thunk - Code to execute that should Promise.resolve
 * @param {object} expectedValue - Expected value that thunk should resolve with
 * @returns {Promise} Resolves after checking expectations.
 */
let shouldResolve = (thunk, expectedValue) => {
  return thunk.then((value) => expect(value).toEqual(expectedValue))
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
