// script.js

// Password validation logic
const passwordInput = document.getElementById("password");
const toggleEye     = document.getElementById("toggle-eye");
const checklist     = document.querySelectorAll(".checklist li");

// Toggle show/hide password
toggleEye.addEventListener("click", () => {
  const isHidden = passwordInput.type === "password";
  passwordInput.type = isHidden ? "text" : "password";
  toggleEye.classList.toggle("active");
});

// Helper functions
function hasThreeCategories(pwd) {
  let count = 0;
  if (/[a-z]/i.test(pwd)) count++;
  if (/\d/.test(pwd)) count++;
  if (/[^a-zA-Z0-9]/.test(pwd)) count++;
  return pwd.length >= 8 && count >= 3;
}

function containsForbidden(pwd) {
  const lowerPwd = pwd.toLowerCase();
  if (lowerPwd.includes("admin")) return true;

  const asc = "0123456789";
  const desc = "9876543210";

  for (let i = 0; i <= pwd.length - 4; i++) {
    const chunk = pwd.substring(i, i + 4);
    if (asc.includes(chunk) || desc.includes(chunk)) return true;
  }

  return false;
}

function hasRepeats(pwd) {
  return /(.)\1\1\1/.test(pwd);
}

// Real-time validation feedback
passwordInput.addEventListener("input", () => {
  const pwd = passwordInput.value;

  // Rule 1: length + any 3 categories
  checklist[0].className = hasThreeCategories(pwd) ? "valid" : "invalid";

  // Rule 2: no "admin", no 4-digit sequence
  checklist[1].className = !containsForbidden(pwd) ? "valid" : "invalid";

  // Rule 3: no 4 repeated chars
  checklist[2].className = !hasRepeats(pwd) ? "valid" : "invalid";
});
