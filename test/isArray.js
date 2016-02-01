'use strict'
var test = require('tap').test
var isArray = require('../lib/modules/isArray')

test('isArray', function(t) {
  t.ok(isArray([]))
  t.ok(!isArray({}))
  t.ok(!isArray(-1))
  t.ok(!isArray(0))
  t.ok(!isArray(1))
  t.ok(!isArray(''))
  t.ok(!isArray('foo'))
  t.ok(!isArray('[]'))
  t.ok(!isArray(true))
  t.ok(!isArray(false))
  t.ok(!isArray(null))
  t.end()
})
