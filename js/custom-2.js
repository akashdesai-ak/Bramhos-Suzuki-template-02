;
(function($) {
    "use strict"

    function wd_scroll() {
        if ($('.wd_scroll').length) {
            $(window).on("load", function() {
                $(".wd_scroll").mCustomScrollbar({
                    theme: "dark",
                });
            });
        }
    }
    wd_scroll();

    $(document).ready(function() {
        $(document).on("click", ".cart_bag_btn", function() {
            $('body').addClass('cart_open');
            return false;
        });
        $(document).on("click", ".cart_close_btn", function() {
            $('body').removeClass('cart_open');
        });

        $('.m-listing-paginate').find('a.page-numbers').addClass('m_listing_paginate');

        $('.m_listing_paginate').on("click", function(e) {
            e.preventDefault()
            var $href = $(this).attr('href');
            var paged_val = $href.slice(-1);
            $("#motodeal_paged").val(paged_val);
            $('#sidebar_search').submit();

        });

        $('.id-filter-var').on("click", function(e) {
            console.log('clicked');
            e.preventDefault();
            var val = $(this).data('filvar');
            $("#" + val).prop("checked", false);
            $("#_" + val + "_").remove();
            $('#sidebar_search').submit();
        });

        $('.id-filter-price').on("click", function(e) {
            e.preventDefault();
            $('#minp').val('');
            $('#maxp').val('');
            $('#minp').removeAttr('name');
            $('#maxp').removeAttr('name');
            $('#sidebar_search').submit();
        });


        $('.layout_selector').on("click", function(e) {
            e.preventDefault();
            var val = $(this).data('selector');
            $('#slector_hidden').val(val);
            $('#sidebar_search').submit();
        });

        $('.klisting-ordering').on("change", function(e) {
            e.preventDefault();
            $('#sidebar_search').submit();
        });

        $('.motor_search_submit').on("click", function(e) {
            e.preventDefault();
            $('#motor_search_form').submit();
        });


        $('.filter-atag').on("click", function(e) {
            e.preventDefault();
            var val = $(this).data('value');
            var name = $(this).data('nm');
            if ($(this).closest('.type_item').hasClass("selected_type_item")) {
                $(this).closest('.type_item').removeClass("selected_type_item");
                $(this).siblings(".hidden_select").remove();
            } else {
                $(this).closest('.type_item').addClass("selected_type_item");
                $(this).closest('.type_item').append('<input type="hidden" id="_' + val + '_" class="hidden_select" name="' + name + '[]" value="' + val + '">');
            }

        });

        $('.karde_listing_sidebar_filter_submit').on("click", function(e) {
            e.preventDefault();
            $('#sidebar_search').submit();
        });


        $('.karde-listing-addcart').on("click", function(e) {

            var id = $(this).data('product_id');
            var selectorid = $(this).attr('id');
            var quantity = 1;
            var price = $(this).attr('data-price');
            var vehicle = $(this).attr('data-vehicle-title');
            var $this = $(this);
            $.ajax({
                type: "POST",
                url: klisting_object.ajax_url,
                data: {
                    action: klisting_object.prefix + 'add_to_cart',
                    product_id: id,
                    price: price,
                    quantity: quantity,
                    vehicle: vehicle
                },
                success: function(res) {
                    if (res = 'success')
                        $("body").trigger("wc_fragment_refresh")
                    $this.show();
                }
            });
        });

        $(document).on('click', '.remove-mini-cart', function(e) {
            e.preventDefault();
            $(this).closest('.item_in_cart').siblings('.d-flex').find('.loader-cart-delete').append('<img src="' + klisting_object.loader_img + '">');
            var id = $(this).data('pro_id')
            var cart_item_key = $(this).data('cart_item_key')
            $.ajax({
                type: "POST",
                url: klisting_object.ajax_url,
                data: {
                    action: klisting_object.prefix + 'product_remove_from_mini_cart',
                    product_id: id,
                    cart_item_key: cart_item_key
                },
                success: function(res) {
                    if (res.fragments) {
                        $('.woo-top-cart').replaceWith(res.fragments['.woo-top-cart'])
                        $('div.cart_sidebar').replaceWith(res.fragments['div.cart_sidebar'])
                    }
                    $('.loader-cart-delete').replaceWith('');
                }
            });
        })

        $('.enq_submit').on("click", function(e) {
            e.preventDefault();
            var flag = 1;
            var fields = $(this).closest('#contactForm')
            fields = fields.serializeArray();
            var data = {
                action: klisting_object.prefix + 'enquiry_submit'
            }
            var pop_close = $('.pop_close').val();
            $.each(fields, function(i, field) {
                if (field.name != 'enq_number' && field.value == '') {
                    $('input[name="' + field.name + '"]').focus();
                    $('textarea[name="' + field.name + '"]').focus();
                    flag = 0;
                    return false;
                } else if (field.name == 'enq_email') {
                    if (!KardeIsEmail(field.value)) {
                        $('input[name="' + field.name + '"]').focus();
                        flag = 0;
                        return false;
                    }
                }
                data[field.name] = field.value;
            });

            if (flag == 1) {
                $.ajax({
                    type: "POST",
                    url: klisting_object.ajax_url,
                    data: data,
                    success: function(res) {
                        if (res == 1) {
                            $('.enq_success').show();
                            $('.enq_submit').remove();
                            if (pop_close == 1) {
                                setTimeout(function() {
                                    var magnificPopup = $.magnificPopup.instance;
                                    magnificPopup.close();
                                }, 1000);
                            }
                        } else {
                            $('.enq_error').show();

                        }
                    }
                });
            }

        });

        if ($('.calculator_area').length) {
            $('.btn_calculator').on('click', function(e) {
                e.preventDefault();
                var fields = $(this).closest('#calculate_form')
                var data = [];
                var flag = 1;
                fields = fields.serializeArray();
                $.each(fields, function(i, field) {
                    if (field.value == '') {
                        $('input[name="' + field.name + '"]').focus();
                        flag = 0;
                        return false;
                    }
                    data[field.name] = field.value;

                });
                if (flag == 1) {


                    $(".monthly_result").empty();
                    $(".tot__down_result").empty();

                    $(".tot_result").empty();
                    $(".interest_result").empty();
                    console.log(fields);

                    var vehicle_price = parseFloat(data["calc_price"]);
                    var down_payment = parseFloat(data["down_payment"]);

                    var interest_rate = parseFloat(data["interest_rate"]);

                    if (isNaN(interest_rate) || interest_rate == "") {
                        interest_rate = 0;
                    }

                    console.log(interest_rate);

                    interest_rate = interest_rate / 1200;



                    var period = parseFloat(data["period"]);


                    var monthly = 0;
                    var interest = 0;
                    var total = 0;
                    var total_d = 0;

                    if (interest_rate == 0) {
                        monthly = (vehicle_price - down_payment) / period;
                        total = down_payment + (monthly * period);
                        total = down_payment + (monthly * period);
                        total = total.toFixed(2);

                        total_d = (monthly * period);
                        total_d = total_d.toFixed(2);
                    } else {
                        monthly = (vehicle_price - down_payment) * interest_rate * Math.pow(1 + interest_rate, period);
                        monthly = monthly / ((Math.pow(1 + interest_rate, period)) - 1);
                        monthly = monthly.toFixed(2);

                        total = down_payment + (monthly * period);
                        total = total.toFixed(2);

                        total_d = (monthly * period);
                        total_d = total_d.toFixed(2);


                        interest = total - vehicle_price;
                        interest = interest.toFixed(2);
                    }



                    if (klisting_object.currency_position == 'before') {

                        $(".monthly_result").append(klisting_object.currency + monthly);
                        $(".tot__down_result").append(klisting_object.currency + total_d);
                        $(".tot_result").append(klisting_object.currency + total);
                        $(".interest_result").append(klisting_object.currency + interest);

                    } else if (klisting_object.currency_position == 'after') {

                        $(".monthly_result").append(monthly + klisting_object.currency);
                        $(".tot__down_result").append(total_d + klisting_object.currency);
                        $(".tot_result").append(total + klisting_object.currency);
                        $(".interest_result").append(interest + klisting_object.currency);

                    } else if (klisting_object.currency_position == 'after_space') {

                        $(".monthly_result").append(monthly + " " + klisting_object.currency);
                        $(".tot__down_result").append(total_d + " " + klisting_object.currency);
                        $(".tot_result").append(total + " " + klisting_object.currency);
                        $(".interest_result").append(interest + " " + klisting_object.currency);

                    } else if (klisting_object.currency_position == 'before_space') {

                        $(".monthly_result").append(klisting_object.currency + " " + monthly);
                        $(".tot__down_result").append(klisting_object.currency + " " + total_d);
                        $(".tot_result").append(klisting_object.currency + " " + total);
                        $(".interest_result").append(klisting_object.currency + " " + interest);

                    }

                    $('.calculator_box,.calculator_area').addClass('open');

                    return false;
                }
            });
            $('.calculator_area').on('click', function() {
                $('.calculator_box,.calculator_area').removeClass('open')
            })
        }

        function KardeIsEmail(email) {
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return regex.test(email);
        }

    });

})(jQuery)