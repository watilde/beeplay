// Parse Note Number to freq
module.exports = function (note) {
  if (note === null) { return -1; }
  var nn = this.nn(note);
  var freq = this.sampleRate / 100;
  var diff = nn - 69;
  var i = Math.abs(diff);
  if (nn === 69) {
    return freq;
  } else if (diff > 0) {
    while(i--) freq = freq * Math.pow(2, 1 / 12);
  } else {
    while(i--) freq = freq / Math.pow(2, 1 / 12);
  }
  return freq;
};
