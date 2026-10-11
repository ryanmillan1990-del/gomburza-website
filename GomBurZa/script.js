
/*
==========================================
GOMBURZA - CINEMATIC SCROLL STORYTELLING
UPDATED JAVASCRIPT
==========================================

FEATURES:
1. Scroll reveal animations
2. Scroll progress bar
3. Background image without zoom
4. Smooth navigation
5. Active navigation highlighting
6. Automatic chapter tracking
7. Back-to-top button
8. Responsive scroll performance

==========================================
*/


// ==========================================
// 1. SCROLL REVEAL ANIMATIONS
// ==========================================

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

  const revealObserver = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          revealObserver.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -30px 0px"
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });

} else {

  revealElements.forEach((element) => {
    element.classList.add("visible");
  });

}


// ==========================================
// 2. SCROLL PROGRESS BAR
// ==========================================

const progressBar = document.getElementById("progress");

function updateProgress() {

  if (!progressBar) return;

  const scrollTop = window.scrollY;

  const scrollableHeight =
    document.documentElement.scrollHeight -
    window.innerHeight;

  const percentage =
    scrollableHeight > 0
      ? (scrollTop / scrollableHeight) * 100
      : 0;

  progressBar.style.width =
    Math.min(100, Math.max(0, percentage)) + "%";

}


// ==========================================
// 3. HERO BACKGROUND IMAGE
// NO ZOOM - NO PARALLAX
// ==========================================

const heroImage = document.querySelector(".hero-image");

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

function updateHeroImage() {

  if (!heroImage) return;

  // Disable image movement and zoom
  heroImage.style.transform = "none";

  // Show the whole image without cropping
  heroImage.style.backgroundSize = "contain";

  // Keep image centered
  heroImage.style.backgroundPosition = "center center";

  // Prevent image repetition
  heroImage.style.backgroundRepeat = "no-repeat";

}


// ==========================================
// 4. OPTIMIZED SCROLL UPDATES
// ==========================================

let scrollScheduled = false;

function handleScroll() {

  if (scrollScheduled) return;

  scrollScheduled = true;

  requestAnimationFrame(() => {

    updateProgress();

    updateCinematicUI();

    scrollScheduled = false;

  });

}

window.addEventListener(
  "scroll",
  handleScroll,
  { passive: true }
);

window.addEventListener("resize", handleScroll);


// ==========================================
// 5. SMOOTH NAVIGATION
// ==========================================

const navigationLinks = document.querySelectorAll(
  'a[href^="#"]'
);

navigationLinks.forEach((link) => {

  link.addEventListener("click", (event) => {

    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") return;

    const target = document.getElementById(
      targetId.substring(1)
    );

    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({

      behavior: reducedMotion.matches ? "auto" : "smooth",

      block: "start"

    });

    if (history.replaceState) {

      history.replaceState(
        null,
        "",
        targetId
      );

    }

  });

});


// ==========================================
// 6. ACTIVE NAVIGATION
// ==========================================

const scenes = document.querySelectorAll("section[id]");

const navLinks = document.querySelectorAll(
  ".navbar nav a"
);

if ("IntersectionObserver" in window) {

  const sceneObserver = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) return;

        const id = entry.target.id;

        navLinks.forEach((link) => {

          const active =
            link.getAttribute("href") === `#${id}`;

          link.style.color =
            active ? "#c9a66b" : "";

          if (active) {

            link.setAttribute(
              "aria-current",
              "location"
            );

          } else {

            link.removeAttribute(
              "aria-current"
            );

          }

        });

      });

    },
    {
      rootMargin: "-20% 0px -45% 0px",
      threshold: 0
    }
  );

  scenes.forEach((scene) => {

    sceneObserver.observe(scene);

  });

}


// ==========================================
// 7. CHAPTER TRACKING
// ==========================================

const chapterIndicator = document.getElementById(
  "currentChapter"
);

const backToTop = document.getElementById(
  "backToTop"
);

const chapterData = [

  ["home", "PROLOGUE"],

  ["history", "SPANISH COLONIAL ERA"],

  ["priests", "THE THREE PRIESTS"],

  ["reform", "A CALL FOR JUSTICE"],

  ["mutiny", "THE CAVITE MUTINY"],

  ["timeline", "THE FINAL DAYS"],

  ["execution", "FEBRUARY 17, 1872"],

  ["legacy", "THE LEGACY"],

  ["project-info", "PROJECT INFORMATION"]

];

function updateCinematicUI() {

  const position =
    window.scrollY + window.innerHeight * 0.45;

  let current = "PROLOGUE";

  chapterData.forEach(([id, title]) => {

    const section = document.getElementById(id);

    if (section && section.offsetTop <= position) {

      current = title;

    }

  });

  if (chapterIndicator) {

    chapterIndicator.textContent = current;

  }

  // Show back-to-top button after first scene
  if (backToTop) {

    backToTop.classList.toggle(
      "show",
      window.scrollY > window.innerHeight * 0.8
    );

  }

}


// ==========================================
// 8. INITIALIZE WEBSITE
// ==========================================

function initializeWebsite() {

  // Show full background image
  updateHeroImage();

  // Update progress bar
  updateProgress();

  // Update chapter indicator
  updateCinematicUI();

  console.log(
    "GOMBURZA Cinematic Website Loaded Successfully"
  );

}


// Run when document is ready

if (document.readyState === "loading") {

  document.addEventListener(
    "DOMContentLoaded",
    initializeWebsite
  );

} else {

  initializeWebsite();

}
