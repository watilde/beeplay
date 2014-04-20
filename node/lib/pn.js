// Parse notes
module.exports = function (notes) {
  var _ = require('underscore');
  var nn = require('./nn');
  var melody = _.reduce(notes, function (memo, x) {
    var len = Math.round(x.length * 64);
    x.number = nn(x.number);
    x.number = null ? 0 : Math.pow(2, x.number / 12);
    while (--len) { memo.push(x.number); }
    return memo;
  }, []);
  return melody;
};
