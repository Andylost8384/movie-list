document.addEventListener("DOMContentLoaded", () => {

  if (!window.VIDEOS) return;

  /* =========================================
     GET VIDEO FROM URL
  ========================================= */
  const params = new URLSearchParams(window.location.search);
  const titleParam = params.get("title");

  let currentVideo = window.VIDEOS.find(
    v => v.title === titleParam
  );

  // fallback → latest video
  if (!currentVideo) {
    currentVideo = [...window.VIDEOS]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
  }

  /* =========================================
     DOM ELEMENTS
  ========================================= */
  const titleEl    = document.getElementById("videoTitle");
  const modelEl    = document.getElementById("videoModel");
  const durationEl = document.getElementById("videoDuration");
  const player     = document.getElementById("videoPlayer");
  const overlay    = document.getElementById("upgradeOverlay");
  const relatedGrid = document.getElementById("relatedGrid");

  /* =========================================
     FILL TEXT
  ========================================= */
  titleEl.textContent = currentVideo.title;
  modelEl.textContent = currentVideo.model;
  durationEl.textContent = currentVideo.duration;

  /* =========================================
     PREMIUM LOGIC (TEMP – LOCALSTORAGE)
     later Firebase se replace hoga
  ========================================= */
  const IS_PREMIUM = localStorage.getItem("infectaria_premium") === "true";
  const PREVIEW_LIMIT = 30; // seconds

  player.src = IS_PREMIUM
    ? currentVideo.fullUrl
    : currentVideo.previewUrl;

  overlay.style.display = "none";

  /* =========================================
     PREVIEW LIMIT FOR FREE USERS
  ========================================= */
  if (!IS_PREMIUM) {
    player.addEventListener("timeupdate", () => {
      if (player.currentTime >= PREVIEW_LIMIT) {
        player.pause();
        overlay.style.display = "flex";
      }
    });
  }

  /* =========================================
     RELATED VIDEOS
     - hover autoplay
     - muted
     - mouse leave → reset
  ========================================= */
  relatedGrid.innerHTML = "";

  const related = window.VIDEOS
    .filter(v => v.title !== currentVideo.title)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);

  related.forEach(v => {
    const card = document.createElement("a");
    card.href = "video.html?title=" + encodeURIComponent(v.title);
    card.className = "related-card";

    card.innerHTML = `
      <video
        muted
        preload="metadata"
        playsinline
        poster="${v.thumb}"
      >
        <source src="${v.previewUrl}" type="video/mp4">
      </video>
      <p>${v.title}</p>
    `;

    const vid = card.querySelector("video");

    // hover preview
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

  /* =========================================
     SECURITY
  ========================================= */
  player.addEventListener("contextmenu", e => e.preventDefault());
});
