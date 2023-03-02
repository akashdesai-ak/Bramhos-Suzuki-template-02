(function($) {
	'use strict';

    // Navbar Js
        $(window).on('scroll', function() {
        if ($(this).scrollTop() > 100) {
            $('.main-nav').addClass('menu-shrink');
        } else {
            $('.main-nav').removeClass('menu-shrink');
        }
    });
    
    // Preloader
    jQuery(window).on('load', function() {
        $('.preloader').fadeOut();
    });

    // Mean Menu Js
    jQuery('.mean-menu').meanmenu({
        meanScreenWidth: "991"
    }); 
    
    // Main Slider Js
    $('.main-slider').owlCarousel({
        items:1,
        loop:true,
        nav:true,
        dots:false,
        autoplay: true,
        autoplayHoverPause: true,
        smartSpeed: 2000,
        autoplayTimeout: 8000,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
    });

    // Main Slider Js
    $('.add-slider').owlCarousel({
        items:1,
        loop:true,
        nav:true,
        dots:false,
        margin: 40,
        autoplay: true,
        autoplayHoverPause: true,
        smartSpeed: 2000,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
    });

    $(".main-slider").on("translate.owl.carousel", function(){
        $(".single-slider-item .slider-text h1").removeClass("animated fadeInUp").css("opacity", "0");
        $(".single-slider-item .slider-text p").removeClass("animated fadeInUp").css("opacity", "0");
        $(".single-slider-item .slider-text .slider-button").removeClass("animated fadeInDown").css("opacity", "0");
    });
    
    $(".main-slider").on("translated.owl.carousel", function(){
        $(".single-slider-item .slider-text h1").addClass("animated fadeInUp").css("opacity", "1");
        $(".single-slider-item .slider-text p").addClass("animated fadeInUp").css("opacity", "1");
        $(".single-slider-item .slider-text .slider-button").addClass("animated fadeInDown").css("opacity", "1");
    });

    //Searchbx 
        $('a[href=".search"]').on("click", function(event) {
        event.preventDefault();
        $(".search").addClass("open");
        $('.search > form > input[type="search"]').focus();
    });
    $(".search, .search button.close").on("click keyup", function(event) {
        if (
            event.target == this ||
            event.target.className == "close" ||
            event.keyCode == 27
        ) {
            $(this).removeClass("open");
        }
    });
    $("form").on('submit',function(event) {
        event.preventDefault();
        return false;
    });

    // Testimonial Js
    $('.testimonial-slider').owlCarousel({
        loop:true,
        margin:20,
        nav:false,
        autoplay: true,
        dots: true,
        smartSpeed: 2000,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },
            768:{
                items:3,
                margin: 20,
            },
            992:{
                items:3	
            }
        }
    });

    // Logo Js
    $('.logo-slider').owlCarousel({
        loop:true,
        margin:10,
        nav:false,
        autoplay: true,
        dots: true,
        responsive:{
            0:{
                items:1
            },
            576:{
                items:3
            },
            600:{
                items:4
            },
            992:{
                items:5
            },
            1000:{
                items:5
            }
        }
    });

    // Gallery Js
    $('.gallery-slider').owlCarousel({
        loop:true,
        nav:false,
        autoplay: true,
        dots: true,
        autoplayHoverPause: true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },
            992:{
                items:4
            },
        }
    });

    // News Js
    $('.news-slider').owlCarousel({
        loop:true,
        nav:false,
        margin: 20,
        autoplay: true,
        dots: true,
        autoplayHoverPause: true,
        responsive:{
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            },
        }
    });

    // Related Js
    $('.related-post-slider').owlCarousel({
        loop:true,
        nav:false,
        margin: 20,
        autoplay: true,
        dots: true,
        autoplayHoverPause: true,
        responsive:{
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            },
        }
    });

    $(document).ready(function() {
        $('.popup-youtube, .popup-vimeo').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
    
            fixedContentPos: false
        });
    });

    // Services Details Slider Js
    if ($(".single-item-slider").length) {
        $('.slider-for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.slider-nav',
        });
        
        $('.slider-nav').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            asNavFor: '.slider-for',
            focusOnSelect: true,
            responsive: [
                {
                    breakpoint: 500,
                    settings: {
                    slidesToShow: 2,
                        infinite: true
                    }
                },
                {
                    breakpoint: 400,
                    settings: {
                        slidesToShow: 2
                    }
                }
            ]
        });
    };

    // Shop Details Slider Js
    if ($(".shop-single-slider").length) {
        $('.slider-for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.slider-nav'
        });
        $('.slider-nav').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            asNavFor: '.slider-for',
            focusOnSelect: true,
            responsive: [
                {
                    breakpoint: 500,
                    settings: {
                    slidesToShow: 2,
                        infinite: true
                    }
                },
                {
                    breakpoint: 400,
                    settings: {
                        slidesToShow: 2
                    }
                }
            ]
        });
    };

    // Input Plus & Minus Number JS
    $('.input-counter').each(function() {
        var spinner = jQuery(this),
        input = spinner.find('input[type="text"]'),
        btnUp = spinner.find('.plus-btn'),
        btnDown = spinner.find('.minus-btn'),
        min = input.attr('min'),
        max = input.attr('max');
        
        btnUp.on('click', function() {
            var oldValue = parseFloat(input.val());
            if (oldValue >= max) {
                var newVal = oldValue;
            } else {
                var newVal = oldValue + 1;
            }
            spinner.find("input").val(newVal);
            spinner.find("input").trigger("change");
        });
        btnDown.on('click', function() {
            var oldValue = parseFloat(input.val());
            if (oldValue <= min) {
                var newVal = oldValue;
            } else {
                var newVal = oldValue - 1;
            }
            spinner.find("input").val(newVal);
            spinner.find("input").trigger("change");
        });
    });
    
    // Video popup
    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });

    // Nice Select JS
    $('select').niceSelect();

    // Wow Js
    new WOW().init();

    // Back To Top
    $('body').append('<div id="toTop"><i class="fa fa-angle-up" aria-hidden="true"></i></div>');
    $(window).on('scroll', function () {
        if ($(this).scrollTop() != 0) {
            $('#toTop').fadeIn();
        } else {
            $('#toTop').fadeOut();
        }
    }); 
    
    $('#toTop').on('click', function(){
        $("html, body").animate({ scrollTop: 0 }, 50);
        return false;
    });

    // Subscribe form
    $(".newsletter-form").validator().on("submit", function (event) {
        if (event.isDefaultPrevented()) {
        // handle the invalid form...
            formErrorSub();
            submitMSGSub(false, "Please enter your email correctly.");
        } else {
            // everything looks good!
            event.preventDefault();
        }
    });
    function callbackFunction (resp) {
        if (resp.result === "success") {
            formSuccessSub();
        }
        else {
            formErrorSub();
        }
    }
    function formSuccessSub(){
        $(".newsletter-form")[0].reset();
        submitMSGSub(true, "Thank you for subscribing!");
        setTimeout(function() {
            $("#validator-newsletter").addClass('hide');
        }, 4000)
    }
    function formErrorSub(){
        $(".newsletter-form").addClass("animated shake");
        setTimeout(function() {
            $(".newsletter-form").removeClass("animated shake");
        }, 1000)
    }
    function submitMSGSub(valid, msg){
        if(valid){
            var msgClasses = "validation-success";
        } else {
            var msgClasses = "validation-danger";
        }
        $("#validator-newsletter").removeClass().addClass(msgClasses).text(msg);
    }
    
    // AJAX MailChimp
    // $(".newsletter-form").ajaxChimp({
    //     url: "https://Envy Theme.us20.list-manage.com/subscribe/post?u=60e1ffe2e8a68ce1204cd39a5&amp;id=42d6d188d9", // Your url MailChimp
    //     callback: callbackFunction
    // });
    
})(jQuery);