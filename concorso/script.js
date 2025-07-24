document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("concorsoForm");
    const steps = document.querySelectorAll(".form-step");
    const startBtn = document.getElementById("startFormBtn");

    let currentStep = 0;

    function showStep(index) {
        steps.forEach((step, i) => {
            step.classList.toggle("active", i === index);
        });
    }

    startBtn.addEventListener("click", () => {
        document.getElementById("formWrapper").scrollIntoView({ behavior: "smooth" });
        showStep(0);
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

            if (valid) {
                currentStep++;
                showStep(currentStep);
            } else {
                alert("Compila tutti i campi obbligatori prima di proseguire.");
            }
        });
    });

    form.querySelectorAll(".prev").forEach(btn => {
        btn.addEventListener("click", () => {
            if (currentStep > 0) {
                currentStep--;
                showStep(currentStep);
            }
        });
    });

    form.addEventListener("submit", (e) => {
    const bonificoInput = form.querySelector('input[name="bonifico"]');
    if (!bonificoInput || bonificoInput.files.length === 0) {
        e.preventDefault();
        alert("Devi caricare la ricevuta del bonifico in formato PDF.");
        bonificoInput.classList.add("error");
        return;
    }
    bonificoInput.classList.remove("error");

    // Se tutto va bene, mostra conferma e lascia che PHP gestisca
    showStep(steps.length - 1);
});

    showStep(currentStep);
});