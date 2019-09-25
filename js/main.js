$(document).ready(function () {
    /* menu */
    const minTop = 200;
    const minWidth = 767;
    let widthContainer = $(window).width();
    let topMenu = $("#menuPrincipal").offset().top;

    function detectWidth() {
        widthContainer = $(window).width();

        if (widthContainer > minWidth) {
            if ($(window).scrollTop() > minTop) {
                $('#menuPrincipal').addClass('small');
                $('#logoTop').addClass('small');
            } else {
                $('#menuPrincipal').removeClass('small');
                $('#logoTop').removeClass('small');
            }
        } else {
            $('#menuPrincipal').addClass('small');
            $('#logoTop').addClass('small');
        }
    }

    $(window).scroll(function () {
        detectWidth();
    });

    detectWidth();


    /* carousel */
    $('.c-equipo-integrante').on('click', function () {
        $(this).toggleClass('abierto');
    });

    $("#owl-prensa").owlCarousel({
        margin: 30,
        responsive: {
            0: {
                items: 1
            },

            768: {
                items: 2
            },
            992: {
                items: 3
            },

            1200: {
                items: 4
            }
        },
        autoplay: false,

        autoplayTimeout: 3000,
        loop: true,

    });

    $("#owl-aliados").owlCarousel({
        margin: 30,
        responsive: {
            0: {
                items: 1
            },

            768: {
                items: 2
            },
            992: {
                items: 3
            },

            1200: {
                items: 4
            }
        },
        autoplay: false,

        autoplayTimeout: 3000,
        loop: true,


    });

});

/**
 * cambiando tamaño de menu
 */
 /*function resizeHeaderOnScroll() {
    const distanceY = window.pageYOffset || document.documentElement.scrollTop,
        shrinkOn = 200,
        minWidth = 767;
    (menuPrincipal = document.getElementById("menuPrincipal")),
        (logoTop = document.getElementById("logoTop")),
        (itemsMenu = document.getElementsByClassName("itemMenu"));

    if (distanceY > shrinkOn || window.screen.width <= minWidth) {
        menuPrincipal.classList.add("small");
        logoTop.classList.add("small");
    } else {
        menuPrincipal.classList.remove("small");
        logoTop.classList.remove("small");
    }
}

window.addEventListener("scroll", resizeHeaderOnScroll);
window.addEventListener("load", resizeHeaderOnScroll); */