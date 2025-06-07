function checkPassword() {
  const input = document.getElementById("pwd").value;
  if (input === "faka@200998") {
    window.location.href = "dashboard.html";
  } else {
    showError();
  }
}

function showError() {
  document.getElementById("popup").style.display = "flex";
}

function hidePopup() {
  document.getElementById("popup").style.display = "none";
}
