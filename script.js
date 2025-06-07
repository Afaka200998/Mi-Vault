// script.js  –  Mi-Vault
//-------------------------------------

/* ---- Firebase imports ---- */
import { auth, ADMIN_PASSWORD } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "firebase/auth";

/* ---- DOM Elements ---- */
const emailInput      = document.getElementById("email");
const passwordInput   = document.getElementById("password");
const toggleEye       = document.getElementById("toggle-eye");
const checklistItems  = document.querySelectorAll(".checklist li");
const loginBtn        = document.querySelector("button");

/* =========================================================
   1)  Show / hide password
   ========================================================= */
toggleEye.addEventListener("click", () => {
  const hidden = passwordInput.type === "password";
  passwordInput.type = hidden ? "text" : "password";
  toggleEye.classList.toggle("active", hidden);
});

/* =========================================================
   2)  Live password-rule checklist
   ========================================================= */
passwordInput.addEventListener("input", () => {
  const pwd = passwordInput.value;

  // Rule 1 – length ≥ 8 + any 3 categories
  const hasLength  = pwd.length >= 8;
  const categories = [
    /[a-z]/i.test(pwd),          // letters
    /\d/.test(pwd),              // digits
    /[^a-zA-Z0-9]/.test(pwd)     // specials
  ].filter(Boolean).length >= 3;

  // Rule 2 – no “admin” & no 4-digit ascending/descending
  const noAdmin      = !/admin/i.test(pwd);
  const noAscDesc4   = !/0123|1234|2345|3456|4567|5678|6789|7890|9876|8765|7654|6543|5432|4321|3210/.test(pwd);

  // Rule 3 – no 4 repeated chars
  const noRepeats4   = !/(.)\1\1\1/.test(pwd);

  checklistItems[0].classList.toggle("valid", hasLength && categories);
  checklistItems[1].classList.toggle("valid", noAdmin && noAscDesc4);
  checklistItems[2].classList.toggle("valid", noRepeats4);
});

/* =========================================================
   3)  Login / Sign-in handler
   ========================================================= */
loginBtn.addEventListener("click", async () => {
  const email = emailInput.value.trim();
  const pwd   = passwordInput.value.trim();

  // Basic checks
  if (!email || !pwd) {
    alert("Enter both email and password.");
    return;
  }

  /* --- Admin back-door --- */
  if (pwd === ADMIN_PASSWORD) {
    window.location.href = "admin-vault.html";
    return;
  }

  /* --- Validate password rules before hitting Firebase --- */
  const allRulesPass = Array.from(checklistItems).every(li =>
    li.classList.contains("valid")
  );
  if (!allRulesPass) {
    showWrongPopup();
    return;
  }

  /* --- Firebase Email/Password sign-in --- */
  try {
    await signInWithEmailAndPassword(auth, email, pwd);

    // Success → redirect to that user’s vault
    const vaultFile = `vaults/${pwd}.html`;
    window.location.href = vaultFile;
  } catch (err) {
    console.error("Firebase login error:", err);
    showWrongPopup();
  }
});

/* =========================================================
   4)  Wrong-password popup helpers
   ========================================================= */
function showWrongPopup() {
  document.getElementById("wrong-popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("wrong-popup").style.display = "none";
}

/* ---------------------------------------------------------
   That’s it!  –  Freak, you’re ready to roll. 😎
   --------------------------------------------------------- */
