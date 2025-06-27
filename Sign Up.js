function handleSignUp(event) {
  event.preventDefault();
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirm").value;
  if (!username || !email || !password || !confirm) {
    alert("Please fill in all fields.");
    return false;
  }
  if (password !== confirm) {
    alert("Passwords do not match.");
    return false;
  }
  alert("Sign up successful!");
  window.location.href = "Profile.html";
  return true;
}

function togglePassword() {
  const passwordInput = document.getElementById("password");
  const type = passwordInput.getAttribute("type");
  passwordInput.setAttribute("type", type === "password" ? "text" : "password");
}
