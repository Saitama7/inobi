$(document).ready(function () {
    $.scrollify.instantMove("#home");
    window.location.hash = 'home';
});
function disableScrolling(){
    var x=window.scrollX;
    var y=window.scrollY;
    window.onscroll=function(){window.scrollTo(0, 0);};
}
function enableScrolling(){
    window.onscroll=function(){};
}
$(window).on('beforeunload', function() {
    
    $(window).scrollTop(0);

});

jQuery(function() {
     disableScrolling();
    setTimeout(function() {
        animateMenu(height);
    },500);
    setTimeout(function () {
        enableScrolling();
    },2000);

    var height = 50;

    var i = 0;
    jQuery('.animate-menu ul li').each(function (e) {
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


jQuery(function() {
    jQuery('.animate-menu ul li').click(function () {
        var clName = jQuery(this).attr('class');
        var hrf = $(this).find('a').attr('href');
        clName = clName.split('-');
        clName = clName[1];
        clName = parseInt(clName);
        jQuery('.bus').animate({
            top: -55 + clName + 'px'
        },400);
        $.scrollify.move(hrf);
    });
});

$.scrollify({
    section : ".panel",
    sectionName : "section-name",
    interstitialSection : "",
    easing: "easeOutExpo",
    scrollSpeed: 1000,
    offset : 0,
    scrollbars: true,
    standardScrollElements: "",
    setHeights: true,
    overflowScroll: true,
    updateHash: true,
    touchScroll:true,
    scrolled:false,
    before:function(i) {
          if(i===0) {
            $('.bus').animate({
                top : -6 + 'px'
            },400);
        }else if(i===1) {
            $('.bus').animate({
                top : 45 + 'px'
            },400);
        } else if(i===2){
            $.scrollify.update();
            $('.bus').animate({
                top : 95 + 'px'
            },400);
        } else if(i===3){
            $('.bus').animate({
                top : 145 + 'px'
            },100);
        }
    },
    after:function(i) {
        if(i===2){
            $.scrollify.update();
        }
    },
    afterResize:function() {},
    afterRender:function() {}
});