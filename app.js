const API_URL = "https://script.google.com/a/macros/youthbankinternational.org/s/AKfycbw7yrHpVKHY3R2jX1QszH5eT6ixW6kQ5TmrR7pQCiT3_NA304KQIbz06R4oPq_I3aJn/exec
";

document.addEventListener('DOMContentLoaded', () => {
  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      const sessionList = document.getElementById('session-list');
      // Code to loop through 'data' and display it in 'session-List'
    });

  // Add event listener for the form to handle POST requests
});
// Register the service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/YouthBank-pwa/sw.js')
      .then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch(err => {
        console.log('ServiceWorker registration failed: ', err);
      });
  });
}
