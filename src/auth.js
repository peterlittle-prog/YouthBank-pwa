import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// This is the main entry point. It is ONLY called by main.js on the login page.
export function initAuthPage() {
    const auth = getAuth(); // Get auth service here
    const errorMessage = document.getElementById('error-message');

    // --- UI Toggles ---
    document.getElementById('show-signup').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('sign-in-form').style.display = 'none';
        document.getElementById('sign-up-form').style.display = 'block';
        errorMessage.innerText = '';
    });
    document.getElementById('show-signin').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('sign-in-form').style.display = 'block';
        document.getElementById('sign-up-form').style.display = 'none';
        errorMessage.innerText = '';
    });

    // --- Email/Password Sign Up ---
    document.getElementById('signup-button').addEventListener('click', () => {
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        createUserWithEmailAndPassword(auth, email, password)
            .catch(error => { errorMessage.innerText = error.message; });
    });

    // --- Email/Password Sign In ---
    document.getElementById('signin-button').addEventListener('click', () => {
        const email = document.getElementById('signin-email').value;
        const password = document.getElementById('signin-password').value;
        signInWithEmailAndPassword(auth, email, password)
            .catch(error => { errorMessage.innerText = error.message; });
    });

    // --- Google Sign In ---
    document.getElementById('google-signin-button').addEventListener('click', () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .catch(error => { errorMessage.innerText = error.message; });
    });
}