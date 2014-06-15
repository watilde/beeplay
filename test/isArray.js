'use strict';
var assert = require('power-assert');
var isArray = require('../src/modules/isArray');

describe('isArray', function() {
  it('Array is array', function() {
    assert.ok(isArray([]));
  });

  it('Object is not array', function() {
    assert.ok(!isArray({}));
  });

  it('Number is not array', function() {
    assert.ok(!isArray(-1));
    assert.ok(!isArray(0));
    assert.ok(!isArray(1));
  });

  it('String is not array', function() {
    assert.ok(!isArray(''));
    assert.ok(!isArray('foo'));
    assert.ok(!isArray('[]'));
  });

  it('Boolean is not array', function() {
    assert.ok(!isArray(true));
    assert.ok(!isArray(false));
  });

  it('Null is not array', function() {
    assert.ok(!isArray(null));
  });
});
