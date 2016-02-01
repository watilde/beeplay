// Get Note Number
module.exports = function (nn) {
  var keys = ['c', 'c#', 'd', 'd#', 'e',
      'f', 'f#', 'g', 'g#', 'a', 'a#', 'b'];
  var index = (nn.indexOf('#') !== -1) ? 2 : 1;
  var note = nn.substring(0, index).toLowerCase();
  var number = Number(nn.substring(index)) + 1;
  return keys.indexOf(note) + 12 * number;
};
