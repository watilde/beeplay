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
