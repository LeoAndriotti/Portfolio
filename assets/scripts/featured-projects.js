document.querySelectorAll(".projeto-card--destaque").forEach((card) => {
    const screenshots = card.querySelectorAll(".projeto-screenshot");
    const dotsContainer = card.querySelector(".projeto-screen-dots");
    const badge = card.querySelector(".projeto-media-badge");
    const dynamicBadge = card.dataset.dynamicBadge === "true";

    if (screenshots.length <= 1) {
        if (dotsContainer) dotsContainer.remove();
        if (badge && !dynamicBadge) badge.remove();
        return;
    }

    let index = 0;
    let intervalId = null;
    const dots = [];

    function labelTela(i) {
        const screenKey = screenshots[i]?.dataset?.i18nScreen;
        if (screenKey && window.PortfolioI18n) {
            return window.PortfolioI18n.t(screenKey);
        }
        const base =
            window.PortfolioI18n?.t("aria.projectScreen") ?? "Tela";
        return `${base} ${i + 1}`;
    }

    function atualizarBadge(i) {
        if (!badge || !dynamicBadge) return;
        const key = screenshots[i]?.dataset?.i18nScreen;
        if (key && window.PortfolioI18n) {
            badge.textContent = window.PortfolioI18n.t(key);
        }
    }

    screenshots.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "projeto-screen-dot" + (i === 0 ? " is-active" : "");
        dot.setAttribute("aria-label", labelTela(i));
        dot.addEventListener("click", () => {
            pararCiclo();
            showSlide(i);
        });
        dotsContainer?.appendChild(dot);
        dots.push(dot);
    });

    document.addEventListener("i18n:change", () => {
        dots.forEach((dot, i) => dot.setAttribute("aria-label", labelTela(i)));
        atualizarBadge(index);
    });

    function showSlide(i) {
        index = i;
        screenshots.forEach((img, n) => img.classList.toggle("is-active", n === i));
        dots.forEach((dot, n) => dot.classList.toggle("is-active", n === i));
        atualizarBadge(i);
    }

    function proximo() {
        showSlide((index + 1) % screenshots.length);
    }

    function iniciarCiclo() {
        pararCiclo();
        intervalId = setInterval(proximo, 2200);
    }

    function pararCiclo() {
        if (intervalId) clearInterval(intervalId);
        intervalId = null;
    }

    card.addEventListener("mouseenter", iniciarCiclo);
    card.addEventListener("mouseleave", () => {
        pararCiclo();
        showSlide(0);
    });

    let touchStartX = 0;

    card.addEventListener(
        "touchstart",
        (e) => {
            touchStartX = e.changedTouches[0].screenX;
            pararCiclo();
        },
        { passive: true }
    );

    card.addEventListener(
        "touchend",
        (e) => {
            const diff = e.changedTouches[0].screenX - touchStartX;
            if (Math.abs(diff) < 40) return;
            if (diff < 0) proximo();
            else showSlide((index - 1 + screenshots.length) % screenshots.length);
        },
        { passive: true }
    );

    if (dynamicBadge) atualizarBadge(0);
});
