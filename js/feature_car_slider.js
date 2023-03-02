(function ($) {
  "use strict";
  var feature_car_slider = function ($scope, $) {
    if ($(".f_car_slider").length) {
      $(".f_car_slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 3,
        nav: false,
        autoplay: true,
        smartSpeed: 1500,
        dots: false,
        center: false,
        navContainerClass: "car_arrow",
        navText: [
          '<i class="fa fa-angle-left" aria-hidden="true"></i>',
          '<i class="fa fa-angle-right" aria-hidden="true"></i>',
        ],
        responsiveClass: true,
        responsive: {
          0: {
            items: 1,
          },
          768: {
            items: 2,
          },
          992: {
            items: 3,
          },
        },
      });
    }
  };

  var feature_bike_slider = function ($scope, $) {
    if ($(".feature_bike_slider").length) {
      $(".feature_bike_slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        nav: false,
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        center: true,
        stagePadding: 560,
        responsiveClass: true,
        responsive: {
          0: {
            items: 1,
            stagePadding: 0,
          },
          600: {
            items: 1,
            stagePadding: 100,
          },
          900: {
            items: 1,
            stagePadding: 300,
          },
          1200: {
            items: 1,
            stagePadding: 420,
          },
          1500: {
            items: 1,
          },
        },
      });
    }
  };

  var feature_yacht_slider = function ($scope, $) {
    if ($(".f_yacht_slider").length) {
      $(".f_yacht_slider").owlCarousel({
        loop: true,
        margin: 30,
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
        },
      });
    }
  };

  var truck_feature_slider = function ($scope, $) {
    if ($(".truck_type_slider").length) {
      $(".truck_type_slider").owlCarousel({
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
          768: {
            items: 2,
          },
          992: {
            items: 3,
          },
        },
      });
    }
  };

  //Elementor JS Hooks
  $(window).on("elementor/frontend/init", function () {
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/karde_feature_car.default",
      feature_car_slider
    );
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/karde_feature_car.default",
      feature_bike_slider
    );
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/karde_feature_car.default",
      feature_yacht_slider
    );
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/karde_feature_car.default",
      truck_feature_slider
    );
  });
})(window.jQuery);
