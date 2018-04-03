jQuery(function () {
    var target = $('.animate-device');
    var targetPos = target.offset().top;
    var winHeight = $(window).height();
    var scrollToElem = targetPos - winHeight;

    var openedAnimateDevice = false;
    $(window).scroll(function(){
        var winScrollTop = $(this).scrollTop();
        if(winScrollTop > scrollToElem){
            if (!openedAnimateDevice) {
                animateDevice(50);
            }
            openedAnimateDevice = true;
        }
    });


    var height = 50;

    var i = 0;
    jQuery('.animate-device ul li').each(function (e) {
        jQuery(this).attr('class', "dli-"+(height + i));
        i = i + 50;
    });

    function animateDevice(h) {
        jQuery('.dli-' + h).animate({
            opacity: "1"
        });
        jQuery(".dLine").animate({
                height: h + 'px'

            }, 1000,
            function() {
                var after = h + height;
                if (h == (i - height)) {
                    jQuery('.dli-'+i).animate({
                        opacity: "1"
                    });
                }
                if (h < (i - height)) {
                    animateDevice(after);
                }
            }
        );
    }
});

jQuery(function () {
    $("#gps").mouseover(function(){
        $("#gpsImg").addClass('faa-burst animated');
    });
    $("#gps").mouseout(function(){
        $("#gpsImg").removeClass('faa-burst animated');
    });
});

