module.exports = function (notes, length) {
  var context = this.context;
  var sampleRate = this.sampleRate;
  var bpm = this.bpm;
  var that = this;
  notes.forEach(function(note) {
    var buf = context.createBuffer(1, sampleRate, sampleRate);
    var data = buf.getChannelData(0);
    var nn = that.pn(note);
    if (nn === -1) { return; }
    for(var i = 0; i < 60 / bpm * length * sampleRate; i++) {
      data[i]=Math.sin( (2 * Math.PI) * nn * (i / sampleRate) );
    }
    var src = context.createBufferSource();
    src.buffer = buf;
    src.connect(context.destination);
    src.start(that.time);
  });
  this.time += 60 / bpm * length;
  return this.time;
};
