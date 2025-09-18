// revert to the original working transition logic:
// keep intro overlay fixed and fade with classes, show portfolio after scrolling past trigger

// Always scroll to top on reload
window.onbeforeunload = () => window.scrollTo(0, 0);

const intro = document.getElementById("intro-screen");
const portfolio = document.getElementById("portfolio");

// Smooth transition effect (original approach)
window.addEventListener("scroll", () => {
    const scrollY = window.scrollY || window.pageYOffset;
    const trigger = window.innerHeight / 4; // same trigger as before

    if (scrollY > trigger) {
        intro.classList.add("fade-out");
        portfolio.classList.remove("hidden");
        portfolio.classList.add("fade-in");
    } else {
        intro.classList.remove("fade-out");
        portfolio.classList.add("hidden");
        portfolio.classList.remove("fade-in");
    }
});
