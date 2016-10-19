(function($) {

	"use strict";

	skel.breakpoints({
		xlarge:	'(max-width: 1680px)',
		large:	'(max-width: 1280px)',
		medium:	'(max-width: 980px)',
		small:	'(max-width: 736px)',
		xsmall:	'(max-width: 480px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$header = $('#header'),
			$banner = $('#banner');

			var screenHeight = $window.height();
			var $sections = $('#one, #two, #three');
			
			$window.scroll(function (event) {				    
		    toggleShownSections($sections);
			});			

			function toggleShownSections($sections) {
				var scroll = $window.scrollTop();
				var screenMid = scroll + screenHeight/2;
				$sections.each(function() {
					var $section = $(this);
					var sectionHeight =  $section.height();
					var sectionTop =  $section.offset().top;
					var sectionMid = sectionHeight/2 + sectionTop;
					var sectionBottom = sectionHeight + sectionTop;
					if(sectionTop < screenMid && sectionTop > scroll || sectionBottom > screenMid && sectionBottom < scroll + screenHeight || sectionTop < scroll && sectionBottom > scroll + screenHeight) {
						showSection($section);
					} else {
						hideSection($section);
						
					}
				})
			}

			function hideSection($section) {
				if(!$section.hasClass('showing')) {
					var $inner = $section.find('.inner').stop(true, true);
					$inner.fadeTo(1000, 0, function() {
						$inner.find('#skill-bars > li > div')
							.css({
								'transition' : 'width 0s',
								'width' : '0%'
							})
							.find('span')
								.fadeOut(1);
					});
					$section.removeClass('hidden')
						.addClass('showing');
				}
			}

			function showSection($section) {
				if(!$section.hasClass('hidden')) {
					var $inner = $section.find('.inner').stop(true, true);
					$inner.find('#skill-bars > li > div > span').stop(true, true).css('display', 'none');
					$inner.fadeTo(1000, 1 ,function() {
						$inner.find('#skill-bars > li > div').each(function() {
							var $div = $(this);
							var percentage = $div.attr('data-percentage');
							$div.find('span')
								.fadeIn(2500)
								.end()
								.css({
								'transition' : 'width 2s',
								'width' : percentage + '%'
							});
						})	
					})
					$section.removeClass('showing')
						.addClass('hidden');
				}
			}

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Header.
			if (skel.vars.IEVersion < 9)
				$header.removeClass('alt');

			if ($banner.length > 0
			&&	$header.hasClass('alt')) {

				$window.on('resize', function() { $window.trigger('scroll'); });

				$banner.scrollex({
					bottom:		$header.outerHeight(),
					terminate:	function() { $header.removeClass('alt'); },
					enter:		function() { $header.addClass('alt'); },
					leave:		function() { $header.removeClass('alt'); }
				});

			}

		// Menu.
			var $menu = $('#menu');

			$menu._locked = false;

			$menu._lock = function() {

				if ($menu._locked)
					return false;

				$menu._locked = true;

				window.setTimeout(function() {
					$menu._locked = false;
				}, 350);

				return true;

			};

			$menu._show = function() {

				if ($menu._lock())
					$body.addClass('is-menu-visible');

			};

			$menu._hide = function() {

				if ($menu._lock())
					$body.removeClass('is-menu-visible');

			};

			$menu._toggle = function() {

				if ($menu._lock())
					$body.toggleClass('is-menu-visible');

			};

			$menu
				.appendTo($body)
				.on('click', function(event) {

					event.stopPropagation();

					// Hide.
						$menu._hide();

				})
				.find('.inner')
					.on('click', '.close', function(event) {

						event.preventDefault();
						event.stopPropagation();
						event.stopImmediatePropagation();

						// Hide.
							$menu._hide();

					})
					.on('click', function(event) {
						event.stopPropagation();
					})
					.on('click', 'a', function(event) {

						var href = $(this).attr('href');

						event.preventDefault();
						event.stopPropagation();

						// Hide.
							$menu._hide();

						// Redirect.
							window.setTimeout(function() {
								window.location.href = href;
							}, 350);

					});

			$body
				.on('click', 'a[href="#menu"]', function(event) {

					event.stopPropagation();
					event.preventDefault();

					// Toggle.
						$menu._toggle();

				})
				.on('keydown', function(event) {

					// Hide on escape.
						if (event.keyCode == 27)
							$menu._hide();

				});

	});

})(jQuery);