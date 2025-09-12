window.addEventListener("load", () => {
    // Always reset scroll to top on reload
    window.scrollTo(0, 0);

    const intro = document.getElementById("intro-screen");
    const portfolio = document.getElementById("portfolio");

    // Reset state so intro is default
    intro.style.display = "flex";
    intro.style.opacity = "1";
    intro.style.transform = "translateY(0)";

    portfolio.classList.remove("show");
    portfolio.classList.add("hidden");
});

window.addEventListener("scroll", () => {
    const intro = document.getElementById("intro-screen");
    const portfolio = document.getElementById("portfolio");

    if (window.scrollY > 50) {
        intro.style.opacity = "0";
        intro.style.transform = "translateY(-50px)";
        setTimeout(() => {
            intro.style.display = "none"; // fully hide intro
            portfolio.classList.remove("hidden");
            portfolio.classList.add("show");
        }, 800);
    }
});
