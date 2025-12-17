// ================= FIREBASE AUTH UI CONTROL =================

if (typeof firebase !== "undefined") {
  const auth = firebase.auth();

  auth.onAuthStateChanged(user => {

    // Navbar elements
    const loginLinks  = document.querySelectorAll('a[href="login.html"]');
    const accountLinks = document.querySelectorAll('a[href="profile.html"]');
    const getAccessBtns = document.querySelectorAll('.cta');

    if (user) {
      // ✅ USER LOGGED IN

      // Hide Login + Get Access
      loginLinks.forEach(el => el.style.display = "none");
      getAccessBtns.forEach(el => el.style.display = "none");

      // Show Account
      accountLinks.forEach(el => el.style.display = "inline-block");

    } else {
      // ❌ USER LOGGED OUT

      // Show Login + Get Access
      loginLinks.forEach(el => el.style.display = "inline-block");
      getAccessBtns.forEach(el => el.style.display = "inline-block");

      // Hide Account
      accountLinks.forEach(el => el.style.display = "none");
    }
  });
}
