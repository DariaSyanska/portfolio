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
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");

  if (scrollToTopBtn) {
    const toggleScrollButton = () => {
      if (window.scrollY > 300) {
        scrollToTopBtn.classList.add("show");
      } else {
        scrollToTopBtn.classList.remove("show");
      }
    };

    window.addEventListener("scroll", toggleScrollButton);
    toggleScrollButton();

    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  /* =========================================
     3. Active Navigation Link on Scroll
     ========================================= */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".header_menu li a");

  function updateActiveLink() {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((a) => {
      a.classList.remove("active");
      if (a.getAttribute("href") === `#${current}`) {
        a.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveLink);
  updateActiveLink();

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

  if (themeToggleBtn) {
    const themeIcon = themeToggleBtn.querySelector("i");
    const body = document.body;

    const updateAvatar = (isDark) => {
      if (!avatarImg) return;
      avatarImg.style.opacity = "0";
      setTimeout(() => {
        avatarImg.src = isDark
          ? "images/avatar-dark.webp"
          : "images/avatar-light.webp";
        avatarImg.style.opacity = "1";
      }, 200);
    };

    const savedTheme = localStorage.getItem("theme");
    const isDarkInitially = savedTheme === "dark";

    if (isDarkInitially) {
      body.classList.add("dark-theme");
      if (themeIcon) themeIcon.classList.replace("fa-moon", "fa-sun");
      if (avatarImg) avatarImg.src = "images/avatar-dark.webp";
    }

    themeToggleBtn.setAttribute("aria-pressed", String(isDarkInitially));

    themeToggleBtn.addEventListener("click", () => {
      const isDark = body.classList.toggle("dark-theme");
      localStorage.setItem("theme", isDark ? "dark" : "light");

      if (themeIcon) {
        if (isDark) {
          themeIcon.classList.replace("fa-moon", "fa-sun");
        } else {
          themeIcon.classList.replace("fa-sun", "fa-moon");
        }
      }

      themeToggleBtn.setAttribute("aria-pressed", String(isDark));
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
        '<span class="typed-gradient">Full Stack Developer.</span>',
        '<span class="typed-gradient">UI/UX Designer.</span>',
        '<span class="typed-gradient">Problem Solver.</span>',
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      loop: true,
      cursorChar: "|",
      contentType: "html",
    });
  }

  /* =========================================
     7. PORTFOLIO FORM SUBMISSION (AJAX)
     ========================================= */
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    const consentCheckbox = document.getElementById("contact-consent");
    const consentError = document.getElementById("consent-error");
    const consentField = consentCheckbox?.closest(".consent-field");

    const clearConsentError = () => {
      if (consentError) consentError.textContent = "";
      if (consentField) consentField.classList.remove("has-error");
    };

    const showConsentError = () => {
      if (consentError) {
        consentError.textContent =
          "Please accept the Privacy Policy before submitting the form.";
      }
      if (consentField) consentField.classList.add("has-error");
    };

    consentCheckbox?.addEventListener("change", () => {
      if (consentCheckbox.checked) clearConsentError();
    });

    contactForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      if (!consentCheckbox || !consentCheckbox.checked) {
        showConsentError();
        consentCheckbox?.focus();
        return;
      }

      clearConsentError();

      const submitBtn = contactForm.querySelector(".contact-section_button");
      if (!submitBtn) return;
      const originalText = submitBtn.innerText;

      submitBtn.innerText = "Sending...";
      submitBtn.disabled = true;

      const formData = new FormData(contactForm);

      try {
        const response = await fetch(contactForm.action, {
          method: "POST",
          body: formData,
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          contactForm.reset();
          clearConsentError();
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

  /* =========================================
   8. Cookie Banner
   ========================================= */
  const cookieBanner = document.getElementById("cookieBanner");
  const cookieAccept = document.getElementById("cookieAccept");
  const cookieDecline = document.getElementById("cookieDecline");

  if (cookieBanner && cookieAccept && cookieDecline) {
    if (!localStorage.getItem("cookie-consent")) {
      cookieBanner.style.display = "flex";
    }

    cookieAccept.onclick = () => {
      localStorage.setItem("cookie-consent", "accepted");
      cookieBanner.style.display = "none";
    };

    cookieDecline.onclick = () => {
      localStorage.setItem("cookie-consent", "declined");
      cookieBanner.style.display = "none";
    };
  }

  /* =========================================
   9. Contract Print / PDF
   ========================================= */
  const printContractBtn = document.getElementById("printContractBtn");

  if (printContractBtn) {
    printContractBtn.addEventListener("click", () => {
      window.print();
    });
  }

  /* =========================================
   10. Burger Menu Logic
   ========================================= */
  const burgerBtn = document.querySelector(".burger-btn");
  const mobileMenu = document.querySelector(".header_mobile-wrapper");
  const mobileNavLinks = document.querySelectorAll(
    ".header_menu .link, .header_actions a",
  );

  if (burgerBtn && mobileMenu) {
    burgerBtn.addEventListener("click", () => {
      const isOpen = burgerBtn.classList.toggle("is-active");
      mobileMenu.classList.toggle("is-open");
      document.body.classList.toggle("no-scroll");
      burgerBtn.setAttribute("aria-expanded", String(isOpen));
    });

    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        burgerBtn.classList.remove("is-active");
        mobileMenu.classList.remove("is-open");
        document.body.classList.remove("no-scroll");
      });
    });
  }
});
