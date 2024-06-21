document.addEventListener('DOMContentLoaded', function() {
    const textSoul = document.querySelector('.text-soul');
    const textVolks = document.querySelector('.text-volks');
    const VWClub = document.querySelector('.vw-club');
    const est2023 = document.querySelector('.est-2023');
    const originalride = document.querySelector('.original-ride');
    const eventoMVC = document.querySelector('.evento-mvc');

    setTimeout(() => {
        textSoul.classList.add('animazione-testo');
    },200);
    setTimeout(() => {
        textVolks.classList.add('animazione-testo');
    }, 400); 
    setTimeout(() => {
        VWClub.classList.add('animazione-vwclub');
    }, 700); 
    setTimeout(() => {
        est2023.classList.add('animazione-est2023');
    }, 700);
    setTimeout(() => {
        originalride.classList.add('animazione-OR');
    }, 700);
    setTimeout(() => {
        eventoMVC.classList.add('animazione-eventoMVC');
    }, 2000);
});