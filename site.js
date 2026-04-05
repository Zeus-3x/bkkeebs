const navToggle = document.querySelector("[data-nav-toggle]");
const navLinks = document.querySelector("[data-nav-links]");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const formStatus = document.querySelector("[data-form-status]");

if (formStatus) {
  const params = new URLSearchParams(window.location.search);
  const state = params.get("submitted");

  if (state === "1") {
    formStatus.hidden = false;
    formStatus.className = "form-status form-status-success";
    formStatus.textContent = "Message received. It has been stored in Cloudflare.";
  } else if (state === "0") {
    formStatus.hidden = false;
    formStatus.className = "form-status form-status-error";
    formStatus.textContent = "There was a problem sending your message. Please try again.";
  }
}
