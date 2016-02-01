module.exports = function (notes, length, dynamics) {
  var context = this.context;
  var sampleRate = this.sampleRate;
  var bpm = this.bpm;
  notes.forEach(function(note) {
    var buf = context.createBuffer(1, sampleRate, sampleRate);
    var data = buf.getChannelData(0);
    var nn = this.pn(note);
    if (nn === -1) { return; }
    for(var i = 0; i < 60 / bpm * length * sampleRate; i++) {
      data[i]=Math.sin( (2 * Math.PI) * nn * (i / sampleRate) );
    }
    var gainNode = context.createGain();
    gainNode.gain.value = this.pd(dynamics);
    gainNode.connect(context.destination);

    var src = context.createBufferSource();
    src.buffer = buf;
    src.connect(gainNode);
    src.start(this.currentTime);
  }, this);
  this.currentTime += 60 / bpm * length;
  return this.time;
};
