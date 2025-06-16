const programma = [
    {
      giorno: "Venerdì 8 Agosto 2025",
      testo: `  <p class="testino">A partire dalle ore 10:00 accoglienza equipaggi e visitatori</p>
                <p class="testino">Iscrizione evento con consegna bag di benvenuto agli equipaggi</p>
                <p class="testino">Mostra statica auto d’epoca Volkswagen per tutta la giornata</p>
                <p class="testino">Esposizione oggettistica vintage con mercatini di dischi in vinile, abbigliamento, ricambistica Volkswagen e automobilia</p>
                <p class="testino">Free camping aperto a tutti</p>
                <p class="testino">Stand enogastronomici con birra e cocktail, street food (anche vegan e gluten free)</p>
                <p class="testino">Live con <a href="https://www.facebook.com/cantineriuniteband/">“Cantine riunite Band”</a></p>
                <p class="testino">Social Dance & Live Music a cura di <a href="https://www.instagram.com/cb.swing/">“CB Swing”</a> (Lindy Hop/Shag)</p>
                <p class="testino">Live con <a href="https://www.laterzaclasse.it/">“La Terza Classe”</a> (Bluegrass, Folk, Country from Napoli)</p>
                <p class="testino">Pre/post live Vinyl DJ Set</p>`
    },
    {
      giorno: "Sabato 9 Agosto 2025",
      testo: ` 
                <p class="testino">Accoglienza e welcome bag</p>
                <p class="testino">Mostra statica auto d’epoca Volkswagen per tutta la giornata</p>
                <p class="testino">Esposizione oggettistica vintage con mercatini di dischi in vinile, abbigliamento, ricambistica Volkswagen e automobilia</p>
                <p class="testino">Free camping aperto a tutti</p>
                <p class="testino">Stand enogastronomici con birra e cocktail, street food (anche vegan e gluten free)</p>
                <p class="testino">Workshop (in aggiornamento)</p>
                <p class="testino">Live di apertura con <a href="https://www.instagram.com/fdckicrew/">FDCKI</a> (Hip-Hop/Boom Bap Rap from Roma)</p>
                <p class="testino">A seguire live esclusiva con <a href="https://www.instagram.com/piottatommaso/">"Piotta"</a></p>
                <p class="testino">Pre/post live Vinyl DJ Set a cura di <a href="https://www.instagram.com/akafidelkato/">Fidel Kato dal Mangiadischi & Friends</a></p>
                <p class="testino">DJ Set no stop fino a tarda notte!</p>`
    },
    {
      giorno: "Domenica 10 Agosto 2025",
      testo: `  <p class="testino">Accoglienza e welcome bag</p>
                <p class="testino">Mostra statica auto d’epoca Volkswagen per tutta la giornata</p>
                <p class="testino">Esposizione oggettistica vintage con mercatini di dischi in vinile, abbigliamento, ricambistica Volkswagen e automobilia</p>
                <p class="testino">Free camping aperto a tutti</p>
                <p class="testino">Stand enogastronomici con birra e cocktail, street food (anche vegan e gluten free)</p>
                <p class="testino">Workshop (in aggiornamento)</p>
                <p class="testino">Giro sulle strade del Matese (circa 1 ora con aperitivo)</p>
                <p class="testino">Premiazioni veicoli ed equipaggi</p> 
                <p class="testino">Live di apertura con <a href="https://www.facebook.com/oneforpeace01/">One4Peace</a> (reggae/rock Napoli)</p>
                <p class="testino">A seguire in esclusiva live con <a href="https://mellowmoodmusic.com/">"Mellow Mood"</a></p> 
                <p class="testino">Pre/post live Sound System a cura di <a href="https://www.facebook.com/psalmcollectivesound/">PSALM Collective</a></p>
                <p class="testino">Vinyl DJ Set ad oltranza</p>`
    },
    {
      giorno: "Lunedì 11 Agosto 2025",
      testo: `  <p class="testino">Mostra statica auto d’epoca Volkswagen per tutta la giornata</p>
                <p class="testino">Esposizione oggettistica vintage con mercatini di dischi in vinile, abbigliamento, ricambistica Volkswagen e automobilia</p>
                <p class="testino">Free camping aperto a tutti</p>
                <p class="testino">Stand enogastronomici con birra e cocktail, street food (anche vegan e gluten free)</p>
                <p class="testino">Live Cover Band (in aggiornamento)</p>
                <p class="testino">Vinyl DJ Set a oltranza!</p>`
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
  e.preventDefault(); // 🔒 blocca swipe laterale del browser
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


  // Load default
  const defaultDot = dots[0];
  const defaultRect = defaultDot.getBoundingClientRect();
  const lineRect = timelineLine.getBoundingClientRect();
  const center = defaultRect.left + defaultRect.width / 2;
  const offset = center - lineRect.left - bus.offsetWidth / 2;
  bus.style.left = `${offset}px`;
  updateProgram(0);