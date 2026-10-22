const body = document.body;
const themeToggle = document.getElementById("theme-toggle");
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const modal = document.getElementById("project-modal");
const modalClose = document.getElementById("modal-close");
const modalTitle = document.getElementById("modal-title");
const modalCategory = document.getElementById("modal-category");
const modalDescription = document.getElementById("modal-description");
const modalFeatures = document.getElementById("modal-features");
const modalStatus = document.getElementById("modal-status");
let lastFocusedElement = null;

const projectInfo = {
  cardiac: {
    category: "IoT · Healthcare concept",
    title: "IoT-Based Cardiac Health Monitoring",
    description: "A proposed system concept that combines connected sensors, cloud data storage, and a mobile interface to help visualize selected vital-sign readings. It is a student project concept, not a medical device or a substitute for professional medical care.",
    features: [
      "Concept for heart-rate and SpO₂ readings using compatible sensors",
      "Cloud-connected data storage and visualization",
      "Threshold-based notification concept",
      "Potential location sharing for an emergency workflow"
    ],
    status: "Status: Update this label to match your real progress (planned, in progress, prototype, or completed)."
  },
  tasks: {
    category: "Mobile · Practice project",
    title: "Task Management App",
    description: "A task-management application concept focused on a straightforward workflow for capturing tasks and tracking completion.",
    features: [
      "Add and display tasks",
      "Mark tasks as complete",
      "Remove tasks when no longer needed",
      "Keep the interface simple and easy to scan"
    ],
    status: "Status: Practice concept. Only describe these features as implemented after testing your app."
  },
  portfolio: {
    category: "Web · Assignment project",
    title: "Personal Developer Portfolio",
    description: "A responsive portfolio website created for the Datheon Task 1 assignment to present technical interests, project showcases, and contact information.",
    features: [
      "Semantic HTML sections and responsive CSS Grid/Flexbox layouts",
      "Light/dark theme toggle and mobile navigation",
      "Project filtering and detail modal popups",
      "Resume link, contact links, and deployment documentation"
    ],
    status: "Status: Current portfolio assignment. Confirm each feature works before submitting."
  },
  landing: {
    category: "UI · Planned practice",
    title: "Responsive Landing Page",
    description: "A planned practice project to explore visual hierarchy and mobile-first layout patterns for a fictional product or service.",
    features: [
      "Clear hero section and primary call to action",
      "Feature cards and responsive grid",
      "Accessible navigation and readable typography",
      "Consistent spacing and color system"
    ],
    status: "Status: Planned idea, not yet completed. Build it before presenting it as finished work."
  }
};

function setTheme(isDark) {
  body.classList.toggle("dark-theme", isDark);
  themeToggle.textContent = isDark ? "☀️" : "🌙";
  themeToggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
  themeToggle.setAttribute("aria-pressed", String(isDark));
  try { localStorage.setItem("portfolio-theme", isDark ? "dark" : "light"); } catch (error) {}
}

let savedTheme = null;
try { savedTheme = localStorage.getItem("portfolio-theme"); } catch (error) {}
setTheme(savedTheme === "dark");

themeToggle.addEventListener("click", () => {
  setTheme(!body.classList.contains("dark-theme"));
});

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  menuToggle.textContent = isOpen ? "×" : "☰";
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    menuToggle.textContent = "☰";
  });
});

document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    document.querySelectorAll(".filter-button").forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    document.querySelectorAll(".project-card").forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
  });
});

function openProjectModal(projectKey, trigger) {
  const project = projectInfo[projectKey];
  if (!project) return;
  lastFocusedElement = trigger;
  modalCategory.textContent = project.category;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalFeatures.replaceChildren();
  project.features.forEach((feature) => {
    const li = document.createElement("li");
    li.textContent = feature;
    modalFeatures.appendChild(li);
  });
  modalStatus.textContent = project.status;
  modal.hidden = false;
  body.classList.add("modal-open");
  modalClose.focus();
}

function closeProjectModal() {
  modal.hidden = true;
  body.classList.remove("modal-open");
  if (lastFocusedElement) lastFocusedElement.focus();
}

document.querySelectorAll(".project-details").forEach((button) => {
  button.addEventListener("click", () => openProjectModal(button.dataset.project, button));
});
modalClose.addEventListener("click", closeProjectModal);
modal.addEventListener("click", (event) => {
  if (event.target === modal) closeProjectModal();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden) closeProjectModal();
});

document.getElementById("year").textContent = new Date().getFullYear();
