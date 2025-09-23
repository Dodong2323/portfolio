// Scroll transition logic
window.onbeforeunload = () => window.scrollTo(0, 0);

const intro = document.getElementById("intro-screen");
const portfolio = document.getElementById("portfolio");
const header = document.querySelector(".site-header");
const themeToggle = document.getElementById("theme-toggle");

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY || window.pageYOffset;
    const trigger = window.innerHeight / 4;

    if (scrollY > trigger) {
        intro.classList.add("fade-out");
        portfolio.classList.remove("hidden");
        portfolio.classList.add("fade-in");
        header && header.classList.remove("hidden");
        document.documentElement.classList.add('condensed');
    } else {
        intro.classList.remove("fade-out");
        portfolio.classList.add("hidden");
        portfolio.classList.remove("fade-in");
        header && header.classList.add("hidden");
        document.documentElement.classList.remove('condensed');
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
        link: "https://app.cnergy.site/"
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

    // Hover video preview (lazy create on first hover)
    let videoEl = null;
    const videoSrc = card.getAttribute('data-video');
    if (videoSrc) {
        const ensureVideo = () => {
            if (!videoEl) {
                videoEl = document.createElement('video');
                videoEl.className = 'preview';
                videoEl.src = videoSrc;
                videoEl.muted = true;
                videoEl.loop = true;
                videoEl.playsInline = true;
                card.prepend(videoEl);
            }
            if (videoEl.paused) videoEl.play().catch(() => {});
        };
        card.addEventListener('mouseenter', ensureVideo);
        card.addEventListener('focusin', ensureVideo);
        card.addEventListener('mouseleave', () => { if (videoEl) videoEl.pause(); });
        card.addEventListener('focusout', () => { if (videoEl) videoEl.pause(); });
    }
});

// Close modal
closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
window.addEventListener("click", e => {
    if (e.target === modal) modal.classList.add("hidden");
});

// Reveal-on-scroll animations for second view
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
        }
    })
}, { threshold: 0.15 });

revealEls.forEach(el => io.observe(el));

// Project filters
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

function applyFilter(filter) {
    projectCards.forEach(card => {
        const tags = (card.getAttribute('data-tags') || '').toLowerCase();
        const show = filter === 'all' || tags.includes(filter);
        card.style.display = show ? '' : 'none';
    });
}

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applyFilter(btn.dataset.filter);
    });
});

// Copy email action
const copyBtn = document.getElementById('copy-email');
if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText('christiannoynay5@gmail.com');
            copyBtn.textContent = 'Copied!';
            setTimeout(() => copyBtn.textContent = 'Copy Email', 1200);
        } catch (e) {
            copyBtn.textContent = 'Press Ctrl+C';
        }
    });
}

// Contact form: open mailto with prefilled subject/body
const contactForm = document.getElementById('contact-form');
const cfNote = document.getElementById('cf-note');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('cf-name').value.trim();
        const email = document.getElementById('cf-email').value.trim();
        const message = document.getElementById('cf-message').value.trim();
        if (!message) {
            if (cfNote) cfNote.textContent = 'Please enter a message.';
            return;
        }

        // If EmailJS is loaded and configured, send with EmailJS; otherwise fallback to mailto
        const hasEmailJS = typeof emailjs !== 'undefined' && emailjs.send;
        if (hasEmailJS && window.EMAILJS_PUBLIC_KEY && window.EMAILJS_SERVICE_ID && window.EMAILJS_TEMPLATE_ID) {
            if (cfNote) cfNote.textContent = 'Sending...';
            emailjs.init(window.EMAILJS_PUBLIC_KEY);
            emailjs.send(window.EMAILJS_SERVICE_ID, window.EMAILJS_TEMPLATE_ID, {
                from_name: name || 'Visitor',
                from_email: email || 'noreply@example.com',
                message,
                to_email: 'christiannoynay5@gmail.com'
            }).then(() => {
                if (cfNote) cfNote.textContent = 'Message sent successfully!';
                contactForm.reset();
            }).catch(() => {
                if (cfNote) cfNote.textContent = 'Failed to send via EmailJS. Opening email app...';
                const to = 'christiannoynay5@gmail.com';
                const subject = encodeURIComponent(`Portfolio message from ${name || 'Visitor'}`);
                const bodyContent = `Message:%0D%0A${encodeURIComponent(message)}%0D%0A%0D%0A` + (email ? `Reply-to: ${encodeURIComponent(email)}` : '');
                const mailtoLink = `mailto:${to}?subject=${subject}&body=${bodyContent}`;
                window.location.href = mailtoLink;
            });
            return;
        }

        const to = 'christiannoynay5@gmail.com';
        const subject = encodeURIComponent(`Portfolio message from ${name || 'Visitor'}`);
        const bodyContent = `Message:%0D%0A${encodeURIComponent(message)}%0D%0A%0D%0A` + (email ? `Reply-to: ${encodeURIComponent(email)}` : '');
        const mailtoLink = `mailto:${to}?subject=${subject}&body=${bodyContent}`;
        window.location.href = mailtoLink;
        if (cfNote) cfNote.textContent = 'Opening your email app...';
    });
}

// Theme toggling with persistence
const rootEl = document.documentElement;
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    rootEl.classList.add('light');
    if (themeToggle) themeToggle.setAttribute('aria-pressed', 'true');
}
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isLight = rootEl.classList.toggle('light');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        themeToggle.setAttribute('aria-pressed', isLight ? 'true' : 'false');
    });
}

// (reverted: no mobile burger menu)

