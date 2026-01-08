AOS.init({
  duration: 1000,
  once: true,
});

let mybutton = document.getElementById("scrollToTopBtn");

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
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

const sections = document.querySelectorAll("section");
const navLi = document.querySelectorAll(".header_menu li a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
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

const year = new Date().getFullYear();
const copyrightElement = document.getElementById("copyright");
if (copyrightElement) {
  copyrightElement.innerHTML = `© ${year} Daria Sianska. All rights reserved.`;
}

/* === Dark Mode Logic === */
const themeToggleBtn = document.getElementById("theme-toggle");
const themeIcon = themeToggleBtn.querySelector("i");
const body = document.body;

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
    localStorage.setItem("theme", "dark");
  } else {
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
    localStorage.setItem("theme", "light");
  }
});

/* === Typed.js Effect === */
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
