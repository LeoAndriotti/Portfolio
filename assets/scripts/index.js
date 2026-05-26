const btnTema = document.getElementById("btn-dark-mode");
const ICONE_ESCURO = "☀";
const ICONE_CLARO = "☾";

function aplicarTema(claro) {
    document.body.classList.toggle("tema-claro", claro);
    if (btnTema) {
        btnTema.textContent = claro ? ICONE_CLARO : ICONE_ESCURO;
        const chaveAria = claro ? "aria.themeDark" : "aria.themeLight";
        btnTema.setAttribute(
            "aria-label",
            window.PortfolioI18n?.t(chaveAria) ??
                (claro ? "Ativar tema escuro" : "Ativar tema claro")
        );
    }
    localStorage.setItem("tema-claro", claro ? "1" : "0");
}

if (btnTema) {
    const salvo = localStorage.getItem("tema-claro");
    const preferenciaSistema =
        window.matchMedia("(prefers-color-scheme: light)").matches;
    const claro = salvo === null ? preferenciaSistema : salvo === "1";

    aplicarTema(claro);

    btnTema.addEventListener("click", () => {
        aplicarTema(!document.body.classList.contains("tema-claro"));
    });
}
