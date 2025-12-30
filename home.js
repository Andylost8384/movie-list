// home.js — Latest videos (2 per row + hover preview + title)

document.addEventListener("DOMContentLoaded", () => {
  if (!window.VIDEOS) return;

  const grid = document.getElementById("latestGrid");
  if (!grid) return;

  // ✅ Home page grid class
  grid.classList.add("home-latest-grid");

  // Latest 4 videos (2x2)
  const latest = [...window.VIDEOS]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  grid.innerHTML = "";

  latest.forEach(video => {

    const card = document.createElement("a");
    card.href = "video.html?title=" + encodeURIComponent(video.title);
    card.className = "video-card";

    /* Thumbnail image */
    const img = document.createElement("img");
    img.src = video.thumb;
    img.alt = video.title;
    img.className = "video-thumb";

    /* Preview video */
    const preview = document.createElement("video");
    preview.className = "video-preview";
    preview.muted = true;
    preview.loop = true;
    preview.playsInline = true;
    preview.preload = "metadata";

    if (video.previewUrl) {
      const src = document.createElement("source");
      src.src = video.previewUrl;
      src.type = "video/mp4";
      preview.appendChild(src);
    }

    /* Title */
    const title = document.createElement("div");
    title.className = "video-card-title";
    title.textContent = video.title;

    /* Structure */
    card.appendChild(img);
    card.appendChild(preview);
    card.appendChild(title);

    /* Hover preview */
    card.addEventListener("mouseenter", () => {
      img.style.opacity = "0";
      preview.currentTime = 0;
      preview.play().catch(() => {});
    });

    card.addEventListener("mouseleave", () => {
      preview.pause();
      preview.currentTime = 0;
      img.style.opacity = "1";
    });

    grid.appendChild(card);
  });
});
