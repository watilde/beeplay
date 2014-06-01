module.exports = function (notes, length) {
  notes = this.isArray(notes) ? notes : [notes];
  this.start(notes, length);
  return this;
};
