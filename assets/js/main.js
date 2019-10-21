jQuery(function ($) {


	$(window).scroll(function () {
        scrollTop = $(window).scrollTop();

         if( scrollTop >$('.Main-Menu').height()){
            $('.Main-Menu').addClass('scrollNav');


         }
         else{
            $('.Main-Menu').removeClass('scrollNav');    

         }
         
   
        });

	//#main-slider
	var  slideHeight= window.innerHeight;

	$('#hero-slider .item').css('height', slideHeight);



	$(window).resize(function () {
		'use strict';
		$('#hero-slider .item').css('height', slideHeight);
	});

	$('.navbar-collapse ul li a').on('click', function () {
		$('html, body').animate({ scrollTop: $(this.hash).offset().top - 5 }, 1000);
		$('.navbar-collapse.collapse.in').removeClass('in');
		return false;
	});

	// User define function


	$('#scrollDown').on('click', function () {
		$('html, body').animate({ scrollTop: $(this.hash).offset().top - 5 }, 1000);
		return false;
	});

	if ($(window).width() > 767) {
		//Initiat WOW JS
		new WOW().init();
	}


	// Progress Bar
	$('#aboutUs').bind('inview', function (event, visible, visiblePartX, visiblePartY) {
		if (visible) {
			$.each($('div.progress-bar'), function () {
				$(this).css('width', $(this).attr('aria-valuetransitiongoal') + '%');
			});
			$(this).unbind('inview');
		}
	});

	// Contact form
	var form = $('#main-contact-form');
	form.submit(function (event) {
		event.preventDefault();
		var form_status = $('<div class="form_status"></div>');
		$.ajax({
			url: $(this).attr('action'),
			beforeSend: function () {
				form.prepend(form_status.html('<p><i class="fa fa-spinner fa-spin"></i> Email is sending...</p>').fadeIn());
			}
		}).done(function (data) {
			form_status.html('<p class="text-success">Thank you for contact us. As early as possible  we will contact you</p>').delay(3000).fadeOut();
		});
	});

	//Google Map
	var latitude = $('#map').data('latitude')
	var longitude = $('#map').data('longitude')
	function initialize_map() {
		var myLatlng = new google.maps.LatLng(latitude, longitude);
		var mapOptions = {
			zoom: 14,
			scrollwheel: false,
			center: myLatlng
		};
		var map = new google.maps.Map(document.getElementById('map'), mapOptions);
		var contentString = '';
		var infowindow = new google.maps.InfoWindow({
			content: '<div class="map-content"><ul class="address">' + $('.address').html() + '</ul></div>'
		});
		var marker = new google.maps.Marker({
			position: myLatlng,
			map: map
		});
		google.maps.event.addListener(marker, 'click', function () {
			infowindow.open(map, marker);
		});
	}
	google.maps.event.addDomListener(window, 'load', initialize_map);


});

