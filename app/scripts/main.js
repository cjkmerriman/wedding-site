
var offsetTop;
var opacity = 0.0;
var position;

$(document).ready(function() {

	console.log('Thanks for stopping by!');

	// fade in name & details on scroll

	var offset = $('.story').offset();
	offsetTop = offset.top - 160;

	$(window).scroll(function(){
		
		position = $(window).scrollTop();
		opacity = (position - offsetTop) / 200;
		
		if (opacity <=0) {
			$('.profile h2').css('opacity', 0);
		} else if (opacity <= 1) {
			$('.profile h2').css('opacity', opacity);
		} else if (opacity > 1) {
			$('.profile h2').css('opacity', 1);
		}

	});

	var outerPosition = $('.outer').offset();
	var outerTop = outerPosition.top
	console.log(outerTop);
	$('.outer').css('top', outerTop + 'px');

	var heroVideo = document.getElementById('video');
	heroVideo.addEventListener('timeupdate', endVideo,false);


});

function video() {
	$('.hero').addClass('white');
	$('video').addClass('fade');
	$('.outer').addClass('slide');
	$('.story').addClass('pad');

	setTimeout(function(){
		$('.hero').remove();
		offsetTop = 20;	
	}, 3000);
}

function endVideo() {
	var heroVideo = document.getElementById('video');
	if (heroVideo.currentTime > 11) {
		video();
	}
}