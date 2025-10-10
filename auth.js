document.addEventListener('DOMContentLoaded', () => {
    const auth = firebase.auth();

    // --- Toggle between Sign In and Sign Up forms ---
    document.getElementById('show-signup').addEventListener('click', () => {
        document.getElementById('sign-in-form').style.display = 'none';
        document.getElementById('sign-up-form').style.display = 'block';
    });
    document.getElementById('show-signin').addEventListener('click', () => {
        document.getElementById('sign-in-form').style.display = 'block';
        document.getElementById('sign-up-form').style.display = 'none';
    });

    // --- Email/Password Sign Up ---
    document.getElementById('signup-button').addEventListener('click', () => {
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        auth.createUserWithEmailAndPassword(email, password)
            .then(userCredential => {
                alert('Account created! Please wait for an administrator to approve your account.');
                window.location.href = 'index.html'; // Redirect to homepage
            })
            .catch(error => {
                document.getElementById('error-message').innerText = error.message;
            });
    });

    // --- Email/Password Sign In ---
    document.getElementById('signin-button').addEventListener('click', () => {
        const email = document.getElementById('signin-email').value;
        const password = document.getElementById('signin-password').value;
        auth.signInWithEmailAndPassword(email, password)
            .then(userCredential => {
                window.location.href = 'index.html'; // Redirect to homepage on success
            })
            .catch(error => {
                document.getElementById('error-message').innerText = error.message;
            });
    });

    // --- Google Sign In ---
    document.getElementById('google-signin-button').addEventListener('click', () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider)
            .then(result => {
                window.location.href = 'index.html'; // Redirect to homepage on success
            })
            .catch(error => {
                document.getElementById('error-message').innerText = error.message;
            });
    });
});
