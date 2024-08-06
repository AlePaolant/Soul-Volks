// Imposta la data fino a cui fare il countdown
const targetDate = new Date("Aug 23, 2024 09:00:00").getTime();

const countdown = () => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    // Calcola il tempo rimanente
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Mostra il risultato nei rispettivi elementi
    document.getElementById("days").innerText = days.toString().padStart(2, '0');
    document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
    document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');

    // Se il countdown è terminato, mostra un messaggio
    if (distance < 0) {
        clearInterval(interval);
        document.getElementById("countdown").innerHTML = "Ci siamo!";
    }
};
// Aggiorna il countdown ogni secondo
const interval = setInterval(countdown, 1000);



//popup programma
function openPopup(id) {
    document.getElementById(id).style.display = 'flex';
    document.getElementById('overlay').style.display = 'block';
}
function closePopup(event, id) {
    if (event === null || event.target.classList.contains('popup')) {
        document.getElementById(id).style.display = 'none';
        checkAnyPopupOpen();
    }
}
function closeAllPopups() {
    const popups = document.querySelectorAll('.popup');
    popups.forEach(popup => {
        popup.style.display = 'none';
    });
    document.getElementById('overlay').style.display = 'none';
}
function checkAnyPopupOpen() {
    const popups = document.querySelectorAll('.popup');
    let anyOpen = false;
    popups.forEach(popup => {
        if (popup.style.display === 'flex') {
            anyOpen = true;
        }
    });
    if (!anyOpen) {
        document.getElementById('overlay').style.display = 'none';
    }
}





//sponsor animation
document.addEventListener('DOMContentLoaded', function () {
    const logoItems = document.querySelectorAll('.logo-item');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, {
        threshold: 0.1
    });

    logoItems.forEach(item => {
        observer.observe(item);
    });
});

