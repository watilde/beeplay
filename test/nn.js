'use strict';
var assert = require('power-assert');
var nn = require('../src/modules/nn');

describe('Get Note Number', function() {
  it('C4 is 60', function() {
    var note = nn('C4');
    assert.equal(note, 60);
  });

  it('C#4 is 61', function() {
    var note = nn('C#4');
    assert.equal(note, 61);
  });
});
