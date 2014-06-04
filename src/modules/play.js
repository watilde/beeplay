module.exports = function (notes, length) {
  notes = this.isArray(notes) ? notes : [notes];
  this.put(notes, length);
  this.start(notes, length);
  return this;
};
