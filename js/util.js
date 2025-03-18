$(document).ready( function () {
    $("#go-top").hide();
    $(function () {
        $(window).scroll(function() {
            if ($(".navbar").offset().top > 50) {
                $(".navbar-fixed-top").addClass("top-nav-collapse");
            } else {
                $(".navbar-fixed-top").removeClass("top-nav-collapse");
            }
        });
        $(window).scroll(function () {
            if ($(this).scrollTop() > 200) {
                $('#go-top').fadeIn();
            } else {
                $('#go-top').fadeOut();
            }
        });
        $('#go-top a').click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
        if ($( window ).width() < 768){
            $("#carousel").owlCarousel({
                items: 1,
                autoPlay: 10000,
                mouseDrag : false,
                touchDrag: false,
                itemsDesktop: [400, 1],
                itemsDesktopSmall: [400, 1],
                itemsTablet: [400, 1],
                itemsMobile: [400, 1],
                pagination: false,
                navigation: true,
                navigationText: ["< Anterior","Siguiente >"]
            });
        } else {
            $("#carousel").owlCarousel({
                items: 1,
                autoPlay: 10000,
                itemsDesktop: [400, 1],
                itemsDesktopSmall: [400, 1],
                itemsTablet: [400, 1],
                itemsMobile: [400, 1],
                pagination: true
            });
        }
        $('.chart').waypoint(function() {
            $(this).easyPieChart({
                barColor: '#3498db',
                size: '150',
                easing: 'easeOutBounce',
                animate: 2000,
                onStep: function(from, to, percent) {
                    $(this.el).find('.percent').text(Math.round(percent));
                }
            });
        }, {
            triggerOnce: true,
            offset: 'bottom-in-view'
        });
        $('a.page-scroll').bind('click', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        });
    });
});