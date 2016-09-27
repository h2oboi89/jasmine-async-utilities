[![npm](https://img.shields.io/npm/v/npm.svg?maxAge=2592000)](https://www.npmjs.com/package/jasmine-async-utilities)

# [jasmine-async-utilities](https://github.com/h2oboi89/jasmine-async-utilities)

## Usage

```js
describe('test suite', () => {
  const utilities = require('jasmine-async-utilities');
  const asyncTest = utilities.asyncTest;
  const shouldResolve = utilities.shouldResolve;
  const shouldReject = utilities.shouldReject;
```

[`shouldResolve`](https://h2oboi89.github.io/jasmine-async-utilities/global.html#shouldResolve) is used for tests where the code under test should resolve, with or without a value.
[`asyncTest`](https://h2oboi89.github.io/jasmine-async-utilities/global.html#asyncTest) will automatically call [`jasmine.fail`](http://jasmine.github.io/2.3/introduction.html#section-Manually_failing_a_spec_with_<code>fail</code>) with any unexpected rejection.

```js
  it('resolve test', asyncTest(() => {
    return shouldResolve(() => return Promise.resolve(3.14), 3.14);
  }));
```

[`shouldReject`](https://h2oboi89.github.io/jasmine-async-utilities/global.html#shouldReject) is used for tests where the code under test should reject, with or without a value.
[`shouldReject`](https://h2oboi89.github.io/jasmine-async-utilities/global.html#shouldReject) will automatically call [`jasmine.fail`](http://jasmine.github.io/2.3/introduction.html#section-Manually_failing_a_spec_with_<code>fail</code>) if the code under test resolves.

```js
  it('reject with string test', asyncTest(() => {
    return shouldReject(() => return Promise.reject('oh noes!'), 'oh noes!');
  }));
```

```js
  it('reject with Error test', asyncTest(() => {
    return shouldReject(() => return Promise.reject(new Error('oh noes!')), new Error('oh noes!');
  }));
});
```

See the [tests](https://github.com/h2oboi89/jasmine-async-utilities/blob/master/spec/test_spec.js) for more examples.

[Documentation](https://h2oboi89.github.io/jasmine-async-utilities/index.html)
