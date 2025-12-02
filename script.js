document.addEventListener("DOMContentLoaded", function () {
  // HERO SLIDER (sirf index.html pe chalega)
  const heroImgEl = document.getElementById("heroImg");
  const heroTitle = document.getElementById("heroTitle");
  const heroModel = document.getElementById("heroModel");
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");
  const dots = document.getElementById("heroDots");

  if (heroImgEl && heroTitle && heroModel && prev && next && dots) {
    const heroImgs = ["1.png", "2.png", "3.png", "4.png", "5.png"];
    const heroTitles = [
      "Another Me",
      "Little Chloe For OnlyTarts Again",
      "Thanksgiving Dinner Idea",
      "Got Milk?",
      "Noi Feja For OnlyTarts"
    ];
    const heroModels = [
      "Nika Nut",
      "Little Chloe",
      "Mila Pie",
      "Little Chloe",
      "Noi Feja"
    ];

    let idx = 0;

    function renderDots() {
      dots.innerHTML = "";
      heroImgs.forEach((_, i) => {
        const b = document.createElement("button");
        b.style.width = "12px";
        b.style.height = "12px";
        b.style.borderRadius = "50%";
        b.style.border = "none";
        b.style.cursor = "pointer";
        b.style.margin = "0 4px";
        b.style.background =
          i === idx ? "#2fc4bf" : "rgba(255, 255, 255, 0.8)";
        b.addEventListener("click", () => {
          idx = i;
          updateHero();
        });
        dots.appendChild(b);
      });
    }

    function updateHero() {
      heroImgEl.src = heroImgs[idx];
      heroTitle.textContent = heroTitles[idx];
      heroModel.textContent = heroModels[idx];
      renderDots();
    }

    prev.addEventListener("click", () => {
      idx = (idx - 1 + heroImgs.length) % heroImgs.length;
      updateHero();
    });

    next.addEventListener("click", () => {
      idx = (idx + 1) % heroImgs.length;
      updateHero();
    });

    // first render
    updateHero();

    // auto slide
    setInterval(() => {
      idx = (idx + 1) % heroImgs.length;
      updateHero();
    }, 10000);
  }

  // AGE GATE (dono pages pe)
  const ageGate = document.getElementById("ageGate");
  const over = document.getElementById("over18");
  const under = document.getElementById("under18");

  if (ageGate && over && under) {
    if (localStorage.getItem("infectaria_age") === "true") {
      ageGate.style.display = "none";
    }

    over.addEventListener("click", () => {
      localStorage.setItem("infectaria_age", "true");
      ageGate.style.display = "none";
    });

    under.addEventListener("click", () => {
      window.location.href = "https://www.google.com";
    });
  }

  // FOOTER YEAR
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
