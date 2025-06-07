/* --------------------------------------------------
   Mi-Vault  🔐  Core Login & Session Logic
   -------------------------------------------------- */

/* === Element Handles === */
const loginForm       = document.getElementById('loginForm');
const passwordInput   = document.getElementById('passwordInput');
const togglePassword  = document.getElementById('togglePassword');
const loginBtn        = document.getElementById('loginBtn');

const errorModal      = document.getElementById('errorModal')     // your new ID
                    || document.getElementById('wrongPasswordModal'); // fallback
const closeErrorBtn   = document.getElementById('closeError')
                    || document.getElementById('closeModal');

const loadingOverlay  = document.getElementById('loadingOverlay');

/* === Change this whenever you like === */
const correctPassword = 'faka@200998';

/* === 1.  Password visibility toggle === */
if (togglePassword && passwordInput) {
  togglePassword.addEventListener('click', () => {
    const isPwd = passwordInput.type === 'password';
    passwordInput.type       = isPwd ? 'text' : 'password';
    togglePassword.textContent = isPwd ? '🙈' : '👁️';
  });
}

/* === 2.  Handle Login Form Submit === */
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    /* Show loading overlay with Zoro */
    loadingOverlay?.classList.remove('hidden');

    /* Simulated delay for realism */
    setTimeout(() => {
      const userPwd = passwordInput.value.trim();

      if (userPwd === correctPassword) {
        console.log('✅ Access granted!');
        startSessionTimer();                              // kick-off auto-logout
        window.location.href = 'dashboard.html';          // go to vault page
      } else {
        showErrorModal();
      }

      /* Hide the loader either way */
      loadingOverlay?.classList.add('hidden');
    }, 1000);
  });
}

/* === 3.  Error (wrong-password) Modal === */
function showErrorModal() {
  errorModal?.classList.remove('hidden');
  passwordInput.value = '';          // clear field
}

closeErrorBtn?.addEventListener('click', () => {
  errorModal?.classList.add('hidden');
  passwordInput.focus();
});

/* === 4.  Auto-logout after 2 minutes of inactivity === */
let logoutTimer;
function startSessionTimer() {
  /* Reset any existing timer */
  clearTimeout(logoutTimer);

  /* 120 000 ms = 2 min */
  logoutTimer = setTimeout(() => {
    alert('⏰ Session expired – logging out.');
    window.location.href = 'index.html';
  }, 120_000);
}

/* Optional – restart timer whenever user interacts */
['click', 'keydown', 'touchstart'].forEach(evt =>
  document.addEventListener(evt, startSessionTimer, { passive: true })
);

/* === 5.  Hide the overlay once page is ready (just in case) === */
window.addEventListener('load', () => {
  loadingOverlay?.classList.add('hidden');
});
