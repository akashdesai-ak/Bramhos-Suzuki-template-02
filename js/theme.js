;
(function($) {
    "use strict"




    var nav_offset_top = $('header').height() + 50;
    /*-------------------------------------------------------------------------------
	  Navbar 
	-------------------------------------------------------------------------------*/

    //* Navbar Fixed  
    function navbarFixed() {
        if ($('.header_area').length) {
            $(window).scroll(function() {
                var scroll = $(window).scrollTop();
                if (scroll >= nav_offset_top) {
                    if (!$(".header_area").hasClass("non_sticky")) {
                        $(".header_area").addClass("navbar_fixed");
                    }
                } else {
                    $(".header_area").removeClass("navbar_fixed");
                }
            });
        };
    };
    navbarFixed();

    $('.menu_list li a').each(function() {
        var $this = $(this);
        $this.on('click', function(e) {
            var has = $this.hasClass('open');
            $('.menu_list li a').removeClass('open');
            if (has) {
                $this.removeClass('open');
            } else {
                $this.addClass('open');
            }
        });
    });

    //page breadcrumb
	
	jQuery( ".bg_image" ).each(function() {
        var attr = $(this).attr('data-image-src');
        if (typeof attr !== typeof undefined && attr !== false) {
            $(this).css('background-image', 'url('+attr+')');
        }
	});


    /*--------------- mobile dropdown js--------*/
    function Menu_js() {
        if ($('.dropdown').length) {
            $('.dropdown > .dropdown-toggle').click(function() {
                var location = $(this).attr('href');
                window.location.href = location;
                return false;
            });
        }
    }
    Menu_js();

    var dropToggle = $('.menu_list > li').has('ul').children('a');
    dropToggle.on('click', function() {
        dropToggle.not(this).closest('li').find('ul').slideUp(300);
        $(this).closest('li').children('ul').slideToggle(300);
        return false;
    });

    function dropdown_js() {
        $('.dropdown > a').after(('<span class="menu_icon" aria-hidden="true" data-toggle="dropdown" />'));
        $('.menu_nav > li .menu_icon').on('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            if ($(this).next('ul').hasClass('showd')) {
                $(this).closest('li').toggleClass('show');
                $(this).next('ul').slideUp();
                $(this).next('ul').removeClass('showd');
            } else {
                if ($(this).closest('li').hasClass('depth-0')) {
                    $('li.depth-0').removeClass('show');
                    $('ul.dropdown-menu').removeClass('showd');
                }
                $(this).closest('li').toggleClass('show');
                $(this).next('ul').slideDown();
                $(this).next('ul').addClass('showd');
            }
        });
    }
    dropdown_js();

    $('.close_icon').on('click', function() {
        $('body').removeClass('menu-is-opened').addClass('menu-is-closed');
        $('.menu_list ul').slideUp(300);
        $('.menu_list li a').removeClass('open');
    });
    $('.bar_menu').on('click', function() {
        $('body').removeClass('menu-is-closed').addClass('menu-is-opened');
        return false;
    });


    function datetime_picker() {
        if ($('#datetimepicker3')) {
            $('#datetimepicker3').datetimepicker();
        }
    }
    datetime_picker();

    function datetime_picker2() {
        if ($('#datetimepicker4')) {
            $('#datetimepicker4').datetimepicker();
        }
    }
    datetime_picker2();



    function time_picker2() {
        if ($('#datetimepicker5').length) {
            $('#datetimepicker5').datetimepicker({
                format: 'LT'
            });
        }
    }
    time_picker2();

    $('.input-group.date input, .click_1').on('click', function() {
        $('.input-group.date input').addClass('white');
        $('.input_1').addClass('white');
    });
    $('.input-group.time input, .click_2').on('click', function() {
        $('.input-group.time input').addClass('white');
        $('.input_2').addClass('white');
    });



    function video_popup() {
        if ($('.popup-youtube, .popup-vimeo, .popup-gmaps').length) {
            $(document).ready(function() {
                $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
                    disableOn: 700,
                    type: 'iframe',
                    mainClass: 'mfp-fade',
                    removalDelay: 160,
                    preloader: false,

                    fixedContentPos: false
                });
            });
        }
    }
    video_popup();



    /*----------------------------------------------------*/
    /*  Gallery One js
    /*----------------------------------------------------*/
    function gallery_isotope() {
        if ($('.bike_type_inner').length) {

            // Activate isotope in container
            $(".bike_type_inner").imagesLoaded(function() {
                $(".bike_type_inner").isotope({
                    layoutMode: 'fitRows',
                    percentPosition: true,
                    masonry: {
                        columnWidth: 1,
                    }
                });
            });

            // Add isotope click function
            $(".g_fillter ul li").on('click', function() {
                $(".g_fillter ul li").removeClass("active");
                $(this).addClass("active");

                var selector = $(this).attr("data-filter");
                $(".bike_type_inner").isotope({
                    filter: selector,
                    animationOptions: {
                        duration: 450,
                        easing: "linear",
                        queue: false,
                    }
                });
                return false;
            });
        }
    }

    gallery_isotope();

    function niceSelect() {
        if ($('.nice_select').length) {
            $('.nice_select').niceSelect();
        }
    }
    niceSelect();

    /*----------------------------------------------------*/
    /*  Wow Animation Active js
    /*----------------------------------------------------*/
    function bodyScrollAnimation() {
        var scrollAnimate = $('body').data('scroll-animation');
        if (scrollAnimate) {
            new WOW({
                mobile: false
            }).init()
        }
    }
    bodyScrollAnimation();


    function image_swipe() {
        if ($('.image_swipe').length) {
            $(".image_swipe").twentytwenty();
        }
    }
    image_swipe();


    /*----------------------------------------------------*/
    /*  Search Popup js
    /*----------------------------------------------------*/
    function popupAnimation() {
        if ($('.popup-with-zoom-anim').length) {
            $(document).ready(function() {
                $('.popup-with-zoom-anim').magnificPopup({
                    type: 'inline',

                    fixedContentPos: false,
                    fixedBgPos: true,

                    overflowY: 'auto',

                    closeBtnInside: true,
                    preloader: false,

                    midClick: true,
                    removalDelay: 300,
                    mainClass: 'my-mfp-zoom-in'
                });

                $('.popup-with-move-anim').magnificPopup({
                    type: 'inline',

                    fixedContentPos: false,
                    fixedBgPos: true,

                    overflowY: 'auto',

                    closeBtnInside: true,
                    preloader: false,

                    midClick: true,
                    removalDelay: 300,
                    mainClass: 'my-mfp-slide-bottom'
                });
            });
        }
    }
    popupAnimation();


    /*----------------------------------------------------*/
    /*  Simple LightBox js
    /*----------------------------------------------------*/

    function counterup() {
        if ($('.counter').length) {
            $('.counter').counterUp({
                delay: 10,
                time: 1000
            });
        }
    }
    counterup();

    function product_slider() {
        if ($('.product_main_slider').length) {
            $('.product_main_slider').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: true,
                asNavFor: '.product_nav_slider',
                accessibility: false
            });

        }

    }
    product_slider();

    function product_slider_nav() {
        if ($('.product_nav_slider').length) {
            $('.product_nav_slider').slick({
                slidesToShow: 5,
                slidesToScroll: 1,
                asNavFor: '.product_main_slider',
                dots: false,
                centerMode: false,
                focusOnSelect: true,
                accessibility: false
            });
        }

    }
    product_slider_nav();

    function nice_scroll() {
        if ($('.nice_scroll').length) {
            $(".nice_scroll").niceScroll({
                cursorcolor: "#999b9d",
                cursorwidth: "6px",
            });
        }
    }
    nice_scroll();

    setTimeout(function() {
        $('.preloader').addClass('loaded');
        // Una vez haya terminado el preloader aparezca el scroll
        $('body').removeClass('no-scroll-y');

        if ($('.preloader').hasClass('loaded')) {
            // Es para que una vez que se haya ido el preloader se elimine toda la seccion preloader
            $('.preloader').delay(100).queue(function() {
                $(this).remove();
            });
        }
    }, 100);


    function range_slider() {

        if ($('#slider-range').length) {

            $("#slider-range").slider({
                range: true,
                min: parseInt(milage_slider.minm),
                max: parseInt(milage_slider.maxm),
                values: [milage_slider.min_milage, milage_slider.max_milage],
                slide: function(event, ui) {
                    $("#amount").val("m" + ui.values[0] + " - m" + ui.values[1]);
                    $('#minm').val(ui.values[0]);
                    $('#maxm').val(ui.values[1]);
                    $('#minm').attr('name', 'min_milage');
                    $('#maxm').attr('name', 'max_milage');
                }
            });
            $("#amount").val("m" + $("#slider-range").slider("values", 0) +
                " - m" + $("#slider-range").slider("values", 1));
        }
    }
    range_slider();


    function range_slider2() {
        if ($('#slider-range2').length) {
            $("#slider-range2").slider({
                range: true,
                min: parseInt(price_slider.min),
                max: parseInt(price_slider.max),
                values: [price_slider.min_val, price_slider.max_val],
                slide: function(event, ui) {
                    if (price_slider.currency_pos == 'before') {
                        $("#amount2").val(price_slider.currency + ui.values[0] + " - " + price_slider.currency + ui.values[1]);
                    } else {
                        $("#amount2").val(ui.values[0] + price_slider.currency + " - " + ui.values[1] + price_slider.currency);
                    }
                    $('#minp').val(ui.values[0]);
                    $('#maxp').val(ui.values[1]);
                    $('#minp').attr('name', 'min_price');
                    $('#maxp').attr('name', 'max_price');
                }
            });
            if (price_slider.currency_pos == 'before') {
                $("#amount2").val(price_slider.currency + $("#slider-range2").slider("values", 0) +
                    " - " + price_slider.currency + $("#slider-range2").slider("values", 1));
            } else {
                $("#amount2").val($("#slider-range2").slider("values", 0) + price_slider.currency +
                    " - " + $("#slider-range2").slider("values", 1) + price_slider.currency);
            }
        }

    }
    range_slider2();

    function price_widget() {
        if ($('#price_wd').length) {
            $("#price_wd").slider({
                range: true,
                min: parseInt(price_slider.min),
                max: parseInt(price_slider.max),
                values: [price_slider.min_val, price_slider.max_val],
                slide: function(event, ui) {
                    if (price_slider.currency_pos == 'before') {
                        $("#amount").val(price_slider.currency + ui.values[0] + " - " + price_slider.currency + ui.values[1]);
                    } else {
                        $("#amount").val(ui.values[0] + price_slider.currency + " - " + ui.values[1] + price_slider.currency);
                    }
                    $('#minp').val(ui.values[0]);
                    $('#maxp').val(ui.values[1]);
                    $('#minp').attr('name', 'min_price');
                    $('#maxp').attr('name', 'max_price');
                }
            });
            if (price_slider.currency_pos == 'before') {
                $("#amount").val(price_slider.currency + $("#price_wd").slider("values", 0) +
                    " - " + price_slider.currency + $("#price_wd").slider("values", 1));
            } else {
                $("#amount").val($("#price_wd").slider("values", 0) + price_slider.currency +
                    " - " + $("#price_wd").slider("values", 1) + price_slider.currency);
            }
        }

    }
    price_widget();

    $('#commentform').submit(function(event) {

        if($(this).hasClass("comment-woocommerce")){
            return;
        }

        event.preventDefault();
        
        // define some vars
        var button = $('#submit'), // submit button
            respond = $('#respond'), // comment form container
            commentlist = $('.comment-list'), // comment list container
            cancelreplylink = $('#cancel-comment-reply-link');

        // if comment form isn't in process, submit it
        if (!button.hasClass('loadingform') && !$('#author').hasClass('error') && !$('#email').hasClass('error') && !$('#comment').hasClass('error')) {

            // ajax request
            $.ajax({
                type: 'POST',
                url: motodeal_object.ajax_url, // admin-ajax.php URL
                data: $(this).serialize() + '&action=ajaxcomments', // send form data + action parameter
                beforeSend: function(xhr) {
                    // what to do just after the form has been submitted
                    button.addClass('loadingform').val('Loading...');
                },
                error: function(request, status, error) {
                    if (status == 500) {
                        alert('Error while adding comment');
                    } else if (status == 'timeout') {
                        alert('Error: Server doesn\'t respond.');
                    } else {
                        // process WordPress errors
                        var wpErrorHtml = request.responseText.split("<p>"),
                            wpErrorStr = wpErrorHtml[1].split("</p>");

                        alert(wpErrorStr[0]);
                    }
                },
                success: function(addedCommentHTML) {
                    // if this post already has comments
                    if (commentlist.length > 0) {
                        // if in reply to another comment
                        if (respond.siblings().hasClass('comment')) {
                            // if the other replies exist
                            if (respond.parent().children('.children').length) {
                                respond.parent().children('.children').append(addedCommentHTML);
                            } else {
                                // if no replies, add <ol class="children">
                                addedCommentHTML = '<ol class="children">' + addedCommentHTML + '</ol>';
                                respond.before(addedCommentHTML);
                            }
                            // close respond form
                            cancelreplylink.trigger("click");
                        } else {
                            // simple comment
                            commentlist.append(addedCommentHTML);
                        }
                    } else {
                        $('.s_comment_area').before($(addedCommentHTML));
                    }
                    // clear textarea field
                    $('#comment').val('');
                },
                complete: function() {
                    // what to do after a comment has been added
                    button.removeClass('loadingform').val('Post Comment');
                }
            });
        }
        return false;
    });
})(jQuery)