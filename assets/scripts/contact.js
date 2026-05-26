const modal = document.getElementById("modal-contato");
const btnAbrir = document.getElementById("btn-abrir-contato");
const formContato = document.getElementById("form-contato");
const formNext = document.getElementById("form-contato-next");

function obterEndpointFormSubmit() {
    const codificado = "MjAwMWxlb21vdXJhQGdtYWlsLmNvbQ==";
    try {
        return `https://formsubmit.co/${atob(codificado)}`;
    } catch {
        return "";
    }
}

if (formContato) {
    const endpoint = obterEndpointFormSubmit();
    if (endpoint) formContato.action = endpoint;
}

function abrirModal() {
    if (!modal) return;
    document.body.classList.remove("nav-aberto");
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-aberto");
    modal.querySelector(".modal-fechar")?.focus();
}

function fecharModal() {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-aberto");
    btnAbrir?.focus();
}

if (formNext) {
    const url = new URL(window.location.href);
    url.searchParams.set("enviado", "1");
    url.hash = "";
    formNext.value = url.toString();
}

if (btnAbrir) {
    btnAbrir.addEventListener("click", abrirModal);
}

modal?.querySelectorAll("[data-fechar-modal]").forEach((el) => {
    el.addEventListener("click", fecharModal);
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal?.classList.contains("is-open")) {
        fecharModal();
    }
});

if (new URLSearchParams(window.location.search).get("enviado") === "1") {
    abrirModal();
    const params = new URLSearchParams(window.location.search);
    params.delete("enviado");
    const novaUrl = params.toString()
        ? `${window.location.pathname}?${params}`
        : window.location.pathname;
    history.replaceState({}, "", novaUrl);
}
