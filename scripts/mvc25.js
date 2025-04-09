let isAperto = false;

document.addEventListener("DOMContentLoaded", function () {
    // Gestione selezione tipo
    const tipoSelect = document.getElementById('tipo');
    const sezioni = {
        sponsor: document.getElementById('sezioneSponsor'),
        espositore: document.getElementById('sezioneEspositore'),
        food: document.getElementById('sezioneFood'),
        attivita: document.getElementById('sezioneAttivita'),
        staff: document.getElementById('sezioneStaff'),
    };

    tipoSelect.addEventListener('change', function () {
        Object.values(sezioni).forEach(sec => sec.classList.add('hidden'));
        const scelta = tipoSelect.value;
        if (sezioni[scelta]) {
            sezioni[scelta].classList.remove('hidden');
        }
    });

    // Anno per copyright
    document.getElementById("year").textContent = new Date().getFullYear();
});

// Funzione toggle T1
function toggleT1() {
    const chiuso = document.getElementById('t1-chiuso');
    const aperto = document.getElementById('t1-aperto');

    const zoomFactor = window.innerWidth >= 576 ? 1.5 : 2.0;

    if (!isAperto) {
        aperto.style.opacity = '1';
        aperto.style.pointerEvents = 'auto';

        setTimeout(() => {
            chiuso.style.opacity = '0';
            chiuso.style.pointerEvents = 'none';
            aperto.style.transform = `scale(${zoomFactor})`;
        }, 400);
    } else {
        aperto.style.transition = 'transform 0.4s ease-in-out';
        aperto.style.transform = 'scale(1)';
        chiuso.style.opacity = '1';
        chiuso.style.pointerEvents = 'auto';

        setTimeout(() => {
            aperto.style.opacity = '0';
            aperto.style.pointerEvents = 'none';
        }, 400);
    }

    isAperto = !isAperto;
}

// jQuery: tutto dentro un unico document.ready
$(document).ready(function () {

    // Parallasse scroll
    $(window).on("scroll", function () {
        var scrollTop = $(window).scrollTop();
        $(".background").css("top", scrollTop * 0.8 + "px");
        $(".clouds-background").css("top", scrollTop * 0.7 + "px");
        $(".mountains").css("top", scrollTop * 0.8 + "px");
        $(".ground").css("top", scrollTop * 0.4 + "px");
        $(".trees-sx").css("top", scrollTop * 0.4 + "px");
        $(".foreground").css("top", scrollTop * 0.4 + "px");
        $(".t1").css("top", scrollTop * 0.4 + "px");
        $(".trees-dx").css("top", scrollTop * 0.4 + "px");
        $(".cloud-front").css("top", scrollTop * 0.3 + "px");
        $(".mongolfiera").css("top", scrollTop * 0.6 + "px");
        $(".main-title").css("top", scrollTop * 0.8 + "px");
    });

    // Navbar toggle
    $('.navbar-toggler').on('click', function () {
        $('.navbar').toggleClass('navbar-open');
    });

    $('.navbar-nav a').on('click', function () {
        $('.navbar-collapse').collapse('hide');
        $('.navbar').removeClass('navbar-open');
    });

    // AJAX invio modulo sponsor
    $('#moduloSponsor').on('submit', function (e) {
        e.preventDefault(); // impedisce il refresh

        $.ajax({
            url: '/php/form-sponsor.php',
            type: 'POST',
            data: $(this).serialize(),
            success: function (response) {
                $('#moduloSponsor')[0].reset(); // resetta form
                alert("Messaggio inviato con successo!");
                $('#messaggioConferma').removeClass('d-none');
            },
            error: function () {
                alert("Errore durante l'invio. Riprova.");
            }
        });
    });
});
