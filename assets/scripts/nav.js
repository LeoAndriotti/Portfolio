const btnMenu = document.getElementById("btn-menu-mobile");
const navMobile = document.getElementById("nav-links");
const navAnchors = document.querySelectorAll("[data-nav]");
const btnContatoMobile = document.getElementById("btn-contato-mobile");
const btnAbrirContato = document.getElementById("btn-abrir-contato");

function labelMenu(aberto) {
    const chave = aberto ? "aria.menuClose" : "aria.menuOpen";
    return window.PortfolioI18n?.t(chave) ?? (aberto ? "Fechar menu" : "Abrir menu");
}

function fecharMenu() {
    document.body.classList.remove("nav-aberto");
    btnMenu?.setAttribute("aria-expanded", "false");
    btnMenu?.setAttribute("aria-label", labelMenu(false));
    navMobile?.setAttribute("aria-hidden", "true");
}

function abrirMenu() {
    document.body.classList.add("nav-aberto");
    btnMenu?.setAttribute("aria-expanded", "true");
    btnMenu?.setAttribute("aria-label", labelMenu(true));
    navMobile?.setAttribute("aria-hidden", "false");
}

function toggleMenu() {
    if (document.body.classList.contains("nav-aberto")) {
        fecharMenu();
    } else {
        abrirMenu();
    }
}

btnMenu?.addEventListener("click", toggleMenu);

navMobile?.addEventListener("click", (e) => {
    if (e.target === navMobile) {
        fecharMenu();
    }
});

navAnchors.forEach((link) => {
    link.addEventListener("click", () => {
        if (window.matchMedia("(max-width: 767px)").matches) {
            fecharMenu();
        }
    });
});

btnContatoMobile?.addEventListener("click", () => {
    fecharMenu();
    btnAbrirContato?.click();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && document.body.classList.contains("nav-aberto")) {
        fecharMenu();
        btnMenu?.focus();
    }
});

const secoes = ["home", "sobre", "projetos", "skills", "outros"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

function atualizarNavAtivo() {
    if (document.body.classList.contains("nav-aberto")) return;

    const offset = 120;
    let atual = secoes[0]?.id;

    secoes.forEach((sec) => {
        if (sec.getBoundingClientRect().top <= offset) {
            atual = sec.id;
        }
    });

    navAnchors.forEach((link) => {
        link.classList.toggle("is-active", link.dataset.nav === atual);
    });
}

if (secoes.length) {
    atualizarNavAtivo();
    window.addEventListener("scroll", atualizarNavAtivo, { passive: true });
}

window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 768px)").matches) {
        fecharMenu();
    }
});
