// ================= SAFE DOM READY =================
document.addEventListener("DOMContentLoaded", () => {

  /* =================================================
     AGE GATE LOGIC (18+)
  ================================================== */

  const ageGate  = document.getElementById("ageGate");
  const over18   = document.getElementById("over18");
  const under18  = document.getElementById("under18");

  if (ageGate && over18 && under18) {

    const ageConfirmed = localStorage.getItem("infectaria_age_ok");

    if (ageConfirmed === "yes") {
      ageGate.style.display = "none";
    } else {
      ageGate.style.display = "flex";
    }

    over18.addEventListener("click", () => {
      localStorage.setItem("infectaria_age_ok", "yes");
      ageGate.style.display = "none";
    });

    under18.addEventListener("click", () => {
      alert("You must be 18 or older to access this site.");
      window.location.href = "https://www.google.com";
    });
  }

  /* =================================================
     FIREBASE AUTH UI CONTROL (Navbar)
  ================================================== */

  if (typeof firebase !== "undefined") {

    const auth = firebase.auth();

    auth.onAuthStateChanged(user => {

      // Navbar elements
      const loginLinks    = document.querySelectorAll('a[href="login.html"]');
      const accountLinks  = document.querySelectorAll('a[href="profile.html"]');
      const getAccessBtns = document.querySelectorAll('.cta');

      if (user) {
        // ✅ USER LOGGED IN

        loginLinks.forEach(el => el.style.display = "none");
        getAccessBtns.forEach(el => el.style.display = "none");
        accountLinks.forEach(el => el.style.display = "inline-block");

      } else {
        // ❌ USER LOGGED OUT

        loginLinks.forEach(el => el.style.display = "inline-block");
        getAccessBtns.forEach(el => el.style.display = "inline-block");
        accountLinks.forEach(el => el.style.display = "none");
      }
    });
  }

});
