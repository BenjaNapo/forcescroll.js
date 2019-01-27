function scrollTouchable() {
  var startPos = 0, endPos = 0;
  $(document).on('touchstart', function(e) {startPos = e.originalEvent.touches[0].pageX;});
  $(document).on('touchmove', function(e) {
    endPos = e.originalEvent.touches[0].pageX;
    handle(endPos-startPos > 0 ? -1 : 1);
  });
};

function scrollByMouse() {
  if (window.addEventListener) 
    window.addEventListener('DOMMouseScroll', wheel, false);
  window.onmousewheel = document.onmousewheel = wheel;
};

window.forceScroll = function(x, y){
  if(x == undefined){
    scrollTouchable();
    scrollByMouse();
  } else if(typeof x == "boolean" && y == undefined){
    scrollByMouse();
    if(x == true)
      scrollTouchable();
  } else if(typeof x == "string"){
    var sizes = {sm:576, md:768, lg:992, xl:1200};
    var devs = x.split(" ");
    if($(window).width() < 576){
      if(devs.includes("xs"))
        scrollByMouse();
    } else if($(window).width() >= 1200){
      if(devs.includes("xl"))
        scrollByMouse();
    } else{
      devs.forEach(function(key){
        if(key != "xl" && $(window).width() >= sizes[key] && $(window).width() < sizes[next(sizes, key)])
          scrollByMouse();
      });
    }
    if(typeof y == "boolean"){
      if(y == true)
        scrollTouchable();
    } else if (y == undefined)
      scrollTouchable();
  }
};

var next = function(db, key) {
  var f = false;
  var res = null;
  Object.keys(db).forEach(function(i){
    if(f == true)
      res = i;
    if(key == i)
      f = true;
  });
  return res;
};

function wheel(event) {
  var delta = 0;
  if (event.wheelDelta) delta = event.wheelDelta / 120;
  else if (event.detail) delta = -event.detail / 3;

  handle(delta);
  if (event.preventDefault) event.preventDefault();
  event.returnValue = false;
}

function handle(delta) {
	var time = 1000;
	var actualPosition = converter($(window).scrollTop());
	var nextPosition = actualPosition-delta >= 0 ? actualPosition-delta : actualPosition;
	var nextFocus = $(".scroll-point:eq("+nextPosition+")");
  var deltaNav = 0;

  if($("#myDiv").length)
    deltaNav = $("nav").height();

	try {
		var finalPosition = nextFocus.position().top + nextFocus.outerHeight()/2 - $(window).height()/2;
	} catch(ex){}

	if(finalPosition != "undefined" && finalPosition<$( document ).height())
		$('html, body').stop().animate({
		scrollTop: finalPosition - deltaNav
		}, time);
	else if(finalPosition != "undefined")
		$('html, body').stop().animate({
		scrollTop: $( document ).height() - $( window ).height() 
		}, time);
}

function converter(x) {
	var positions = new Array();
	$(".scroll-point").each(function (e) {
		positions.push($(this).offset().top);
	});
	return positions.binarySearch(x,intLessThan);
}

Array.prototype.binarySearch = function(find, comparator) {
  var low = 0, high = this.length - 1, i, comparison, prev_comparison;  
  while (low <= high) {
    i = Math.floor((low + high) / 2);
    comparison = comparator(this[i], find);
    prev_comparison = comparison
    if (comparison < 0) { low = i + 1; continue; };
    if (comparison > 0) { high = i - 1; continue; };
    return i;
  }
  if (prev_comparison < 0) {
      var option_low = i;
      var option_high = i+1;
  } else {
      var option_low = i-1;
      var option_high = i;
  }
  var dist_a = find - this[option_low];
  var dist_b = this[option_high] - find;
  if (dist_a < dist_b) {
      return option_low;
  } else {
      return option_high;
  }
  return null;
};

intLessThan = function(a,b) {
    if (a < b) {
        return -1;
    } else if (a > b) {
        return 1;
    } else {
        return 0;
    }
}