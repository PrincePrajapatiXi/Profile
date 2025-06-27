function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  if (username && password) {
    window.location.href = "Profile.html";
  } else {
    alert("Please fill in both fields.");
  }
  return false;
}

function togglePassword() {
  const passwordInput = document.getElementById("password");
  const type = passwordInput.getAttribute("type");
  passwordInput.setAttribute("type", type === "password" ? "text" : "password");
}