import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { firebaseConfig } from "./firebase-config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Password toggle (eye icon)
document.addEventListener("DOMContentLoaded", () => {
  const passwordInput = document.getElementById("password");
  const togglePassword = document.getElementById("togglePassword");

  togglePassword.addEventListener("click", () => {
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    togglePassword.classList.toggle("fa-eye-slash");
  });

  // Form submit
  document.getElementById("vaultForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const email = "admin@mi.com"; // Hardcoded email
    const password = document.getElementById("password").value;

    // Show Zoro loading
    const loading = document.getElementById("zoro-loading");
    loading.style.display = "block";

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Check if admin
        if (password === "faka@200998") {
          window.location.href = "admin-vault.html";
        } else {
          window.location.href = "dashboard.html";
        }
      })
      .catch((error) => {
        loading.style.display = "none";
        showPopup("Incorrect password. Try again!");
      });
  });
});

// Show popup with Luffy image
function showPopup(message) {
  const popup = document.createElement("div");
  popup.style.position = "fixed";
  popup.style.top = "50%";
  popup.style.left = "50%";
  popup.style.transform = "translate(-50%, -50%)";
  popup.style.backgroundColor = "#222";
  popup.style.color = "white";
  popup.style.padding = "20px";
  popup.style.borderRadius = "10px";
  popup.style.boxShadow = "0 0 20px rgba(0, 0, 0, 0.5)";
  popup.style.zIndex = "9999";
  popup.style.textAlign = "center";

  const image = document.createElement("img");
  image.src = "luffy.png";
  image.alt = "Luffy";
  image.style.width = "100px";
  image.style.marginBottom = "10px";

  const text = document.createElement("p");
  text.innerText = message;

  popup.appendChild(image);
  popup.appendChild(text);
  document.body.appendChild(popup);

  setTimeout(() => {
    document.body.removeChild(popup);
  }, 2500);
}
