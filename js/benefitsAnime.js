if ($(window).width() > 1900) {
        jQuery(function () {
        var target = $('.busLoopDesc');
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
        jQuery('.busLoopDesc ul li').each(function (e) {
            jQuery(this).attr('class', "bli-"+(height + i));
            i = i + height;
        });

        function animateDevice(h) {
            jQuery('.bli-' + h).animate({
                opacity: "1"
            });
            jQuery(".bLine").animate({
                    height: h + 'px'

                }, 1000,
                function() {
                    var after = h + height;
                    if (h == (i - height)) {
                        jQuery('.bli-'+i).animate({
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
            var target = $('.busLoopDesc');
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
            jQuery('.busLoopDesc ul li').each(function (e) {
                jQuery(this).attr('class', "bli-"+(height + i));
                i = i + height;
            });

            function animateDevice(h) {
                jQuery('.bli-' + h).animate({
                    opacity: "1"
                });
                jQuery(".bLine").animate({
                        height: h + 'px'

                    }, 1000,
                    function() {
                        var after = h + height;
                        if (h == (i - height)) {
                            jQuery('.bli-'+i).animate({
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