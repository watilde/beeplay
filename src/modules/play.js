module.exports = function (notes, length) {
  notes = this.isArray(notes) ? notes : [notes];
  this.noteOn(notes, length);
  return this;
};
