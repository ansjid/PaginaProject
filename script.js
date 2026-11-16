const navMenu = document.querySelector(".nav-menu");
const navToggle = document.querySelector(".nav-toggle");

function toggleNavigationMenu() {
  const isOpen = navMenu.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
}

navToggle.addEventListener("click", toggleNavigationMenu);

const projectFilters = document.querySelectorAll(".filtro-proyectos");
const projectCards = document.querySelectorAll("#proyectos article");

projectFilters.forEach((filterButton) => {
  filterButton.addEventListener("click", () => {
    const showFeaturedOnly = filterButton.dataset.filter === "featured";

    projectCards.forEach((project) => {
      project.hidden = showFeaturedOnly && project.dataset.featured !== "true";
    });

    projectFilters.forEach((button) => {
      button.setAttribute("aria-pressed", String(button === filterButton));
    });
  });
});

const contactForm = document.querySelector(".contacto__formulario");
const requiredContactFields = contactForm.querySelectorAll(
  "input[required], textarea[required]"
);

function validateContactField(field) {
  field.setCustomValidity("");

  let errorMessage = "";
  if (!field.value.trim()) {
    errorMessage = "Este campo es obligatorio.";
  } else if (field.type === "email" && field.validity.typeMismatch) {
    errorMessage = "Introduce un correo electrónico válido.";
  }

  field.setCustomValidity(errorMessage);
  field.setAttribute("aria-invalid", String(Boolean(errorMessage)));
  document.getElementById(`${field.id}-error`).textContent = errorMessage;
  return errorMessage === "";
}

requiredContactFields.forEach((field) => {
  const validateAfterInteraction = () => {
    field.dataset.touched = "true";
    validateContactField(field);
  };

  field.addEventListener("input", validateAfterInteraction);
  field.addEventListener("blur", validateAfterInteraction);
  field.addEventListener("invalid", validateAfterInteraction);
});

contactForm.addEventListener("submit", (event) => {
  const invalidFields = Array.from(requiredContactFields).filter((field) => {
    field.dataset.touched = "true";
    return !validateContactField(field);
  });

  if (invalidFields.length > 0) {
    event.preventDefault();
    invalidFields[0].focus();
  }
});