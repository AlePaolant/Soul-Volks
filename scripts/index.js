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


//MODULO CONTATTI
document.getElementById('contact-form').addEventListener('submit', function(event) {
    const accept = document.getElementById('accept').checked;

    if (!accept) {
        alert('Devi accettare i termini per inviare il modulo.');
        event.preventDefault();
    }
});



// DOWNLOAD MODULO DI ISCRIZIONE
document.getElementById('download-form').addEventListener('submit', function(event) {
    const recaptcha = document.querySelector('.g-recaptcha-response').value;
    const email = document.getElementById('email').value;
    const accept = document.getElementById('accept').checked;

    if (!recaptcha) {
        alert('Per favore, completa il reCAPTCHA.');
        event.preventDefault();
    }
    if (!email) {
        alert('Per favore, inserisci una email valida.');
        event.preventDefault();
    }
    if (!accept) {
        alert('Devi accettare i termini per scaricare il modulo.');
        event.preventDefault();
    }
});

// POPUP EVENTO 
document.addEventListener('DOMContentLoaded', function() {
    // Mostra il popup dopo 10 secondi
    setTimeout(function() {
        document.getElementById('overlay').style.display = 'block';
        document.getElementById('popup-mvc').style.display = 'block';
        document.body.classList.add('blur');
    }, 200000);

    // Gestisci la chiusura del popup
    document.getElementById('closePopup-mvc').addEventListener('click', function() {
        document.getElementById('overlay').style.display = 'none';
        document.getElementById('popup-mvc').style.display = 'none';
        document.body.classList.remove('blur');
    });
});
