// ---------- Smooth Typing Function ----------
function typeText(el, text, speed = 80, callback) {
  el.textContent = "";
  let i = 0;
  const timer = setInterval(() => {
    el.textContent += text.charAt(i);
    i++;
    if (i >= text.length) {
      clearInterval(timer);
      if (callback) callback();
    }
  }, speed);
}

// ---------- On Page Load ----------
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");
  const navToggle = document.getElementById("nav-toggle");
  const body = document.body;
  const navLinks = document.querySelectorAll(".nav-link");
  const year = document.getElementById("year");
  const hero = document.querySelector(".hero");
  
  const nameEl = document.getElementById("animated-name");
  const brandText = document.querySelector(".brand-text");
  const fullName = nameEl ? nameEl.textContent.trim() : "";
  const cursor = document.querySelector(".typing-cursor");

  // Set Year in Footer
  if (year) year.textContent = new Date().getFullYear();

  // ---------- Mobile Navbar Toggle ----------
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true" || false;
      navToggle.setAttribute("aria-expanded", !expanded);
      body.classList.toggle("nav-open");
    });
  }

  // ---------- Header Scroll Behavior ----------
  const onScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add("solid");
    } else {
      header.classList.remove("solid");
    }

    // Highlight Active Nav Link
    let fromTop = window.scrollY + 120;

    navLinks.forEach(link => {
      const section = document.querySelector(link.hash);
      if (!section) return;

      if (
        section.offsetTop <= fromTop &&
        section.offsetTop + section.offsetHeight > fromTop
      ) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  };

  window.addEventListener("scroll", onScroll);
  onScroll();

  // ---------- Smooth Scrolling ----------
  navLinks.forEach(anchor => {
    anchor.addEventListener("click", e => {
      if (!anchor.hash.startsWith("#")) return;
      e.preventDefault();

      const target = document.querySelector(anchor.hash);
      if (!target) return;

      const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });

      if (body.classList.contains("nav-open")) {
        navToggle.click();
      }
    });
  });

  // ---------- Hero Intro Animation ----------
  setTimeout(() => {
    if (hero) hero.classList.add("show");
  }, 200);

  // ---------- Typing + Reveal + Glow Name Animation ----------
  if (nameEl) {
    nameEl.textContent = ""; // clear first

    setTimeout(() => {
      if (cursor) cursor.style.opacity = "1";

      typeText(nameEl, fullName, 90, () => {

        // After typing: reveal + glow
        nameEl.classList.add("name-reveal");

        setTimeout(() => {
          nameEl.classList.add("name-glow");
        }, 260);

        // remove cursor soon
        if (cursor) {
          setTimeout(() => {
            cursor.style.opacity = "0";
          }, 600);
        }
      });
    }, 300);
  }

  // ---------- Brand Logo Micro Animation ----------
  setTimeout(() => {
    if (brandText) brandText.classList.add("brand-animate");

    setTimeout(() => {
      if (brandText) brandText.classList.remove("brand-animate");
    }, 1500);
  }, 600);

  // ---------- Section Scroll Reveal ----------
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".section").forEach(section => {
    revealObserver.observe(section);
  });

  // ---------- Contact Form Demo ----------
  const contactForm = document.getElementById("contactForm");
  const sendBtn = document.getElementById("sendBtn");
  const clearBtn = document.getElementById("clearBtn");

  if (contactForm) {
    contactForm.addEventListener("submit", e => {
      e.preventDefault();
      sendBtn.textContent = "Sending...";
      sendBtn.disabled = true;

      setTimeout(() => {
        alert("Demo: Message sent successfully! (This is client-side only)");
        contactForm.reset();
        sendBtn.textContent = "Send";
        sendBtn.disabled = false;
      }, 900);
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      contactForm.reset();
    });
  }
});