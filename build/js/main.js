(function($){
	'use strict';

	var winScrollPos = $('body').scrollTop();
	var modalSlider;

	
	$(document).ready(function(){

		if ($('.intro-slider') && $('.intro-slider').length) {
			
			$('.intro-slider').slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: true,
				nextArrow: '<button type="button" class="slick-next"></button>',
				prevArrow: '<button type="button" class="slick-prev"></button>',
				// fade: true,
				asNavFor: '.intro-slider-nav'
			});

			$('.intro-slider-nav').slick({
				slidesToShow: 6,
				slidesToScroll: 1,
				asNavFor: '.intro-slider',
				arrows: false,
				dots: true,
				// centerMode: true,
				focusOnSelect: true
			});
		}

		

		$('.owl-carousel1').owlCarousel({
			nav: false,
			items: 1,
			center:true,
		    animateIn: 'fadeIn',
		    animateOut: 'fadeOut',
			mouseDrag: false,
			touchDrag: false,
			// lazyLoad: true,
			dots: true,
			dotsContainer: '.nav-dots .owl-dots',
			// smartSpeed:150
			// startPosition: imgInd
			//autoWidth:true
		});

		$('.c-hamburger').on('click', function(ev) {
			toggleMenu(ev, $(this), $('.c-hamburger-container'));
		});

		function toggleMenu(ev, el, container) {
			$('body').toggleClass('menu-opened');
			el.toggleClass('is-active');
			// container.slideToggle();
		};

		$(".singleService-menu-wrap").stick_in_parent();
		// $(".page-header").stick_in_parent();



		// $('.menu > .menu-item-has-children > a').click(function(ev) {
		// 	ev.preventDefault();
			
		// 	$(this)
		// 		.closest('.menu-item')
		// 		.toggleClass('submenu-opened');

		// });

		// var elem = document.querySelectorAll('defend-search');
		// var sLink = document.querySelectorAll('.header-searchLink');
		// if (elem[0] != event.target
		//   && !elem[0].contains(event.target)
		//   && sLink[0] != event.target
		//   && !sLink[0].contains(event.target)) {
		// 	self.searchOpened = false;

		// 	self.link = el.querySelector('.dropDown-link');
		// self.content = el.querySelector('.dropDown-content');
		// self.closeAll = function(e){
		// 	//e.preventDefault();
		// 	if ($(e.target).closest('.dropDown')[0] != el) {
		// 		el.classList.remove('-open');
		// 	}
		// };
		// self.link.addEventListener('click', function(e) {
		// 	e.preventDefault();
		// 	if (el.classList.contains('-open')) {
		// 		el.classList.remove('-open');
		// 	} else {
		// 		el.classList.add('-open');
		// 	}
		// });
		// document.addEventListener('click', self.closeAll);
		// document.addEventListener('touchstart', self.closeAll);

		// })

		// Modal
		// -------
		$('.call-modal').on('click', function(ev) {
			ev.preventDefault();
			winScrollPos = $('body').scrollTop();
			$('body').addClass('modal-opened');
			$('#formModal').addClass('-active');
			$('#formModal .form-error').hide();
			$('#feedbackForm input').removeClass('-error');
			$('#formModal').find('.modal-title-main').text($(this).data('modalTitle'));
		});

		$('.white-page, .close-btn').on('click', function(ev) {
			ev.preventDefault();
			$(this).closest('.modal').removeClass('-active').removeClass('-success').removeClass('-error');
			if ($(this).closest('.modal').find('form').length) {
				$(this).closest('.modal').find('form')[0].reset();
			}
			
			$('body').removeClass('modal-opened');
			$('body').scrollTop(winScrollPos);
		});

		

	    $("#uPhone").mask('+7 (999) 999-99-99',{placeholder:"x"});
		$("#uPhone").on('focus', function(){ 
		if ($(this).val('')) {
				$(this).val('+7 ');
			}
		});

	    $("#uPhone1").mask('+7 (999) 999-99-99',{placeholder:"x"});
		$("#uPhone1").on('focus', function(){ 
		if ($(this).val('')) {
				$(this).val('+7 ');
			}
		});


	    $('#feedbackForm input').on('focus', function(){
	    	$(this).removeClass('-error');
	    	$('input.-error').removeClass('-error');
	    	if (!$('#feedbackForm input').hasClass('-error')) {
	    		$('.form-error').hide();
	    	}
	    });

	    $('#feedbackForm1 input').on('focus', function(){
	    	$(this).removeClass('-error');
	    	$('input.-error').removeClass('-error');
	    	if (!$('#feedbackForm1 input').hasClass('-error')) {
	    		$('.form-error').hide();
	    	}
	    });
	    // end Modal

	    $('#feedbackForm').on('submit', function(ev){
			ev.preventDefault();
			var self = this;

			if ($('#uName').val().length == 0) {
				$('#uName').addClass('-error');
				$(this).find('.form-error').show();
				return false;
			}

			if ($('#uPhone').val().length < 10) {
				$('#uPhone').addClass('-error');
				$(this).find('.form-error').show();
				return false;
			}
			
			var formData = $("#feedbackForm").serialize();

			// console.log(formData);
	        $.ajax({
	            type: "post",
	            url: "send.php",
	            data: formData,
	            // dataType: "text",
	            success: function(data){
	            	$("#feedbackForm")[0].reset();
	                if (data == true){
	                	$('#formModal').removeClass('-error');
	                    $('#formModal').addClass('-success');
	                } else {
	                	$('#formModal').removeClass('-success');
						$('#formModal').addClass('-error');
	                }
	            },
	            error: function(xhr, str){
	                $("#feedbackForm")[0].reset();
	                $('#formModal').removeClass('-success');
	                $('#formModal').addClass('-error');
	            }
	        });
		});

	    $('#feedbackForm1').on('submit', function(ev){
			ev.preventDefault();
			var self = this;

			if ($('#uName1').val().length == 0) {
				$('#uName1').addClass('-error');
				$(this).closest('.order').find('.form-error').show();
				return false;
			}

			if ($('#uPhone1').val().length < 10) {
				$('#uPhone1').addClass('-error');
				$(this).closest('.order').find('.form-error').show();
				return false;
			}
			
			var formData = $("#feedbackForm1").serialize();

			// console.log(formData);
	        $.ajax({
	            type: "post",
	            url: "send.php",
	            data: formData,
	            // dataType: "text",
	            success: function(data){
	            	$("#feedbackForm1")[0].reset();
	            	winScrollPos = $('body').scrollTop();
	            	$('body').addClass('modal-opened');
	            	$('#formModal').addClass('-active');
	                if (data == true){
	                	$('#formModal').addClass('-success');
						// $('#feedbackForm input').removeClass('-error');
						$('#formModal').find('.modal-title-main').text('Спасибо!');
	                } else {
						$('#formModal').addClass('-error');
						// $('#feedbackForm input').removeClass('-error');
						$('#formModal').find('.modal-title-main').text('Ошибка!');
	                }
	            },
	            error: function(xhr, str){
	                $("#feedbackForm1")[0].reset();
	                winScrollPos = $('body').scrollTop();
					$('body').addClass('modal-opened');
					$('#formModal').addClass('-active');
					$('#formModal').addClass('-error');
					// $('#feedbackForm input').removeClass('-error');
					$('#formModal').find('.modal-title-main').text('Ошибка!');
	            }
	        });
		});

	    $('.gallery-filter-item').on('click', function(ev) {
	    	ev.preventDefault();
	    	if (!$(this).hasClass('-active')) {
	    		var gFilter = $(this).attr('href');
	    		$('.gallery-filter-item').removeClass('-active').eq($(this).index()).addClass('-active');
		    	filterGallery(gFilter);
	    	}
	    	
	    	return false;
	    });

	    $('#galleryContent').on('click', '.gallery-item-link', function(ev){
	    	ev.preventDefault();
	    	if ($(this).length) {
	    		var postId = $(this).data('idPost');
	    		console.log(postId);
	    		showGallery(postId);
	    	}
	    });

	    function showGallery(id) {
	    	console.log(id);
	    	$.ajax({
	    		type: "POST",
				dataType: "html",
				url: ajaxData.url,
				data: {
					action: 'get_post_images',
					postId: id
				},
				beforeSend: function() {
	            	// $('#loaderGal').show();
	            	// $('#galleryContent').html('');
	            	if (modalSlider) {
						modalSlider.trigger('destroy.owl.carousel');
					}
	            	winScrollPos = $('body').scrollTop();
					$('body').addClass('modal-opened');
					$('#sliderModal').addClass('-active');
					$('#loaderGal1').show();
	            },
				success: function(data){
					console.log(data);

					if (data != -1 && data != 0 && data.length) {
						
						
						setTimeout(function(){
							var slideImgs = JSON.parse(data);
							console.log(slideImgs);
							$('#sliderModalContainer').html('');
							$('#loaderGal1').hide();
							slideImgs.forEach(function(el,i,arr) {
								var $newDiv = $('<div />').addClass('slider-item');
								$('<img>').attr('src', el).appendTo($newDiv);
								// $newDiv.append($('img').attr('src', el));
								$('#sliderModalContainer').append($newDiv);
								// $('div.slider-item').
								// $('img').attr('src', el).wrap('div.slider-item').appendTo('#sliderModalContainer');

							});

							modalSlider = $('#sliderModalContainer').owlCarousel({
								nav: true,
								items: 1,
								// center:true,
							    // animateIn: 'fadeIn',
							    // animateOut: 'fadeOut',
								// mouseDrag: false,
								// touchDrag: false,
								// lazyLoad: true,
								dots: true,
								dotsContainer: '.nav-dots .owl-dots',
								// smartSpeed:150
								// startPosition: imgInd
								//autoWidth:true
							});
						}, 1000);

						
					}
					// return;
					// var $data = $(data);
					// if($data.length){

						//$("#ajax-posts").append($data);
						//$("#more_posts").attr("disabled",false);
						// setTimeout(function(){
						// 	$('#loaderGal').hide();
						// 	$('#galleryContent').html($data);
						// }, 1000);
						


						// setTimeout(function(){
						// 	$loader.before($data);
						// 	$('body, html').animate({ scrollTop: ($(document).scrollTop() + 300) }, 800);
						// }, 150);

					// } else {
						// $("#more_posts").attr("disabled",true);
						// $loader.hide();
					// }
				},
				error : function(jqXHR, textStatus, errorThrown) {
					// $loader.html(jqXHR + " :: " + textStatus + " :: " + errorThrown);
				}
	    	});
	    	return false;
	    };

		// filter cars in gallery
		function filterGallery(subcat) {
			$.ajax({
				type: "POST",
				dataType: "html",
				url: ajaxData.url,
				data: {
					action: 'filter_gal',
					galSubcat: subcat
				},
				beforeSend: function() {
	            	$('#loaderGal').show();
	            	$('#galleryContent').html('');
	            },
				success: function(data){
					// console.log(data);
					// return;
					var $data = $(data);
					if($data.length){

						//$("#ajax-posts").append($data);
						//$("#more_posts").attr("disabled",false);
						setTimeout(function(){
							$('#loaderGal').hide();
							$('#galleryContent').html($data);
						}, 1000);
						


						// setTimeout(function(){
						// 	$loader.before($data);
						// 	$('body, html').animate({ scrollTop: ($(document).scrollTop() + 300) }, 800);
						// }, 150);

					} else {
						// $("#more_posts").attr("disabled",true);
						// $loader.hide();
					}
				},
				error : function(jqXHR, textStatus, errorThrown) {
					// $loader.html(jqXHR + " :: " + textStatus + " :: " + errorThrown);
				}

			});
			return false;
		};



		$('.gallery-item-link').on('click', function(ev){
			ev.preventDefault();
		});

		$('.current-menu-item').on('click', function(ev){
			// ev.preventDefault();
		});

		if ($('#contactsMap').length) {
			initYMap(document.getElementById('contactsMap'), mapData.address, mapData.hint);	
		}
		

		function initYMap(elem, adr, hint){
			console.log(adr);
			ymaps.ready(function(){
				ymaps.geocode(adr).then(function(res) {
					var pointCoords = res.geoObjects.get(0).geometry.getCoordinates();
					//console.log(pointCoords);
					var yaOffice = new ymaps.Placemark(pointCoords, {hintContent: hint, balloonContent: adr});
					var yaMapContacts2 = new ymaps.Map(elem, {
						center: [pointCoords[0], pointCoords[1]],
						zoom: 15
					});
					yaMapContacts2.geoObjects.add(yaOffice);
				});
			});
		};

	});
	


	

})(jQuery);