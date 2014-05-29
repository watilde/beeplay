window.beeplay = function (option) {
  'use strict';

  var beeplay               = require('./modules/main');
  beeplay.prototype.isArray = require('./modules/isArray');
  beeplay.prototype.nn      = require('./modules/nn');
  beeplay.prototype.pn      = require('./modules/pn');
  beeplay.prototype.noteOn  = require('./modules/noteOn');
  beeplay.prototype.play    = require('./modules/play');

  return new beeplay(option);
};
