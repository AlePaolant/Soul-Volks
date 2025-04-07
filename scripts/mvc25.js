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



//Anno per copyright
document.getElementById("year").textContent = new Date().getFullYear();