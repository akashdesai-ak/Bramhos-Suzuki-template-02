;
(function($) {
    "use strict"



    $(document).ready(function() {

        $(".price-select").change(function() {
            $('#home_minp').attr("name", "min_price");
        });

        $(".select-comarison-car").change(function() {
            var id = $(this).val();
            var context = $(this);
            $(this).parents('.compare_footer').siblings('.car_img').append('<img class="gif_comapre" src="' + karde_core_object.loader_img + '"></div>');
            $.ajax({
                type: "POST",
                url: karde_core_object.ajax_url,
                data: {
                    action: 'select_car_comparison',
                    vehicle_id: id,
                },
                success: function(res) {
                    context.parents('.compare_footer').siblings('.car_img').html('');
                    context.parents('.compare_footer').siblings('.compare_text').html('');
                    context.parents('.compare_footer').siblings('.car_img').append(res);
                }
            });
        });



        $(".list_finding .nav").children().each(
            function(i, value) {
                $(this).hover(function(e) {

                    var classname = $(this).attr('class');
                    var this_class = $(value).attr('class');
                    $('.marker_icon .nav li.' + classname).toggleClass('hover')

                })
            });

        $("#delaer_days").on("change", function() {
            var val = $(this).val();
            $('#id_' + val).addClass('shown').siblings().removeClass('shown');
        });
    });

})(jQuery)