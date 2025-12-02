// videos.js — list page (Hentaied / Lesbian / All + by model)

document.addEventListener("DOMContentLoaded", () => {
  // Safety: data loaded?
  if (!window.VIDEOS) return;

  const params       = new URLSearchParams(window.location.search);
  const modelParam   = params.get("model");      // e.g. ?model=Lucy Mochi
  const categoryParam= params.get("category");   // e.g. ?category=Hentaied

  const pageTitle = document.getElementById("pageTitle");
  const pageSub   = document.getElementById("pageSubtitle");
  const grid      = document.getElementById("videosGrid");

  if (!grid) return;

  // ------- FILTERING LOGIC -------

  let list = [...window.VIDEOS];

  // 1) Model filter highest priority
  if (modelParam) {
    list = list.filter(v => v.model === modelParam);
    if (pageTitle)  pageTitle.textContent  = modelParam + " Videos";
    if (pageSub)    pageSub.textContent    = "All scenes with " + modelParam + ".";
  } else if (categoryParam && categoryParam !== "All") {
    // 2) Category filter (Hentaied / Lesbian)
    list = list.filter(v => v.category === categoryParam);
    if (pageTitle)  pageTitle.textContent  = categoryParam + " Videos";
    if (pageSub)    pageSub.textContent    = "Showing all " + categoryParam + " videos.";
  } else {
    // 3) No filter → All
    if (pageTitle)  pageTitle.textContent  = "All Videos";
    if (pageSub)    pageSub.textContent    = "Showing all videos on Infectaria.";
  }

  // Sort: latest first
  list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // ------- RENDER CARDS -------

  grid.innerHTML = "";  // purana sab hata do

  if (list.length === 0) {
    grid.innerHTML = "<p>No videos found for this filter yet.</p>";
    return;
  }

  list.forEach(v => {
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
