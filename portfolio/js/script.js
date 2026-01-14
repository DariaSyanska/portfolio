/* =========================================
   1. AOS Animation Initialization
   ========================================= */
AOS.init({
  duration: 1000,
  once: true,
});

/* =========================================
   2. Scroll To Top Button Logic
   ========================================= */
let mybutton = document.getElementById("scrollToTopBtn");

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  // Show button when scrolled down 200px
  if (
    document.body.scrollTop > 200 ||
    document.documentElement.scrollTop > 200
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

mybutton.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* =========================================
   3. Active Navigation Link on Scroll
   ========================================= */
const sections = document.querySelectorAll("section");
const navLi = document.querySelectorAll(".header_menu li a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    // -200 is an offset to trigger change before section hits top exactly
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLi.forEach((a) => {
    a.classList.remove("active");
    if (a.getAttribute("href").includes(current)) {
      a.classList.add("active");
    }
  });
});

/* =========================================
   4. Auto-Update Copyright Year
   ========================================= */
const year = new Date().getFullYear();
const copyrightElement = document.getElementById("copyright");
if (copyrightElement) {
  copyrightElement.innerHTML = `© ${year} Daria Sianska. All rights reserved.`;
}

/* =========================================
   5. Dark Mode Logic (with Local Storage)
   ========================================= */
const themeToggleBtn = document.getElementById("theme-toggle");
const themeIcon = themeToggleBtn.querySelector("i");
const body = document.body;

// Check if user previously selected dark mode
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  body.classList.add("dark-theme");
  themeIcon.classList.remove("fa-moon");
  themeIcon.classList.add("fa-sun");
}

themeToggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark-theme");

  if (body.classList.contains("dark-theme")) {
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
    // Save preference to Local Storage
    localStorage.setItem("theme", "dark");
  } else {
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
    localStorage.setItem("theme", "light");
  }
});

/* =========================================
   6. Typewriter Effect (Typed.js)
   ========================================= */
const typed = new Typed(".typed-text", {
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
});
