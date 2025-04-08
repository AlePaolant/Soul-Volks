document.addEventListener('DOMContentLoaded', function () {
    const layers = [
        { selector: '.background', speed: 0.8 },
        { selector: '.clouds-background', speed: 0.7 },
        { selector: '.mountains', speed: 0.8 },
        { selector: '.ground', speed: 0.4 },
        { selector: '.trees-sx', speed: 0.4 },
        { selector: '.foreground', speed: 0.01 },
        { selector: '.t1', speed: 0.05 },
        { selector: '.trees-dx', speed: 0.3 },
        { selector: '.cloud-front-1', speed: 0.3 },
        { selector: '.cloud-front-2', speed: 0.35 },
        { selector: '.cloud-front-3', speed: 0.25 },
        { selector: '.cloud-front-4', speed: 0.3 },
        { selector: '.mongolfiera', speed: 0.6 },
        { selector: '.main-title', speed: 0.8 }
    ];

    const elements = layers.map(layer => ({
        el: document.querySelector(layer.selector),
        speed: layer.speed
    }));

    let latestScrollY = 0;
    let ticking = false;

    function onScroll() {
        latestScrollY = window.scrollY;
        requestTick();
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updatePositions);
            ticking = true;
        }
    }

    function updatePositions() {
        elements.forEach(item => {
            if (item.el) {
                item.el.style.transform = `translateY(${latestScrollY * item.speed}px)`;
            }
        });
        ticking = false;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
});

let isAperto = false;

function toggleT1() {
    const chiuso = document.getElementById('t1-chiuso');
    const aperto = document.getElementById('t1-aperto');
    const testo = document.getElementById('text');

    if (!isAperto) {
        // Apri
        chiuso.style.opacity = '0';
        chiuso.style.pointerEvents = 'none';

        aperto.style.opacity = '1';
        aperto.style.pointerEvents = 'auto';

        setTimeout(() => {
            testo.classList.add('show');
        }, 300);
    } else {
        // Chiudi
        aperto.style.opacity = '0';
        aperto.style.pointerEvents = 'none';

        chiuso.style.opacity = '1';
        chiuso.style.pointerEvents = 'auto';

        testo.classList.remove('show');
    }
    isAperto = !isAperto;
}


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

//Anno per copyright
document.getElementById("year").textContent = new Date().getFullYear();