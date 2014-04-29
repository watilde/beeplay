var beeplay = function (option) {
  'use strict';

  var beeplay = function (option) {
    option = (typeof option === 'object') ? option : {};
    this.bpm = option.bpm || 120;
    this.sampleRate = option.sampleRate || 44100;
    this.time = 0;

    try {
      // Fix up for prefixing
      var AudioContext = window.AudioContext || window.webkitAudioContext;
      this.context = new AudioContext();
    } catch(e) {
      alert('Web Audio API is not supported in this browser');
    }

    return this;
  };

  beeplay.prototype.nn = function (nn) {
      var keys = ['c', 'c#', 'd', 'd#', 'e',
        'f', 'f#', 'g', 'g#', 'a', 'a#', 'b'];
      var note = nn.substring(0, 1).toLowerCase();
      var number = Number(nn.substring(1)) + 1;
      return keys.indexOf(note) + 12 * number;
  };

  beeplay.prototype.pn = function (note) {
    var nn = this.nn(note);
    return (nn - 43) * 15;
  };

  beeplay.prototype.play = function (note, length) {
    var sampleRate = this.sampleRate;
    var context = this.context;
    var bpm = this.bpm;
    context.sampleRate = sampleRate;

    var buf = context.createBuffer(1, sampleRate, sampleRate);
    var data = buf.getChannelData(0);
    var nn = this.pn(note);
    for(var i=0; i < 60 / bpm * length * sampleRate; i++) {
      data[i]=Math.sin( (2 * Math.PI) * nn * (i / sampleRate) );
    }

    var src = context.createBufferSource();
    src.buffer = buf;
    src.connect(context.destination);

    setTimeout(function () {
      src.noteOn(0);
    }, this.time);
    this.time += 60 / bpm * length * 1000;

    return this;
  };

  return new beeplay(option);
};