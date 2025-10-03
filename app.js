const API_URL = "https://script.google.com/a/macros/youthbankinternational.org/s/AKfycbw7yrHpVKHY3R2jX1Qszh5eT6ixw6kQ5TmfR7QCiT3_NA304KQIBz06R40Pq_I3aJn/exec";

document.addEventListener('DOMContentLoaded', () => {
  const sessionList = document.getElementById('session-list');
  sessionList.innerHTML = '<p>Loading sessions...</p>';

  // --- THIS IS THE NEW FETCH CODE ---
  // We are now using 'POST' to bypass the CORS issue.
  fetch(API_URL, {
    method: 'POST',
    redirect: "follow",
    headers: {
      "Content-Type": "text/plain;charset=utf-8", // Required for Apps Script POST
    },
    body: JSON.stringify({action: 'getSessions'}) // We send a simple instruction
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      sessionList.innerHTML = '';
      if (Array.isArray(data) && data.length > 0) {
        data.forEach(session => {
          const sessionDiv = document.createElement('div');
          sessionDiv.style.border = '1px solid #ccc';
          sessionDiv.style.padding = '1em';
          sessionDiv.style.marginBottom = '1em';

          const title = session['Exercise'] || 'No Title';
          const rationale = session['Rationale'] || 'No rationale provided.';

          sessionDiv.innerHTML = `
            <h3>${title}</h3>
            <p>${rationale}</p>
          `;
          sessionList.appendChild(sessionDiv);
        });
      } else {
        sessionList.innerHTML = '<p>No sessions found.</p>';
      }
    })
    .catch(error => {
      console.error('Error fetching session data:', error);
      sessionList.innerHTML = `<p><strong>Failed to load sessions.</strong> Please ensure you are logged in correctly and try a hard refresh.</p>`;
    });
});

// The service worker code remains the same
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/YouthBank-pwa/sw.js');
  });
}
