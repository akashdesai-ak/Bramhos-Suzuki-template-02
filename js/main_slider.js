(function($) {

    "use strict";

    var main_slider = function($scope, $) {
        $('.main_slider').on('init', function(e, slick) {
            var $firstAnimatingElements = $('div.slider_item:first-child').find('[data-animation]');
            doAnimations($firstAnimatingElements);
        });
        $('.main_slider').on('beforeChange', function(e, slick, currentSlide, nextSlide) {
            var $animatingElements = $('div.slider_item[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
            doAnimations($animatingElements);
        });

        /*----------------------------------------------------*/
        /*  Main Slider js
        /*----------------------------------------------------*/
        var $status = $('.pagingInfo');
        var $slickElement = $('.main_slider');
        $slickElement.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
            //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
            var i = (currentSlide ? currentSlide : 0) + 1;
            $status.text(i + '/' + slick.slideCount);
        });
        $slickElement.slick({
            autoplay: true,
            autoplaySpeed: 6000,
            speed: 600,
            dots: false,
            fade: true,
            prevArrow: ".arrow_left",
            nextArrow: ".arrow_right",
        });
    }

    function doAnimations(elements) {
        var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        elements.each(function() {
            var $this = $(this);
            var $animationDelay = $this.data('delay');
            var $animationType = 'animated ' + $this.data('animation');
            $this.css({
                'animation-delay': $animationDelay,
                '-webkit-animation-delay': $animationDelay
            });
            $this.addClass($animationType).one(animationEndEvents, function() {
                $this.removeClass($animationType);
            });
        });
    }
    //Elementor JS Hooks
    $(window).on('elementor/frontend/init', function() {

        elementorFrontend.hooks.addAction('frontend/element_ready/karde_banner.default', main_slider);
    });

})(window.jQuery);