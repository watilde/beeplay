module.exports = function (notes, length, dynamics) {
  this.stack.push({
    notes: notes,
    length: length,
    dynamics: dynamics
  });
};
