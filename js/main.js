jQuery(function() {
     disableScrolling();
    setTimeout(function() {
        animateMenu(height);
        setTimeout(function () {
            enableScrolling();
        },2000);
    },500);

    var height = 49;

    var i = 0;
    jQuery('.animate-menu ul li').each(function (e) {
        console.log(jQuery(this).attr('class'));
        jQuery(this).attr('class', "li-"+(height + i));
        i = i + height;
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
$(document).ready(function () {
    $.scrollify.instantMove("#home");
    window.location.hash = '';
});
function disableScrolling(){
    var x=window.scrollX;
    var y=window.scrollY;
    window.onscroll=function(){window.scrollTo(0, 0);};
}
function enableScrolling(){
    window.onscroll=function(){};
}

jQuery(function() {
    jQuery('.animate-menu ul li').click(function () {
        var clName = jQuery(this).attr('class');
        var hrf = $(this).find('a').attr('href');
        clName = clName.split('-');
        clName = clName[1];
        clName = parseInt(clName);
        jQuery('.bus').animate({
            top: -55 + clName + 'px'
        },1000);
        $.scrollify.move(hrf);
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
    var winScrollTop = $(window).scrollTop();
    var elmnt = document.getElementById("wrapper");
    var y = elmnt.scrollHeight;
    var top =  (winScrollTop * 249 / y ) - 6;
    $('.bus').css('top', top);
});

$.scrollify({
    section : ".panel",
    sectionName : "section-name",
    interstitialSection : "",
    easing: "easeOutExpo",
    scrollSpeed: 1500,
    offset : 0,
    scrollbars: false,
    standardScrollElements: "",
    setHeights: true,
    overflowScroll: false,
    updateHash: false,
    touchScroll:false,
    scrolled:false,
    before:function() {},
    after:function() {},
    afterResize:function() {},
    afterRender:function() {}
});

$(window).on('beforeunload', function() {
    
    $(window).scrollTop(0);

});