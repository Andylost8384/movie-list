// search.js
// Global search using window.VIDEOS (title + model + category)

document.addEventListener("DOMContentLoaded", () => {
  const btn   = document.getElementById("searchBtn");
  const overlay = document.getElementById("searchOverlay");
  const input   = document.getElementById("searchInput");
  const closeBtn= document.getElementById("searchClose");
  const resultsBox = document.getElementById("searchResults");

  if (!btn || !overlay || !input || !closeBtn || !resultsBox) return;

  function openSearch() {
    overlay.classList.add("open");
    input.value = "";
    renderResults([]);
    setTimeout(() => input.focus(), 50);
  }

  function closeSearch() {
    overlay.classList.remove("open");
  }

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    openSearch();
  });

  closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    closeSearch();
  });

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeSearch();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeSearch();
  });

  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    if (!q || !Array.isArray(window.VIDEOS)) {
      renderResults([]);
      return;
    }

    const matches = window.VIDEOS.filter(v => {
      const inTitle    = v.title.toLowerCase().includes(q);
      const inModel    = (v.model || "").toLowerCase().includes(q);
      const inCategory = (v.category || "").toLowerCase().includes(q);
      return inTitle || inModel || inCategory;
    }).slice(0, 20);

    renderResults(matches);
  });

  function renderResults(list) {
    if (!list.length) {
      resultsBox.innerHTML = `<div style="padding:10px 16px;color:#777;font-size:13px;">Type to search videos...</div>`;
      return;
    }

    resultsBox.innerHTML = list.map(v => `
      <a href="video.html?title=${encodeURIComponent(v.title)}" class="search-item">
        <div class="search-thumb">
          <img src="${v.thumb}" alt="${v.title}">
        </div>
        <div class="search-meta">
          <span class="search-title">${v.title}</span>
          <small>${v.model || ""} · ${v.category || ""}</small>
        </div>
      </a>
    `).join("");
  }

  // Initial placeholder
  renderResults([]);
});
