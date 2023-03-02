(function($) {

    "use strict";
    var car_rental_slider = function($scope, $) {
        if ( $('.car_drive_slider').length ){
            $('.car_drive_slider').owlCarousel({
                loop:true,
                margin: 128,
                items: 3,
                nav: false,
                autoplay: false,
                smartSpeed: 1500,
                dots:false, 
                navContainerClass: 'car_arrow',
                navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 1,
                        margin: 30,
                    },
                    768: {
                        items: 2,
                        margin: 100,
                    },
                    992: {
                        items: 3,
                        margin: 30,
                    },
                    1199: {
                        items: 3,
                    }
                }
            })
        }
    }

    var carTabSlider = function($scope, $) {
    if ( $('.car_tab_slider').length ){
        $('.car_tab_slider').owlCarousel({
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
$(window).on('elementor/frontend/init', function() {

    elementorFrontend.hooks.addAction('frontend/element_ready/karde_latest_collection_masonry.default', car_rental_slider);
    elementorFrontend.hooks.addAction('frontend/element_ready/karde_latest_collection_masonry.default', carTabSlider);

});
    
})(window.jQuery);