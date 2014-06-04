module.exports = function (notes, length) {
  this.stack.push({
    notes: notes,
    length: length
  });
};
