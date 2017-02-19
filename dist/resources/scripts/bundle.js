/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';
	
	$(function () {
	    $('a').click(function (e) {
	        var scrollTo = e.currentTarget.hash;
	
	        $('html, body').animate({
	            scrollTop: $(scrollTo).offset().top
	        }, 1000);
	    });
	
	    $('#rsvp-form').on('submit', function (e) {
	        e.preventDefault;
	        var baseURL = 'https://docs.google.com/forms/d/e/';
	        var formId = '1FAIpQLSdGUf3zSOVNZJ0zPsayqP4U1VuGvrhFUQh09Z0oP905JU-yXg/';
	        var submitRef = 'submit=8869835504486836160';
	
	        var gInputIds = ['216944502', '2016456273', '971476322', '597427551', '1223284537'];
	
	        $('.loader').addClass('loader-default is-active');
	        $('.loader').attr({
	            'data-half': '',
	            'data-text': 'Submitting your RSVP'
	        });
	
	        $('#modal').iziModal({
	            title: 'RSVP Successful! Thank you!',
	            icon: 'icon-check',
	            headerColor: '#00af66',
	            width: 600,
	            timeout: 10000,
	            timeoutProgressbar: true,
	            transitionIn: 'fadeInUp',
	            transitionOut: 'fadeOutDown',
	            pauseOnHover: true,
	            onOpened: function onOpened() {
	                console.log('i opened');
	            },
	            onClosed: function onClosed() {
	                $('#rsvp').fadeOut();
	                $('a[href="#rsvp"]').fadeOut();
	            }
	        });
	
	        setTimeout(success, 3000);
	        //  data-half data-blink data-text="Submitting your RSVP..."
	
	        var formData = $(this).serializeArray();
	        var responseData = formData.reduce(function (a, v, i) {
	            return a + ('entry.' + gInputIds[i] + '=' + encodeURIComponent(v.value) + '&');
	        }, new String());
	        var data = '' + responseData + submitRef;
	        var submitURL = '' + baseURL + formId + 'formResponse?' + responseData + submitRef;
	        console.log(submitURL);
	        $(this)[0].action = submitURL;
	        // $.ajax({
	        //     url: 'https://docs.google.com/forms/d/e/1FAIpQLSdGUf3zSOVNZJ0zPsayqP4U1VuGvrhFUQh09Z0oP905JU-yXg/formResponse?',
	        //     method: 'POST',
	        //     data: data
	        // })
	        // .always(function(e) {
	        //     console.log(e);
	        // });
	    });
	
	    $('.location-subhead-container').on('click', function (e) {
	        $(this).children().filter('svg').toggleClass('open');
	        $(this).next('.copy').slideToggle();
	    });
	});
	
	function success() {
	    $('.loader').removeClass('loader-default is-active');
	    $('.loader').removeAttr('data-half');
	    $('.loader').removeAttr('data-text');
	    setTimeout(removeStuff, 500);
	}
	
	function removeStuff() {
	    $('#modal').iziModal('open');
	}

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map