// Theme functionality
const themeToggle = document.getElementById("themeToggle");
const currentTheme = localStorage.getItem("theme") || "light";

// Set initial theme
document.documentElement.setAttribute("data-theme", currentTheme);
updateThemeIcon(currentTheme);

// Theme toggle event
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  if (themeToggle) {
    const icon = themeToggle.querySelector("i");
    if (theme === "dark") {
      icon.className = "fas fa-sun";
    } else {
      icon.className = "fas fa-moon";
    }
  }
}

// Mobile menu toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });
}

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

// Contact form handling
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    // In a real application, you would send this data to a server
    // For this example, we'll just show an alert
    alert(`Thank you for your message, ${name}! I'll get back to you soon.`);

    // Reset form
    contactForm.reset();
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
document.addEventListener("DOMContentLoaded", function () {
  const currentLocation = location.href;
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    if (link.href === currentLocation) {
      link.classList.add("active");
    }
  });
});

// Simple animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", function () {
  const elementsToAnimate = document.querySelectorAll(
    ".intro-card, .project-card, .interest-card, .gallery-item"
  );

  elementsToAnimate.forEach((el) => {
    observer.observe(el);
  });
});

// GitHub API Integration
async function fetchGitHubProjects() {
  const projectsContainer = document.getElementById("projectsContainer");
  if (!projectsContainer) return;

  try {
    const response = await fetch(
      "https://api.github.com/users/itz-youssef/repos?sort=updated&per_page=6"
    );
    const projects = await response.json();

    if (projects.length === 0) {
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
                    <span class="language">${
                      project.language || "Various"
                    }</span>
                    <span class="stars"><i class="fas fa-star"></i> ${
                      project.stargazers_count
                    }</span>
                </div>
                <a href="${
                  project.html_url
                }" target="_blank" class="project-link">View on GitHub</a>
            </div>
        `
      )
      .join("");

    // Re-observe new project cards for animation
    document.querySelectorAll(".project-card").forEach((el) => {
      observer.observe(el);
    });
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

// Load GitHub projects when page loads
document.addEventListener("DOMContentLoaded", fetchGitHubProjects);

// Add fade-in animation class to CSS
const style = document.createElement("style");
style.textContent = `
    .intro-card, .project-card, .interest-card, .gallery-item {
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
`;
document.head.appendChild(style);
