const API_URL = "https://script.google.com/a/macros/youthbankinternational.org/s/AKfycbw7yrHpVKHY3R2jX1QszH5eT6ixW6kQ5TmrR7pQCiT3_NA304KQIbz06R4oPq_I3aJn/exec?callback=displaySessions";

let allSessions = [];

function renderExerciseList(phaseName) {
  const exerciseListView = document.getElementById('exercise-list-view');
  const exerciseDetailView = document.getElementById('exercise-detail-view');
  
  const sessionsInPhase = allSessions.filter(session => {
    return session.PHASE && session.PHASE.toLowerCase() === phaseName.toLowerCase();
  });

  let html = `<h2>${phaseName}</h2><a href="/YouthBank-pwa/">&laquo; Back to YouthBank Cycle</a>`;
  
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
        <div class="card" ${backgroundStyle}>
          <h3>${iconHtml}<a href="sessions.html?exercise=${exerciseId}">${title}</a></h3>
          <p><em>${rationale}</em></p>
          <hr>
          <p><strong>Challenge:</strong> ${challenge}</p>
          <p><strong>Time:</strong> ${time} minutes</p>
          <p><strong>Materials:</strong> ${materials}</p>
          <a href="sessions.html?exercise=${exerciseId}" style="display:block; margin-top:1em;"><strong>Click to see more details</strong></a>
        </div>
      `;
    });
  }

  exerciseListView.innerHTML = html;
  exerciseListView.style.display = 'block';
  exerciseDetailView.style.display = 'none';
}

function renderExerciseDetail(exerciseId) {
  const exerciseListView = document.getElementById('exercise-list-view');
  const exerciseDetailView = document.getElementById('exercise-detail-view');
  
  const session = allSessions.find(s => s['Exercise number'] === exerciseId);
  
  if (!session) {
    exerciseDetailView.innerHTML = '<h2>Exercise not found</h2><a href="/YouthBank-pwa/">&laquo; Back to YouthBank Cycle</a>';
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
    window.location.href = '/YouthBank-pwa/';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const sessionList = document.getElementById('session-list') || document.getElementById('exercise-list-view') || document.getElementById('exercise-detail-view');
  sessionList.innerHTML = '<p>Loading sessions...</p>';

  const script = document.createElement('script');
  
  // The data URL still includes the callback
  const dataUrl = "YOUR_LATEST_APPS_SCRIPT_URL?callback=displaySessions";
  script.src = dataUrl;
  
  script.onerror = () => {
    // --- THIS IS THE NEW LOGIN PROMPT ---
    // The login URL does NOT include the callback
    const loginUrl = "YOUR_LATEST_APPS_SCRIPT_URL";
    
    sessionList.innerHTML = `
      <div class="login-prompt">
        <h2>Access Denied</h2>
        <p>Please sign in with your YouthBank International Google account to view the session plans.</p>
        <a href="${loginUrl}" class="login-button">Sign in with Google</a>
        <p class="small-text">You will be redirected back to the app after signing in.</p>
      </div>
    `;
  };
  
  document.body.appendChild(script);
});

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
