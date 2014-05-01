var beeplay = function (option) {
  'use strict';

  var Klass = function (option) {
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
  };

  Klass.prototype.isArray = function (vArg) {
    if(!Array.isArray) {
      return Object.prototype.toString.call(vArg) === '[object Array]';
    }
    return Array.isArray(vArg);
  };

  Klass.prototype.nn = function (nn) {
    var keys = ['c', 'c#', 'd', 'd#', 'e',
      'f', 'f#', 'g', 'g#', 'a', 'a#', 'b'];
    var note, number;
    if(nn.indexOf('#') !== -1) {
      note = nn.substring(0, 2).toLowerCase();
      number = Number(nn.substring(2)) + 1;
    } else {
      note = nn.substring(0, 1).toLowerCase();
      number = Number(nn.substring(1)) + 1;
    }
    return keys.indexOf(note) + 12 * number;
  };

  Klass.prototype.pn = function (note) {
    if (note === null) { return -1; }
    var nn = this.nn(note);
    var freq = 440;
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

  Klass.prototype.play = function (notes, length) {
    var context = this.context;
    var sampleRate = this.sampleRate;
    var bpm = this.bpm;
    var that = this;
    notes = this.isArray(notes) ? notes : [notes];
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

      setTimeout(function () {
        src.noteOn(0);
      }, that.time);
    });
    this.time += 60 / bpm * length * 1000;

    return this;
  };

  return new Klass(option);
};
