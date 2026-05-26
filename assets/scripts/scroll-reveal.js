const SELETORES_REVEAL = [
    "main .section-header",
    "main .bento-card",
    "main .sobre-trajetoria",
    "main .projeto-card",
    "main .projetos-github-cta",
    "main .skills-card",
    "main .outros-card",
    "main .timeline-item",
].join(", ");

const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const elementos = document.querySelectorAll(SELETORES_REVEAL);

if (!elementos.length) {
    /* nada */
} else if (motionQuery.matches) {
    elementos.forEach((el) => el.classList.add("reveal", "is-visible"));
} else {
    elementos.forEach((el) => el.classList.add("reveal"));

    elementos.forEach((el) => {
        const parent = el.parentElement;
        if (!parent) return;

        const irmaos = [...parent.children].filter((c) =>
            c.classList.contains("reveal")
        );
        const indice = irmaos.indexOf(el);

        if (indice > 0) {
            el.style.setProperty(
                "--reveal-delay",
                `${Math.min(indice * 0.08, 0.4)}s`
            );
        }
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        },
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    elementos.forEach((el) => observer.observe(el));
}
