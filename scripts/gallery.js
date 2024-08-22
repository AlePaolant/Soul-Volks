let currentImageIndex = 0;
let currentDayId = '';
let currentImageSrc = '';
let isLiked = false;  // Stato per il like -> tanto è finto
let touchstartX = 0;
let touchendX = 0;
let scrollPosition = 0;

const lightbox = document.getElementById('lightbox');

function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    const imagesContainer = section.querySelector('.images-container');
    const arrowIcon = section.querySelector('.section-header i');

    if (imagesContainer.style.display === 'grid') {
        imagesContainer.style.display = 'none';
        arrowIcon.classList.remove('fa-minus');
        arrowIcon.classList.add('fa-plus');
    } else {
        imagesContainer.style.display = 'grid';
        arrowIcon.classList.remove('fa-plus');
        arrowIcon.classList.add('fa-minus');
    }
}

function openLightbox(index, dayId) {
    currentImageIndex = index;
    currentDayId = dayId;
    const images = document.getElementById(dayId).querySelectorAll('.images-container img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');

    currentImageSrc = images[currentImageIndex].src;
    lightboxImage.src = currentImageSrc;
    lightbox.style.display = 'flex';

    scrollPosition = window.pageYOffset;
    document.body.classList.add('no-scroll');
    document.body.style.top = `-${scrollPosition}px`;
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
    document.body.classList.remove('no-scroll');
    document.body.style.top = '';
    window.scrollTo(0, scrollPosition);
}

function nextImage() {
    const images = document.getElementById(currentDayId).querySelectorAll('.images-container img');
    currentImageIndex = (currentImageIndex + 1) % images.length;
    currentImageSrc = images[currentImageIndex].src;
    document.getElementById('lightboxImage').src = currentImageSrc;
}

function previousImage() {
    const images = document.getElementById(currentDayId).querySelectorAll('.images-container img');
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    currentImageSrc = images[currentImageIndex].src;
    document.getElementById('lightboxImage').src = currentImageSrc;
}

function handleSwipe() {
    // Calcola la differenza tra il punto iniziale e finale del tocco
    const swipeDistance = touchendX - touchstartX;

    // Definisci una soglia minima per riconoscere lo swipe (ad esempio 50px)
    const swipeThreshold = 50;

    // Se lo swipe è abbastanza lungo
    if (swipeDistance > swipeThreshold) {
        previousImage(); // Swipe a destra -> immagine precedente
    } else if (swipeDistance < -swipeThreshold) {
        nextImage(); // Swipe a sinistra -> immagine successiva
    }
}

// Aggiungi gli eventi touch al lightbox
lightbox.addEventListener('touchstart', (event) => {
    touchstartX = event.changedTouches[0].screenX;
});

lightbox.addEventListener('touchend', (event) => {
    touchendX = event.changedTouches[0].screenX;
    handleSwipe();
});

function toggleLike() {
    const likeIcon = document.getElementById('likeIcon');
    isLiked = !isLiked;

    if (isLiked) {
        likeIcon.classList.remove('fa-regular', 'fa-heart');
        likeIcon.classList.add('fa-solid', 'fa-heart');
    } else {
        likeIcon.classList.remove('fa-solid', 'fa-heart');
        likeIcon.classList.add('fa-regular', 'fa-heart');
    }
}

function openDownloadPopup() {
    document.getElementById('downloadPopup').style.display = 'block';
}

function closeDownloadPopup() {
    document.getElementById('downloadPopup').style.display = 'none';
}

function confirmDownload() {
    const mentionCheckbox = document.getElementById('mentionAuthors');
    if (mentionCheckbox.checked) {
        const a = document.createElement('a');
        a.href = currentImageSrc;
        a.download = 'downloaded_image.jpg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        closeDownloadPopup();
    } else {
        alert('Devi accettare le condizioni obbligatorie per scaricare l\'immagine.');
    }
}

// Disabilita il tasto destro solo sulle immagini
document.addEventListener('contextmenu', function(event) {
    if (event.target.tagName === 'IMG') {
        event.preventDefault();
    }
});