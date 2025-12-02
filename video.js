document.addEventListener("DOMContentLoaded", () => {
  
  // Video Sources (Replace with archive.org links later)
  const previewURL = "https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4";
  const fullURL = "https://archive.org/download/ElephantsDream/ed_hd.mp4";

  const player = document.getElementById("videoPlayer");
  const overlay = document.getElementById("upgradeOverlay");

  const PREMIUM = false; // TODO: backend will set true/false from Firebase user data
  const PREVIEW_TIME = 30; // seconds

  // Apply src based on premium
  player.src = PREMIUM ? fullURL : previewURL;

  // If not premium → pause after preview time
  if (!PREMIUM) {
    player.addEventListener("timeupdate", () => {
      if (player.currentTime >= PREVIEW_TIME) {
        player.pause();
        overlay.style.display = "flex";
      }
    });
  } else {
    overlay.style.display = "none";
  }

});
