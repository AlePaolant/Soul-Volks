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
    event.preventDefault(); // Previene l'invio del modulo

    const accept = document.getElementById('accept').checked;

    if (!accept) {
        alert('Devi accettare i termini per inviare il modulo.');
        return;
    }

    const formData = new FormData(this);

    fetch('php/contact_module.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // Mostra il messaggio di risposta del server
    })
    .catch(error => {
        alert('Si è verificato un errore durante l\'invio del modulo.');
    });
});





// DOWNLOAD MODULO DI ISCRIZIONE
document.getElementById('download-form').addEventListener('submit', function(event) {
    const email = document.getElementById('user-email').value;
    const accept = document.getElementById('user-accept').checked;

    console.log('Email:', email); // Verifica il valore dell'email
    console.log('Accept:', accept);

    if (!email) {
        alert('Per favore, inserisci una email valida.');
        event.preventDefault();
    } else if (!accept) {
        alert('Devi accettare i termini per scaricare il modulo.');
        event.preventDefault();
    }
});


//popup
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        document.getElementById('overlay').style.display = 'block';
        document.getElementById('popup-mvc').style.display = 'block';
        document.body.classList.add('blur');
    }, 10000);

    function closePopup() {
        document.getElementById('overlay').style.display = 'none';
        document.getElementById('popup-mvc').style.display = 'none';
        document.body.classList.remove('blur');
    }

    document.getElementById('closePopup-mvc').addEventListener('click', closePopup);
    document.getElementById('overlay').addEventListener('click', closePopup);
    document.getElementById('popup-mvc').addEventListener('click', function(event) {
        event.stopPropagation();
    });
});
