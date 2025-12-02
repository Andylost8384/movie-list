document.addEventListener("DOMContentLoaded", () => {
  // --------------- VIDEO DATABASE (FIHAL STATIC) ---------------

  const videos = [
    {
      title: "Another Me",
      model: "Nika Nut",
      duration: "33:29",
      thumb: "1.png",
      // Tumhare diye hue archive.org links:
      previewUrl: "https://archive.org/download/feelac-1/Preview%20Secret%20Feelings%20Act%201.mp4",
      fullUrl: "https://archive.org/download/feelac-1/Feelac1.mp4"
    },
    {
      title: "Little Chloe For OnlyTarts Again",
      model: "Little Chloe",
      duration: "12:12",
      thumb: "2.png",
      previewUrl: "https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4",
      fullUrl: "https://archive.org/download/ElephantsDream/ed_hd.mp4"
    },
    {
      title: "Thanksgiving Dinner Idea",
      model: "Mila Pie",
      duration: "18:58",
      thumb: "3.png",
      previewUrl: "https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4",
      fullUrl: "https://archive.org/download/ElephantsDream/ed_hd.mp4"
    },
    {
      title: "Got Milk?",
      model: "Little Chloe",
      duration: "39:37",
      thumb: "4.png",
      previewUrl: "https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4",
      fullUrl: "https://archive.org/download/ElephantsDream/ed_hd.mp4"
    },
    {
      title: "Noi Feja For OnlyTarts",
      model: "Noi Feja",
      duration: "16:00",
      thumb: "5.png",
      previewUrl: "https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4",
      fullUrl: "https://archive.org/download/ElephantsDream/ed_hd.mp4"
    }
  ];

  // --------------- URL PARAMS SE VIDEO PICK KARNA ---------------

  const params = new URLSearchParams(window.location.search);
  const titleParam = params.get("title"); // video.html?title=Another%20Me

  let currentVideo = null;

  if (titleParam) {
    currentVideo = videos.find(v => v.title === titleParam);
  }

  // Agar URL me title missing ho ya wrong ho to first video:
  if (!currentVideo) {
    currentVideo = videos[0];
  }

  // --------------- DOM ELEMENTS ---------------

  const titleEl = document.getElementById("videoTitle");
  const modelEl = document.getElementById("videoModel");
  const durEl   = document.getElementById("videoDuration");
  const player  = document.getElementById("videoPlayer");
  const overlay = document.getElementById("upgradeOverlay");
  const relatedGrid = document.getElementById("relatedGrid");

  if (!titleEl || !player || !overlay) {
    return; // agar video page nahi hai to kuch mat karo
  }

  // --------------- BASIC PREMIUM LOGIC (PHASE 1) ---------------

  const PREMIUM = false;          // TODO: Firebase se aayega
  const PREVIEW_TIME = 30;        // seconds (tumne bola 30s)
  const isPremium = PREMIUM === true;

  // --------------- UI FILL ---------------

  titleEl.textContent = currentVideo.title;
  modelEl.textContent = currentVideo.model;
  durEl.textContent   = currentVideo.duration;

  // Stream URL set (preview / full)
  const streamUrl = isPremium ? currentVideo.fullUrl : currentVideo.previewUrl;

  player.src = streamUrl;

  if (!isPremium) {
    overlay.style.display = "none"; // start me hidden, 30s ke baad dikhayenge

    player.addEventListener("timeupdate", () => {
      if (player.currentTime >= PREVIEW_TIME) {
        player.pause();
        overlay.style.display = "flex";
      }
    });
  } else {
    // Premium user
    overlay.style.display = "none";
  }

  // --------------- RELATED VIDEOS (same model pe based) ---------------

  if (relatedGrid) {
    // Same model ke videos (current ko chhodke)
    const related = videos.filter(
      v => v.model === currentVideo.model && v.title !== currentVideo.title
    );

    // Agar same model ke kam ho to aur random bhar do
    let extras = videos.filter(v => v.title !== currentVideo.title);
    while (related.length < 3 && extras.length > 0) {
      const v = extras.shift();
      if (!related.includes(v)) related.push(v);
    }

    relatedGrid.innerHTML = "";

    related.forEach(v => {
      const a = document.createElement("a");
      a.href = "video.html?title=" + encodeURIComponent(v.title);
      a.className = "related-card";

      a.innerHTML = `
        <img src="${v.thumb}" alt="${v.title}">
        <p>${v.title}</p>
      `;

      relatedGrid.appendChild(a);
    });
  }
});
