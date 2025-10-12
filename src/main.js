// --- IMPORTS ---
import '/src/style.css'; // This line loads all your styles for every page.
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseConfig } from "./firebase-config.js";
import { initSessionsPage } from "./sessions.js";
import { initAuthPage } from "./auth.js";

// --- INITIALIZATION ---
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
console.log("Firebase Initialized Successfully!");

// --- GATEKEEPER / ROUTER ---
// This runs on every page and decides what to do.
onAuthStateChanged(auth, (user) => {
  const path = window.location.pathname;

  if (user) {
    // User IS signed in
    if (path.endsWith('login.html')) {
      // If they are on the login page, send them to the homepage.
      window.location.href = 'index.html';
    } else if (path.endsWith('sessions.html')) {
      // If they are on the sessions page, run its logic.
      initSessionsPage(user);
    }
    // If they are on index.html, do nothing (the page is static).
  } else {
    // User is NOT signed in
    if (!path.endsWith('login.html')) {
      // If they are on any page that is NOT the login page, send them there.
      window.location.href = 'login.html';
    } else {
      // If they are already on the login page, run its logic.
      initAuthPage();
    }
  }
});