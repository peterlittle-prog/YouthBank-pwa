// This code runs immediately on any page it's included on.
firebase.auth().onAuthStateChanged(user => {
    if (!user) {
        // User is NOT signed in.
        // We check to make sure we aren't already on the login page to avoid an infinite loop.
        if (!window.location.pathname.endsWith('login.html')) {
            console.log("Auth Guard: User not signed in. Redirecting to login.");
            window.location.href = 'login.html';
        }
    }
    // If the user IS signed in, this script does nothing, and the page continues to load normally.
});