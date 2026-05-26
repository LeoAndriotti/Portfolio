const galeriaSlider = document.getElementById("galeria-slider");
const galeriaDots = document.getElementById("galeria-dots");

if (galeriaSlider) {
    const slides = galeriaSlider.querySelectorAll(".galeria-slide");
    let index = 0;
    let touchStartX = 0;

    function labelFoto(i) {
        const base =
            window.PortfolioI18n?.t("aria.galleryPhoto") ?? "Ir para foto";
        return `${base} ${i + 1}`;
    }

    slides.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "galeria-dot" + (i === 0 ? " is-active" : "");
        dot.setAttribute("aria-label", labelFoto(i));
        dot.addEventListener("click", () => irPara(i));
        galeriaDots?.appendChild(dot);
    });

    const dots = galeriaDots?.querySelectorAll(".galeria-dot") ?? [];

    document.addEventListener("i18n:change", () => {
        dots.forEach((dot, i) => dot.setAttribute("aria-label", labelFoto(i)));
    });

    function irPara(i) {
        index = (i + slides.length) % slides.length;
        slides.forEach((slide, n) => slide.classList.toggle("is-active", n === index));
        dots.forEach((dot, n) => dot.classList.toggle("is-active", n === index));
    }

    galeriaSlider.addEventListener(
        "touchstart",
        (e) => {
            touchStartX = e.changedTouches[0].screenX;
        },
        { passive: true }
    );

    galeriaSlider.addEventListener(
        "touchend",
        (e) => {
            const diff = e.changedTouches[0].screenX - touchStartX;
            if (Math.abs(diff) < 50) return;
            if (diff < 0) irPara(index + 1);
            else irPara(index - 1);
        },
        { passive: true }
    );
}
