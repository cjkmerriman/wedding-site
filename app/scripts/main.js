
var offsetTop;
var outerTop;
var opacity = 0.0;
var position;
var run = false;
var formURL = 'https://script.google.com/macros/s/AKfycbyQFOKiHDsNvFyF1-0TR7KqfP6KisaM8KVu54hwAvOwC6LBfLv6/exec';
var maxLength = 147;


$(document).ready(function() {

	console.log('Thanks for stopping by!');

	initializeForm();
	$('#rsvp').removeClass('rsvp-hide');



	$("#rsvpAction").animatedModal({
		modalTarget:'rsvp',
		animatedIn:'slideInUp',
		animatedOut:'slideOutDown',
		animationDuration: '1s',
		color:'#FFFFFF',
		// Callbacks
		beforeOpen: function() {
		},
		afterOpen: function() {
			$('.outer-block').hide();
		},
		beforeClose: function() {
			$('.outer-block').show();
		},
		afterClose: function() {
		}
	});

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
	//$('.hero').addClass('animated slideOutUp');
	$('.story').addClass('pad');
	$('video').css('width', $('video').width());
	var section = document.querySelector('.hero');
	collapseSection(section);

	offsetTop = 20;

	setTimeout(function(){
		$('video').remove();
	}, 4000);
}

function initializeForm() {

	var $form = $('#form');

	initializeTextArea();

	$('.accept').on('click touchstart', function (e) {
		e.preventDefault();

		var $input = $(this).children('input');
		var val = $input.val();
		$input.addClass('selected')

		if (val == "Joyfully Accept") {
			$input.val("Regretfully Decline");
			$input.parent().addClass('regret').removeClass('joy');
		} else {
			$input.val("Joyfully Accept");
			$input.parent().addClass('joy').removeClass('regret');
		}
	});


	$('.attendees').children('label').on('click', function (e) {
		$('.attendees input').each(function(){
			$(this).prop('checked', false);
		});
		$('.attendees label').removeClass('checked');
		$(this).addClass('checked');
		$(this).prev().prop('checked', true).click();
		updateNames($(this).prev().val());
		console.log($('input[name=attendees]:checked').val());
	});

	$('#next').on('click', function (e) {
		// validation
		var error = false;

		$('.name-show').each(function(){

			var $input = $(this).children('input');

			if ($input.val() == '') {
				$input.addClass('error');
				setTimeout(function(){
					$input.removeClass('error');
				}, 1000);
				error = true;
			}
		});

		if (error == false) {$('.part1').hide(); $('.part2').show();}

	});

	$form.on('submit', function(e) {
		e.preventDefault();
		$('#submit').prop("disabled",true);

		var attendees = $('input[name=attendees]:checked').val();
		var response = $('input[name=response]').val();
		var name1 = $('input[name=name1]').val();
		var name2 = $('input[name=name2]').val();
		var name3 = $('input[name=name3]').val();
		var name4 = $('input[name=name4]').val();
		var name5 = $('input[name=name5]').val();
		var message = $('textarea[name=message]').val();
		var song =  $('input[name=song]').val() + " - " + $('input[name=artist]').val();

		var formData = {
      'response' : response,
      'name1'    : toProperCase(name1),
      'name2'    : toProperCase(name2),
			'name3'    : toProperCase(name3),
      'name4'    : toProperCase(name4),
			'name5'    : toProperCase(name5),
			'attendees': attendees,
			'message'	 : message,
			'song'		 : toProperCase(song)
    };

		var jqxhr = $.ajax({
    	url: formURL,
    	method: "GET",
    	dataType: "json",
    	data: formData
  	}).done( function(data) {
    	submittedForm(name1, response);
			$('#submit').prop("disabled",false);
  	});
	});
}

function updateNames(attendees) {
	var count = 1
	$('.name-group').each(function() {
		if (count <= attendees) {
			$(this).addClass('name-show');
		} else {
			$(this).removeClass('name-show');
			$(this).children('input').val("");
		}
		count++
	});
}

function initializeTextArea() {
	autosize($('textarea'));
	$('textarea').keyup(function() {
		var length = $(this).val().length;
		length = maxLength-length;
		$('.chars span').html(length);
		if (length < 21) {
			$('.chars span').addClass('low');
		} else {
			$('.chars span').removeClass('low');
		}
	});
}

function submittedForm(name, response) {
	var firstname = name.substr(0,name.indexOf(' '));
	//$('.part3 h2 span').html(firstname);

	if (response == "Joyfully Accept") {
		$('.not-attending').hide();
	} else {
		$('.attending').hide();
	}

	$('.part2').hide();
	$('.part3').show();
}

// https://script.google.com/macros/u/0/s/AKfycbyQFOKiHDsNvFyF1-0TR7KqfP6KisaM8KVu54hwAvOwC6LBfLv6/exec

// function endVideo() {
// 	var heroVideo = document.getElementById('video');
// 	console.log(heroVideo.currentTime);
// 	if (heroVideo.currentTime > 1 && run == false) {
// 		console.log('fade');
// 		video();
// 	}
// }

!function(a){a.fn.animatedModal=function(n){function o(){m.css({"z-index":e.zIndexOut}),e.afterClose()}function t(){e.afterOpen()}var i=a(this),e=a.extend({modalTarget:"animatedModal",position:"fixed",width:"100%",height:"100%",top:"0px",left:"0px",zIndexIn:"9999",zIndexOut:"-9999",color:"#39BEB9",opacityIn:"1",opacityOut:"0",animatedIn:"zoomIn",animatedOut:"zoomOut",animationDuration:".6s",overflow:"auto",beforeOpen:function(){},afterOpen:function(){},beforeClose:function(){},afterClose:function(){}},n),d=a(".close-"+e.modalTarget),s=a(i).attr("href"),m=a("body").find("#"+e.modalTarget),l="#"+m.attr("id");m.addClass("animated"),m.addClass(e.modalTarget+"-off");var r={position:e.position,width:e.width,height:e.height,top:e.top,left:e.left,"background-color":e.color,"overflow-y":e.overflow,"z-index":e.zIndexOut,opacity:e.opacityOut,"-webkit-animation-duration":e.animationDuration,"-moz-animation-duration":e.animationDuration,"-ms-animation-duration":e.animationDuration,"animation-duration":e.animationDuration};m.css(r),i.click(function(n){n.preventDefault(),a("body, html").css({overflow:"hidden"}),s==l&&(m.hasClass(e.modalTarget+"-off")&&(m.removeClass(e.animatedOut),m.removeClass(e.modalTarget+"-off"),m.addClass(e.modalTarget+"-on")),m.hasClass(e.modalTarget+"-on")&&(e.beforeOpen(),m.css({opacity:e.opacityIn,"z-index":e.zIndexIn}),m.addClass(e.animatedIn),m.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",t)))}),d.click(function(n){n.preventDefault(),a("body, html").css({overflow:"auto"}),e.beforeClose(),m.hasClass(e.modalTarget+"-on")&&(m.removeClass(e.modalTarget+"-on"),m.addClass(e.modalTarget+"-off")),m.hasClass(e.modalTarget+"-off")&&(m.removeClass(e.animatedIn),m.addClass(e.animatedOut),m.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",o))})}}(jQuery);

function toProperCase(s) {
  return s.toLowerCase().replace(/^(.)|\s(.)/g,
  function($1) { return $1.toUpperCase(); });
}

function collapseSection(element) {
  // get the height of the element's inner content, regardless of its actual size
  var sectionHeight = element.scrollHeight;

  // temporarily disable all css transitions
  var elementTransition = element.style.transition;
  element.style.transition = '';

  // on the next frame (as soon as the previous style change has taken effect),
  // explicitly set the element's height to its current pixel height, so we
  // aren't transitioning out of 'auto'
  requestAnimationFrame(function() {
    element.style.height = sectionHeight + 'px';
    element.style.transition = elementTransition;

    // on the next frame (as soon as the previous style change has taken effect),
    // have the element transition to height: 0
    requestAnimationFrame(function() {
      element.style.height = 0 + 'px';
    });
  });

  // mark the section as "currently collapsed"
  element.setAttribute('data-collapsed', 'true');
}
