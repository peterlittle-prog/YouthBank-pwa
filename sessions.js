const API_URL = "https://get-yb-learning-999854663085.europe-west2.run.app";

let allSessions = [];

// This function renders the list of cards for a phase. It is complete.
function renderExerciseList(phaseName) {
  const exerciseListView = document.getElementById('exercise-list-view');
  const exerciseDetailView = document.getElementById('exercise-detail-view');
  
  const sessionsInPhase = allSessions.filter(session => {
    return session.PHASE && session.PHASE.toLowerCase() === phaseName.toLowerCase();
  });

  let html = `<h2>${phaseName}</h2><a href="index.html">&laquo; Back to YouthBank Cycle</a>`;
  
  if (sessionsInPhase.length === 0) {
    html += '<p>No exercises found for this phase. Please check the data in the Google Sheet.</p>';
  } else {
    sessionsInPhase.forEach(session => {
      const title = session.Exercise || 'No Title';
      const challenge = session['The Challenge'] || 'Not provided.';
      const rationale = session.Rationale || 'Not provided.';
      const time = session.Time || 'Not specified';
      const materials = session.Materials || 'Not specified.';
      const exerciseId = session['Exercise number'];
      const iconUrl = session['Step IC'];
      const bgImage = session['Phase BG'];

      const iconHtml = iconUrl ? `<img src="${iconUrl}" alt="Icon" class="card-icon">` : '';
      const backgroundStyle = bgImage ? `style="background-image: linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url(${bgImage});"` : '';

    html += `
  <a href="sessions.html?exercise=${exerciseId}" class="card-link-wrapper">
    <div class="card" ${backgroundStyle}>
      <h3>${iconHtml}${title}</h3>
      <p><em>${rationale}</em></p>
      <hr>
      <p><strong>Challenge:</strong> ${challenge}</p>
      <p><strong>Time:</strong> ${time} minutes</p>
      <p><strong>Materials:</strong> ${materials}</p>
    </div>
  </a>
`;
    });
  }

  exerciseListView.innerHTML = html;
  exerciseListView.style.display = 'block';
  exerciseDetailView.style.display = 'none';
}

// This function renders the full detail page. It is complete.
function renderExerciseDetail(exerciseId) {
  const exerciseListView = document.getElementById('exercise-list-view');
  const exerciseDetailView = document.getElementById('exercise-detail-view');
  
  const session = allSessions.find(s => s['Exercise number'] === exerciseId);
  
  if (!session) {
    exerciseDetailView.innerHTML = '<h2>Exercise not found</h2><a href="index.html">&laquo; Back to YouthBank Cycle</a>';
    exerciseListView.style.display = 'none';
    exerciseDetailView.style.display = 'block';
    return;
  }
  
  const title = session.Exercise || 'No Title';
  const rationale = session.Rationale || 'Not provided.';
  const desiredOutcome = session['Desired outcome'] || '';
  const debrief = session.Debrief || '';
  const alternate = session.Alternate || '';
  const time = session.Time || 'Not specified';
  const materials = session.Materials || 'Not specified.';
  const challenge = session['The Challenge'] || 'Not provided.';
  const preparation = session.Preparation || '';
  const whatToDo = session['What to do'] || '';
  const phaseName = session.PHASE;
  
  const bgImage = session['Phase BG'];
  const iconUrl = session['Step IC'];

  const iconHtml = iconUrl ? `<img src="${iconUrl}" alt="Icon" class="detail-icon">` : '';

  const buildResourceList = (cat, count) => {
    let listHtml = '';
    for (let i = 1; i <= count; i++) {
      if (session[cat + i + 'T'] && session[cat + i]) {
        listHtml += `<li><a href="${session[cat + i]}" target="_blank">${session[cat + i + 'T']}</a></li>`;
      }
    }
    return listHtml ? `<h4>${cat}</h4><ul>${listHtml}</ul>` : '';
  };
  
  const resourcesHtml = buildResourceList('Resources', 5);
  const infoSheetsHtml = buildResourceList('Information Sheets', 5);
  const templatesHtml = buildResourceList('Templates', 5);

  const backgroundStyle = bgImage ? `style="background-image: linear-gradient(rgba(255,255,255,0.92), rgba(255,255,255,0.92)), url(${bgImage});"` : '';

  let html = `
    <div class="detail-card" ${backgroundStyle}>
      <a href="sessions.html?phase=${encodeURIComponent(phaseName)}">&laquo; Back to ${phaseName}</a>
      <div class="detail-header">
        <h2>${iconHtml}${title}</h2>
      </div>
      <div class="detail-body">
        <p><strong>Time:</strong> ${time} minutes</p>
        <p><strong>Materials:</strong> ${materials}</p>
        <hr>
        <h3>Rationale</h3>
        <p>${rationale}</p>
        <h3>The Challenge</h3>
        <p>${challenge}</p>
        ${desiredOutcome ? `<h3>Desired outcome</h3><p>${desiredOutcome}</p>` : ''}
        <h3>Preparation</h3>
        <p>${preparation.replace(/\n/g, '<br>')}</p>
        <h3>What to do</h3>
        <p>${whatToDo.replace(/\n/g, '<br>')}</p>
        ${debrief ? `<h3>Debrief</h3><p>${debrief.replace(/\n/g, '<br>')}</p>` : ''}
        ${alternate ? `<h3>Alternate</h3><p>${alternate.replace(/\n/g, '<br>')}</p>` : ''}
        ${resourcesHtml}
        ${infoSheetsHtml}
        ${templatesHtml}
      </div>
    </div>
  `;
  
  exerciseDetailView.innerHTML = html;
  exerciseListView.style.display = 'none';
  exerciseDetailView.style.display = 'block';
}

// This is the global callback function for the JSONP request. It is complete.
function displaySessions(data) {
  if (data && data.error) {
    document.body.innerHTML = `<p><strong>Error from server:</strong> ${data.error}</p>`;
    return;
  }
  
  allSessions = data;
  
  const params = new URLSearchParams(window.location.search);
  const phaseName = params.get('phase');
  const exerciseId = params.get('exercise');
  
  if (exerciseId) {
    renderExerciseDetail(exerciseId);
  } else if (phaseName) {
    renderExerciseList(phaseName);
  } else {
    window.location.href = 'index.html';
  }
}

// --- THIS IS THE OTHER MAJOR CHANGE ---
// We are now using the modern 'fetch' method instead of the JSONP script tag.
document.addEventListener('DOMContentLoaded', () => {
  const sessionList = document.getElementById('session-list') || document.getElementById('exercise-list-view');
  sessionList.innerHTML = '<p>Loading sessions...</p>';

  fetch(API_URL)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      displaySessions(data);
    })
    .catch(error => {
      console.error('Error fetching session data:', error);
      sessionList.innerHTML = `<p><strong>Failed to load sessions.</strong> Please try refreshing the page.</p>`;
    });
});

// This is the service worker registration. It is complete.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch(err => {
        console.log('ServiceWorker registration failed: ', err);
      });
  });
}
