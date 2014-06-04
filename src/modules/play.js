module.exports = function (notes, length, dynamics) {
  notes = this.isArray(notes) ? notes : [notes];
  dynamics = dynamics || 'm';
  this.put(notes, length, dynamics);
  this.start(notes, length, dynamics);
  return this;
};
