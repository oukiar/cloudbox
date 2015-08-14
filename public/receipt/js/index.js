(function(d){var h=[];d.loadImages=function(a,e){"string"==typeof a&&(a=[a]);for(var f=a.length,g=0,b=0;b<f;b++){var c=document.createElement("img");c.onload=function(){g++;g==f&&d.isFunction(e)&&e()};c.src=a[b];h.push(c)}}})(window.jQuery||window.Zepto);
 $.fn.hasAttr = function(name) { var attr = $(this).attr(name); return typeof attr !== typeof undefined && attr !== false; };

$(document).ready(function() {
r = function() {
$('.img').attr('src', (window.devicePixelRatio > 1) ? ((window.devicePixelRatio > 2) ? 'images/lccargo-921.png' : 'images/lccargo-614.png') : 'images/lccargo-307.png');
$('.img-2').attr('src', (window.devicePixelRatio > 1) ? ((window.devicePixelRatio > 2) ? 'images/screen-shot-2015-08-04-at-6.48.37-pm-264.png' : 'images/screen-shot-2015-08-04-at-6.48.37-pm-176.png') : 'images/screen-shot-2015-08-04-at-6.48.37-pm-88.png');};
$(window).resize(r);
r();
initMenu($('#menu-1'));
initMenu($('#menu-2'));
initMenu($('#menu-3'));
initMenu($('#menu-4'));
initMenu($('#menu-5'));
initMenu($('#menu-6'));
initMenu($('#menu-7'));
initMenu($('#menu-8'));
initMenu($('#menu-9'));
initMenu($('#menu-10'));

});