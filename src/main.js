// --- IMPORTS ---
// This brings in the necessary Firebase functions
import '/src/style.css';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// This brings in your unique project configuration
import { firebaseConfig } from "./firebase-config.js";

// --- INITIALIZATION ---
// Initialize Firebase and get the auth service
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
console.log("Firebase Initialized Successfully!");

// --- GATEKEEPER / ROUTER ---
// This is the new "auth guard". It runs on every page.
onAuthStateChanged(auth, (user) => {
  const isLoginPage = window.location.pathname.endsWith('login.html');

  if (user) {
    // User is signed in
    if (isLoginPage) {
      // If they are on the login page, send them to the homepage
      window.location.href = 'index.html';
    } else {
      // If they are on any other page, load the specific script for that page
      if (window.location.pathname.endsWith('sessions.html')) {
        import('./sessions.js');
      }
      // The index.html page has its own script, so we don't need to do anything here.
    }
  } else {
    // User is NOT signed in
    if (!isLoginPage) {
      // If they are on any page that is NOT the login page, send them there.
      window.location.href = 'login.html';
    } else {
      // If they are already on the login page, load the login script.
      import('/src/auth.js');
    }
  }
});