// A global function that the server will call by name
function displaySessions(data) {
  const sessionList = document.getElementById('session-list');
  sessionList.innerHTML = ''; // Clear the loading message

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
    // This will be triggered if the data is empty or if there was an error and 'data' is not an array
    if (data && data.error) {
       sessionList.innerHTML = `<p><strong>Error from server:</strong> ${data.error}</p>`;
    } else {
       sessionList.innerHTML = '<p>No sessions found or data is in an unexpected format.</p>';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const sessionList = document.getElementById('session-list');
  sessionList.innerHTML = '<p>Loading sessions...</p>';

  // --- THIS IS THE NEW JSONP CODE ---
  // Create a new script element
  const script = document.createElement('script');
  
  // Set its source to the API URL, with a special callback parameter
  // IMPORTANT: Use your LATEST deployment URL here.
  script.src = "YOUR_LATEST_APPS_SCRIPT_URL?callback=displaySessions";
  
  // Add the script to the page, which will execute the request
  document.body.appendChild(script);

  // Basic error handling for JSONP
  script.onerror = () => {
    displaySessions({ error: "Failed to load the script from the server. Please check the API URL and network connection." });
  };
});

// The service worker code should be updated to NOT cache the dynamic API URL
// For now, let's keep it simple. We can re-add the service worker later.
