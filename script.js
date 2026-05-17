// CAMBIAR DATOS PRINCIPALES: sustituye estos valores por los datos reales del proyecto.
const PROJECT_NAME = "Luis Ligero | Gestión Turística Online";
const WHATSAPP_PHONE = "34620089622";
const CONTACT_EMAIL = "luisligero1@gmail.com";

const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const header = document.querySelector("[data-header]");
const yearElement = document.querySelector("[data-year]");
const whatsappLinks = document.querySelectorAll("[data-whatsapp-link]");
const emailLinks = document.querySelectorAll("[data-email-link]");
const contactForm = document.querySelector("[data-contact-form]");
const formWhatsappButton = document.querySelector("[data-form-whatsapp]");
const problemCards = document.querySelectorAll("[data-problem-card]");
const backToTopButton = document.querySelector("[data-back-to-top]");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

whatsappLinks.forEach((link) => {
  const message = encodeURIComponent(`Hola, me gustaría solicitar una valoración personalizada para una vivienda turística. Proyecto: ${PROJECT_NAME}`);
  link.href = `https://wa.me/${WHATSAPP_PHONE}?text=${message}`;
});

emailLinks.forEach((link) => {
  const subject = encodeURIComponent("Consulta sobre gestión online de vivienda turística");
  link.href = `mailto:${CONTACT_EMAIL}?subject=${subject}`;
});

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("nav-open", isOpen);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      navToggle.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
    });
  });
}

window.addEventListener("scroll", () => {
  if (header) {
    header.classList.toggle("is-scrolled", window.scrollY > 20);
  }

  if (backToTopButton) {
    backToTopButton.classList.toggle("is-visible", window.scrollY > 700);
  }
}, { passive: true });

problemCards.forEach((card) => {
  const button = card.querySelector(".problem-card-button");

  if (!button) return;

  button.addEventListener("click", () => {
    const isOpen = card.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(isOpen));
  });
});

if (backToTopButton) {
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

function getContactMessage() {
  if (!contactForm) {
    return `Hola, me gustaría solicitar una valoración personalizada para una vivienda turística. Proyecto: ${PROJECT_NAME}`;
  }

  const formData = new FormData(contactForm);
  const nombre = formData.get("nombre") || "";
  const ubicacion = formData.get("ubicacion") || "";
  const tramites = formData.get("tramites") || "";
  const publicada = formData.get("publicada") || "";
  const necesidad = formData.get("necesidad") || "";

  return `Hola,\n\nMe gustaría solicitar información sobre el servicio de gestión online y trámites VUT.\n\nNombre: ${nombre}\nUbicación de la vivienda: ${ubicacion}\nAyuda con trámites/alta VUT: ${tramites}\nPublicada en plataformas: ${publicada}\nQué necesito: ${necesidad}\n\nGracias.`;
}

if (formWhatsappButton) {
  formWhatsappButton.addEventListener("click", () => {
    const message = encodeURIComponent(getContactMessage());
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${message}`, "_blank", "noopener");
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const subject = encodeURIComponent("Consulta sobre gestión online de vivienda turística");
    const body = encodeURIComponent(getContactMessage());

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  });
}
