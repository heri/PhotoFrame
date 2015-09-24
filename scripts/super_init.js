$(function() {

	// Options for SuperBGImage
	$.fn.superbgimage.options = {
		id: 'superbgimage', // id for the containter
		z_index: 0, // z-index for the container
		inlineMode: 0, // 0-resize to browser size, 1-do not resize to browser-size
		showimage: 1, // number of first image to display
		vertical_center: 0, // 0-align top, 1-center vertical
		transition: 1, // 0-none, 1-fade, 2-slide down, 3-slide left, 4-slide top, 5-slide right, 6-blind horizontal, 7-blind vertical, 90-slide right/left, 91-slide top/down
		transitionout: 1, // 0-no transition for previous image, 1-transition for previous image
		randomtransition: 0, // 0-none, 1-use random transition (0-7)
		showtitle: 0, // 0-none, 1-show title
		slideshow: 0, // 0-none, 1-autostart slideshow
		slide_interval: 5000, // interval for the slideshow
		randomimage: 0, // 0-none, 1-random image
		speed: 'slow', // animation speed
		preload: 0, // 0-none, 1-preload images
		onShow: superbgimage_show, // function-callback show image
		onClick: superbgimage_click, // function-callback click image
		onHide: superbgimage_hide, // function-callback hide image
		onMouseenter: superbgimage_mouseenter, // function-callback mouseenter
		onMouseleave: superbgimage_mouseleave, // function-callback mouseleave
		onMousemove: superbgimage_mousemove, // function-callback mousemove
		scaletofit: 1 // 0- no fitting, 1- fit image to view container
	};

	// initialize SuperBGImage
	$('#thumbs1').superbgimage();

});

var gLastImagePos = 0;

// function callback on hiding image
function superbgimage_hide(img) {
	$('#showtitle').hide();
}


function superbgimage_cleanup(img) {
	//if (console && console.log) console.log("superbgimage_show: " + img + ", last imagepos: " + gLastImagePos);
	$('img[rel]').each(function(index) {
		var aktRelPos = $(this).attr("rel");
		if (aktRelPos != img && aktRelPos != gLastImagePos){
			//if (console && console.log) console.log("image removed: " + aktRelPos );
			$(this).remove();
		}
	});
}

// function callback on showing image
// get title and display it
function superbgimage_show(img) {
	$('#superbgimage').css('background', 'none');
	$('#superbgimage').append($('#showtitle'));
	$('#showtitle p.imagecount').html('image ' + img + ' of ' + $.superbg_imgIndex);
	if ($('#thumbs1').css('display') == 'block') {
		$('#showtitle p.title').html($('#thumbs1 a' + "[rel='" + img + "']").attr('title'));
	} else {
		$('#showtitle p.title').html($('#thumbs2 a' + "[rel='" + img + "']").attr('title'));
	}
	$('#showtitle').fadeIn('fast');
	// save last image pos
	superbgimage_cleanup(img);
	gLastImagePos = img;
}


$(document).keydown(function(e) {
	switch(e.keyCode) {
	// User pressed right arrow
	case 39:
	return $('#thumbs').nextSlide();
	break;
	// User pressed left arrow
	case 37:
	return $('#thumbs').prevSlide();
	break;
	}
});

// function callback on clicking image, show next slide
function superbgimage_click(img) {
	$('#thumbs').nextSlide();
}

my_slideshowActive = false;

// function callback onmouseenter, stop slideshow, show pause-indicator
function superbgimage_mouseenter(img) {

	return;
	if ($.superbg_slideshowActive) {
		my_slideshowActive = true;
	//	if ($('#pause').length == 0) {
	//		$('body').prepend('<div id="pause"><img src="pause.png" \/><\/div>');
	//	}
	//	$('#pause').css('position', 'absolute').css('z-index', 3).show();
	//	return $('#thumbs').stopSlideShow();
	}
}

// function callback onmouseleave, start slideshow, hide pause-indicator
function superbgimage_mouseleave(img) {

	// stop the pausing, Andreas Meyer 22.10.2013
	return;
	if (my_slideshowActive && ($('#pause').length > 0) && ($('#pause').css('display') == 'block'))  {
		$('#pause').hide();
		return $('#thumbs').startSlideShow();
	}
}

// function callback onmousemove, show and move pause-indicator
function superbgimage_mousemove(img, e) {
	if (my_slideshowActive && ($('#pause').length > 0)) {
		$("#pause").css("top",(e.pageY + 20) + "px").css("left",(e.pageX + 20) + "px").show();
	}
}
