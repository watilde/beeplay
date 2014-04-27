var beePlay = function (option) {
  'use strict';

  var beePlay = function (option) {
    option = (typeof option === 'object') ? option : {};
    this.bpm = option.bpm || 120;
    this.sampleRate = option.sampleRate || 44100; // 44.1 kHz

    try {
      // Fix up for prefixing
      var AudioContext = window.AudioContext || window.webkitAudioContext;
      this.context = new AudioContext();
    } catch(e) {
      alert('Web Audio API is not supported in this browser');
    }

    return this;
  };


  // Parse note number
  beePlay.prototype.pn = function (note, length) {
    var len = Math.round(length * 64);
    var memo = [];
    var number = this.nn(note);
    var number = null ? 0 : Math.pow(2, number / 12);
    while (--len) { memo.push(number); }
    return memo;
  };

  // Get note number
  beePlay.prototype.nn = function (nn) {
    var keys = ['c', 'c#', 'd', 'd#', 'e',
      'f', 'f#', 'g', 'g#', 'a', 'a#', 'b'];
    var note = nn.substring(0, 1).toLowerCase();
    var number = Number(nn.substring(1)) + 1;
    return keys.indexOf(note) + 12 * number;
  };

  beePlay.prototype.sin = function (x, t) {
    var y = Math.PI * x * t;
    return Math.sin(y);
  };

  // @TODO Fixes make sin wave from note & length
  beePlay.prototype.play = function (note, length) {
    var sampleRate = this.sampleRate;
    var context = this.context;
    context.sampleRate = sampleRate;

    var buf = context.createBuffer(1, sampleRate, sampleRate);
    var data = buf.getChannelData(0);
    for (var i = 0; i < data.length; i++) {
      if ((i % 100) < 50) {
        data[i] = 0.1;
      } else {
        data[i] = -0.1;
      }
    }

    var src = context.createBufferSource();
    src.buffer = buf;
    src.connect(context.destination);

    src.noteOn(0);

    return this;
  };

  return new beePlay(option);
};