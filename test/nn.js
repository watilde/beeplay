'use strict'
var test = require('tap').test
var nn = require('../src/modules/nn')

test('Get Note Number', function(t) {
  t.equal(nn('C4'), 60)
  t.equal(nn('C#4'), 61)
  t.end()
})
