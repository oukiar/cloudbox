(function(d){var h=[];d.loadImages=function(a,e){"string"==typeof a&&(a=[a]);for(var f=a.length,g=0,b=0;b<f;b++){var c=document.createElement("img");c.onload=function(){g++;g==f&&d.isFunction(e)&&e()};c.src=a[b];h.push(c)}}})(window.jQuery||window.Zepto);
 $.fn.hasAttr = function(name) { var attr = $(this).attr(name); return typeof attr !== typeof undefined && attr !== false; };

$(document).ready(function() {
r = function() {
if($(window).width() >= 960) {
$('.img').attr('src', (window.devicePixelRatio > 1) ? ((window.devicePixelRatio > 2) ? 'images/screen-shot-2015-09-12-at-11.01.52-pm-111.png' : 'images/screen-shot-2015-09-12-at-11.01.52-pm-74.png') : 'images/screen-shot-2015-09-12-at-11.01.52-pm-37.png');
$('.img-2').attr('src', (window.devicePixelRatio > 1) ? ((window.devicePixelRatio > 2) ? 'images/screen-shot-2015-09-12-at-11.02.47-pm-93.png' : 'images/screen-shot-2015-09-12-at-11.02.47-pm-62.png') : 'images/screen-shot-2015-09-12-at-11.02.47-pm-31.png');
} else {
$('.img').attr('src', (window.devicePixelRatio > 1) ? ((window.devicePixelRatio > 2) ? 'images/screen-shot-2015-09-12-at-11.01.52-pm-36.png' : 'images/screen-shot-2015-09-12-at-11.01.52-pm-24.png') : 'images/screen-shot-2015-09-12-at-11.01.52-pm-12.png');
$('.img-2').attr('src', (window.devicePixelRatio > 1) ? ((window.devicePixelRatio > 2) ? 'images/screen-shot-2015-09-12-at-11.02.47-pm-33.png' : 'images/screen-shot-2015-09-12-at-11.02.47-pm-22.png') : 'images/screen-shot-2015-09-12-at-11.02.47-pm-11.png');
}
};
$(window).resize(r);
r();

});