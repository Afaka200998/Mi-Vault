/* ======================================================
   Mi-Vault  |  script.js  –  Core Login + Session Logic
   ====================================================== */
"use strict";

/* ---------- 1. Element Handles ---------- */
const loginForm       = document.getElementById("loginForm");
const passwordInput   = document.getElementById("passwordInput");
const toggleBtn       = document.getElementById("togglePassword");
const errorModal      = document.getElementById("errorModal");
const closeErrorBtn   = document.getElementById("closeError");
const loader          = document.getElementById("loadingOverlay");

/* ---------- 2. Config ---------- */
const CORRECT_PWD  = "faka@200998";   // ← change anytime
const USERNAME     = "Admin";         // for greeting on dashboard

/* ---------- 3. Password Visibility Toggle ---------- */
toggleBtn.addEventListener("click", () => {
  const isPwd = passwordInput.type === "password";
  passwordInput.type      = isPwd ? "text" : "password";
  toggleBtn.textContent   = isPwd ? "🙈" : "👁️";
});

/* ---------- 4. Login Submit Handler ---------- */
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  showLoader(true);

  /* Simulated 1 s processing delay — replace with Firebase call later */
  setTimeout(() => {
    const entered = passwordInput.value.trim();

    if (entered === CORRECT_PWD) {
      // ✅ Success
      sessionStorage.setItem("miVaultUser", USERNAME);
      startSessionTimer();                    // kick off auto-logout
      window.location.href = "dashboard.html";
    } else {
      // ❌ Wrong password
      showError();
    }

    showLoader(false);
  }, 1000);
});

/* ---------- 5. Error Modal Helpers ---------- */
function showError() {
  errorModal.classList.remove("hidden");
  passwordInput.value = "";
  passwordInput.focus();
}
closeErrorBtn.addEventListener("click", () => {
  errorModal.classList.add("hidden");
});

/* ---------- 6. Loader Helpers ---------- */
function showLoader(show = true) {
  if (show) loader.classList.remove("hidden");
  else      loader.classList.add("hidden");
}

/* Hide loader automatically after 4 s if still visible (failsafe) */
setTimeout(() => loader.classList.add("hidden"), 4000);

/* ---------- 7. Auto-Logout Timer (2 minutes) ---------- */
let logoutTimer;
function startSessionTimer() {
  resetLogoutTimer();
  ["click", "keydown", "touchstart"].forEach(evt =>
    document.addEventListener(evt, resetLogoutTimer, { passive: true })
  );
}
function resetLogoutTimer() {
  clearTimeout(logoutTimer);
  logoutTimer = setTimeout(() => {
    alert("⏰ Session expired – logging out.");
    window.location.href = "index.html";
  }, 120_000); // 120 000 ms = 2 min
}

/* ---------- 8. Ensure loader hidden on initial page render ---------- */
window.addEventListener("load", () => {
  loader.classList.add("hidden");
});
