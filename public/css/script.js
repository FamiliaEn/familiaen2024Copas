$(document).ready(function(){
  $('#goRight').on('click', function(){
    $('#slideBox').animate({
      'marginLeft' : '0'
    });
    $('.topLayer').animate({
      'marginLeft' : '100%'
    });
  });
  $('#goLeft').on('click', function(){
    $('#slideBox').animate({
      'marginLeft' : '50%'
    });
    $('.topLayer').animate({
      'marginLeft': '0'
    });
  });
});

var btn = document.querySelector('.btn');
var box = document.querySelector('.box')
btn.addEventListener('click', function(){
  box.style.width = ( 100 + Math.round(Math.random()*300) ) + 'px';
  box.style.height = ( 100 + Math.round(Math.random()*300) ) + 'px';
});
