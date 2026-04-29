;(function () {
	
	'use strict';



	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	var fullHeight = function() {

		if ( !isMobile.any() ) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function(){
				$('.js-fullheight').css('height', $(window).height());
			});
		}

	};


	var counter = function() {
		$('.js-counter').countTo({
			 formatter: function (value, options) {
	      return value.toFixed(options.decimals);
	    },
		});
	};


	var counterWayPoint = function() {
		if ($('#sara-counter').length > 0 ) {
			$('#sara-counter').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( counter , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}
	};

	// Animations
	var contentWayPoint = function() {
  $('.animate-box').waypoint(function(direction) {
    if (direction === 'down' && !$(this.element).hasClass('animated')) {
      $(this.element).addClass('item-animate');

      // trigger immediately without big delays
      $('body .animate-box.item-animate').each(function() {
        var el = $(this);
        var effect = el.data('animate-effect');

        if (effect === 'fadeIn') {
          el.addClass('fadeIn animated');
        } else if (effect === 'fadeInLeft') {
          el.addClass('fadeInLeft animated');
        } else if (effect === 'fadeInRight') {
          el.addClass('fadeInRight animated');
        } else {
          el.addClass('fadeInUp animated');
        }

        el.removeClass('item-animate');
      });
    }
  }, { offset: '85%' });
};



	var burgerMenu = function() {

		$('.js-sara-nav-toggle').on('click', function(event){
			event.preventDefault();
			var $this = $(this);

			if ($('body').hasClass('offcanvas')) {
				$this.removeClass('active');
				$('body').removeClass('offcanvas');	
			} else {
				$this.addClass('active');
				$('body').addClass('offcanvas');	
			}
		});



	};

	// Click outside of offcanvass
	var mobileMenuOutsideClick = function() {

		$(document).click(function (e) {
	    var container = $("#sara-aside, .js-sara-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {

	    	if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-sara-nav-toggle').removeClass('active');
			
	    	}
	    	
	    }
		});

		$(window).scroll(function(){
			if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-sara-nav-toggle').removeClass('active');
			
	    	}
		});

	};

	
	
	// --- robust nav handlers (paste/replace your existing functions) ---

var clickMenu = function() {
  // scope the selector to the aside to avoid ID conflicts
  $('#sara-aside #navbar a:not([class="external"])').click(function(event){
    var section = $(this).data('nav-section'),
        $navbar = $('#sara-aside #navbar');

    if ( $('[data-section="' + section + '"]').length ) {
      // animate, then set active in the callback to avoid race conditions
      $('html, body').animate({
        scrollTop: $('[data-section="' + section + '"]').offset().top - 55
      }, 500, function(){
        navActive(section);
      });
    } else {
      // fallback: still set active if no matching section
      navActive(section);
    }

    if ( $navbar.is(':visible')) {
      $navbar.removeClass('in');
      $navbar.attr('aria-expanded', 'false');
      $('.js-sara-nav-toggle').removeClass('active');
    }

    event.preventDefault();
    return false;
  });
};

var navActive = function(section) {
  // target specifically the aside menu UL
  var $el = $('#sara-aside #navbar > ul');
  $el.find('li').removeClass('active');
  $el.find('a[data-nav-section="'+section+'"]').closest('li').addClass('active');
};

// Waypoints + bottom fallback
var navigationSection = function() {
  var $section = $('section[data-section]');

  $section.waypoint(function(direction) {
    if (direction === 'down') {
      navActive($(this.element).data('section'));
    }
  }, { offset: '150px' });

  $section.waypoint(function(direction) {
    if (direction === 'up') {
      navActive($(this.element).data('section'));
    }
  }, { offset: function() { return -$(this.element).height() + 155; } });

  // fallback: when user reaches bottom of page, ensure last section is active
  $(window).on('scroll resize', function(){
    var scrollTop = $(window).scrollTop();
    var windowH = $(window).height();
    var docH = $(document).height();
    if (scrollTop + windowH >= docH - 5) {
      navActive('contact'); // change 'contact' if your last section uses another name
    }
  });
};






	var sliderMain = function() {
		
	  	$('#sara-hero .flexslider').flexslider({
			animation: "fade",
			slideshowSpeed: 7000,
			directionNav: true,
			start: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			},
			before: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			}

	  	});

	};

	var stickyFunction = function() {

		var h = $('.image-content').outerHeight();

		if ($(window).width() <= 992 ) {
			$("#sticky_item").trigger("sticky_kit:detach");
		} else {
			$('.sticky-parent').removeClass('stick-detach');
			$("#sticky_item").trigger("sticky_kit:detach");
			$("#sticky_item").trigger("sticky_kit:unstick");
		}

		$(window).resize(function(){
			var h = $('.image-content').outerHeight();
			$('.sticky-parent').css('height', h);


			if ($(window).width() <= 992 ) {
				$("#sticky_item").trigger("sticky_kit:detach");
			} else {
				$('.sticky-parent').removeClass('stick-detach');
				$("#sticky_item").trigger("sticky_kit:detach");
				$("#sticky_item").trigger("sticky_kit:unstick");

				$("#sticky_item").stick_in_parent();
			}
			

			

		});

		$('.sticky-parent').css('height', h);

		$("#sticky_item").stick_in_parent();

	};

	var owlCrouselFeatureSlide = function() {
		$('.owl-carousel').owlCarousel({
			animateOut: 'fadeOut',
		   animateIn: 'fadeIn',
		   autoplay: true,
		   loop:true,
		   margin:0,
		   nav:true,
		   dots: false,
		   autoHeight: true,
		   items: 1,
		   navText: [
		      "<i class='icon-arrow-left3 owl-direction'></i>",
		      "<i class='icon-arrow-right3 owl-direction'></i>"
	     	]
		})
	};

	// Document on load.
	$(function(){
		fullHeight();
		counter();
		counterWayPoint();
		contentWayPoint();
		burgerMenu();

		clickMenu();
		// navActive();
		navigationSection();
		// windowScroll();


		mobileMenuOutsideClick();
		sliderMain();
		stickyFunction();
		owlCrouselFeatureSlide();
	});


}());