// DOM Elements
const loginForm = document.getElementById("loginForm");
const passwordInput = document.getElementById("passwordInput");
const togglePassword = document.getElementById("togglePassword");
const loginBtn = document.getElementById("loginBtn");
const errorModal = document.getElementById("wrongPasswordModal");
const closeModal = document.getElementById("closeModal");
const loadingOverlay = document.getElementById("loadingOverlay");

// Simulated correct password (change it anytime)
const correctPassword = "faka@200998";

// Show/hide password toggle
togglePassword.addEventListener("click", () => {
  const type = passwordInput.type === "password" ? "text" : "password";
  passwordInput.type = type;
  togglePassword.textContent = type === "password" ? "👁️" : "🙈";
});

// Handle login form submission
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  loadingOverlay.classList.remove("hidden");

  setTimeout(() => {
    const userPassword = passwordInput.value.trim();

    if (userPassword === correctPassword) {
      // Simulate success (redirect to dashboard.html or show a message)
      console.log("✅ Access granted!");
      window.location.href = "dashboard.html";
    } else {
      showError();
    }

    loadingOverlay.classList.add("hidden");
  }, 1000); // Simulated delay
});

// Show error modal
function showError() {
  errorModal.classList.remove("hidden");
}

// Hide error modal
closeModal.addEventListener("click", () => {
  errorModal.classList.add("hidden");
});
