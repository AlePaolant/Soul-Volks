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
            if (currentStep < steps.length - 1) {
                currentStep++;
                showStep(currentStep);
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
        // Qui in futuro si potrà aggiungere la logica per AJAX o form validation server-side
        showStep(steps.length - 1);
        e.preventDefault();
    });

    showStep(currentStep);
});