// Parse dynamics to gain value
module.exports = function (dynamics) {
  var nodeUnit = this.volume / 7;
  var range = ['pp', 'p', 'mp', 'm', 'mf', 'f', 'ff'];
  dynamics = dynamics.toLowerCase();
  var gain = (range.indexOf(dynamics) + 1) * nodeUnit;
  return gain;
};
