// Scroll transition logic
window.onbeforeunload = () => window.scrollTo(0, 0);

const intro = document.getElementById("intro-screen");
const portfolio = document.getElementById("portfolio");

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY || window.pageYOffset;
    const trigger = window.innerHeight / 4;

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

// Modal logic
const modal = document.getElementById("project-modal");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalLink = document.getElementById("modal-link");
const closeBtn = document.querySelector(".modal .close");

const projectData = {
    capstone: {
        title: "Capstone Project",
        desc: "A fitness progress and tracking platform, available on both web and mobile. Includes analytics dashboards, workout logging, and sales integration for premium features.",
        link: "https://http://app.cnergy.site/"
    },
    project2: {
        title: "Pet Management System",
        desc: "A web and mobile system for managing pet records, veterinary appointments, vaccinations, and owner profiles. Designed to simplify pet care for vets and owners alike.",
        link: "https://github.com/Dodong2323/Pets_Management_clinic_backend"
    },
    project3: {
        title: "Project Three",
        desc: "Modern e-commerce interface with shopping cart, payment gateway, and user dashboard. Built with React.",
        link: "https://github.com/yourusername/project3"
    },
    // 🔥 New Projects
    nextjs: {
        title: "NextJs Attendance",
        desc: "Attendance tracking app built with Next.js for fast and scalable web solutions.",
        link: "https://github.com/Dodong2323/NextJs-attendance"
    },
    login: {
        title: "Basic Login",
        desc: "Simple login system built with HTML, CSS, and JavaScript — demonstrates authentication basics.",
        link: "https://github.com/Dodong2323/login-ni-sir-rj"
    },
    gamedev: {
        title: "Game Dev",
        desc: "Mini game projects experimenting with core game development mechanics and interactivity.",
        link: "https://github.com/Dodong2323/gamedev"
    }
};


// Open modal when project is clicked
document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", () => {
        const key = card.dataset.project;
        const data = projectData[key];
        modalTitle.textContent = data.title;
        modalDesc.textContent = data.desc;
        modalLink.href = data.link;
        modal.classList.remove("hidden");
    });
});

// Close modal
closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
window.addEventListener("click", e => {
    if (e.target === modal) modal.classList.add("hidden");
});

