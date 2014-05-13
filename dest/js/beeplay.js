var beeplay = function (option) {
  'use strict';

  function beeplay(option) {
    option = (typeof option === 'object') ? option : {};
    this.bpm = option.bpm || 120;
    this.sampleRate = option.sampleRate || 44100;
    this.time = 0;

    try {
      // Fix up for prefixing
      var AudioContext = window.AudioContext || window.webkitAudioContext;
      this.context = window.__audioContext__ || new AudioContext();
      this.context.sampleRate = this.sampleRate;
      window.__audioContext__ = this.context;
    } catch(e) {
      console.error(e.message);
    }

    return this;
  }

  beeplay.prototype.isArray = function (vArg) {
    if(!Array.isArray) {
      return Object.prototype.toString.call(vArg) === '[object Array]';
    }
    return Array.isArray(vArg);
  };

  beeplay.prototype.nn = function (nn) {
    var keys = ['c', 'c#', 'd', 'd#', 'e',
      'f', 'f#', 'g', 'g#', 'a', 'a#', 'b'];
    var index = (nn.indexOf('#') !== -1) ? 2 : 1;
    var note = nn.substring(0, index).toLowerCase();
    var number = Number(nn.substring(index)) + 1;
    return keys.indexOf(note) + 12 * number;
  };

  beeplay.prototype.pn = function (note) {
    if (note === null) { return -1; }
    var nn = this.nn(note);
    var freq = this.sampleRate / 100;
    var diff = nn - 69;
    var i = Math.abs(diff);
    if (nn === 69) {
      return freq;
    } else if (diff > 0) {
      while(i--) freq = freq * Math.pow(2, 1 / 12);
    } else {
      while(i--) freq = freq / Math.pow(2, 1 / 12);
    }
    return freq;
  };

  beeplay.prototype.noteOn = function (notes, length) {
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

  beeplay.prototype.play = function (notes, length) {
    notes = this.isArray(notes) ? notes : [notes];
    this.noteOn(notes, length);
    return this;
  };

  return new beeplay(option);
};
