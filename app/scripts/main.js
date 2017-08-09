
var offsetTop;
var opacity = 0.0;
var position;

$(document).ready(function() {

	console.log('Thanks for stopping by!');

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
	//setTimeout(video, 10000);	
	// $('video').delay( 14000 ).fadeOut( 1600 );

});

function video() {
	$('video').addClass('fade');
	$('.hero').addClass('slide');
}