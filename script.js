/* =========================================
   NEBULA — OPTIMIZED ENGINE
========================================= */


/* =========================================
   INSTANT START
========================================= */

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  if (loader) {
    loader.classList.add("hidden");
  }
});


/* =========================================
   STAR FIELD — LIGHTWEIGHT
========================================= */

const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d", {
  alpha: true
});

let stars = [];

const mouse = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2
};

function resizeCanvas() {

  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;

  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  createStars();
}


function createStars() {

  stars = [];

  // Ít sao hơn để giảm tải CPU
  const amount =
    window.innerWidth < 700 ? 180 : 350;

  for (let i = 0; i < amount; i++) {

    stars.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,

      size: Math.random() * 1.2 + 0.2,

      speed: Math.random() * 0.18 + 0.03,

      alpha: Math.random() * 0.7 + 0.2,

      depth: Math.random()
    });
  }
}


function drawStars() {

  ctx.clearRect(
    0,
    0,
    window.innerWidth,
    window.innerHeight
  );

  for (const star of stars) {

    star.y -= star.speed;

    if (star.y < -5) {
      star.y = window.innerHeight + 5;
      star.x = Math.random() * window.innerWidth;
    }

    const moveX =
      (mouse.x - window.innerWidth / 2)
      * 0.002
      * star.depth;

    const moveY =
      (mouse.y - window.innerHeight / 2)
      * 0.002
      * star.depth;

    ctx.beginPath();

    ctx.arc(
      star.x + moveX,
      star.y + moveY,
      star.size,
      0,
      Math.PI * 2
    );

    ctx.fillStyle =
      `rgba(255,255,255,${star.alpha})`;

    ctx.fill();
  }

  requestAnimationFrame(drawStars);
}


resizeCanvas();
drawStars();


let resizeTimer;

window.addEventListener("resize", () => {

  clearTimeout(resizeTimer);

  resizeTimer = setTimeout(() => {
    resizeCanvas();
  }, 150);

});


/* =========================================
   MOUSE GLOW
========================================= */

const glow =
  document.querySelector(".cursor-glow");

let glowX = mouse.x;
let glowY = mouse.y;

document.addEventListener("mousemove", e => {

  mouse.x = e.clientX;
  mouse.y = e.clientY;

});


function updateGlow() {

  glowX += (mouse.x - glowX) * 0.12;
  glowY += (mouse.y - glowY) * 0.12;

  if (glow) {
    glow.style.left = glowX + "px";
    glow.style.top = glowY + "px";
  }

  requestAnimationFrame(updateGlow);
}

updateGlow();


/* =========================================
   NAVIGATION
========================================= */

const navLinks =
  document.querySelectorAll("nav a");

const sections =
  document.querySelectorAll("section[id]");


function updateNavigation() {

  let current = "";

  sections.forEach(section => {

    const top =
      section.offsetTop - 250;

    if (window.scrollY >= top) {
      current = section.id;
    }

  });

  navLinks.forEach(link => {

    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${current}`
    );

  });

}

window.addEventListener(
  "scroll",
  updateNavigation,
  { passive: true }
);


/* =========================================
   EXPLORE BUTTON
========================================= */

const exploreButton =
  document.getElementById("exploreButton");

if (exploreButton) {

  exploreButton.addEventListener("click", () => {

    document
      .getElementById("explore")
      ?.scrollIntoView({
        behavior: "smooth"
      });

  });

}


/* =========================================
   EXPERIENCE MODE
========================================= */

const experience =
  document.getElementById("experience");

const playButton =
  document.getElementById("playButton");

const experienceClose =
  document.getElementById("experienceClose");

if (playButton && experience) {

  playButton.addEventListener("click", () => {

    experience.classList.add("active");

  });

}

if (experienceClose && experience) {

  experienceClose.addEventListener("click", () => {

    experience.classList.remove("active");

  });

}


/* =========================================
   ENTER SPACE
========================================= */

const launchBtn =
  document.getElementById("launchBtn");

if (launchBtn && experience) {

  launchBtn.addEventListener("click", () => {

    experience.classList.add("active");

  });

}


/* =========================================
   PLANET DATA
========================================= */

const worlds = {

  kepler: {
    type: "EXOPLANET",
    title: "KEPLER-186F",
    description:
      "An Earth-sized exoplanet orbiting within the habitable zone of its star. One of the most fascinating worlds discovered beyond our solar system.",
    distance: "500 LY",
    category: "TERRESTRIAL"
  },

  jupiter: {
    type: "GAS GIANT",
    title: "JUPITER",
    description:
      "The largest planet in our solar system, surrounded by powerful storms and the famous Great Red Spot.",
    distance: "43 MIN",
    category: "GAS GIANT"
  },

  saturn: {
    type: "GAS GIANT",
    title: "SATURN",
    description:
      "A spectacular gas giant surrounded by a huge system of icy rings made from countless particles of ice and rock.",
    distance: "80 MIN",
    category: "GAS GIANT"
  },

  mars: {
    type: "TERRESTRIAL",
    title: "MARS",
    description:
      "The red planet contains ancient valleys, enormous volcanoes and evidence that liquid water once flowed across its surface.",
    distance: "3–22 MIN",
    category: "ROCKY PLANET"
  }

};


/* =========================================
   WORLD MODAL
========================================= */

const modal =
  document.getElementById("worldModal");

const modalClose =
  document.getElementById("modalClose");

const modalTitle =
  document.getElementById("modalTitle");

const modalType =
  document.getElementById("modalType");

const modalDescription =
  document.getElementById("modalDescription");

const modalDistance =
  document.getElementById("modalDistance");

const modalCategory =
  document.getElementById("modalCategory");


function openWorld(name) {

  const world = worlds[name];

  if (!world || !modal) return;

  modalType.textContent =
    world.type;

  modalTitle.textContent =
    world.title;

  modalDescription.textContent =
    world.description;

  modalDistance.textContent =
    world.distance;

  modalCategory.textContent =
    world.category;

  modal.classList.add("active");

}


document
  .querySelectorAll(".world-button")
  .forEach(button => {

    button.addEventListener("click", e => {

      const card =
        e.currentTarget.closest(".world-card");

      if (!card) return;

      openWorld(card.dataset.world);

    });

  });


if (modalClose) {

  modalClose.addEventListener("click", () => {
    modal.classList.remove("active");
  });

}


if (modal) {

  modal.addEventListener("click", e => {

    if (e.target === modal) {
      modal.classList.remove("active");
    }

  });

}


/* =========================================
   RANDOM WORLD
========================================= */

const randomWorld =
  document.getElementById("randomWorld");

if (randomWorld) {

  randomWorld.addEventListener("click", () => {

    const names =
      Object.keys(worlds);

    const random =
      names[Math.floor(Math.random() * names.length)];

    openWorld(random);

  });

}


/* =========================================
   ESC KEY
========================================= */

document.addEventListener("keydown", e => {

  if (e.key !== "Escape") return;

  modal?.classList.remove("active");

  experience?.classList.remove("active");

});


/* =========================================
   BACK TO TOP
========================================= */

const backTop =
  document.getElementById("backTop");

if (backTop) {

  backTop.addEventListener("click", () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });

}


/* =========================================
   MOBILE MENU
========================================= */

const hamburger =
  document.getElementById("hamburger");

const nav =
  document.querySelector("nav");

if (hamburger && nav) {

  hamburger.addEventListener("click", () => {

    nav.classList.toggle("mobile-open");

  });


  navLinks.forEach(link => {

    link.addEventListener("click", () => {

      nav.classList.remove("mobile-open");

    });

  });

}


/* =========================================
   PLANET PARALLAX
========================================= */

const heroUniverse =
  document.querySelector(".hero-universe");

let parallaxX = 0;
let parallaxY = 0;

document.addEventListener("mousemove", e => {

  if (
    window.innerWidth < 800 ||
    !heroUniverse
  ) return;

  const targetX =
    (e.clientX / window.innerWidth - 0.5) * 15;

  const targetY =
    (e.clientY / window.innerHeight - 0.5) * 15;

  parallaxX +=
    (targetX - parallaxX) * 0.08;

  parallaxY +=
    (targetY - parallaxY) * 0.08;

});


function updateParallax() {

  if (
    heroUniverse &&
    window.innerWidth >= 800
  ) {

    heroUniverse.style.transform =
      `translate3d(
        ${parallaxX}px,
        ${parallaxY}px,
        0
      )`;

  }

  requestAnimationFrame(updateParallax);
}

updateParallax();


/* =========================================
   3D CARD EFFECT
========================================= */

if (window.innerWidth > 800) {

  document
    .querySelectorAll(".world-card")
    .forEach(card => {

      card.addEventListener("mousemove", e => {

        const rect =
          card.getBoundingClientRect();

        const x =
          e.clientX - rect.left;

        const y =
          e.clientY - rect.top;

        const rotateX =
          ((y / rect.height) - 0.5) * -5;

        const rotateY =
          ((x / rect.width) - 0.5) * 5;

        card.style.transform =
          `
          translateY(-8px)
          perspective(700px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          `;
      });


      card.addEventListener("mouseleave", () => {

        card.style.transform = "";

      });

    });

}


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
  document.querySelectorAll(
    ".section-top, .world-card, .mission, .about-copy, .about-visual"
  );


const revealObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("revealed");

          revealObserver.unobserve(
            entry.target
          );

        }

      });

    },
    {
      threshold: 0.08
    }
  );


revealElements.forEach(element => {

  element.classList.add("reveal-ready");

  revealObserver.observe(element);

});


/* =========================================
   DYNAMIC REVEAL CSS
========================================= */

const style =
  document.createElement("style");

style.textContent = `

.reveal-ready {
  opacity: 0;
  transform: translateY(25px);
  transition:
    opacity .7s ease,
    transform .7s ease;
}

.reveal-ready.revealed {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 650px) {

  nav.mobile-open {
    display: flex !important;

    position: absolute;

    top: 75px;
    left: 0;
    right: 0;

    padding: 25px;

    background: rgba(5,5,9,.96);

    backdrop-filter: blur(15px);

    flex-direction: column;

    gap: 25px;

    border-bottom: 1px solid rgba(255,255,255,.1);
  }

}

`;

document.head.appendChild(style);


/* =========================================
   PERFORMANCE MODE
========================================= */

// Giảm hiệu ứng nếu máy báo người dùng
// muốn giảm chuyển động.

if (
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches
) {

  document.documentElement.style
    .scrollBehavior = "auto";

}


/* =========================================
   DONE
========================================= */

console.log(
  "%cNEBULA",
  "font-size:32px;font-weight:bold;"
);

console.log(
  "%cOptimized mode activated.",
  "font-size:13px;color:#8b5cf6;"
);
