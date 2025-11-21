// -------- THEME TOGGLE --------
function toggleDark() {
  const el = document.documentElement;
  const isDark = el.classList.toggle("dark");
  try {
    localStorage.setItem("cyberx-theme", isDark ? "dark" : "light");
  } catch (e) {}
}

// Apply saved theme on load
(function applySavedTheme() {
  try {
    const saved = localStorage.getItem("cyberx-theme");
    if (saved === "dark") document.documentElement.classList.add("dark");
    else if (saved === "light") document.documentElement.classList.remove("dark");
  } catch (e) {}
})();

// -------- AUTH VIEW TOGGLE (login / register) --------
function showAuthView(view) {
  const login = document.getElementById("login-card");
  const register = document.getElementById("register-card");
  if (!login || !register) return;

  if (view === "register") {
    login.classList.add("hidden");
    register.classList.remove("hidden");
    register.scrollIntoView({ behavior: "smooth", block: "center" });
  } else {
    register.classList.add("hidden");
    login.classList.remove("hidden");
    login.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

// -------- FEATURE DETAIL TOGGLE --------
function showFeature(id) {
  const details = document.querySelectorAll(".feature-detail");
  details.forEach((d) => d.classList.add("hidden"));
  const el = document.getElementById(id);
  if (el) {
    el.classList.remove("hidden");
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

// -------- INTERACTIONS & ANIMATIONS --------
document.addEventListener("DOMContentLoaded", () => {
  // Scroll reveal
  const revealEls = document.querySelectorAll(".reveal-on-scroll");
  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );
    revealEls.forEach((el) => obs.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  // Hero parallax tilt
  const heroVisual = document.getElementById("hero-visual");
  const wrapper = heroVisual?.querySelector(".hero-illustration-wrapper");
  if (heroVisual && wrapper) {
    heroVisual.addEventListener("mousemove", (e) => {
      const rect = heroVisual.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      const rotateX = y * -10;
      const rotateY = x * 14;

      wrapper.style.transform =
        `translateY(0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    heroVisual.addEventListener("mouseleave", () => {
      wrapper.style.transform = "";
    });
  }

  // HUD defense score small random pulse
  const defSpan = document.getElementById("def-score");
  if (defSpan) {
    let base = 92;
    setInterval(() => {
      const delta = Math.floor(Math.random() * 5) - 2; // -2..+2
      base = Math.min(100, Math.max(70, base + delta));
      defSpan.textContent = base;
    }, 2600);
  }

  // Dynamic mode text: rotates between 3 modes
  const modeSpan = document.getElementById("hero-type-text");
  if (modeSpan) {
    const modes = ["Hack & Run", "Build Your Company", "Cyber Academy"];
    let idx = 0;
    setInterval(() => {
      idx = (idx + 1) % modes.length;
      modeSpan.textContent = modes[idx];
    }, 3000);
  }
});
