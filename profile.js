// Firebase
const auth = firebase.auth();
const db = firebase.database();

// Elements
const dashEmail   = document.getElementById("dashEmail");
const dashJoined  = document.getElementById("dashJoined");
const dashStatus  = document.getElementById("dashStatus");
const dashSubText = document.getElementById("dashSubText");
const upgradeBtn  = document.getElementById("dashUpgradeBtn");
const manageBtn   = document.getElementById("dashManageBtn");
const logoutBtn   = document.getElementById("dashLogoutBtn");
const dashMessage = document.getElementById("dashMessage");

// 🔐 AUTH CHECK
auth.onAuthStateChanged(user => {

  // ❌ Not logged in → redirect to login
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  // ✅ Basic info
  dashEmail.textContent = user.email;
  dashJoined.textContent = new Date(user.metadata.creationTime).toDateString();

  // 🔍 Fetch user data from Realtime DB
  db.ref("users/" + user.uid).once("value")
    .then(snapshot => {
      const data = snapshot.val();

      // Default fallback
      let isPremium = false;

      if (data && data.premium === true) {
        isPremium = true;
      }

      // 🎖 PREMIUM USER
      if (isPremium) {
        dashStatus.textContent = "Premium";
        dashStatus.className = "badge badge-premium";

        dashSubText.textContent =
          "You have an active premium subscription.";

        upgradeBtn.style.display = "none";
        manageBtn.style.display = "inline-block";

      } 
      // 🆓 FREE USER
      else {
        dashStatus.textContent = "Free";
        dashStatus.className = "badge badge-free";

        dashSubText.innerHTML =
          "You are on a free account. Upgrade to premium to unlock full videos.";

        upgradeBtn.style.display = "inline-block";
        manageBtn.style.display = "none";
      }
    });
});

// 🚪 LOGOUT (REAL LOGOUT)
logoutBtn.addEventListener("click", () => {
  auth.signOut().then(() => {
    window.location.href = "login.html";
  });
});

// 💳 UPGRADE → GO TO GET ACCESS PAGE
upgradeBtn.addEventListener("click", () => {
  window.location.href = "get-access.html";
});
