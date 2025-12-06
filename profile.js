// profile.js — Account dashboard

document.addEventListener("DOMContentLoaded", () => {
  const auth = window.firebaseAuth;
  const db   = window.firebaseDB;

  const emailEl   = document.getElementById("dashEmail");
  const joinedEl  = document.getElementById("dashJoined");
  const statusEl  = document.getElementById("dashStatus");
  const subTextEl = document.getElementById("dashSubText");
  const msgEl     = document.getElementById("dashMessage");
  const logoutBtn = document.getElementById("dashLogoutBtn");
  const upgradeBtn= document.getElementById("dashUpgradeBtn");
  const manageBtn = document.getElementById("dashManageBtn");

  if (!auth || !db) {
    if (msgEl) msgEl.textContent = "Unable to load account. Firebase not initialized.";
    return;
  }

  function setStatusPremium(isPremium) {
    if (!statusEl || !subTextEl) return;

    if (isPremium) {
      statusEl.textContent = "Premium";
      statusEl.classList.remove("badge-free");
      statusEl.classList.add("badge-premium");
      subTextEl.textContent = "You have full access to all premium scenes on Infectaria.";
      upgradeBtn.style.display = "none";
      manageBtn.style.display = "inline-block";
      localStorage.setItem("infectaria_premium", "true");
    } else {
      statusEl.textContent = "Free";
      statusEl.classList.remove("badge-premium");
      statusEl.classList.add("badge-free");
      subTextEl.textContent = "You are on a free account. Upgrade to premium to unlock full videos.";
      upgradeBtn.style.display = "inline-block";
      manageBtn.style.display = "none";
      localStorage.setItem("infectaria_premium", "false");
    }
  }

  auth.onAuthStateChanged(async (user) => {
    if (!user) {
      if (msgEl) {
        msgEl.textContent = "You are not logged in. Redirecting to login page...";
      }
      setStatusPremium(false);
      setTimeout(() => {
        window.location.href = "login.html";
      }, 1500);
      return;
    }

    if (emailEl)  emailEl.textContent  = user.email || "Unknown";
    if (joinedEl) {
      try {
        const date = new Date(user.metadata.creationTime);
        joinedEl.textContent = date.toLocaleDateString();
      } catch {
        joinedEl.textContent = user.metadata.creationTime || "—";
      }
    }

    try {
      const docRef = db.collection("users").doc(user.uid);
      const snap = await docRef.get();

      let isPremium = false;
      if (snap.exists) {
        const data = snap.data();
        isPremium = data.premium === true;
      } else {
        await docRef.set({ premium: false }, { merge: true });
      }

      setStatusPremium(isPremium);
      if (msgEl) msgEl.textContent = "";
    } catch (err) {
      console.error(err);
      if (msgEl) msgEl.textContent = "Could not load subscription data.";
      setStatusPremium(false);
    }
  });

  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      try {
        await auth.signOut();
        localStorage.setItem("infectaria_premium", "false");
        if (msgEl) msgEl.textContent = "Logged out. Redirecting to home...";
        setTimeout(() => {
          window.location.href = "index.html";
        }, 1200);
      } catch (err) {
        console.error(err);
        if (msgEl) msgEl.textContent = "Error logging out.";
      }
    });
  }

  // Upgrade button (abhi placeholder)
  if (upgradeBtn) {
    upgradeBtn.addEventListener("click", () => {
      if (msgEl) {
        msgEl.textContent = "Payment integration not connected yet. You can mark your account premium manually in Firestore.";
      }
    });
  }

  if (manageBtn) {
    manageBtn.addEventListener("click", () => {
      if (msgEl) {
        msgEl.textContent = "Subscription management UI will be implemented with your payment provider.";
      }
    });
  }
});
