// heroSlider.js
// Home page hero slides: image -> 10s -> preview video -> next slide

document.addEventListener("DOMContentLoaded", () => {
  const heroRoot = document.getElementById("heroSlider");
  if (!heroRoot) return;

  // --- SLIDE DATA (9 slides) ---
  const HERO_SLIDES = [
    {
      photo: "https://ik.imagekit.io/uno5sox6q/EmiriFeature_B_1920x1080.jpg",
      preview: "https://archive.org/download/mix-preview-sitesty/Tentacle%20Porn%20-%20Alien%20Porn%20Mix%20Preview.mp4",
      headline: `
        BEST <span class="accent-purple">REAL LIFE HENTAI</span>
      `,
      subtitle: `
        Your top source for premium <span class="accent-purple">tentacle</span> and
        <span class="accent-purple">alien</span> pornography.
      `
    },
    {
      photo: "https://ik.imagekit.io/uno5sox6q/Parasited.webp",
      preview: "https://archive.org/download/mix-preview-sitesty/Parasited%20Mix%20Preview.mp4",
      headline: `
        REAL <span class="accent-purple">PARASITED</span>
      `,
      subtitle: `
        Your top source for films about girls
        <span class="accent-purple">parasitized</span> by sex creatures.
      `
    },
    {
      photo: "https://ik.imagekit.io/uno5sox6q/Futanari.webp",
      preview: "https://archive.org/download/mix-preview-sitesty/Futanari%20XXX%20-%20Futa%20Porn%20Mix%20Preview.mp4",
      headline: `
        REAL <span class="accent-coral">FUTANARI</span>
      `,
      subtitle: `
        Your top source for films about girls growing
        <span class="accent-coral">huge penises</span>.
      `
    },
    {
      photo: "https://ik.imagekit.io/uno5sox6q/lantsvscunts.png",
      preview: "https://archive.org/download/mix-preview-sitesty/Plantsvscunts%20Mix%20Preview.mp4",
      headline: `
        <span class="accent-green">PLANTS</span> PORN
      `,
      subtitle: `
        Internet's top project about
        <span class="accent-green">plants and girls</span> having hot sex.
      `
    },
    {
      photo: "https://ik.imagekit.io/uno5sox6q/Vampired.png",
      preview: "https://archive.org/download/mix-preview-sitesty/Vampired%20Mix%20Preview.mp4",
      headline: `
        <span class="accent-red">VAMPIRE</span> PORN
      `,
      subtitle: `
        Internet's top project about
        <span class="accent-red">vampire girls</span> having hot sex.
      `
    },
    {
      photo: "https://ik.imagekit.io/uno5sox6q/Freeze.webp",
      preview: "https://archive.org/download/mix-preview-sitesty/Freeze%20-Time%20Freeze%20Porn%20Mix%20Preview.mp4",
      headline: `
        <span class="accent-blue">TIME FREEZE</span> FILMS
      `,
      subtitle: `
        Your top source for films about
        <span class="accent-blue">fictional time freeze</span> scenarios.
      `
    },
    {
      photo: "https://ik.imagekit.io/uno5sox6q/Vored.png",
      preview: "https://archive.org/download/mix-preview-sitesty/Vored%20-%20The%20Best%20Vore%20Porn%20Mix%20Preview.mp4",
      headline: `
        <span class="accent-coral">BEST VORE</span> PORN
      `,
      subtitle: `
        Internet's top project about
        <span class="accent-coral">fantasy scenarios</span> about going inside pussies
        and being swallowed by giant creatures.
      `
    },
    {
      photo: "https://ik.imagekit.io/uno5sox6q/Voodooed.png",
      preview: "https://archive.org/download/mix-preview-sitesty/Voodooed%20Mix%20Preview.mp4",
      headline: `
        <span class="accent-gold">VOODOO</span> FILMS
      `,
      subtitle: `
        Pain and pleasure come together in our films about
        <span class="accent-gold">voodoo magic</span> used to give girls crazy orgasms.
      `
    },
    {
      photo: "https://ik.imagekit.io/uno5sox6q/Monster.jpg",
      preview: "https://archive.org/download/mix-preview-sitesty/MonsterPorn%20-%20The%20Best%20Monster%20Porn%20Mix%20Preview.mp4",
      headline: `
        <span class="accent-green">MONSTER</span> PORN
      `,
      subtitle: `
        Internet's top project about
        <span class="accent-green">monsters</span> having hot sex with girls.
      `
    }
  ];

  // --- DOM generate ---
  heroRoot.innerHTML = HERO_SLIDES.map((s, i) => `
    <div class="hero-slide ${i === 0 ? "active" : ""}" data-index="${i}">
      <div class="hero-media">
        <img src="${s.photo}" alt="">
        <video
          src="${s.preview}"
          muted
          playsinline
          preload="metadata"
        ></video>
      </div>
      <div class="hero-overlay">
        <h1 class="hero-title">${s.headline}</h1>
        <p class="hero-subtitle">${s.subtitle}</p>
      </div>
    </div>
  `).join("");

  const slides = Array.from(heroRoot.querySelectorAll(".hero-slide"));
  let current = 0;
  let imageTimer = null;

  function startSlide(index) {
    // Clear previous timers & stop all videos
    clearTimeout(imageTimer);
    slides.forEach(slide => {
      slide.classList.remove("active", "playing-video");
      const v = slide.querySelector("video");
      if (v) {
        v.pause();
        v.currentTime = 0;
        v.onended = null;
      }
    });

    const slide = slides[index];
    const video = slide.querySelector("video");
    slide.classList.add("active");

    // 10 sec photo, then video play
    imageTimer = setTimeout(() => {
      if (!video) return;
      slide.classList.add("playing-video");
      video.play().catch(() => {});
      video.onended = () => {
        nextSlide();
      };
    }, 10000); // 10 seconds image
  }

  function nextSlide() {
    current = (current + 1) % slides.length;
    startSlide(current);
  }

  // Start first slide
  startSlide(0);
});
