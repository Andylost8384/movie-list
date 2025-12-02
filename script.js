// Hero slider images & data
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

const heroImgEl = document.getElementById("heroImg");
const heroTitle = document.getElementById("heroTitle");
const heroModel = document.getElementById("heroModel");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const dots = document.getElementById("heroDots");

// Update Hero Content
function updateHero() {
  heroImgEl.src = heroImgs[idx];
  heroTitle.textContent = heroTitles[idx];
  heroModel.textContent = heroModels[idx];
  renderDots();
}

// Dots Rendering
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
    b.style.background = i === idx ? "#2fc4bf" : "rgba(255, 255, 255, 0.8)";
    b.addEventListener("click", () => {
      idx = i;
      updateHero();
    });
    dots.appendChild(b);
  });
}

// Manual control
prev.addEventListener("click", () => {
  idx = (idx - 1 + heroImgs.length) % heroImgs.length;
  updateHero();
});

next.addEventListener("click", () => {
  idx = (idx + 1) % heroImgs.length;
  updateHero();
});

// Auto slide every 10 sec
setInterval(() => {
  idx = (idx + 1) % heroImgs.length;
  updateHero();
}, 10000);

// First load
updateHero();


// AGE GATE FUNCTIONALITY
const ageGate = document.getElementById("ageGate");
const over = document.getElementById("over18");
const under = document.getElementById("under18");

// Check storage
if (localStorage.getItem("infectaria_age") === "true") {
  ageGate.style.display = "none";
}

// Over 18 button
over.addEventListener("click", () => {
  localStorage.setItem("infectaria_age", "true");
  ageGate.style.display = "none";
});

// Under 18 button
under.addEventListener("click", () => {
  window.location.href = "https://www.google.com";
});

// Footer year auto set
document.getElementById("year").textContent = new Date().getFullYear();
