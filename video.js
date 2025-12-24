// video.js — single watch page logic (clean & final)

document.addEventListener("DOMContentLoaded", () => {
  if (!window.VIDEOS) return;

  /* =============================
     GET VIDEO FROM URL
  ============================= */
  const params = new URLSearchParams(window.location.search);
  const titleParam = params.get("title");

  let currentVideo = window.VIDEOS.find(v => v.title === titleParam);

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
  const player      = document.getElementById("videoPlayer");
  const overlay     = document.getElementById("upgradeOverlay");
  const relatedGrid = document.getElementById("relatedGrid");

  /* =============================
     FILL TEXT
  ============================= */
  titleEl.textContent    = currentVideo.title;
  modelEl.textContent    = currentVideo.model;
  durationEl.textContent = currentVideo.duration;

  /* =============================
     PREMIUM LOGIC
     (abhi localStorage, baad me Firebase)
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
     hover preview only here
  ============================= */
  relatedGrid.innerHTML = "";

  const related = window.VIDEOS
    .filter(v => v.title !== currentVideo.title)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3); // ✅ ONLY 3

  related.forEach(v => {
    const card = document.createElement("a");
    card.href = "video.html?title=" + encodeURIComponent(v.title);
    card.className = "related-card";

    const video = document.createElement("video");
    video.muted = true;
    video.playsInline = true;
    video.preload = "metadata";
    video.poster = v.thumb;

    const src = document.createElement("source");
    src.src = v.previewUrl;
    src.type = "video/mp4";
    video.appendChild(src);

    const title = document.createElement("p");
    title.textContent = v.title;

    card.appendChild(video);
    card.appendChild(title);

    // hover preview
    card.addEventListener("mouseenter", () => {
      video.currentTime = 0;
      video.play().catch(() => {});
    });

    card.addEventListener("mouseleave", () => {
      video.pause();
      video.currentTime = 0;
    });

    relatedGrid.appendChild(card);
  });

  /* =============================
     SECURITY
  ============================= */
  player.addEventListener("contextmenu", e => e.preventDefault());
});
