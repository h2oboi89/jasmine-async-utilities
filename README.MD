# [jasmine-async-utilities](https://github.com/h2oboi89/jasmine-async-utilities)

## Usage

```js
describe('test suite', () => {
  const utilities = require('jasmine-async-utilities');
  const asyncTest = utilities.asyncTest;
  const shouldResolve = utilities.shouldResolve;
  const shouldReject = utilities.shouldReject;

  it('resolve test', asyncTest(() => {
    return shouldResolve(() => return Promise.resolve(3.14), 3.14);
  }));

  it('reject test', asyncTest(() => {
    return shouldReject(() => return Promise.reject('oh noes!'), 'oh noes!');
  }));
});
```

[Documentation](https://h2oboi89.github.io/jasmine-async-utilities/index.html)
