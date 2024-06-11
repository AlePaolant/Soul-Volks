$(document).ready(function() {
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        // Gestione dello stato della navbar
        var navbar = $('.navbar');
        var logoNero = $('#logo-nero');
        var logoBianco = $('#logo-bianco');

        if (scroll > 150) {
            if (!navbar.hasClass('scrolled')) {
                navbar.addClass('scrolled');
                logoNero.hide();
                logoBianco.show();
            }
        } else {
            if (navbar.hasClass('scrolled')) {
                navbar.removeClass('scrolled nascondi');
                logoNero.show();
                logoBianco.hide();
            }
        }

        if (scroll > 350) {
            if (!navbar.hasClass('mostra')) {
                navbar.addClass('mostra');
            }
        } else {
            if (navbar.hasClass('mostra')) {
                navbar.removeClass('mostra');
                navbar.addClass('nascondi');
            }
        }
    });
});

//Anno per copyright
document.getElementById("year").textContent = new Date().getFullYear();