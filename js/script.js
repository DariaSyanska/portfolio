document.addEventListener("DOMContentLoaded", () => {
  /* =========================================
     1. AOS Animation Initialization
     ========================================= */
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }

  /* =========================================
   2. Scroll To Top Button Logic
   ========================================= */
  const mybutton = document.getElementById("scrollToTopBtn");
  if (mybutton) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    });

    document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
  }

  /* =========================================
     3. Active Navigation Link on Scroll
     ========================================= */
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".header_menu li a");

  function updateActiveLink() {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((a) => {
      a.classList.remove("active");
      if (a.getAttribute("href").includes(current)) {
        a.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveLink);

  /* =========================================
     4. Auto-Update Copyright Year
     ========================================= */
  const year = new Date().getFullYear();
  const copyrightElement = document.getElementById("copyright");
  if (copyrightElement) {
    copyrightElement.innerHTML = `© ${year} Daria Sianska. All rights reserved.`;
  }

  /* =========================================
     5. Dark Mode Logic
     ========================================= */
  const themeToggleBtn = document.getElementById("theme-toggle");
  const avatarImg = document.getElementById("hero-avatar");

  if (themeToggleBtn && avatarImg) {
    const themeIcon = themeToggleBtn.querySelector("i");
    const body = document.body;

    const lightAvatar = "images/avatar-light.webp";
    const darkAvatar = "images/avatar-dark.webp";

    const updateAvatar = (isDark) => {
      avatarImg.style.opacity = "0";
      setTimeout(() => {
        avatarImg.src = isDark ? darkAvatar : lightAvatar;
        avatarImg.style.opacity = "1";
      }, 200);
    };

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      body.classList.add("dark-theme");
      themeIcon.classList.replace("fa-moon", "fa-sun");
      avatarImg.src = darkAvatar;
    }

    themeToggleBtn.addEventListener("click", () => {
      const isDark = body.classList.toggle("dark-theme");

      if (isDark) {
        themeIcon.classList.replace("fa-moon", "fa-sun");
        localStorage.setItem("theme", "dark");
      } else {
        themeIcon.classList.replace("fa-sun", "fa-moon");
        localStorage.setItem("theme", "light");
      }

      updateAvatar(isDark);
    });
  }

  /* =========================================
     6. Typewriter Effect (Typed.js)
     ========================================= */
  const typedElement = document.querySelector(".typed-text");
  if (typedElement && typeof Typed !== "undefined") {
    new Typed(".typed-text", {
      strings: [
        "Full Stack Developer.",
        "UI/UX Designer.",
        "Problem Solver.",
        "Based in Prague.",
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      loop: true,
      cursorChar: "|",
    });
  }

  /* =========================================
     7. PORTFOLIO FORM SUBMISSION (AJAX)
     ========================================= */
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      const submitBtn = contactForm.querySelector(".contact-section_button");
      const originalText = submitBtn.innerText;

      submitBtn.innerText = "Sending...";
      submitBtn.disabled = true;

      const formData = new FormData(contactForm);

      try {
        const response = await fetch(contactForm.action, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          contactForm.reset();
          window.location.href = "success.html";
        } else {
          alert("Oops! There was a problem submitting your form");
          submitBtn.innerText = originalText;
          submitBtn.disabled = false;
        }
      } catch (error) {
        alert("Oops! There was a problem submitting your form");
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;
      }
    });
  }
});
