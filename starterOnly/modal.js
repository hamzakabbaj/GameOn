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

function validate() {
  const first = document.getElementById("first");
  const last = document.getElementById("last");
  const email = document.getElementById("email");
  const quantity = document.getElementById("quantity");
  const terms = document.getElementById("checkbox1");
  const notification = document.getElementById("checkbox2");
  const selectedLocation = getSelectedLocation();

  // Save to local storage
  const formDataInput = {
    first: first.value,
    last: last.value,
    email: email.value,
    quantity: quantity.value,
    location: selectedLocation,
    terms: terms.checked,
    notification: notification.checked,
  };
  localStorage.setItem("formData", JSON.stringify(formDataInput));

  if (!selectedLocation) {
    alert("Veuillez sélectionner une ville.");
    return;
  }

  if (!terms.checked) {
    alert("Veuillez accepter les conditions générales.");
    return;
  }

  localStorage.removeItem("formData");
}

// Load form data from local storage
const formDataInput = JSON.parse(localStorage.getItem("formData"));
if (formDataInput) {
  document.getElementById("first").value = formDataInput.first;
  document.getElementById("last").value = formDataInput.last;
  document.getElementById("email").value = formDataInput.email;
  document.getElementById("quantity").value = formDataInput.quantity;
  document.getElementById("checkbox1").checked = formDataInput.terms;
  document.getElementById("checkbox2").checked = formDataInput.notification;
  setSelectedLocation(formDataInput.location);
}
