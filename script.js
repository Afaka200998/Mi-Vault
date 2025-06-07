// DOM Elements
const errorModal = document.getElementById('errorModal');
const closeError = document.getElementById('closeError');

// Simulated correct password
const correctPassword = "faka@200998";

// Trigger check on page load or button click (you can change this as needed)
window.addEventListener("load", () => {
  const userPassword = prompt("Enter your password:");

  if (userPassword !== correctPassword) {
    showError();
  } else {
    console.log("Access granted!");
  }
});

// Show error modal
function showError() {
  errorModal.classList.remove("hidden");
}

// Hide error modal
closeError.addEventListener("click", () => {
  errorModal.classList.add("hidden");
});
