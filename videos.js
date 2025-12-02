document.addEventListener("DOMContentLoaded", () => {
  
  // All videos data (backend later)
  const videos = [
    { title: "Another Me", model: "Nika Nut", thumb: "1.png" },
    { title: "Little Chloe For OnlyTarts Again", model: "Little Chloe", thumb: "2.png" },
    { title: "Thanksgiving Dinner Idea", model: "Mila Pie", thumb: "3.png" },
    { title: "Got Milk?", model: "Little Chloe", thumb: "4.png" },
    { title: "Noi Feja For OnlyTarts", model: "Noi Feja", thumb: "5.png" }
  ];

  // Get model from URL
  const params = new URLSearchParams(window.location.search);
  const filterModel = params.get("model");

  const pageTitle = document.getElementById("pageTitle");
  const grid = document.getElementById("videosGrid");

  // If filter present
  let visibleVideos = videos;
  if (filterModel) {
    visibleVideos = videos.filter(v => v.model === filterModel);
    pageTitle.textContent = filterModel + " Videos";
  }

  // Display videos
  visibleVideos.forEach(v => {
    grid.innerHTML += `
      <a href="video.html?title=${encodeURIComponent(v.title)}" class="related-card">
        <img src="${v.thumb}" alt="${v.title}">
        <p>${v.title}</p>
      </a>
    `;
  });

});
