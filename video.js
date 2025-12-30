// video.js — single watch page logic (FINAL FIXED)

document.addEventListener("DOMContentLoaded", () => {
  if (!window.VIDEOS) return;

  /* =============================
     GET VIDEO FROM URL
  ============================= */
  const params = new URLSearchParams(window.location.search);
  const titleParam = params.get("title");

  let currentVideo = window.VIDEOS.find(v => v.title === titleParam);

  // fallback → latest video
  if (!currentVideo) {
    currentVideo = [...window.VIDEOS]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
  }

  /* =============================
     DOM ELEMENTS
  ============================= */
  const titleEl     = document.getElementById("videoTitle");
  const modelEl     = document.getElementById("videoModel");
  const durationEl  = document.getElementById("videoDuration");
  const categoryEl  = document.getElementById("videoCategory"); // ✅ NEW
  const player      = document.getElementById("videoPlayer");
  const overlay     = document.getElementById("upgradeOverlay");
  const relatedGrid = document.getElementById("relatedGrid");

  /* =============================
     FILL TEXT (RIGHT SIDE INFO)
  ============================= */
  titleEl.textContent = currentVideo.title;
  modelEl.textContent = "Model: " + currentVideo.model;
  durationEl.textContent = "Duration: " + currentVideo.duration;

  if (categoryEl) {
    categoryEl.textContent = "Category: " + currentVideo.category;
  }

  /* =============================
     PREMIUM LOGIC
     (localStorage for now)
  ============================= */
  const IS_PREMIUM = localStorage.getItem("infectaria_premium") === "true";
  const PREVIEW_LIMIT = 30; // seconds

  player.src = IS_PREMIUM
    ? currentVideo.fullUrl
    : currentVideo.previewUrl;

  overlay.style.display = "none";

  if (!IS_PREMIUM) {
    player.addEventListener("timeupdate", () => {
      if (player.currentTime >= PREVIEW_LIMIT) {
        player.pause();
        overlay.style.display = "flex";
      }
    });
  }

  /* =============================
     RELATED VIDEOS (ONLY 3)
     hover preview enabled here
  ============================= */
  relatedGrid.innerHTML = "";

  const related = window.VIDEOS
    .filter(v => v.title !== currentVideo.title)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  related.forEach(v => {
    const card = document.createElement("a");
    card.href = "video.html?title=" + encodeURIComponent(v.title);
    card.className = "related-card";

    const vid = document.createElement("video");
    vid.muted = true;
    vid.playsInline = true;
    vid.preload = "metadata";
    vid.poster = v.thumb;

    const src = document.createElement("source");
    src.src = v.previewUrl;
    src.type = "video/mp4";
    vid.appendChild(src);

    const title = document.createElement("p");
    title.textContent = v.title;

    card.appendChild(vid);
    card.appendChild(title);

    // hover preview (related only)
    card.addEventListener("mouseenter", () => {
      vid.currentTime = 0;
      vid.play().catch(() => {});
    });

    card.addEventListener("mouseleave", () => {
      vid.pause();
      vid.currentTime = 0;
    });

    relatedGrid.appendChild(card);
  });

  /* =============================
     SECURITY
  ============================= */
  player.addEventListener("contextmenu", e => e.preventDefault());
});
