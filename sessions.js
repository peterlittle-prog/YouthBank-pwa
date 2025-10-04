const API_URL = "https://script.google.com/a/macros/youthbankinternational.org/s/AKfycbw7yrHpVKHY3R2jX1QszH5eT6ixW6kQ5TmrR7pQCiT3_NA304KQIbz06R4oPq_I3aJn/exec?callback=displaySessions";

let allSessions = [];

function renderExerciseList(phaseName) {
  const exerciseListView = document.getElementById('exercise-list-view');
  const exerciseDetailView = document.getElementById('exercise-detail-view');
  const sessionsInPhase = allSessions.filter(session => session.PHASE === phaseName);
  let html = `<h2>${phaseName}</h2><a href="/YouthBank-pwa/">&laquo; Back to YouthBank Cycle</a>`;
  sessionsInPhase.forEach(session => {
    const title = session.Exercise || 'No Title';
    const rationale = session.Rationale || 'Not provided.';
    const exerciseId = session['Exercise number'];
    html += `
      <div class="card-link">
        <a href="sessions.html?exercise=${exerciseId}">
          <h3>${title}</h3>
          <p>${rationale.substring(0, 150)}...</p>
          <p><em>Click to see more details</em></p>
        </a>
      </div>
    `;
  });
  exerciseListView.innerHTML = html;
  exerciseListView.style.display = 'block';
  exerciseDetailView.style.display = 'none';
}

function renderExerciseDetail(exerciseId) {
  const exerciseDetailView = document.getElementById('exercise-detail-view');
  const exerciseListView = document.getElementById('exercise-list-view');
  const session = allSessions.find(s => s['Exercise number'] === exerciseId);
  if (!session) { /* ... error handling ... */ }
  const phaseName = session.PHASE;
  // ... (The full, detailed render logic from our previous steps goes here) ...
  // This includes the title, rationale, materials, time, challenge, etc.
  // And the helper function for building resource links.
  // ...
  exerciseDetailView.innerHTML = `... your full detail HTML ...`;
  exerciseListView.style.display = 'none';
  exerciseDetailView.style.display = 'block';
}

function displaySessions(data) {
   console.log(data);
  if (data && data.error) { /* ... error handling ... */ }
  allSessions = data;
  const params = new URLSearchParams(window.location.search);
  const phaseName = params.get('phase');
  const exerciseId = params.get('exercise');
  if (exerciseId) {
    renderExerciseDetail(exerciseId);
  } else if (phaseName) {
    renderExerciseList(phaseName);
  } else {
    window.location.href = '/YouthBank-pwa/';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const script = document.createElement('script');
  script.src = API_URL;
  document.body.appendChild(script);
  script.onerror = () => { console.error('Failed to load sessions data.'); };
});
