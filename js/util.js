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
        $('#form-contacto').submit(function() {
            var nombre = document.getElementById("txtNombre");
            var mail = document.getElementById("txtEmail");
            var telefono = document.getElementById("txtTelefono");
            var mensaje = document.getElementById("txtMensaje");

            if (nombre.value==null || nombre.value.length==0 || /^\s+$/.test(nombre.value)){
                document.getElementById('result').innerHTML = '<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>¡Error! Nombre mal introducido.</strong></div>';
                return false;
            }
            if (mail.value==null || mail.value.length==0 || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail.value))){
                document.getElementById('result').innerHTML = '<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>¡Error! Email mal introducido.</strong></div>';
                return false;
            }
            if (telefono.value==null || telefono.value.length==0 || !(/(^([0-9]{9,9})|^)$/.test(telefono.value))){
                document.getElementById('result').innerHTML = '<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>¡Error! Teléfono mal introducido.</strong></div>';
                return false;
            }
            if (mensaje.value==null || mensaje.value.length==0){
                document.getElementById('result').innerHTML = '<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>¡Error! Mensaje mal introducido.</strong></div>';
                return false;
            }

            $.ajax({
                type: 'post',
                url: $(this).attr('action'),
                data: $(this).serialize(),

                success: function(data) {
                    $('#txtNombre').val("");
                    $('#txtEmail').val("");
                    $('#txtTelefono').val("");
                    $('#txtMensaje').val("");

                    document.getElementById('result').innerHTML = '<div class="alert alert-success alert-dismissable"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>¡Mensaje enviado correctamente!</strong></div>';
                },
                error: function(data) {
                    $('#txtNombre').val("");
                    $('#txtEmail').val("");
                    $('#txtTelefono').val("");
                    $('#txtMensaje').val("");

                    document.getElementById('result').innerHTML = '<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>¡Error mensaje no enviado!</strong></div>';
                }
            })
            return false;
        });
    });
    if (localStorage.controlcookie > 0){
        document.getElementById('cookies').style.display = 'none';
    }
});
function controlCookies() {
    localStorage.controlcookie = (localStorage.controlcookie || 0);
    localStorage.controlcookie++;
    cookies.style.display='none';
}