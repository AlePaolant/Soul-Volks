document.addEventListener("DOMContentLoaded", function() {
    const letters = document.querySelectorAll('.letter');
    const delay = 2000; // 2 secondi di ritardo prima di iniziare l'animazione
    const fillDelay = 300; // Ritardo tra il riempimento di ogni lettera

    function fillLetters() {
        letters.forEach((letter, index) => {
            setTimeout(() => {
                letter.style.color = '#333';
            }, index * fillDelay);
        });
    }

    setTimeout(fillLetters, delay);
});
