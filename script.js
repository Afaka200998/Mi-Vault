function checkPassword() {
  const input = document.getElementById("pass").value;
  if (input === "faka@200998") {
    window.location.href = "dashboard.html"; // or your protected page
  } else {
    showError();
  }
}

function showError() {
  document.getElementById("popup").classList.remove("hidden");
}

function hidePopup() {
  document.getElementById("popup").classList.add("hidden");
}
