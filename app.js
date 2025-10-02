const API_URL = "YOUR_APPS_SCRIPT_WEB_APP_URL";

document.addEventListener('DOMContentLoaded', () => {
  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      const sessionList = document.getElementById('session-list');
      // Code to loop through 'data' and display it in 'session-List'
    });

  // Add event listener for the form to handle POST requests
});
