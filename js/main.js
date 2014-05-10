$(function(){
  window.prettyPrint();
  setPlay();
  $('#code').css('opacity', '0.2');
  var singleton = true;
  $('#play').on('click', function () {
    if (singleton) {
      singleton = false;
      $('#play').fadeOut('fast', function () {
        $('#code').animate({opacity: '1'}, 'slow', function () {
          nyan({bpm: 120});
        });
      });
    }
  });
});
$(window).resize(setPlay);

function setPlay () {
  var code = $('#code');
  var play = $('#play');
  var ctop = code.offset().top;
  var cleft = code.offset().left;
  var cwidth = parseInt(code.css('width'));
  var cheight = parseInt(code.css('height'));
  var pwidth = parseInt(play.css('width'));
  var pheight = parseInt(play.css('height'));

  play.css('top', ctop + (cheight / 2) - (pheight / 2));
  play.css('left', cleft + (cwidth / 2) - (pwidth / 2));
}
