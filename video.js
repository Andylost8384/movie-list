document.addEventListener("DOMContentLoaded", () => {

  if (!window.VIDEOS) return; // Safety check

  // ---- URL se video title read karna ----
  const params = new URLSearchParams(window.location.search);
  const titleParam = params.get("title");

  let currentVideo = window.VIDEOS.find(v => v.title === titleParam);

  // Agar URL me kuch galti ho jaye → Latest video dikhao
  if (!currentVideo) {
    currentVideo = [...window.VIDEOS].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )[0];
  }

  // ---- DOM Elements ----
  const titleEl = document.getElementById("videoTitle");
  const modelEl = document.getElementById("videoModel");
  const durationEl = document.getElementById("videoDuration");
  const playerEl = document.getElementById("videoPlayer");
  const overlay = document.getElementById("upgradeOverlay");
  const relatedGrid = document.getElementById("relatedGrid");

  // ---- UI Fill ----
  titleEl.textContent = currentVideo.title;
  modelEl.textContent = currentVideo.model;
  durationEl.textContent = currentVideo.duration;

  // ---- Premium Logic (Phase 1 — no login yet) ----
  const PREMIUM = false; // TODO: Firebase Auth se set hoga
  const PREVIEW_TIME = 30; // seconds

  const sourceUrl = PREMIUM ? currentVideo.fullUrl : currentVideo.previewUrl;
  playerEl.src = sourceUrl;

  if (!PREMIUM) {
    overlay.style.display = "none"; // start me hidden
    playerEl.addEventListener("timeupdate", () => {
      if (playerEl.currentTime >= PREVIEW_TIME) {
        playerEl.pause();
        overlay.style.display = "flex";
      }
    });
  } else {
    overlay.style.display = "none";
  }

  // ---- Related Videos Logic ----
  if (relatedGrid) {
    relatedGrid.innerHTML = "";

    // Same category + same model preference
    let related = window.VIDEOS.filter(
      v => v.title !== currentVideo.title
    );

    // Sort by latest first
    related = related.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    // Top 3 related hi dikhayenge
    related.slice(0, 3).forEach(v => {
      const a = document.createElement("a");
      a.href = "video.html?title=" + encodeURIComponent(v.title);
      a.className = "related-card";

      a.innerHTML = `
        <img src="${v.thumb}" alt="${v.title}">
        <p>${v.title}</p>
      `;

      relatedGrid.appendChild(a);
    });
  }

  // Disable Right-Click on video
  playerEl.addEventListener("contextmenu", e => e.preventDefault());
});
