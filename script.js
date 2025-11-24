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
  const btnLogin = document.getElementById("btn-login");
  const btnRegister = document.getElementById("btn-register");

  if (!login || !register) return;

  if (view === "register") {
    login.classList.add("hidden");
    register.classList.remove("hidden");
    btnLogin?.classList.remove("auth-toggle-btn-active");
    btnRegister?.classList.add("auth-toggle-btn-active");
    register.scrollIntoView({ behavior: "smooth", block: "center" });
  } else {
    register.classList.add("hidden");
    login.classList.remove("hidden");
    btnRegister?.classList.remove("auth-toggle-btn-active");
    btnLogin?.classList.add("auth-toggle-btn-active");
    login.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

// -------- FEATURE DETAIL TOGGLE (read details buttons) --------
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

  // ---------- CORE GAME MODES: highlight logic ----------
  const modeSpan = document.getElementById("hero-type-text");
  const cards = Array.from(
    document.querySelectorAll(".feature-card[data-mode]")
  );

  if (cards.length && modeSpan) {
    // helper: activate a specific index
    let activeIndex = 0;

    function activateCard(index, scrollToFeatures = false) {
      if (!cards[index]) return;
      activeIndex = index;

      // remove from all
      cards.forEach((c) => c.classList.remove("is-active"));

      const card = cards[index];
      card.classList.add("is-active");

      const modeName = card.getAttribute("data-mode") || "";
      if (modeName) modeSpan.textContent = modeName;

      if (scrollToFeatures) {
        document
          .getElementById("features")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }

    // initial: first card
    activateCard(0, false);

    // hover: temporarily highlight that card
    cards.forEach((card, idx) => {
      const modeName = card.getAttribute("data-mode") || "";

      card.addEventListener("mouseenter", () => {
        cards.forEach((c) => c.classList.remove("is-active"));
        card.classList.add("is-active");
        if (modeName) modeSpan.textContent = modeName;
      });

      card.addEventListener("mouseleave", () => {
        // when leaving, go back to the current active index
        activateCard(activeIndex, false);
      });

      // click / tap: make it the active one
      card.addEventListener("click", () => {
        activateCard(idx, true);
      });
    });

    // keyboard: 1, 2, 3 to focus cards (NO auto-rotation)
    window.addEventListener("keydown", (e) => {
      if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) return;

      if (["1", "2", "3"].includes(e.key)) {
        const idx = parseInt(e.key, 10) - 1;
        activateCard(idx, true);
      }
    });
  }
});
