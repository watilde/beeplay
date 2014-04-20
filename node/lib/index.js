module.exports = function (notes, option) {
  var def = {bpm: 120};
  var opt = option || def;

  var baudio = require('baudio');
  var bps = (opt.bpm || def.bpm) / 60;

  var pn = require('./pn');
  var melody = pn(notes);

  var b = baudio(opt, function (t) {
    var i = Math.floor(t * bps * 64) % melody.length;
    var m = melody[i];
    return  sin(m * 15.85);

    function sin (x) {
      var y = Math.PI * x * t;
      return Math.sin(y);
    }
  });
  b.play();
};
