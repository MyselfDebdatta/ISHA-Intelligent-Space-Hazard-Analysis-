document.addEventListener("DOMContentLoaded", () => {
  const API = "http://localhost:5000/api/auth";

  /* ========== REGISTER ========== */
  const registerForm = document.getElementById("registerForm");

  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      console.log("Register submit fired");

      const username = document.getElementById("regUsername").value;
      const email = document.getElementById("regEmail").value;
      const password = document.getElementById("regPassword").value;

      const res = await fetch(`${API}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registration successful ✅");
      } else {
        alert(data.message || "Registration failed");
      }
    });
  }

  /* ========== LOGIN ========== */
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      console.log("Login submit fired");

      const username = document.getElementById("loginUsername").value;
      const password = document.getElementById("loginPassword").value;

      const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        alert("Login successful 🎉");
        window.location.href = "dashboard.html";
      } else {
        alert(data.message || "Login failed");
      }
    });
  }

  /* ========== UI TOGGLE (SAFE) ========== */
  const container = document.querySelector(".container");
  const loginLink = document.querySelector(".SignInLink");
  const registerLink = document.querySelector(".SignUpLink");

  if (registerLink && container) {
    registerLink.addEventListener("click", () => {
      container.classList.add("active");
    });
  }

  if (loginLink && container) {
    loginLink.addEventListener("click", () => {
      container.classList.remove("active");
    });
  }
});
