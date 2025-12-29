document.addEventListener("DOMContentLoaded", () => {
  if (!window.VIDEOS) return;

  const grid = document.getElementById("latestGrid");
  if (!grid) return;

  const latest = [...window.VIDEOS]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4); // 2x2 layout ke liye 4

  grid.innerHTML = "";

  latest.forEach(video => {
    const item = document.createElement("div");
    item.className = "video-item";

    const card = document.createElement("a");
    card.href = "video.html?title=" + encodeURIComponent(video.title);
    card.className = "video-thumb";

    const img = document.createElement("img");
    img.src = video.thumb;
    img.alt = video.title;

    card.appendChild(img);

    // hover preview
    if (video.previewUrl) {
      const vid = document.createElement("video");
      vid.src = video.previewUrl;
      vid.muted = true;
      vid.loop = true;
      vid.playsInline = true;
      vid.preload = "none";
      vid.style.display = "none";

      card.appendChild(vid);

      card.addEventListener("mouseenter", () => {
        img.style.display = "none";
        vid.style.display = "block";
        vid.currentTime = 0;
        vid.play().catch(() => {});
      });

      card.addEventListener("mouseleave", () => {
        vid.pause();
        vid.style.display = "none";
        img.style.display = "block";
      });
    }

    const title = document.createElement("p");
    title.className = "video-name";
    title.textContent = video.title;

    item.appendChild(card);
    item.appendChild(title);
    grid.appendChild(item);
  });
});
