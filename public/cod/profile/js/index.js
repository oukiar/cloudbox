(function(d){var h=[];d.loadImages=function(a,e){"string"==typeof a&&(a=[a]);for(var f=a.length,g=0,b=0;b<f;b++){var c=document.createElement("img");c.onload=function(){g++;g==f&&d.isFunction(e)&&e()};c.src=a[b];h.push(c)}}})(window.jQuery||window.Zepto);
 $.fn.hasAttr = function(name) { var attr = $(this).attr(name); return typeof attr !== typeof undefined && attr !== false; };

$(document).ready(function() {
r = function() {
$('.img').attr('src', (window.devicePixelRatio > 1) ? ((window.devicePixelRatio > 2) ? 'images/store-297.png' : 'images/store-198.png') : 'images/store-99.png');
$('.img-2').attr('src', (window.devicePixelRatio > 1) ? ((window.devicePixelRatio > 2) ? 'images/store-297-2.png' : 'images/store-198-2.png') : 'images/store-99-2.png');
$('.img-3').attr('src', (window.devicePixelRatio > 1) ? ((window.devicePixelRatio > 2) ? 'images/store-297-3.png' : 'images/store-198-3.png') : 'images/store-99-3.png');
$('.img-4').attr('src', (window.devicePixelRatio > 1) ? ((window.devicePixelRatio > 2) ? 'images/store-297-3.png' : 'images/store-198-3.png') : 'images/store-99-3.png');
$('.img-5').attr('src', (window.devicePixelRatio > 1) ? ((window.devicePixelRatio > 2) ? 'images/store-297-4.png' : 'images/store-198-4.png') : 'images/store-99-4.png');
$('.img-6').attr('src', (window.devicePixelRatio > 1) ? ((window.devicePixelRatio > 2) ? 'images/store-297.png' : 'images/store-198.png') : 'images/store-99.png');
$('.img-7').attr('src', (window.devicePixelRatio > 1) ? ((window.devicePixelRatio > 2) ? 'images/store-297-2.png' : 'images/store-198-2.png') : 'images/store-99-2.png');
$('.img-8').attr('src', (window.devicePixelRatio > 1) ? ((window.devicePixelRatio > 2) ? 'images/store-297-3.png' : 'images/store-198-3.png') : 'images/store-99-3.png');
$('.img-9').attr('src', (window.devicePixelRatio > 1) ? ((window.devicePixelRatio > 2) ? 'images/store-297-4.png' : 'images/store-198-4.png') : 'images/store-99-4.png');
$('.img-10').attr('src', (window.devicePixelRatio > 1) ? ((window.devicePixelRatio > 2) ? 'images/store-297-5.png' : 'images/store-198-5.png') : 'images/store-99-5.png');};
$(window).resize(r);
r();

});