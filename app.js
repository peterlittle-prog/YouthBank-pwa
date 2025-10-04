// A global function that the server will call by name
function displaySessions(data) {
  const sessionList = document.getElementById('session-list');
  sessionList.innerHTML = ''; // Clear the loading message

  // Helper function to build lists of linked resources
  const buildResourceList = (session, category, count) => {
    let listHtml = '';
    for (let i = 1; i <= count; i++) {
      const text = session[category + i + 'T'];
      const link = session[category + i];
      if (text && link) {
        listHtml += `<li><a href="${link}" target="_blank" rel="noopener noreferrer">${text}</a></li>`;
      } else if (text) {
        listHtml += `<li>${text}</li>`;
      }
    }
    return listHtml ? `<h4>${category}</h4><ul>${listHtml}</ul>` : '';
  };

  if (data && data.error) {
     sessionList.innerHTML = `<p><strong>Error from server:</strong> ${data.error}</p>`;
     return;
  }

  if (Array.isArray(data) && data.length > 0) {
    data.forEach(session => {
      const sessionDiv = document.createElement('div');
      sessionDiv.style.border = '1px solid #ccc';
      sessionDiv.style.padding = '1.5em';
      sessionDiv.style.marginBottom = '1.5em';
      sessionDiv.style.borderRadius = '8px';
      sessionDiv.style.backgroundColor = '#ffffff'; // Default background color

      // --- NEW FEATURES ---
      // These keys now match your new, clean column headers.
      const title = session['Exercise'] || 'No Title';
      const rationale = session['Rationale'] || 'Not provided.';
      const time = session['Time'] || 'Not specified';
      const materials = session['Materials'] || 'Not specified.';
      const challenge = session['The Challenge'] || '';

      const bgImage = session['Phase BG'];
      const iconUrl = session['Step IC'];

      // Apply background image if it exists
      if (bgImage) {
        // We use a semi-transparent white overlay so text is always readable
        sessionDiv.style.backgroundImage = `linear-gradient(rgba(255,255,255,0.85), rgba(255,255,255,0.85)), url(${bgImage})`;
        sessionDiv.style.backgroundSize = 'cover';
        sessionDiv.style.backgroundPosition = 'center';
      }

      // Create icon HTML if it exists
      const iconHtml = iconUrl ? `<img src="${iconUrl}" alt="Icon" style="height:1.5em; vertical-align:middle; margin-right:0.5em;">` : '';
      
      // Build the lists of resources, info sheets, and templates
      const resourcesHtml = buildResourceList(session, 'Resources', 5);
      const infoSheetsHtml = buildResourceList(session, 'Information Sheets', 5);
      const templatesHtml = buildResourceList(session, 'Templates', 5);
      
      // Create the final HTML for the session card
      sessionDiv.innerHTML = `
        <h2>${iconHtml}${title}</h2>
        <p>${rationale}</p>
        <p><strong>Challenge:</strong> ${challenge}</p>
        <hr>
        <p><strong>Time:</strong> ${time} minutes</p>
        <p><strong>Materials:</strong> ${materials}</p>
        ${resourcesHtml}
        ${infoSheetsHtml}
        ${templatesHtml}
      `;
      sessionList.appendChild(sessionDiv);
    });
  } else {
    sessionList.innerHTML = '<p>No sessions found.</p>';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const sessionList = document.getElementById('session-list');
  sessionList.innerHTML = '<p>Loading sessions...</p>';

  const script = document.createElement('script');
  
  // IMPORTANT: Make sure this is your latest, active Apps Script deployment URL
  script.src = "https://script.google.com/a/macros/youthbankinternational.org/s/AKfycbw7yrHpVKHY3R2jX1QszH5eT6ixW6kQ5TmrR7pQCiT3_NA304KQIbz06R4oPq_I3aJn/exec?callback=displaySessions";
  
  document.body.appendChild(script);

  script.onerror = () => {
    displaySessions({ error: "Failed to load script from the server. Check URL and network." });
  };
});
