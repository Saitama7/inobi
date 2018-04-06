
if ($(window).width() > 1900) {
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
                    animateDevice(height);
                }
                openedAnimateDevice = true;
            }
        });


        var height = 80;

        var i = 0;
        jQuery('.animate-device ul li').each(function (e) {
            jQuery(this).attr('class', "dli-"+(height + i));
            i = i + height;
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
    } else {
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
                        animateDevice(height);
                    }
                    openedAnimateDevice = true;
                }
            });


            var height = 40;

            var i = 0;
            jQuery('.animate-device ul li').each(function (e) {
                jQuery(this).attr('class', "dli-"+(height + i));
                i = i + height;
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
    }


jQuery(function () {
    $("#gps").mouseover(function(){
        $("#gpsImg").addClass('faa-burst animated');
        $("#deviceDescrip").text('Defines the exact location of transport').css('opacity','1');
    }).mouseout(function(){
        $("#gpsImg").removeClass('faa-burst animated');
        $("#deviceDescrip").text('').css('opacity','0');
    });
    $("#wifi").mouseover(function(){
        $("#wifiImg").addClass('faa-burst animated');
        $("#deviceDescrip").text('Instant wireless access point').css('opacity','1');
    }).mouseout(function(){
        $("#wifiImg").removeClass('faa-burst animated');
        $("#deviceDescrip").text('').css('opacity','0');
    });
    $("#speak").mouseover(function(){
        $("#speakImg").addClass('faa-burst animated');
        $("#deviceDescrip").text('Notifies passenger about next stop').css('opacity','1');
    }).mouseout(function(){
        $("#speakImg").removeClass('faa-burst animated');
        $("#deviceDescrip").text('').css('opacity','0');
    });
    $("#passen").mouseover(function(){
        $("#passenImg").addClass('faa-burst animated');
        $("#deviceDescrip").text('Automatic people counter sensors').css('opacity','1');
    }).mouseout(function(){
        $("#passenImg").removeClass('faa-burst animated');
        $("#deviceDescrip").text('').css('opacity','0');
    });
    $("#abd").mouseover(function(){
        $("#abdImg").addClass('faa-burst animated');
        $("#deviceDescrip").text('Real time diagnostics').css('opacity','1');
    }).mouseout(function(){
        $("#abdImg").removeClass('faa-burst animated');
        $("#deviceDescrip").text('').css('opacity','0');
    });
    $("#video").mouseover(function(){
        $("#videoImg").addClass('faa-burst animated');
        $("#deviceDescrip").text('Streaming video to monitor').css('opacity','1');
    }).mouseout(function(){
        $("#videoImg").removeClass('faa-burst animated');
        $("#deviceDescrip").text('').css('opacity','1');
    });
});

