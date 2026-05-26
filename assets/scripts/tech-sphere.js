const heroVisual = document.getElementById("hero-visual");
const techSphere = heroVisual?.querySelector(".tech-sphere");
const techNodes = heroVisual?.querySelectorAll(".tech-node");
const focusUi = document.getElementById("tech-focus-ui");
const focusIcon = document.getElementById("tech-focus-icon");
const focusPill = document.getElementById("tech-focus-pill");

if (heroVisual && techSphere && focusUi) {
    let isDragging = false;
    let heldNode = null;
    let rafId = null;
    let lastX = 0;
    let lastY = 0;
    let rotX = 12;
    let rotY = 0;

    function applyRotation() {
        techSphere.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    }

    function positionFocusUi() {
        if (!heldNode) return;

        const nodeRect = heldNode.getBoundingClientRect();
        const visualRect = heroVisual.getBoundingClientRect();
        const centerX = nodeRect.left + nodeRect.width / 2 - visualRect.left;
        const centerY = nodeRect.top + nodeRect.height / 2 - visualRect.top;

        focusUi.style.left = `${centerX}px`;
        focusUi.style.top = `${centerY}px`;
    }

    function showFocus(node) {
        const img = node.querySelector("img");
        const name = node.dataset.name || "";
        const accent = node.dataset.accent || "#2563eb";
        const textoEscuro = node.dataset.textoEscuro === "true";

        heldNode = node;
        heroVisual.classList.add("has-held");

        node.classList.add("is-held");

        focusIcon.src = img?.src || "";
        focusIcon.alt = name;
        focusPill.textContent = name.toUpperCase();
        focusPill.style.background = accent;
        focusPill.style.color = textoEscuro ? "#0f172a" : "#ffffff";

        focusUi.classList.add("is-visible");
        focusUi.setAttribute("aria-hidden", "false");

        positionFocusUi();

        const loop = () => {
            if (!heldNode) return;
            positionFocusUi();
            rafId = requestAnimationFrame(loop);
        };
        rafId = requestAnimationFrame(loop);
    }

    function hideFocus() {
        if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
        }

        heldNode?.classList.remove("is-held");
        heldNode = null;

        heroVisual.classList.remove("has-held");
        focusUi.classList.remove("is-visible");
        focusUi.setAttribute("aria-hidden", "true");
    }

    function startDrag(clientX, clientY) {
        hideFocus();
        isDragging = true;
        lastX = clientX;
        lastY = clientY;
        heroVisual.classList.add("is-dragging");
        techSphere.style.transition = "none";
    }

    function moveDrag(clientX, clientY) {
        if (!isDragging) return;

        const dx = clientX - lastX;
        const dy = clientY - lastY;

        rotY += dx * 0.45;
        rotX -= dy * 0.45;
        rotX = Math.max(-45, Math.min(45, rotX));

        lastX = clientX;
        lastY = clientY;
        applyRotation();
    }

    function endDrag() {
        if (!isDragging) return;
        isDragging = false;
        heroVisual.classList.remove("is-dragging");
        techSphere.style.transition = "";
    }

    techNodes?.forEach((node) => {
        node.addEventListener("mousedown", (e) => {
            e.preventDefault();
            e.stopPropagation();
            showFocus(node);
        });

        node.addEventListener("touchstart", (e) => {
            e.stopPropagation();
            showFocus(node);
        }, { passive: true });
    });

    const alvoArraste = techSphere.querySelector(".sphere-wireframe");

    alvoArraste?.addEventListener("mousedown", (e) => {
        if (e.target.closest(".tech-node")) return;
        e.preventDefault();
        startDrag(e.clientX, e.clientY);
    });

    alvoArraste?.addEventListener("touchstart", (e) => {
        if (e.target.closest(".tech-node")) return;
        const touch = e.touches[0];
        startDrag(touch.clientX, touch.clientY);
    }, { passive: true });

    window.addEventListener("mousemove", (e) => moveDrag(e.clientX, e.clientY));
    window.addEventListener("mouseup", () => {
        endDrag();
        hideFocus();
    });

    window.addEventListener("touchmove", (e) => {
        if (!isDragging) return;
        const touch = e.touches[0];
        moveDrag(touch.clientX, touch.clientY);
    }, { passive: true });

    window.addEventListener("touchend", () => {
        endDrag();
        hideFocus();
    });

    applyRotation();
}
