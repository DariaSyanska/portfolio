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
  const navLinks = document.querySelectorAll(".header_menu a");

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

      if (a.hash === `#${current}`) a.classList.add("active");
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
      const toggle = () => {
        const isDark = body.classList.toggle("dark-theme");
        localStorage.setItem("theme", isDark ? "dark" : "light");

        if (themeIcon) {
          themeIcon.classList.toggle("fa-sun", isDark);
          themeIcon.classList.toggle("fa-moon", !isDark);
        }

        themeToggleBtn.setAttribute("aria-pressed", String(isDark));
        updateAvatar(isDark);
      };

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (!document.startViewTransition || reduceMotion) {
        toggle();
        return;
      }

      const rect = themeToggleBtn.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      const radius = Math.hypot(
        Math.max(x, innerWidth - x),
        Math.max(y, innerHeight - y),
      );

      document.startViewTransition(toggle).ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${radius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 600,
            easing: "ease-in-out",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      });
    });
  }

  /* =========================================
     6. Typewriter Role Rotation
     ========================================= */
  const typedElement = document.querySelector(".typed-text");

  if (typedElement) {
    const phrases = [
      "building React interfaces.",
      "creating responsive web apps.",
      "turning designs into UI.",
    ];

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (typeof Typed !== "undefined" && !reduceMotion) {
      typedElement.parentElement.setAttribute("aria-hidden", "true");
      const srText = document.createElement("span");
      srText.className = "sr-only";
      srText.textContent = phrases[0];
      typedElement.closest(".hero-title").appendChild(srText);

      new Typed(typedElement, {
        strings: phrases,
        typeSpeed: 50,
        backSpeed: 30,
        startDelay: 400,
        backDelay: 1800,
        loop: true,
        cursorChar: "|",
      });
    }
  }

  /* =========================================
     7. PORTFOLIO FORM SUBMISSION 
     EmailJS Integration
     ========================================= */
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    const SERVICE_ID = "service_kfl5v9l";
    const TEMPLATE_ID = "template_0v41jqb";
    const PUBLIC_KEY = "vT1u3JSjl5m_n6ux8";

    const consentCheckbox = document.getElementById("contact-consent");
    const consentError = document.getElementById("consent-error");
    const consentField = consentCheckbox?.closest(".consent-field");
    const formStatus = document.getElementById("form-status");

    const submitBtn = contactForm.querySelector(".editorial-submit");

    const nameInput = contactForm.querySelector("#contact-user-name");
    const emailInput = contactForm.querySelector("#contact-user-email");
    const messageInput = contactForm.querySelector("#contact-user-message");

    const clearConsentError = () => {
      if (consentError) consentError.textContent = "";
      if (consentField) consentField.classList.remove("has-error");
    };

    const showConsentError = () => {
      if (consentError) {
        consentError.textContent =
          "Please accept the Privacy Policy before submitting the form.";
      }

      consentField?.classList.add("has-error");
    };

    const showFormStatus = (message, type = "") => {
      if (!formStatus) return;

      formStatus.textContent = message;
      formStatus.className = "form-status";

      if (type) {
        formStatus.classList.add(type);
      }
    };

    if (typeof emailjs !== "undefined") {
      emailjs.init({
        publicKey: PUBLIC_KEY,
      });
    }

    consentCheckbox?.addEventListener("change", () => {
      if (consentCheckbox.checked) {
        clearConsentError();
      }
    });

    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (!contactForm.reportValidity()) return;

      if (!consentCheckbox?.checked) {
        showConsentError();
        consentCheckbox?.focus();
        return;
      }

      clearConsentError();

      if (!submitBtn) return;

      if (typeof emailjs === "undefined") {
        showFormStatus(
          "Email service is unavailable. Please try again later.",
          "error",
        );
        return;
      }

      const originalHTML = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.classList.add("is-loading");
      submitBtn.setAttribute("aria-busy", "true");
      submitBtn.innerHTML = "Sending...";

      showFormStatus("Sending your message...", "loading");

      try {
        if (!nameInput || !emailInput || !messageInput) {
          throw new Error("Contact form fields were not found.");
        }

        const templateParams = {
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          message: messageInput.value.trim(),
        };

        const result = await Promise.race([
          emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams),
          new Promise((_, reject) =>
            setTimeout(
              () => reject(new Error("EmailJS request timed out")),
              15000,
            ),
          ),
        ]);

        console.log("EmailJS success:", result);

        contactForm.reset();
        clearConsentError();

        showFormStatus(
          "Thank you! Your message has been sent successfully.",
          "success",
        );
      } catch (error) {
        console.error("EmailJS error:", error);

        showFormStatus(
          error?.text ||
            error?.message ||
            "Something went wrong. Please try again.",
          "error",
        );
      } finally {
        submitBtn.disabled = false;
        submitBtn.classList.remove("is-loading");
        submitBtn.removeAttribute("aria-busy");
        submitBtn.innerHTML = originalHTML;
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

  const closeMenu = () => {
    if (!burgerBtn || !mobileMenu) return;

    burgerBtn.classList.remove("is-active");
    mobileMenu.classList.remove("is-open");
    document.body.classList.remove("no-scroll");

    burgerBtn.setAttribute("aria-expanded", "false");
  };

  if (burgerBtn && mobileMenu) {
    burgerBtn.addEventListener("click", () => {
      const isOpen = burgerBtn.classList.toggle("is-active");

      mobileMenu.classList.toggle("is-open");
      document.body.classList.toggle("no-scroll");

      burgerBtn.setAttribute("aria-expanded", String(isOpen));
    });

    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });
  }

  /* =========================================
   11. Hero Entrance (GSAP)
   ========================================= */
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (typeof gsap !== "undefined" && !prefersReducedMotion) {
    gsap.from(
      [
        ".hero-avatar",
        ".hero-status",
        ".hero-eyebrow",
        ".hero-title",
        ".hero-description",
        ".hero-points li",
        ".hero-buttons a",
      ],
      {
        y: 24,
        autoAlpha: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.1,
        clearProps: "all",
      },
    );
  }

  /* =========================================
   12. Project Cards Spotlight
   ========================================= */
  const hasFinePointer = window.matchMedia(
    "(hover: hover) and (pointer: fine)",
  ).matches;

  if (hasFinePointer) {
    document.querySelectorAll(".project-card").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        card.style.setProperty("--my", `${e.clientY - rect.top}px`);
      });
    });
  }

  /* =========================================
   13. Screenshot Theme Compare
   ========================================= */
  document.querySelectorAll("[data-theme-compare]").forEach((block) => {
    const buttons = block.querySelectorAll("[data-theme-choice]");
    const images = block.querySelectorAll("[data-theme-img]");

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const choice = btn.dataset.themeChoice;
        block.dataset.theme = choice;

        buttons.forEach((b) =>
          b.setAttribute("aria-pressed", String(b === btn)),
        );
        images.forEach((img) =>
          img.setAttribute(
            "aria-hidden",
            String(img.dataset.themeImg !== choice),
          ),
        );
      });
    });
  });
});
