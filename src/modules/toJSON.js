module.exports = function () {
  var song = {
    key: this.key,
    bpm: this.bpm,
    frequency: this.frequency,
    time: this.time,
    notes: JSON.stringify(this.stack)
  };

  return JSON.stringify(song);
};
