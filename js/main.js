$(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 1000);
});
jQuery(function() {
    setTimeout(function() {
        animateMenu(50);
    },500);


    var height = 50;


    var i = 0;
    jQuery('.animate-menu ul li').each(function (e) {
        console.log(jQuery(this).attr('class'));
        jQuery(this).attr('class', "li-"+(height + i))
        i = i + 50;
    });


    function animateMenu(h) {
        jQuery('.li-' + h).animate({
            opacity: "1"
        });
        jQuery('.bus').animate({
            top: -6 + 'px'
        },1000);
        jQuery(".line").animate({
                height: h + 'px'

            }, 1000,
            function() {
                var after = h + height;
                if (h == (i - height)) {
                    jQuery('.li-'+i).animate({
                        opacity: "1"
                    });
                }
                if (h < (i - height)) {
                    animateMenu(after);
                }
            }
        );
    }

});

jQuery(function() {
    jQuery('.animate-menu ul li').click(function () {
        var clName = jQuery(this).attr('class');
        clName = clName.split('-');
        clName = clName[1];



        clName = parseInt(clName);

        jQuery('.bus').animate({
            top: -56 + clName + 'px'
        },1000);
    });
});

jQuery(function () {
    $("#gps").mouseover(function(){
        $("#gpsImg").addClass('faa-burst animated');
    });
    $("#gps").mouseout(function(){
        $("#gpsImg").removeClass('faa-burst animated');
    });
});

$(window).scroll(function () {
    // var winHeight = $(window).height();

    var works = $('#works');
    var worksPos = works.offset().top;
    // var scrollToWorks = worksPos - winHeight;

    var winScrollTop = $(window).scrollTop();



    var elmnt = document.getElementById("wrapper");
    var y = elmnt.scrollHeight;


    var top =  (winScrollTop * 200 / y) - 4;
    $('.bus').css('top', top);

});


$.scrollify({
    section : "section",
    sectionName : "section-name",
    interstitialSection : "",
    easing: "easeOutExpo",
    scrollSpeed: 1100,
    offset : 0,
    scrollbars: false,
    standardScrollElements: "",
    setHeights: true,
    overflowScroll: false,
    updateHash: true,
    touchScroll:true,
    before:function() {},
    after:function() {},
    afterResize:function() {},
    afterRender:function() {}
});



