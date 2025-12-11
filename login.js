// login.js — 3-step auth + manual payment -> premium flag

document.addEventListener("DOMContentLoaded", () => {
  const auth = window.firebaseAuth;
  const db   = window.firebaseDB;

  if (!auth || !db) {
    console.error("Firebase not initialized");
    return;
  }

  const stepDots = document.querySelectorAll(".step-dot");
  const step1 = document.getElementById("step1");
  const step2 = document.getElementById("step2");
  const step3 = document.getElementById("step3");
  const statusEl = document.getElementById("authStatus");
  const finalMsg = document.getElementById("finalMessage");

  const accountForm  = document.getElementById("accountForm");
  const emailInput   = document.getElementById("loginEmail");
  const passInput    = document.getElementById("loginPassword");
  const backTo1      = document.getElementById("backToStep1");
  const backTo2      = document.getElementById("backToStep2");
  const choosePlan   = document.getElementById("choosePlanBtn");
  const confirmPaid  = document.getElementById("confirmPaidBtn");

  let currentUser = null;
  let chosenPlan = "30D";

  function goToStep(step) {
    step1.classList.add("hidden");
    step2.classList.add("hidden");
    step3.classList.add("hidden");

    if (step === 1) step1.classList.remove("hidden");
    if (step === 2) step2.classList.remove("hidden");
    if (step === 3) step3.classList.remove("hidden");

    stepDots.forEach(dot => {
      dot.classList.toggle("active", Number(dot.dataset.step) === step);
    });

    if (step === 1 && statusEl) {
      statusEl.textContent = "Step 1: Create your account or login with your email.";
    } else if (step === 2 && statusEl) {
      statusEl.textContent = "Step 2: Choose your 30-day streaming plan.";
    } else if (step === 3 && statusEl) {
      statusEl.textContent = "Step 3: Complete your payment, then confirm.";
    }
  }

  // Track Firebase auth state
  auth.onAuthStateChanged(user => {
    currentUser = user;
    if (user && statusEl) {
      statusEl.textContent = "Logged in as " + (user.email || "user") +
        ". Continue with Step 2 to choose your plan.";
    }
  });

  // STEP 1: Create or login account
  if (accountForm) {
    accountForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      finalMsg.textContent = "";

      const email = (emailInput.value || "").trim();
      const password = passInput.value || "";

      if (!email || !password) {
        statusEl.textContent = "Please enter email and password.";
        return;
      }

      statusEl.textContent = "Checking your account...";

      try {
        // Try sign in first
        let userCred;
        try {
          userCred = await auth.signInWithEmailAndPassword(email, password);
        } catch (err) {
          if (err.code === "auth/user-not-found") {
            // create new
            userCred = await auth.createUserWithEmailAndPassword(email, password);
          } else {
            throw err;
          }
        }

        currentUser = userCred.user;

        // Ensure doc exists in Firestore
        const docRef = db.collection("users").doc(currentUser.uid);
        const snap = await docRef.get();
        if (!snap.exists) {
          await docRef.set(
            {
              email: currentUser.email || email,
              premium: false,
              premiumPlan: null,
              createdAt: firebase.firestore.FieldValue.serverTimestamp()
            },
            { merge: true }
          );
        }

        localStorage.setItem("infectaria_premium", "false");

        statusEl.textContent = "Logged in as " + (currentUser.email || email) +
          ". Now choose your plan.";
        goToStep(2);
      } catch (err) {
        console.error(err);
        statusEl.textContent = "Error: " + (err.message || "Could not login / create account.");
      }
    });
  }

  // STEP 2: choose plan
  if (choosePlan) {
    choosePlan.addEventListener("click", () => {
      if (!currentUser) {
        statusEl.textContent = "Please complete Step 1 first.";
        goToStep(1);
        return;
      }
      chosenPlan = "30D";
      goToStep(3);
    });
  }

  if (backTo1) {
    backTo1.addEventListener("click", () => goToStep(1));
  }

  if (backTo2) {
    backTo2.addEventListener("click", () => goToStep(2));
  }

  // STEP 3: user confirms they paid
  if (confirmPaid) {
    confirmPaid.addEventListener("click", async () => {
      finalMsg.textContent = "";
      if (!currentUser) {
        statusEl.textContent = "You are not logged in. Please complete Step 1.";
        goToStep(1);
        return;
      }

      statusEl.textContent = "Saving your premium status...";

      try {
        const docRef = db.collection("users").doc(currentUser.uid);
        await docRef.set(
          {
            premium: true,
            premiumPlan: chosenPlan,
            premiumActivatedAt: firebase.firestore.FieldValue.serverTimestamp()
          },
          { merge: true }
        );

        localStorage.setItem("infectaria_premium", "true");

        statusEl.textContent = "Premium activated. Thank you!";
        finalMsg.textContent =
          "Your premium access is active now. If there is any issue with your payment, " +
          "we may contact you or adjust your account manually.";

        setTimeout(() => {
          window.location.href = "profile.html";
        }, 1500);
      } catch (err) {
        console.error(err);
        statusEl.textContent = "Could not mark payment as completed.";
        finalMsg.textContent = "Please try again or contact support.";
      }
    });
  }

  // Start on step 1
  goToStep(1);
});
