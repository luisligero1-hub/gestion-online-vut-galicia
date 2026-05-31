// CAMBIAR DATOS PRINCIPALES: sustituye estos valores por los datos reales del proyecto.
const PROJECT_NAME = "Luis Ligero | Gestión online para viviendas turísticas";
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
const backToTopButton = document.querySelector("[data-back-to-top]");
const formSteps = contactForm ? Array.from(contactForm.querySelectorAll("[data-form-step]")) : [];
const stepDots = contactForm ? Array.from(contactForm.querySelectorAll("[data-step-dot]")) : [];
let currentFormStep = 0;

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

document.addEventListener("click", (event) => {
  const button = event.target.closest(".problem-card-button");

  if (!button) return;

  const card = button.closest("[data-problem-card]");

  if (!card) return;

  const isOpen = card.classList.toggle("is-open");
  const plus = button.querySelector(".problem-plus");

  button.setAttribute("aria-expanded", String(isOpen));

  if (plus) {
    plus.textContent = isOpen ? "−" : "+";
  }
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
  const zona = formData.get("zona") || "";
  const tramites = formData.get("tramites") || "";
  const publicada = formData.get("publicada") || "";
  const modalidad = formData.get("modalidad") || "";
  const necesidad = formData.get("necesidad") || "";
  const contacto = formData.get("contacto") || "";

  return `Hola,\n\nMe gustaría solicitar una valoración personalizada para una vivienda turística.\n\nNombre: ${nombre}\nForma preferida de contacto: ${contacto}\nUbicación de la vivienda: ${ubicacion}\nZona: ${zona}\nEstado actual / plataformas: ${publicada}\nAyuda con trámites/alta VUT: ${tramites}\nModalidad que me interesa: ${modalidad}\nQué necesito: ${necesidad}\n\nGracias.`;
}

function showFormStep(stepIndex) {
  if (!formSteps.length) return;

  currentFormStep = Math.max(0, Math.min(stepIndex, formSteps.length - 1));

  formSteps.forEach((step, index) => {
    step.classList.toggle("is-active", index === currentFormStep);
  });

  stepDots.forEach((dot, index) => {
    dot.classList.toggle("is-active", index === currentFormStep);
    dot.classList.toggle("is-complete", index < currentFormStep);
  });
}

if (contactForm && formSteps.length) {
  contactForm.addEventListener("click", (event) => {
    const nextButton = event.target.closest("[data-next-step]");
    const prevButton = event.target.closest("[data-prev-step]");

    if (nextButton) {
      showFormStep(currentFormStep + 1);
    }

    if (prevButton) {
      showFormStep(currentFormStep - 1);
    }
  });

  showFormStep(0);
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
