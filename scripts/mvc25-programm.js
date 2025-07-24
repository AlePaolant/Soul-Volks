const programma = [
  {
    giorno: "Venerdì 8 Agosto 2025",
    testo: `
      <p class="testino"><strong>Ore 10:00:</strong> accoglienza equipaggi e visitatori</p>
      <p class="testino">Iscrizione evento con welcome bag</p>
      <p class="testino">ore 19-21: Social Dance & Live Music con <a target="_blank" href="https://www.instagram.com/cb.swing/">CB Swing</a> (Lindy Hop/Shag)</p>
      <p class="testino">ore 21-23: Live con <a target="_blank" href="https://www.laterzaclasse.it/">La Terza Classe</a> (Bluegrass, Folk, Country)</p>
    `
  },
  {
    giorno: "Sabato 9 Agosto 2025",
    testo: `
      <p class="testino">Workshop a tema VW: storie di viaggio</p>
      <p class="testino">Conferenza nazionale sul Parco del Matese</p>
       <p class="testino">ore 15-17: Vinyl DJ Set con <a target="_blank" href="https://www.instagram.com/akafidelkato/">Fidel Kato & Friends</a></p>
      <p class="testino">ore 17-19: Live con <a target="_blank" href="https://www.instagram.com/fdckicrew/">FDCKI</a> (Hip-Hop/Rap)</p>
      <p class="testino">ore 19-21: Live esclusivo con <a target="_blank" href="https://www.instagram.com/piottatommaso/">Piotta</a></p>
    `
  },
  {
    giorno: "Domenica 10 Agosto 2025",
    testo: `
      <p class="testino">Premiazione veicoli ed equipaggi</p>
      <p class="testino">ore 15-17: Live con <a target="_blank" href="https://www.facebook.com/oneforpeace01/">One4Peace ft. Kool Kray-z</a> (rock-reggae)</p>
      <p class="testino">ore 17-19: Sound System con <a target="_blank" href="https://www.facebook.com/psalmcollectivesound/">PSALM Collective</a></p>
      <p class="testino">ore 19-21: Live esclusivo con <a target="_blank" href="https://mellowmoodmusic.com/">Mellow Mood</a></p>
    `
  },
  {
    giorno: "Lunedì 11 Agosto 2025",
    testo: `
      <p class="testino">ore 19-21: Live con West Coast Band</p>
      <p class="testino">Pranzo/Cena per i partecipanti (in definizione)</p>
    `
  }
];

const bus = document.getElementById("bus");
const dots = document.querySelectorAll(".dot");
const content = document.getElementById("programmaContent");
const timelineLine = document.getElementById("timelineLine");

let dragging = false;
let offsetX = 0;

function updateProgram(index) {
  const day = programma[index];
  content.innerHTML = `<h3>${day.giorno}</h3><p>${day.testo}</p>`;
}

function getClosestDot(x) {
  let closest = null;
  let closestDist = Infinity;
  dots.forEach(dot => {
    const rect = dot.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    const dist = Math.abs(x - center);
    if (dist < closestDist) {
      closest = dot;
      closestDist = dist;
    }
  });
  return closest;
}

bus.addEventListener("mousedown", (e) => {
  dragging = true;
  offsetX = e.clientX - bus.getBoundingClientRect().left;
  bus.style.cursor = "grabbing";
});

window.addEventListener("mousemove", (e) => {
  if (dragging) {
    const lineRect = timelineLine.getBoundingClientRect();
    let newX = e.clientX - lineRect.left - offsetX;
    newX = Math.max(0, Math.min(newX, lineRect.width - bus.offsetWidth));
    bus.style.left = `${newX}px`;
  }
});

window.addEventListener("mouseup", (e) => {
  if (dragging) {
    dragging = false;
    bus.style.cursor = "grab";

    const closest = getClosestDot(e.clientX);
    if (closest) {
      const dotRect = closest.getBoundingClientRect();
      const lineRect = timelineLine.getBoundingClientRect();
      const center = dotRect.left + dotRect.width / 2;
      const offset = center - lineRect.left - bus.offsetWidth / 2;

      //  Easing animation
      const start = parseFloat(bus.style.left);
      const distance = offset - start;
      const duration = 300;
      let startTime = null;

      function animateSnap(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const t = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - t, 3); // easeOutCubic
        bus.style.left = `${start + distance * ease}px`;

        if (t < 1) {
          requestAnimationFrame(animateSnap);
        } else {
          updateProgram(closest.dataset.day);
        }
      }

      requestAnimationFrame(animateSnap);
    }
  }
});

let touchStartX = 0;
let busStartX = 0;

bus.addEventListener("touchstart", (e) => {
  dragging = true;
  touchStartX = e.touches[0].clientX;
  busStartX = parseFloat(bus.style.left || 0);
  bus.style.cursor = "grabbing";
  e.preventDefault(); // blocca swipe laterale del browser
}, { passive: false });

window.addEventListener("touchmove", (e) => {
  if (dragging) {
    const currentX = e.touches[0].clientX;
    const deltaX = currentX - touchStartX;
    const lineRect = timelineLine.getBoundingClientRect();
    let newX = busStartX + deltaX;
    newX = Math.max(0, Math.min(newX, lineRect.width - bus.offsetWidth));
    bus.style.left = `${newX}px`;
    e.preventDefault();
  }
}, { passive: false });

window.addEventListener("touchend", (e) => {
  if (dragging) {
    dragging = false;
    bus.style.cursor = "grab";

    const busRect = bus.getBoundingClientRect();
    const centerX = busRect.left + busRect.width / 2;

    const closest = getClosestDot(centerX);
    if (closest) {
      const dotRect = closest.getBoundingClientRect();
      const lineRect = timelineLine.getBoundingClientRect();
      const center = dotRect.left + dotRect.width / 2;
      const offset = center - lineRect.left - bus.offsetWidth / 2;

      // Snap animato
      const start = parseFloat(bus.style.left);
      const distance = offset - start;
      const duration = 300;
      let startTime = null;

      function animateSnap(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const t = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - t, 3); // easeOutCubic
        bus.style.left = `${start + distance * ease}px`;

        if (t < 1) {
          requestAnimationFrame(animateSnap);
        } else {
          updateProgram(closest.dataset.day);
        }
      }

      requestAnimationFrame(animateSnap);
    }
  }
});

dots.forEach(dot => {
  dot.addEventListener("click", () => {
    const dayIndex = parseInt(dot.dataset.day);

    const dotRect = dot.getBoundingClientRect();
    const lineRect = timelineLine.getBoundingClientRect();
    const center = dotRect.left + dotRect.width / 2;
    const offset = center - lineRect.left - bus.offsetWidth / 2;

    // Animazione verso il dot selezionato
    const start = parseFloat(bus.style.left || 0);
    const distance = offset - start;
    const duration = 300;
    let startTime = null;

    function animateSnap(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const t = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      bus.style.left = `${start + distance * ease}px`;

      if (t < 1) {
        requestAnimationFrame(animateSnap);
      } else {
        updateProgram(dayIndex);
      }
    }

    requestAnimationFrame(animateSnap);
  });
});


// Load default
const defaultDot = dots[0];
const defaultRect = defaultDot.getBoundingClientRect();
const lineRect = timelineLine.getBoundingClientRect();
const center = defaultRect.left + defaultRect.width / 2;
const offset = center - lineRect.left - bus.offsetWidth / 2;
bus.style.left = `${offset}px`;
updateProgram(0);


// FAQ interattive (accordion)
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const isOpen = answer.style.display === 'block';

    // Chiudi tutte
    document.querySelectorAll('.faq-answer').forEach(el => {
      el.style.display = 'none';
    });

    // Apri solo se non era già aperta
    if (!isOpen) {
      answer.style.display = 'block';
    }
  });
});