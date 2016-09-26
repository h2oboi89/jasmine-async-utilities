'use strict';

describe('tests', () => {
  const utilities = require('../src/utilities.js');
  const asyncTest = utilities.asyncTest;
  const shouldResolve = utilities.shouldResolve;
  const shouldReject = utilities.shouldReject;

  describe('shouldResolve', () => {
    it('should pass when resolved with the specified value', asyncTest(() => {
      return shouldResolve(() => Promise.resolve(3.14), 3.14);
    }));

    it('should accept no expected value', asyncTest(() => {
      return shouldResolve(() => Promise.resolve());
    }));

    it('should accept a custom matcher function', asyncTest(() => {
      return shouldResolve(() => Promise.resolve([0, 1, 2]), 3, (expected, actual) => actual.length === expected);
    }));

    it('should fail when resolved with an unexpected value', asyncTest(() => {
      return shouldResolve(() => Promise.resolve(4), 0);
    }));
  });

  describe('shouldReject', () => {
    it('should pass when rejected with the specified string value', asyncTest(() => {
      return shouldReject(() => Promise.reject('oh noes!'), 'oh noes!');
    }));

    it('should pass when rejected with the specified Error value', asyncTest(() => {
      return shouldReject(() => Promise.reject(new Error('oh noes!')), new Error('oh noes!'));
    }));

    it('should pass when it converts error to string', () => {
      return shouldReject(() => Promise.reject(new Error('oh noes!')), 'oh noes!');
    });

    it('should pass when rejected with an error matching the RegExp', asyncTest(() => {
      let getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
      };

      return shouldReject(() => Promise.reject(`oh noes ${getRandomInt(0, 10)}`), /^oh noes \d$/);
    }));

    it('should fail when rejected with an unexpected reason', asyncTest(() => {
      return shouldReject(() => Promise.reject('foo'), 'bar');
    }));
  });
});
