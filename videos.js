// videos.js — category / model listing with hover preview

document.addEventListener("DOMContentLoaded", () => {
  if (!window.VIDEOS) return;

  const params        = new URLSearchParams(window.location.search);
  const modelParam    = params.get("model");
  const categoryParam = params.get("category");

  const pageTitle = document.getElementById("pageTitle");
  const pageSub   = document.getElementById("pageSubtitle");
  const grid      = document.getElementById("videosGrid");

  if (!grid) return;

  // grid ko home jaisa bana do
  grid.classList.add("latest-2col");

  let list = [...window.VIDEOS];

  /* ================= FILTER ================= */

  if (modelParam) {
    list = list.filter(v => v.model === modelParam);
    pageTitle.textContent = modelParam + " Videos";
    pageSub.textContent   = "All scenes featuring " + modelParam + ".";
  }
  else if (categoryParam && categoryParam !== "All") {
    list = list.filter(v => v.category === categoryParam);
    pageTitle.textContent = categoryParam + " Videos";
    pageSub.textContent   = "Showing all " + categoryParam + " videos.";
  }
  else {
    pageTitle.textContent = "All Videos";
    pageSub.textContent   = "Showing all videos on Infectaria.";
  }

  /* ================= SORT ================= */

  list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  grid.innerHTML = "";

  if (list.length === 0) {
    grid.innerHTML = "<p>No videos found.</p>";
    return;
  }

  /* ================= RENDER ================= */

  list.forEach(video => {

    const card = document.createElement("a");
    card.href = "video.html?title=" + encodeURIComponent(video.title);
    card.className = "video-card";

    /* Thumbnail */
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

    const src = document.createElement("source");
    src.src = video.previewUrl;
    src.type = "video/mp4";
    preview.appendChild(src);

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
