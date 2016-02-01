(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
window.beeplay = function (option) {
  'use strict';

  var beeplay               = require('./modules/main');
  beeplay.prototype.isArray = require('./modules/isArray');
  beeplay.prototype.watch   = require('./modules/watch');
  beeplay.prototype.nn      = require('./modules/nn');
  beeplay.prototype.pd      = require('./modules/pd');
  beeplay.prototype.pn      = require('./modules/pn');
  beeplay.prototype.play    = require('./modules/play');
  beeplay.prototype.start   = require('./modules/start');
  beeplay.prototype.put     = require('./modules/put');
  beeplay.prototype.toJSON  = require('./modules/toJSON');

  return new beeplay(option);
};

},{"./modules/isArray":2,"./modules/main":3,"./modules/nn":4,"./modules/pd":5,"./modules/play":6,"./modules/pn":7,"./modules/put":8,"./modules/start":9,"./modules/toJSON":10,"./modules/watch":11}],2:[function(require,module,exports){
module.exports = function (vArg) {
  if(!Array.isArray) {
    return Object.prototype.toString.call(vArg) === '[object Array]';
  }
  return Array.isArray(vArg);
};

},{}],3:[function(require,module,exports){
// constructor
module.exports = function (option) {
  option = (typeof option === 'object') ? option : {};
  // Song object meta info {{{
  this.bpm = option.bpm || 120;
  this.sampleRate = option.sampleRate || 44100;
  this.key = option.key || 'C';
  this.time = option.time || '4/4';
  this.volume = option.volume || 1;
  // }}}

  this.stack = [];
  this.currentTime = 0;
  this.trackId = 0;
  this.track = option.track || false;
  try {
    var AudioContext = window.AudioContext ||
      window.webkitAudioContext ||
      window.mozAudioContext ||
      window.oAudioContext ||
      window.msAudioContext;
    this.context = window.__audioContext__ || new AudioContext();
    this.context.sampleRate = this.sampleRate;
    window.__audioContext__ = this.context;
  } catch(e) {
    console.error(e.message);
  }
  return this;
};

},{}],4:[function(require,module,exports){
// Get Note Number
module.exports = function (nn) {
  var keys = ['c', 'c#', 'd', 'd#', 'e',
      'f', 'f#', 'g', 'g#', 'a', 'a#', 'b'];
  var index = (nn.indexOf('#') !== -1) ? 2 : 1;
  var note = nn.substring(0, index).toLowerCase();
  var number = Number(nn.substring(index)) + 1;
  return keys.indexOf(note) + 12 * number;
};

},{}],5:[function(require,module,exports){
// Parse dynamics to gain value
module.exports = function (dynamics) {
  var nodeUnit = this.volume / 7;
  var range = ['pp', 'p', 'mp', 'm', 'mf', 'f', 'ff'];
  dynamics = dynamics.toLowerCase();
  var gain = (range.indexOf(dynamics) + 1) * nodeUnit;
  return gain;
};

},{}],6:[function(require,module,exports){
module.exports = function (notes, length, dynamics) {
  notes = this.isArray(notes) ? notes : [notes];
  dynamics = dynamics || 'm';
  this.put(notes, length, dynamics);
  this.start(notes, length, dynamics);
  this.watch();
  return this;
};

},{}],7:[function(require,module,exports){
// Parse Note Number to freq
module.exports = function (note) {
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

},{}],8:[function(require,module,exports){
module.exports = function (notes, length, dynamics) {
  this.stack.push({
    notes: notes,
    length: length,
    dynamics: dynamics
  });
};

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
module.exports = function () {
  var song = {
    key: this.key,
    bpm: this.bpm,
    frequency: this.frequency,
    time: this.time,
    notes: JSON.stringify(this.stack)
  };

  return JSON.stringify(song);
};

},{}],11:[function(require,module,exports){
module.exports = function() {
  if(this.track && typeof this.track == 'function') {
    setTimeout(function() {
      var notes = this.stack[this.trackId].notes.toString().replace(/,/g, ' ') || 'null';
      this.track(notes, this.trackId, this.stack);
      this.trackId++;
    }.bind(this), this.currentTime * 1000);
  } else {
    this.watch = function(){};
  }
};

},{}]},{},[1]);
