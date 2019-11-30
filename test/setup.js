const chai = require('chai');
const po = require('../src');

chai.config.truncateThreshold = 0;

Object.assign(global, {
  assertPO: (actual, expected) => chai.assert.equal(actual && actual.toString(), expected),
  po,
});
