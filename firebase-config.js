// firebase-config.js
// TODO: Is config ko Firebase console se apne project ka actual config se replace karo
const firebaseConfig = {
  apiKey: "AIzaSyBDHMczYxUSXcoZuQRYh-wsDu4W_FuuukI",
  authDomain: "infectaria-3cacf.firebaseapp.com",
  projectId: "infectaria-3cacf",
  storageBucket: "infectaria-3cacf.firebasestorage.app",
  messagingSenderId: "323281294881",
  appId: "1:323281294881:web:b339985000dec8b9bc3560"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db   = firebase.firestore();

// Make global
window.firebaseAuth = auth;
window.firebaseDB   = db;
