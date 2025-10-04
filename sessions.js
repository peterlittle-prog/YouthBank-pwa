const API_URL = "https://script.google.com/a/macros/youthbankinternational.org/s/AKfycbw7yrHpVKHY3R2jX1QszH5eT6ixW6kQ5TmrR7pQCiT3_NA304KQIbz06R4oPq_I3aJn/exec?callback=displaySessions";
let allSessions = [];

// --- RENDER FUNCTIONS (No Phase List anymore) ---
function renderExerciseList(phaseName) { /* ... same as before ... */ }
function renderExerciseDetail(exerciseId) { /* ... same as before ... */ }

// --- MAIN ROUTER & DATA FETCHING ---
function displaySessions(data) {
  if (data && data.error) { /* ... same as before ... */ }
  allSessions = data;
  const params = new URLSearchParams(window.location.search);
  const phaseName = params.get('phase');
  const exerciseId = params.get('exercise');
  
  if (exerciseId) {
    renderExerciseDetail(exerciseId);
  } else if (phaseName) {
    renderExerciseList(phaseName);
  } else {
    // If no phase is specified, redirect back to the homepage
    window.location.href = '/YouthBank-pwa/';
  }
}

// Initial load
document.addEventListener('DOMContentLoaded', () => {
  const script = document.createElement('script');
  script.src = API_URL;
  document.body.appendChild(script);
  script.onerror = () => { console.error('Failed to load sessions data.'); };
});
