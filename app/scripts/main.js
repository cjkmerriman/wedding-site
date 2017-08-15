
var offsetTop;
var outerTop;
var opacity = 0.0;
var position;
var run = false;

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

	$('#video').on('play', function (e) {
    	setTimeout(function(){video();}, 8000);
	});

});

function video() {
	
	run = true;
	
	var outerPosition = $('.outer').offset();
	outerTop = outerPosition.top;

	//$('video').addClass('fade');
	$('.outer').css('transform','translateY(-' + outerTop + 'px)');
	$('.story').addClass('pad');
	offsetTop = 20;	

	setTimeout(function(){
		$('video').remove();
	}, 10000);
}



// function endVideo() {
// 	var heroVideo = document.getElementById('video');
// 	console.log(heroVideo.currentTime);
// 	if (heroVideo.currentTime > 1 && run == false) {
// 		console.log('fade');
// 		video();
// 	}
// }