const API_URL = "https://script.google.com/a/macros/youthbankinternational.org/s/AKfycbw7yrHpVKHY3R2jX1Qszh5eT6ixw6kQ5TmfR7QCiT3_NA304KQIBz06R40Pq_I3aJn/exec";

document.addEventListener('DOMContentLoaded', () => {
  const sessionList = document.getElementById('session-list');
  sessionList.innerHTML = '<p>Loading sessions...</p>'; // Add a loading message

  fetch(API_URL)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Clear the loading message
      sessionList.innerHTML = '';

      // Check if data is an array and not empty
      if (Array.isArray(data) && data.length > 0) {
        // Loop through the data and display it
        data.forEach(session => {
          const sessionDiv = document.createElement('div');
          sessionDiv.style.border = '1px solid #ccc';
          sessionDiv.style.padding = '1em';
          sessionDiv.style.marginBottom = '1em';

          // IMPORTANT: These names must EXACTLY match the column headers in your Google Sheet.
          const title = session['Exercise'] || 'No Title';
          const rationale = session['Rationale'] || 'No rationale provided.';

          sessionDiv.innerHTML = `
            <h3>${title}</h3>
            <p>${rationale}</p>
          `;
          sessionList.appendChild(sessionDiv);
        });
      } else {
        sessionList.innerHTML = '<p>No sessions found. Please check the Google Sheet for data.</p>';
      }
    })
    .catch(error => {
      console.error('Error fetching session data:', error);
      sessionList.innerHTML = `<p><strong>Failed to load sessions.</strong> Please ensure you are logged into a valid @youthbankinternational.org Google account and try a hard refresh. If the problem persists, the API may be configured incorrectly.</p>`;
    });

  // Add event listener for the form to handle POST requests (to be implemented later)
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
