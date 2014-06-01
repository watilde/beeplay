window.beeplay = function (option) {
  'use strict';

  var beeplay               = require('./modules/main');
  beeplay.prototype.isArray = require('./modules/isArray');
  beeplay.prototype.nn      = require('./modules/nn');
  beeplay.prototype.pn      = require('./modules/pn');
  beeplay.prototype.play    = require('./modules/play');
  beeplay.prototype.start   = require('./modules/start');
  beeplay.prototype.put     = require('./modules/put');
  beeplay.prototype.json    = require('./modules/json');

  return new beeplay(option);
};
