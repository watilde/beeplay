// Get Note Number.
module.exports = function (nn) {
  var keys = ['c', 'c#', 'd', 'd#', 'e',
      'f', 'f#', 'g', 'g#', 'a', 'a#', 'b'];
  var note = nn.substring(0, 1).toLowerCase();
  var number = Number(nn.substring(1)) + 1;
  return keys.indexOf(note) + 12 * number;
};
