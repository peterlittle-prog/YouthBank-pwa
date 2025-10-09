// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMgcOU5vHUEgs5T-0tieQjwHOMKvIRkc4",
  authDomain: "youthbank-learning-platform.firebaseapp.com",
  projectId: "youthbank-learning-platform",
  storageBucket: "youthbank-learning-platform.firebasestorage.app",
  messagingSenderId: "999854663085",
  appId: "1:999854663085:web:71584e6731c159fe26ed24",
  measurementId: "G-1TXTJYKD8W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
