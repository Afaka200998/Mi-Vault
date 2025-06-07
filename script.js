function checkPassword() {
  const input = document.getElementById("pwd").value;
  if (input === "faka@200998") {
    window.location.href = "dashboard.html";
  } else {
    showError();
  }
}

function showError() {
  document.getElementById("popup").style.display = "block";
}

function hidePopup() {
  document.getElementById("popup").style.display = "none";
}

// Auto logout after 2 minutes (120000 milliseconds)
setTimeout(() => {
  alert("Session expired. Please login again.");
  window.location.href = "login.html";
}, 120000);
