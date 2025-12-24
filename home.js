document.addEventListener("DOMContentLoaded", () => {
  if (!window.VIDEOS) return;

  const grid = document.getElementById("latestGrid");
  if (!grid) return;

  // Sort by latest date and take top 6
  const latest = [...window.VIDEOS]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);

  grid.innerHTML = "";

  latest.forEach(video => {

    const wrapper = document.createElement("div");

    const card = document.createElement("a");
    card.href = "video.html?title=" + encodeURIComponent(video.title);
    card.className = "video-card";

    // Thumbnail
    const img = document.createElement("img");
    img.src = video.thumb;
    img.alt = video.title;

    card.appendChild(img);

    // Preview video (if exists)
    let previewVideo = null;
    if (video.previewUrl) {
      previewVideo = document.createElement("video");
      previewVideo.muted = true;
      previewVideo.loop = true;
      previewVideo.preload = "none";
      previewVideo.playsInline = true;

      const src = document.createElement("source");
      src.src = video.previewUrl;
      src.type = "video/mp4";

      previewVideo.appendChild(src);
      card.appendChild(previewVideo);

      // Hover behavior
      card.addEventListener("mouseenter", () => {
        previewVideo.currentTime = 0;
        previewVideo.play().catch(() => {});
      });

      card.addEventListener("mouseleave", () => {
        previewVideo.pause();
        previewVideo.currentTime = 0;
      });
    }

    wrapper.appendChild(card);

    // Title below card
    const title = document.createElement("p");
    title.className = "video-title";
    title.textContent = video.title;

    wrapper.appendChild(title);

    grid.appendChild(wrapper);
  });
});

