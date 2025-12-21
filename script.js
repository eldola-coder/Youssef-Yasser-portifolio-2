// Theme functionality
const themeToggle = document.getElementById("themeToggle");
let currentTheme = localStorage.getItem("theme") || "light";

// Set initial theme
function setInitialTheme() {
  document.documentElement.setAttribute("data-theme", currentTheme);
  updateThemeIcon(currentTheme);
  // Initialize particles after theme is set
  setTimeout(initParticles, 100);
}

// Initialize theme ONCE
setInitialTheme();

// Theme toggle event
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const theme = document.documentElement.getAttribute("data-theme");
    const newTheme = theme === "light" ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme);
    updateParticlesTheme(newTheme);
  });
}

function updateThemeIcon(theme) {
  if (themeToggle) {
    const icon = themeToggle.querySelector("i");
    if (icon) {
      icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
    }
  }
}

// Particles.js initialization
function initParticles() {
  const particlesContainer = document.getElementById("particles-js");
  if (!particlesContainer) {
    console.log("Particles container not found");
    return;
  }

  if (typeof particlesJS === "undefined") {
    console.log("Particles.js not loaded yet");
    setTimeout(initParticles, 100);
    return;
  }

  try {
    const theme = document.documentElement.getAttribute("data-theme");
    const particleColor = theme === "dark" ? "#4da8da" : "#ca42f7ff";
    const lineColor = theme === "dark" ? "#4da8da" : "#d16af4";

    particlesJS("particles-js", {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: particleColor },
        shape: { type: "circle", stroke: { width: 0, color: "#000000" } },
        opacity: {
          value: 0.5,
          random: true,
          anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false },
        },
        size: {
          value: 3,
          random: true,
          anim: { enable: true, speed: 2, size_min: 0.1, sync: false },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: lineColor,
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: { enable: true, rotateX: 600, rotateY: 1200 },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "push" },
          resize: true,
        },
        modes: {
          grab: { distance: 140, line_linked: { opacity: 0.8 } },
          push: { particles_nb: 4 },
        },
      },
      retina_detect: true,
    });

    console.log("Particles initialized successfully with", theme, "theme");
  } catch (error) {
    console.error("Error initializing particles:", error);
  }
}

// Update particles when theme changes
function updateParticlesTheme(theme) {
  if (window.pJSDom && window.pJSDom.length > 0) {
    try {
      window.pJSDom[0].pJS.fn.vendors.destroypJS();
      window.pJSDom = [];
    } catch (error) {
      console.log("Error destroying particles:", error);
    }
  }

  
}

// Mobile menu toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });
}

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    if (hamburger && navMenu) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    }
  })
);

// Contact form handling
const contactForm = document.getElementById("contactForm");
const FORM_ENDPOINT = "https://formspree.io/f/xeobvplw";

if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const statusMessage = document.createElement("p");
    statusMessage.className = "text-center mt-3";
    statusMessage.style.color = "var(--primary)";
    statusMessage.textContent = "Sending...";

    const submitButton = contactForm.querySelector('button[type="submit"]');
    if (submitButton) submitButton.disabled = true;

    contactForm.appendChild(statusMessage);

    const data = Object.fromEntries(new FormData(e.target).entries());

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        statusMessage.textContent =
          "✅ Message sent successfully! I'll be in touch soon.";
        statusMessage.style.color = "green";
        contactForm.reset();
      } else {
        statusMessage.textContent =
          "❌ Submission failed. Please try again or check Formspree settings.";
        statusMessage.style.color = "red";
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      statusMessage.textContent =
        "❌ An unexpected error occurred. Check your connection.";
      statusMessage.style.color = "red";
    } finally {
      if (submitButton) submitButton.disabled = false;

      setTimeout(() => {
        if (statusMessage.parentNode) {
          statusMessage.parentNode.removeChild(statusMessage);
        }
      }, 5000);
    }
  });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Add active class to current page in navigation
function setActiveNavigation() {
  const currentLocation = location.href;
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.href === currentLocation) link.classList.add("active");
  });
}

// Simple animation on scroll
const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("fade-in");
  });
}, observerOptions);

function observeAnimatedElements() {
  const elementsToAnimate = document.querySelectorAll(
    ".intro-card, .project-card, .interest-card, .certificate-card"
  );
  elementsToAnimate.forEach((el) => observer.observe(el));
}

// GitHub API Integration
async function fetchGitHubProjects() {
  const projectsContainer = document.getElementById("projectsContainer");
  if (!projectsContainer) return;

  try {
    const response = await fetch(
      "https://api.github.com/users/itz-youssef/repos?sort=updated&per_page=6"
    );
    const projects = await response.json();

    if (!projects || projects.length === 0) {
      projectsContainer.innerHTML =
        '<div class="loading">No public projects found on GitHub.</div>';
      return;
    }

    projectsContainer.innerHTML = projects
      .map(
        (project) => `
          <div class="project-card">
            <div class="project-icon">
              <i class="fab fa-${getProjectIcon(project.language)}"></i>
            </div>
            <h3>${project.name}</h3>
            <p>${project.description || "No description available"}</p>
            <div class="project-meta">
              <span class="language">${project.language || "Various"}</span>
              <span class="stars"><i class="fas fa-star"></i> ${
                project.stargazers_count
              }</span>
            </div>
            <a href="${project.html_url}" target="_blank" class="project-link">
              View on GitHub
            </a>
          </div>
        `
      )
      .join("");

    document.querySelectorAll(".project-card").forEach((el) => observer.observe(el));
  } catch (error) {
    console.error("Error fetching GitHub projects:", error);
    projectsContainer.innerHTML = `
      <div class="loading">
        <p>Unable to load projects from GitHub.</p>
        <a href="https://github.com/itz-youssef" target="_blank" class="btn btn-primary">
          View on GitHub
        </a>
      </div>
    `;
  }
}

function getProjectIcon(language) {
  const icons = {
    JavaScript: "js",
    Python: "python",
    Java: "java",
    "C++": "cuttlefish",
    HTML: "html5",
    CSS: "css3-alt",
    TypeScript: "js-square",
    PHP: "php",
    Ruby: "gem",
  };
  return icons[language] || "code";
}

// Certificates Data (from Sheets)
let certificatesData = [];

// Generate certificates
function generateCertificates(certificates) {
  const container = document.getElementById("certificatesContainer");
  if (!container) return;

  container.innerHTML = "";

  if (!certificates || certificates.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-file-certificate"></i>
        <h3>No certificates found</h3>
        <p>Try selecting a different filter category</p>
      </div>
    `;
    return;
  }

  certificates.forEach((certificate) => {
    const certificateElement = document.createElement("div");
    certificateElement.className = "certificate-card";
    certificateElement.setAttribute("data-category", certificate.category);
    certificateElement.setAttribute("data-date", certificate.date);
    certificateElement.setAttribute("data-rating", certificate.rating);

    certificateElement.innerHTML = `
      <img src="${certificate.image}" alt="${certificate.title}" class="certificate-image">
      <div class="certificate-content">
        <div class="certificate-header">
          <div class="certificate-badge">
            <i class="fas fa-${certificate.icon}"></i>
          </div>
          <div class="certificate-title">
            <span class="certificate-category">${getCategoryName(
              certificate.category
            )}</span>
            <h3>${certificate.title}</h3>
          </div>
        </div>
        <p>${certificate.description}</p>
        <div class="certificate-meta">
          <span><i class="fas fa-university"></i> ${certificate.issuer}</span>
          <span><i class="far fa-calendar"></i> ${formatDate(certificate.date)}</span>
        </div>
        <div class="certificate-footer">
          <a href="#" class="certificate-link view-certificate" data-image="${certificate.image}">
            View Certificate <i class="fas fa-external-link-alt"></i>
          </a>
          <span class="certificate-rating">
            <i class="fas fa-star"></i> ${certificate.rating}
          </span>
        </div>
      </div>
    `;

    container.appendChild(certificateElement);
  });

  document.querySelectorAll(".view-certificate").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const imageUrl = this.getAttribute("data-image");
      window.openCertificateModal?.(imageUrl);
    });
  });

  setTimeout(() => {
    document.querySelectorAll(".certificate-card").forEach((card) => {
      card.classList.add("fade-in");
    });
  }, 100);
}

// Get category display name
function getCategoryName(category) {
  const categories = {
    programming: "Programming",
    web: "Web Development",
    ai: "AI/ML",
    "soft-skills": "Soft Skills",
  };
  return categories[category] || category;
}

// Format date for display
function formatDate(dateString) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// Filtering and sorting functionality for certificates
function setupCertificatesFiltering() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const sortButtons = document.querySelectorAll(".sort-btn");

  if (filterButtons.length === 0 || sortButtons.length === 0) return;

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filterType = button.getAttribute("data-filter");
      let filteredCertificates = [...certificatesData];

      if (filterType !== "all") {
        filteredCertificates = certificatesData.filter(
          (certificate) => certificate.category === filterType
        );
      }

      generateCertificates(filteredCertificates);
    });
  });

  sortButtons.forEach((button) => {
    button.addEventListener("click", () => {
      sortButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const sortType = button.getAttribute("data-sort");
      let sortedCertificates = [...certificatesData];

      if (sortType === "date") {
        sortedCertificates.sort((a, b) => new Date(b.date) - new Date(a.date));
      }

      if (sortType === "rating") {
        sortedCertificates.sort((a, b) => b.rating - a.rating);
      }

      generateCertificates(sortedCertificates);
    });
  });
}

// Modal functionality for certificate preview
function setupCertificateModal() {
  const modal = document.getElementById("certificateModal");
  const modalImage = document.getElementById("modalImage");
  const modalClose = document.getElementById("modalClose");

  if (!modal || !modalImage || !modalClose) return;

  function openCertificateModal(imageUrl) {
    modalImage.src = imageUrl;
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  }

  function closeCertificateModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }

  modalClose.addEventListener("click", closeCertificateModal);

  modal.addEventListener("click", function (e) {
    if (e.target === modal) closeCertificateModal();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeCertificateModal();
  });

  window.openCertificateModal = openCertificateModal;
}

// Google Sheets CMS
const SHEET_ID = "1qUjr34HZloU2QYjip8yAPwRS6FOAqRp0TPOnKnImKxs";
const API_KEY = "AIzaSyDApsCPIpowQgZ1IwHmrk1VOGPRknBtJMg";

async function fetchSettings() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1!A1:B50?key=${API_KEY}`;
  const res = await fetch(url);
  const json = await res.json();
  if (!json.values) return {};
  return Object.fromEntries(json.values);
}




async function fetchCertificates() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Certificates!A2:G200?key=${API_KEY}`;
  const res = await fetch(url);
  const json = await res.json();
  const rows = json.values || [];

  return rows
    .filter((r) => r.length >= 4 && r[0])
    .map((r, idx) => ({
      id: idx + 1,
      title: r[0] || "",
      issuer: r[1] || "",
      date: r[2] || "",
      category: r[3] || "programming",
      description: r[4] || "",
      image: r[5] || "",
      rating: Number(r[6] || 0),
      icon:
        r[3] === "ai"
          ? "brain"
          : r[3] === "soft-skills"
          ? "user"
          : "code",
      link: "#",
    }));
}

function applySettings(data) {
  if (data.profile_img) {
    document.querySelectorAll(".profile-image").forEach((img) => {
      img.src = data.profile_img;
    });
  }

  const heroName = document.querySelector(".hero-content h1 span");
  const heroDesc = document.querySelector(".hero-content p");
  if (heroName && data.hero_name) heroName.innerText = data.hero_name;
  if (heroDesc && data.hero_desc) heroDesc.innerText = data.hero_desc;

  if (data.vision_text) {
    const vH = Array.from(document.querySelectorAll("h2")).find(
      (h) => h.textContent.trim() === "My Vision"
    );
    if (vH && vH.nextElementSibling)
      vH.nextElementSibling.innerText = data.vision_text;
  }

  if (data.mission_text) {
    const mH = Array.from(document.querySelectorAll("h2")).find(
      (h) => h.textContent.trim() === "My Mission"
    );
    if (mH && mH.nextElementSibling)
      mH.nextElementSibling.innerText = data.mission_text;
  }
}

// Function to hide the preloader
function hidePreloader() {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.classList.add("loader-hidden");
  }
}

// Updated single init
document.addEventListener("DOMContentLoaded", async () => {
  setActiveNavigation();
  observeAnimatedElements();
  fetchGitHubProjects();

  try {
    // 1. Fetch all API data
    const settings = await fetchSettings();
    applySettings(settings);

    const certContainer = document.getElementById("certificatesContainer");
    if (certContainer) {
      certificatesData = await fetchCertificates();
      generateCertificates(certificatesData);
      setupCertificatesFiltering();
      setupCertificateModal();
    }
  } catch (e) {
    console.error("Sheets sync failed:", e);
  } finally {
    // 2. Hide the loader whether it succeeded or failed
    // We add a tiny delay (500ms) for a smoother transition
    setTimeout(hidePreloader, 500);
  }
});

// Add CSS for particles positioning and animations
const style = document.createElement("style");
style.textContent = `
  #particles-js {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
  }

  body {
    position: relative;
    z-index: 1;
  }

  .intro-card, .project-card, .interest-card, .certificate-card {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s, transform 0.6s;
  }

  .fade-in {
    opacity: 1;
    transform: translateY(0);
  }

  .project-meta {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    font-size: 0.9rem;
    color: var(--muted);
  }

  .language, .stars {
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }

  canvas {
    display: block;
    vertical-align: bottom;
  }
`;
document.head.appendChild(style);





