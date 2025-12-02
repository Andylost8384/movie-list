document.addEventListener("DOMContentLoaded", () => {
  if (!window.firebaseAuth || !window.firebaseDB) return;

  const auth = window.firebaseAuth;
  const db   = window.firebaseDB;

  const loginForm    = document.getElementById("loginForm");
  const emailInput   = document.getElementById("email");
  const passInput    = document.getElementById("password");
  const statusEl     = document.getElementById("authStatus");
  const premiumEl    = document.getElementById("premiumStatus");
  const logoutBtn    = document.getElementById("logoutBtn");

  // Helper to show messages
  function showStatus(msg) {
    if (statusEl) statusEl.textContent = msg;
  }

  function showPremium(isPremium) {
    if (!premiumEl) return;
    if (isPremium) {
      premiumEl.textContent = "Your account is PREMIUM. Full videos unlocked.";
    } else {
      premiumEl.textContent = "Your account is FREE. You will see preview only.";
    }
  }

  // Auth state listener
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      showStatus("Logged in as " + (user.email || "user"));
      if (logoutBtn) logoutBtn.style.display = "inline-block";

      try {
        const docRef = db.collection("users").doc(user.uid);
        const snap = await docRef.get();

        let isPremium = false;

        if (snap.exists) {
          const data = snap.data();
          isPremium = data.premium === true;
        } else {
          // Default: not premium yet
          await docRef.set({ premium: false }, { merge: true });
        }

        localStorage.setItem("infectaria_premium", isPremium ? "true" : "false");
        showPremium(isPremium);
      } catch (err) {
        console.error(err);
        showStatus("Error loading premium status.");
      }
    } else {
      showStatus("Not logged in.");
      localStorage.setItem("infectaria_premium", "false");
      if (logoutBtn) logoutBtn.style.display = "none";
      showPremium(false);
    }
  });

  // Handle login form submit
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();
      const pass  = passInput.value.trim();
      if (!email || !pass) return;

      showStatus("Signing in...");

      try {
        // First try sign in
        await auth.signInWithEmailAndPassword(email, pass);
        showStatus("Login successful.");
      } catch (err) {
        if (err.code === "auth/user-not-found") {
          // Create account
          try {
            await auth.createUserWithEmailAndPassword(email, pass);
            showStatus("Account created and logged in.");
          } catch (err2) {
            console.error(err2);
            showStatus("Signup error: " + err2.message);
          }
        } else {
          console.error(err);
          showStatus("Login error: " + err.message);
        }
      }
    });
  }

  // Logout handler
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      try {
        await auth.signOut();
        showStatus("Logged out.");
      } catch (err) {
        console.error(err);
        showStatus("Logout error.");
      }
    });
  }
});
