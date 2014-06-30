module.exports = function() {
  if(this.track && typeof this.track == 'function') {
    var that = this;
    setTimeout(function() {
      var notes = that.stack[that.trackId].notes.toString().replace(/,/g, ' ') || 'null';
      that.track(notes, that.trackId, that.stack);
      that.trackId++;
    }, that.currentTime * 1000);
  } else {
    this.watch = function(){};
  }
}