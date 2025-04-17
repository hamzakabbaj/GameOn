function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// NEW CODE

const closeBtn = document.querySelector(".close");

function closeModal() {
  modalbg.style.display = "none";
}

closeBtn.addEventListener("click", closeModal);

// FORM VALIDATION
function getSelectedLocation() {
  const locations = document.querySelectorAll('input[name="location"]');
  let selectedLocation = null;
  locations.forEach((location) => {
    if (location.checked) {
      selectedLocation = location.value;
    }
  });
  return selectedLocation;
}

function setSelectedLocation(selected_location) {
  const locations = document.querySelectorAll('input[name="location"]');
  locations.forEach((location) => {
    if (location.value === selected_location) {
      location.checked = true;
    }
  });
}

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
});

function createErrorSpan(input, error_message) {
  const errorSpan = document.createElement("p");
  errorSpan.id = `${input.id}-error`;
  errorSpan.classList.add("error-message");
  errorSpan.style.display = "block";
  errorSpan.style.color = "#FF4E60";
  errorSpan.style.fontSize = "10px";
  errorSpan.style.position = "relative";
  errorSpan.textContent = error_message;
  console.log(input);
  input.parentNode.insertBefore(errorSpan, input.nextSibling);
}

function validate() {
  const first = document.getElementById("first");
  const last = document.getElementById("last");
  const email = document.getElementById("email");
  const quantity = document.getElementById("quantity");
  const terms = document.getElementById("checkbox1");
  const notification = document.getElementById("checkbox2");
  const selectedLocation = getSelectedLocation();
  const birthdate = document.getElementById("birthdate");

  // Save to local storage
  const formDataInput = {
    first: first.value,
    last: last.value,
    email: email.value,
    birthdate: birthdate.value,
    quantity: quantity.value,
    location: selectedLocation,
    terms: terms.checked,
    notification: notification.checked,
  };
  localStorage.setItem("formData", JSON.stringify(formDataInput));

  // Clear error messages
  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach((message) => {
    message.remove();
  });

  error_inputs = [];
  const red_border = "2px solid #FF4E60";
  // Validate first name
  if (!first.value || first.value.length < 2) {
    error_inputs.push(first);
    createErrorSpan(
      first,
      "Veuillez entrer 2 caractères ou plus pour le champ du prénom"
    );
  }

  // Validate last name
  if (!last.value || last.value.length < 2) {
    error_inputs.push(last);
    createErrorSpan(
      last,
      "Veuillez entrer 2 caractères ou plus pour le champ du nom"
    );
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value || !emailRegex.test(email.value)) {
    error_inputs.push(email);
    createErrorSpan(email, "Veuillez entrer une adresse email valide.");
  }

  // Validate quantity
  if (
    isNaN(quantity.value) ||
    quantity.value === "" ||
    !Number.isInteger(parseFloat(quantity.value))
  ) {
    error_inputs.push(quantity);
    createErrorSpan(quantity, "Veuillez entrer un nombre valide de tournois.");
  }

  // Validate location
  if (!selectedLocation) {
    // error_inputs.push(location);
    const location_container = document.getElementById("location-container");
    createErrorSpan(location_container, "Veuillez sélectionner une ville.");
  }

  // Validate terms
  if (!terms.checked) {
    console.log(terms.parentElement.querySelector(".checkbox-icon"));
    error_inputs.push(terms.parentElement.querySelector(".checkbox-icon"));
    createErrorSpan(
      terms.parentElement.querySelector(".checkbox2-label"),
      "Veuillez accepter les conditions générales."
    );
  }

  // Validate birthdate
  if (!birthdate.value) {
    error_inputs.push(birthdate);
    createErrorSpan(birthdate, "Veuillez entrer une date de naissance valide.");
  }

  error_inputs.forEach((input) => {
    input.style.border = red_border;
  });

  if (error_inputs.length > 0) {
    return false;
  } else {
    localStorage.removeItem("formData");
    // Remove form element
    const form = document.querySelector("form");
    form.remove();

    const modal_body = document.querySelector(".modal-body");
    modal_body.style.height = "80vh";
    modal_body.style.display = "flex";
    modal_body.style.flexDirection = "column";
    modal_body.style.justifyContent = "center";
    modal_body.style.alignItems = "center";

    // Create thank you message
    const thank_you_message = document.createElement("p");
    thank_you_message.textContent = "Merci pour votre inscription !";
    thank_you_message.style.fontSize = "36px";
    thank_you_message.style.fontWeight = "400";
    thank_you_message.style.fontFamily = "DM Sans";
    thank_you_message.style.textAlign = "center";
    modal_body.appendChild(thank_you_message);

    // Create close button
    const close_button = document.createElement("button");
    close_button.classList.add("btn-submit", "btn-signup");
    close_button.style.position = "absolute";
    close_button.style.bottom = "20px";
    close_button.style.padding = "12px 82px";
    close_button.style.fontSize = "1rem";
    close_button.textContent = "Fermer";
    close_button.addEventListener("click", closeModal);
    modal_body.appendChild(close_button);
  }
}

// Load form data from local storage
const formDataInput = JSON.parse(localStorage.getItem("formData"));
if (formDataInput) {
  document.getElementById("first").value = formDataInput.first;
  document.getElementById("last").value = formDataInput.last;
  document.getElementById("email").value = formDataInput.email;
  document.getElementById("quantity").value = formDataInput.quantity;
  document.getElementById("birthdate").value = formDataInput.birthdate;
  document.getElementById("checkbox1").checked = formDataInput.terms;
  document.getElementById("checkbox2").checked = formDataInput.notification;
  setSelectedLocation(formDataInput.location);
}
