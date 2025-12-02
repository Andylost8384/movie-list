document.addEventListener("DOMContentLoaded", () => {
  if (!window.VIDEOS) return;

  const grid = document.getElementById("latestGrid");
  if (!grid) return;

  // Sort by createdAt desc, then pick top 6
  const latest = [...window.VIDEOS]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);

  grid.innerHTML = "";

  latest.forEach(v => {
    const a = document.createElement("a");
    a.href = "video.html?title=" + encodeURIComponent(v.title);
    a.className = "related-card";
    a.innerHTML = `
      <img src="${v.thumb}" alt="${v.title}">
      <p>${v.title}</p>
    `;
    grid.appendChild(a);
  });
});
