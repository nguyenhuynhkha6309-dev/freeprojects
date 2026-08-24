/* =========================================
   NEBULA — MAIN ENGINE
========================================= */


/* =========================================
   LOADING SCREEN
========================================= */

const loader = document.getElementById("loader");
const progress = document.getElementById("progress");
const percent = document.getElementById("percent");

let loading = 0;

const loadingInterval = setInterval(() => {

  loading += Math.floor(Math.random() * 8) + 2;

  if (loading >= 100) {
    loading = 100;
    clearInterval(loadingInterval);

    setTimeout(() => {
      loader.classList.add("hidden");
    }, 500);
  }

  progress.style.width = `${loading}%`;
  percent.textContent = `${loading}%`;

}, 100);


/* =========================================
   STAR FIELD
========================================= */

const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");

let stars = [];
let mouse = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2
};

function resizeCanvas() {

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  createStars();
}

function createStars() {

  stars = [];

  const amount =
    Math.min(
      900,
      Math.floor(
        window.innerWidth *
        window.innerHeight /
        2200
      )
    );

  for (let i = 0; i < amount; i++) {

    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,

      radius:
        Math.random() * 1.4 + .2,

      speed:
        Math.random() * .25 + .05,

      opacity:
        Math.random() * .8 + .2,

      depth:
        Math.random() * 2 + .5
    });
  }
}

function drawStars() {

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  stars.forEach(star => {

    star.y -= star.speed;

    if (star.y < 0) {
      star.y = canvas.height;
      star.x = Math.random() * canvas.width;
    }

    const offsetX =
      (mouse.x - canvas.width / 2)
      * .0005
      * star.depth;

    const offsetY =
      (mouse.y - canvas.height / 2)
      * .0005
      * star.depth;

    ctx.beginPath();

    ctx.arc(
      star.x + offsetX,
      star.y + offsetY,
      star.radius,
      0,
      Math.PI * 2
    );

    ctx.fillStyle =
      `rgba(255,255,255,${star.opacity})`;

    ctx.fill();
  });

  requestAnimationFrame(drawStars);
}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();
drawStars();


/* =========================================
   CURSOR GLOW
========================================= */

const glow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", event => {

  mouse.x = event.clientX;
  mouse.y = event.clientY;

  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});


/* =========================================
   NAVIGATION
========================================= */

const navLinks =
  document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

  let current = "";

  document
    .querySelectorAll("section[id]")
    .forEach(section => {

      const top =
        section.offsetTop - 200;

      if (scrollY >= top) {
        current = section.id;
      }
    });

  navLinks.forEach(link => {

    link.classList.remove("active");

    if (
      link.getAttribute("href") ===
      `#${current}`
    ) {
      link.classList.add("active");
    }

  });

});


/* =========================================
   EXPLORE BUTTON
========================================= */

const exploreButton =
  document.getElementById("exploreButton");

exploreButton.addEventListener("click", () => {

  document
    .getElementById("explore")
    .scrollIntoView({
      behavior: "smooth"
    });

});


/* =========================================
   EXPERIENCE MODE
========================================= */

const experience =
  document.getElementById("experience");

const playButton =
  document.getElementById("playButton");

const experienceClose =
  document.getElementById("experienceClose");

playButton.addEventListener("click", () => {

  experience.classList.add("active");

});

experienceClose.addEventListener("click", () => {

  experience.classList.remove("active");

});


/* =========================================
   ENTER SPACE
========================================= */

document
  .getElementById("launchBtn")
  .addEventListener("click", () => {

    document
      .getElementById("experience")
      .classList.add("active");

  });


/* =========================================
   WORLD DATA
========================================= */

const worlds = {

  kepler: {
    type: "EXOPLANET",
    title: "KEPLER-186F",
    description:
      "An Earth-sized exoplanet orbiting within the habitable zone of its star. It remains one of the most fascinating worlds discovered beyond our solar system.",
    distance: "500 LY",
    category: "TERRESTRIAL"
  },

  jupiter: {
    type: "GAS GIANT",
    title: "JUPITER",
    description:
      "The largest planet in our solar system. Its immense atmosphere contains powerful storms, including the famous Great Red Spot.",
    distance: "43 MIN",
    category: "GAS GIANT"
  },

  saturn: {
    type: "GAS GIANT",
    title: "SATURN",
    description:
      "A spectacular gas giant surrounded by an enormous system of icy rings made from countless particles of ice and rock.",
    distance: "80 MIN",
    category: "GAS GIANT"
  },

  mars: {
    type: "TERRESTRIAL",
    title: "MARS",
    description:
      "The red planet. Mars contains ancient valleys, enormous volcanoes and evidence that liquid water once flowed across its surface.",
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

const modalPlanet =
  document.getElementById("modalPlanet");


document
  .querySelectorAll(".world-button")
  .forEach(button => {

    button.addEventListener("click", event => {

      const card =
        event.target.closest(".world-card");

      const worldName =
        card.dataset.world;

      openWorld(worldName);

    });

  });


function openWorld(name) {

  const world = worlds[name];

  if (!world) return;

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


modalClose.addEventListener("click", () => {

  modal.classList.remove("active");

});


modal.addEventListener("click", event => {

  if (event.target === modal) {
    modal.classList.remove("active");
  }

});


document.addEventListener("keydown", event => {

  if (event.key === "Escape") {

    modal.classList.remove("active");

    experience.classList.remove("active");

  }

});


/* =========================================
   RANDOM WORLD
========================================= */

const randomWorld =
  document.getElementById("randomWorld");

const worldNames =
  Object.keys(worlds);

randomWorld.addEventListener("click", () => {

  const random =
    worldNames[
      Math.floor(
        Math.random() *
        worldNames.length
      )
    ];

  openWorld(random);

});


/* =========================================
   BACK TO TOP
========================================= */

document
  .getElementById("backTop")
  .addEventListener("click", () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });


/* =========================================
   MOBILE MENU
========================================= */

const hamburger =
  document.getElementById("hamburger");

const nav =
  document.querySelector("nav");

hamburger.addEventListener("click", () => {

  if (nav.style.display === "flex") {

    nav.style.display = "";

  } else {

    nav.style.display = "flex";

    nav.style.position = "absolute";

    nav.style.top = "75px";
    nav.style.left = "0";
    nav.style.right = "0";

    nav.style.padding = "25px";

    nav.style.background =
      "rgba(5,5,9,.95)";

    nav.style.backdropFilter =
      "blur(20px)";

    nav.style.flexDirection =
      "column";

    nav.style.gap = "25px";

  }

});


/* =========================================
   PARALLAX PLANET
========================================= */

const heroUniverse =
  document.querySelector(".hero-universe");

document.addEventListener("mousemove", event => {

  if (window.innerWidth < 800) return;

  const x =
    (event.clientX / window.innerWidth - .5);

  const y =
    (event.clientY / window.innerHeight - .5);

  heroUniverse.style.transform =
    `translate(${x * 12}px, ${y * 12}px)`;

});


/* =========================================
   CARD 3D EFFECT
========================================= */

document
  .querySelectorAll(".world-card")
  .forEach(card => {

    card.addEventListener(
      "mousemove",
      event => {

        const rect =
          card.getBoundingClientRect();

        const x =
          event.clientX - rect.left;

        const y =
          event.clientY - rect.top;

        const rotateX =
          ((y / rect.height) - .5) * -7;

        const rotateY =
          ((x / rect.width) - .5) * 7;

        card.style.transform =
          `
          translateY(-8px)
          perspective(800px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          `;
      }
    );


    card.addEventListener(
      "mouseleave",
      () => {

        card.style.transform = "";

      }
    );

  });


/* =========================================
   REVEAL ON SCROLL
========================================= */

const revealObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            "revealed"
          );

        }

      });

    },
    {
      threshold: .12
    }
  );


document
  .querySelectorAll(
    ".section-top, .world-card, .mission, .about-copy, .about-visual"
  )
  .forEach(element => {

    element.style.opacity = "0";
    element.style.transform =
      "translateY(40px)";
    element.style.transition =
      "opacity .9s ease, transform .9s ease";

    revealObserver.observe(element);

  });


/* =========================================
   REVEAL STYLE
========================================= */

const revealStyle =
  document.createElement("style");

revealStyle.textContent = `
  .revealed {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;

document.head.appendChild(revealStyle);


/* =========================================
   SMOOTH NAV CLOSE MOBILE
========================================= */

navLinks.forEach(link => {

  link.addEventListener("click", () => {

    if (window.innerWidth <= 650) {
      nav.style.display = "";
    }

  });

});


/* =========================================
   EXPERIENCE AUTO MESSAGE
========================================= */

let experienceTimer;

playButton.addEventListener("click", () => {

  clearTimeout(experienceTimer);

  experienceTimer =
    setTimeout(() => {

      const title =
        document.querySelector(
          ".experience-center h2"
        );

      title.innerHTML =
        `
        WELCOME TO
        <em>THE UNKNOWN.</em>
        `;

    }, 3500);

});


console.log(
  "%cNEBULA",
  "font-size:40px;font-weight:bold;"
);

console.log(
  "%cBeyond the known.",
  "font-size:15px;color:#8b5cf6;"
);
