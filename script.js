// script.js

import { ADMIN_PASSWORD } from './firebase-config.js';

// Toggle show/hide password
document.getElementById("toggle-eye").addEventListener("click", () => {
  const passInput = document.getElementById("password");
  if (passInput.type === "password") {
    passInput.type = "text";
  } else {
    passInput.type = "password";
  }
  document.getElementById("toggle-eye").classList.toggle("active");
});

// Password checklist validation
const passwordInput = document.getElementById("password");
const checklistItems = document.querySelectorAll(".checklist li");

passwordInput.addEventListener("input", () => {
  const pwd = passwordInput.value;

  const hasLength = pwd.length >= 8;
  const has3Types = [
    /[a-z]/i.test(pwd),      // letters (either case)
    /\d/.test(pwd),          // digits
    /[!@#$%^&*(),.?":{}|<>]/.test(pwd) // specials
  ].filter(Boolean).length >= 3;

  const noAdmin = !/admin/i.test(pwd);
  const noAscOrDesc = !/0123|1234|2345|3456|4567|5678|6789|7890|9876|8765|7654|6543|5432|4321|3210/.test(pwd);
  const noRepeat = !/(.)\1\1\1/.test(pwd);

  checklistItems[0].classList.toggle("valid", hasLength && has3Types);
  checklistItems[1].classList.toggle("valid", noAdmin && noAscOrDesc);
  checklistItems[2].classList.toggle("valid", noRepeat);
});

// Login button action
document.querySelector("button").addEventListener("click", () => {
  const pwd = passwordInput.value.trim();

  if (pwd === "") {
    alert("Enter a password");
    return;
  }

  if (pwd === ADMIN_PASSWORD) {
    // Admin access - no restrictions
    window.location.href = "admin-vault.html";
    return;
  }

  // Check all checklist rules
  const allValid = Array.from(checklistItems).every(li => li.classList.contains("valid"));

  if (!allValid) {
    showWrongPopup();
    return;
  }

  // User Vault Access
  const userVault = `vaults/${pwd}.html`;
  window.location.href = userVault;
});

// Show error popup
function showWrongPopup() {
  document.getElementById("wrong-popup").style.display = "flex";
}

// Close popup
function closePopup() {
  document.getElementById("wrong-popup").style.display = "none";
}
