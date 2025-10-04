const API_URL = "https://script.google.com/a/macros/youthbankinternational.org/s/AKfycbw7yrHpVKHY3R2jX1QszH5eT6ixW6kQ5TmrR7pQCiT3_NA304KQIbz06R4oPq_I3aJn/exec?callback=displaySessions";
const API_URL = "YOUR_LATEST_APPS_SCRIPT_URL?callback=displaySessions"; // MAKE SURE THIS IS YOUR LATEST URL
let allSessions = [];

function renderExerciseList(phaseName) {
  const exerciseListView = document.getElementById('exercise-list-view');
  const exerciseDetailView = document.getElementById('exercise-detail-view');
  
  const sessionsInPhase = allSessions.filter(session => {
    return session.PHASE && session.PHASE.toLowerCase() === phaseName.toLowerCase();
  });

  // --- THIS IS THE FIX ---
  // The closing </a> tag has been added to the "Back" link.
  let html = `<h2>${phaseName}</h2><a href="/YouthBank-pwa/">&laquo; Back to YouthBank Cycle</a>`;
  
  if (sessionsInPhase.length === 0) {
    html += '<p>No exercises found for this phase. Please check the data in the Google Sheet.</p>';
  } else {
    sessionsInPhase.forEach(session => {
      const title = session.Exercise || 'No Title';
      const rationale = session.Rationale || 'Not provided.';
      const exerciseId = session['Exercise number'];
      const iconUrl = session['Step IC'];
      const bgImage = session['Phase BG'];

      const iconHtml = iconUrl ? `<img src="${iconUrl}" alt="Icon" class="card-icon">` : '';
      const backgroundStyle = bgImage ? `style="background-image: linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url(${bgImage});"` : '';

      html += `
        <div class="card-link" ${backgroundStyle}>
          <a href="sessions.html?exercise=${exerciseId}">
            <h3>${iconHtml}${title}</h3>
            <p>${rationale.substring(0, 150)}...</p>
            <p><em>Click to see more details</em></p>
          </a>
        </div>
      `;
    });
  }

  exerciseListView.innerHTML = html;
  exerciseListView.style.display = 'block';
  exerciseDetailView.style.display = 'none';
}

function renderExerciseDetail(exerciseId) {
  // This function is already correct and does not need to be changed.
  // ... (The full, detailed render function from our previous steps goes here) ...
}

function displaySessions(data) {
  // This function is already correct and does not need to be changed.
  // ...
}

document.addEventListener('DOMContentLoaded', () => {
  // This function is already correct and does not need to be changed.
  // ...
});
