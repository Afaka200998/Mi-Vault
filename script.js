function checkPassword() {
  const input = document.getElementById("password").value;
  if (input === "Admin@200998") {
    window.location.href = "dashboard.html";
  } else {
    document.getElementById("error").textContent = "Wrong Password!";
  }
}