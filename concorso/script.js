document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("concorsoForm");
    const steps = document.querySelectorAll(".form-step");
    const startBtns = document.querySelectorAll("#startFormBtn, #startFormBtnSecondo");

    let currentStep = 0;

    function showStep(index) {
        steps.forEach((step, i) => {
            step.classList.toggle("active", i === index);
        });
    }

    startBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            document.getElementById("formWrapper").classList.add("active");
            window.scrollTo({ top: document.getElementById("formWrapper").offsetTop - 50, behavior: 'smooth' });
        });
    });

    form.querySelectorAll(".next").forEach(btn => {
        btn.addEventListener("click", () => {
            const currentStepEl = steps[currentStep];
            const inputs = currentStepEl.querySelectorAll("input[required]");
            let valid = true;

            inputs.forEach(input => {
                if (!input.value || (input.type === "file" && input.files.length === 0)) {
                    valid = false;
                    input.classList.add("error");
                } else {
                    input.classList.remove("error");
                }
            });

            if (currentStep === 1) {
                const titoli = [];
                for (let i = 1; i <= 4; i++) {
                    const titolo = form.querySelector(`input[name="titolo${i}"]`)?.value.trim();
                    const file = form.querySelector(`input[name="foto${i}"]`)?.files?.length;
                    if (file && titolo) {
                        if (titoli.includes(titolo.toLowerCase())) {
                            alert("I titoli delle foto devono essere univoci.");
                            return;
                        }
                        titoli.push(titolo.toLowerCase());
                    }
                }
                if (titoli.length === 0) {
                    alert("Devi caricare almeno una foto con titolo.");
                    return;
                }
            }

            if (valid) {
                currentStep++;
                showStep(currentStep);
            } else {
                alert("Compila tutti i campi obbligatori prima di proseguire.");
            }
        });
    });

    function resetStepFields(stepEl) {
        // Reset input e file
        const inputs = stepEl.querySelectorAll("input, textarea");
        inputs.forEach(input => {
            if (input.type === "file") {
                input.value = "";
                const preview = input.parentElement.querySelector(".file-preview");
                const progress = input.parentElement.querySelector(".progress-bar-fill");
                if (preview) {
                    preview.src = "";
                    preview.style.display = "none";
                }
                if (progress) {
                    progress.style.width = "0%";
                }
                input.parentElement.classList.remove("has-preview");
            } else if (input.type === "checkbox") {
                input.checked = false;
            } else {
                input.value = "";
            }
            input.classList.remove("error");
        });
    }

    form.querySelectorAll(".prev").forEach(btn => {
        btn.addEventListener("click", () => {
            const currentStepEl = steps[currentStep];
            resetStepFields(currentStepEl);

            if (currentStep > 0) {
                currentStep--;
                showStep(currentStep);
            }
        });
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nome = form.querySelector('input[name="nome"]').value.trim();
        const cognome = form.querySelector('input[name="cognome"]').value.trim();
        const email = form.querySelector('input[name="email"]').value.trim();
        const telefono = form.querySelector('input[name="telefono"]').value.trim();
        const bonificoInput = form.querySelector('input[name="bonifico"]');

        if (!nome || !cognome || !email || !telefono) {
            alert("Compila tutti i campi obbligatori.");
            return;
        }

        if (!bonificoInput || bonificoInput.files.length === 0) {
            alert("Carica la ricevuta del bonifico (PDF obbligatorio).");
            bonificoInput.classList.add("error");
            return;
        }
        bonificoInput.classList.remove("error");

        // Controllo foto, generazione titoli se mancanti
        let almenoUnaFoto = false;
        let titoloCounter = 1;
        const titoliSet = new Set();

        for (let i = 1; i <= 4; i++) {
            const fileInput = form.querySelector(`input[name="foto${i}"]`);
            const titoloInput = form.querySelector(`input[name="titolo${i}"]`);
            const fileSelected = fileInput.files.length > 0;

            if (fileSelected) {
                almenoUnaFoto = true;

                let titolo = titoloInput.value.trim();
                if (!titolo) {
                    titolo = `senza titolo ${titoloCounter}`;
                    titoloInput.value = titolo;
                    titoloCounter++;
                }

                if (titoliSet.has(titolo.toLowerCase())) {
                    alert(`I titoli delle foto devono essere univoci. "${titolo}" è stato ripetuto.`);
                    titoloInput.classList.add("error");
                    return;
                }

                titoliSet.add(titolo.toLowerCase());
                titoloInput.classList.remove("error");
            } else {
                titoloInput.classList.remove("error");
            }
        }

        if (!almenoUnaFoto) {
            alert("Devi caricare almeno una foto.");
            return;
        }

        const formData = new FormData(form);

        // Mostra loader e disabilita pulsanti
        document.getElementById("loadingOverlay").style.display = "flex";
        form.querySelectorAll("button").forEach(btn => btn.disabled = true);

        try {
            const response = await fetch("submit.php", {
                method: "POST",
                body: formData
            });

            const result = await response.json();

            document.getElementById("loadingOverlay").style.display = "none";
            form.querySelectorAll("button").forEach(btn => btn.disabled = false);

            if (result.success) {
                currentStep = steps.length - 1;
                showStep(currentStep);
            } else {
                alert("Errore: " + result.message);
            }

        } catch (error) {
            console.error("Errore AJAX:", error);
            document.getElementById("loadingOverlay").style.display = "none";
            form.querySelectorAll("button").forEach(btn => btn.disabled = false);
            alert("Errore di connessione. Verifica la rete e riprova tra qualche istante.");
        }
    });

    showStep(currentStep);

    // File preview con barra di progresso
    document.querySelectorAll('input[type="file"][accept^="image"]').forEach(input => {
        const preview = input.parentElement.querySelector(".file-preview");
        const progress = input.parentElement.querySelector(".progress-bar-fill");
        const removeBtn = input.parentElement.querySelector(".remove-photo");

        input.addEventListener("change", function () {
            const file = this.files[0];

            if (!file || !file.type.startsWith("image/")) return;

            // Check dimensione max 10MB
            if (file.size > 10 * 1024 * 1024) {
                alert("Il file supera i 10MB consentiti.");
                this.value = "";
                return;
            }

            const reader = new FileReader();

            reader.onprogress = (e) => {
                if (e.lengthComputable) {
                    const percent = (e.loaded / e.total) * 100;
                    progress.style.width = percent + "%";
                }
            };

            reader.onloadend = () => {
                preview.src = reader.result;
                preview.style.display = "block";
                progress.style.width = "100%";
                input.parentElement.classList.add("has-preview");
            };

            reader.readAsDataURL(file);
        });

        removeBtn?.addEventListener("click", () => {
            input.value = "";
            preview.src = "";
            preview.style.display = "none";
            progress.style.width = "0%";
            input.parentElement.classList.remove("has-preview");
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".hero-slide");
    let current = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === index);
        });
    }

    setInterval(() => {
        current = (current + 1) % slides.length;
        showSlide(current);
    }, 3000); // cambia ogni 3 secondi
});

document.querySelectorAll(".accordion-toggle").forEach(toggle => {
  toggle.addEventListener("click", () => {
    const content = toggle.nextElementSibling;
    const isOpen = content.classList.contains("open");

    // Chiude tutte le altre
    document.querySelectorAll(".accordion-content").forEach(c => c.classList.remove("open"));
    document.querySelectorAll(".accordion-toggle").forEach(t => t.classList.remove("active"));

    if (!isOpen) {
      content.classList.add("open");
      toggle.classList.add("active");
    }
  });
});