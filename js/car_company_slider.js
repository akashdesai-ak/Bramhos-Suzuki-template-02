(function($) {

    "use strict";
    
    var car_company_slider = function($scope, $) {
        if ( $('.car_company_slider').length ){
            $('.car_company_slider').owlCarousel({
                loop:true,
                margin: 30,
                items: 8,
                nav: false,
                autoplay: false,
                smartSpeed: 1500,
                dots:false, 
				navContainerClass: 'car_arrow',
                navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 2,
                    },
                    575: {
                        items: 3,
                    },
                    768: {
                        items: 6,
                    },
                    992: {
                        items: 8,
                    }
                }
            })
        }
}

var tractor_brand_slider = function($scope, $) {
    if ( $('.tractor_brand_slider').length ){
        $('.tractor_brand_slider').owlCarousel({
            loop:true,
            margin: 0,
            items: 5,
            nav: false,
            autoplay: true,
            smartSpeed: 700,
            dots:true, 
            responsiveClass: true,
            responsive: {
                0: {
                    items: 2,
                },
                575: {
                    items: 3,
                },
                767: {
                    items: 5,
                },
            }
        })
    }
    }
    //Elementor JS Hooks
    $(window).on('elementor/frontend/init', function() {

        elementorFrontend.hooks.addAction('frontend/element_ready/karde_popular_brands.default', car_company_slider);
        elementorFrontend.hooks.addAction('frontend/element_ready/karde_popular_brands.default', tractor_brand_slider);
    });
        
    })(window.jQuery);