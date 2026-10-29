const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");
const tabletOrSmaller = window.matchMedia("(max-width: 1024px)");

if (navToggle && mainNav) {
    const setMenuOpen = (isOpen) => {
        mainNav.classList.toggle("is-open", isOpen);
        navToggle.setAttribute("aria-expanded", String(isOpen));
        navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
        navToggle.textContent = isOpen ? "×" : "☰";
    };

    navToggle.addEventListener("click", () => {
        setMenuOpen(navToggle.getAttribute("aria-expanded") !== "true");
    });

    mainNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => setMenuOpen(false));
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            setMenuOpen(false);
        }
    });

    window.addEventListener("resize", () => {
        if (!tabletOrSmaller.matches) {
            setMenuOpen(false);
        }
    });
}