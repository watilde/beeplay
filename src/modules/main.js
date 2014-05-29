// constructor
module.exports = function (option) {
  option = (typeof option === 'object') ? option : {};
  this.bpm = option.bpm || 120;
  this.sampleRate = option.sampleRate || 44100;
  this.time = 0;

  try {
    // Fix up for prefixing
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
