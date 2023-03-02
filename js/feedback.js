(function($) {

    "use strict";
    var feedback = function($scope, $) {

        if ($('.client_slider').length) {
            $('.client_slider').owlCarousel({
                loop: true,
                margin: 30,
                items: 1,
                nav: false,
                autoplay: true,
                smartSpeed: 1500,
                dots: true,
            })
        }
    }
    var testi_slider = function($scope, $) {
        if ($('.testi_slider').length) {
            $('.testi_slider').owlCarousel({
                loop: true,
                margin: 0,
                items: 3,
                nav: false,
                autoplay: true,
                smartSpeed: 1500,
                dots: true,
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 1,
                    },
                    767: {
                        items: 2,
                    },
                    992: {
                        items: 3,
                    },
                }
            })
        }
    }
    var client_slider = function($scope, $) {
        if ( $('.client_slider').length ){
            $('.client_slider').owlCarousel({
                loop:true,
                margin: 30,
                items: 1,
                nav: false,
                autoplay: true,
                smartSpeed: 1500,
                dots:true, 
            })
        }

}
    //Elementor JS Hooks
    $(window).on('elementor/frontend/init', function() {
        elementorFrontend.hooks.addAction('frontend/element_ready/karde_testimonial.default', feedback);
        elementorFrontend.hooks.addAction('frontend/element_ready/karde_testimonial.default', testi_slider);
        elementorFrontend.hooks.addAction('frontend/element_ready/karde_testimonial.default', client_slider);
    });
        
    })(window.jQuery);