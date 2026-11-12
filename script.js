const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");
const navLinks = document.querySelectorAll(".nav-link");
const themeToggle = document.querySelector("#themeToggle");
const contactForm = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");

menuToggle?.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuToggle.textContent = isOpen ? "×" : "☰";
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    if (menuToggle) {
      menuToggle.textContent = "☰";
      menuToggle.setAttribute("aria-label", "Open navigation");
    }
  });
});


const sections = document.querySelectorAll("main section[id]");
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: "-30% 0px -55% 0px" });
sections.forEach((section) => sectionObserver.observe(section));

const savedTheme = localStorage.getItem("nazila-portfolio-theme");
if (savedTheme === "light") document.body.classList.add("light-theme");
updateThemeButton();

themeToggle?.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  localStorage.setItem(
    "nazila-portfolio-theme",
    document.body.classList.contains("light-theme") ? "light" : "dark"
  );
  updateThemeButton();
});

function updateThemeButton() {
  if (!themeToggle) return;
  const isLight = document.body.classList.contains("light-theme");
  themeToggle.textContent = isLight ? "☾" : "☼";
  themeToggle.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
  themeToggle.title = isLight ? "Switch to dark theme" : "Switch to light theme";
}


contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const subject = String(formData.get("subject") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!name || !email || !subject || !message) {
    formStatus.textContent = "Please complete every field before sending.";
    return;
  }

  const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  const mailto = `mailto:nazilamirzaie23@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  formStatus.textContent = "Opening your email app…";
  window.location.href = mailto;
});

document.querySelector("#year").textContent = new Date().getFullYear();
