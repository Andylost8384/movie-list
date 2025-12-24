document.addEventListener("DOMContentLoaded", () => {
  if (!window.VIDEOS) return;

  const grid = document.getElementById("latestGrid");
  if (!grid) return;

  // IMPORTANT: grid ko 2-column layout ke liye mark karo
  grid.classList.add("latest-2col");

  const latest = [...window.VIDEOS]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);

  grid.innerHTML = "";

  latest.forEach(video => {

    const card = document.createElement("a");
    card.href = "video.html?title=" + encodeURIComponent(video.title);
    card.className = "video-card";

    /* ===== THUMB IMAGE ===== */
    const img = document.createElement("img");
    img.src = video.thumb;
    img.alt = video.title;
    img.className = "video-thumb";

    /* ===== PREVIEW VIDEO ===== */
    const preview = document.createElement("video");
    preview.className = "video-preview";
    preview.muted = true;
    preview.loop = true;
    preview.playsInline = true;
    preview.preload = "metadata";

    const src = document.createElement("source");
    src.src = video.previewUrl;
    src.type = "video/mp4";
    preview.appendChild(src);

    /* ===== TITLE ===== */
    const title = document.createElement("div");
    title.className = "video-card-title";
    title.textContent = video.title;

    /* ===== STRUCTURE ===== */
    card.appendChild(img);
    card.appendChild(preview);
    card.appendChild(title);

    /* ===== HOVER PREVIEW ===== */
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
