import{g as B,a as S}from"./index-Bh-FZW06.js";const N="https://get-yb-learning-999854663085.europe-west2.run.app",P=B(),T=P.currentUser;let w=[];T?C(T):(console.error("sessions.js was loaded, but no user is signed in. Auth guard may have failed."),document.body.innerHTML="<h1>Authentication Error: User not found.</h1>");async function C(o){const n=document.getElementById("exercise-list-view")||document.getElementById("exercise-detail-view");n.innerHTML="<p>Loading sessions...</p>";try{const t=await S(o),e=await fetch(N,{headers:{Authorization:`Bearer ${t}`}});if(!e.ok)throw new Error(`Network response was not ok: ${e.statusText}`);const i=await e.json();A(i)}catch(t){console.error("Error fetching data:",t),n.innerHTML="<p><strong>Failed to load sessions.</strong> Please try refreshing the page.</p>"}}function A(o){w=o;const n=new URLSearchParams(window.location.search),t=n.get("phase"),e=n.get("exercise");e?D(e):t?M(t):window.location.href="index.html"}function M(o){const n=document.getElementById("exercise-list-view"),t=document.getElementById("exercise-detail-view"),e=w.filter(s=>s.PHASE&&s.PHASE.toLowerCase()===o.toLowerCase());let i=`<h2>${o}</h2><a href="index.html">&laquo; Back to YouthBank Cycle</a>`;e.length===0?i+="<p>No exercises found for this phase. Please check the data in the Google Sheet.</p>":e.forEach(s=>{const c=s.Exercise||"No Title",l=s["The Challenge"]||"Not provided.",d=s.Rationale||"Not provided.",u=s.Time||"Not specified",f=s.Materials||"Not specified.",$=s["Exercise number"],h=s["Step IC"],p=s["Phase BG"],g=h?`<img src="${h}" alt="Icon" class="card-icon">`:"",m=p?`style="background-image: linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url(${p});"`:"";i+=`
  <a href="sessions.html?exercise=${$}" class="card-link-wrapper">
    <div class="card" ${m}>
      <h3>${g}${c}</h3>
      <p><em>${d}</em></p>
      <hr>
      <p><strong>Challenge:</strong> ${l}</p>
      <p><strong>Time:</strong> ${u} minutes</p>
      <p><strong>Materials:</strong> ${f}</p>
    </div>
  </a>
`}),n.innerHTML=i,n.style.display="block",t.style.display="none"}function D(o){const n=document.getElementById("exercise-list-view"),t=document.getElementById("exercise-detail-view"),e=w.find(r=>r["Exercise number"]===o);if(!e){t.innerHTML='<h2>Exercise not found</h2><a href="index.html">&laquo; Back to YouthBank Cycle</a>',n.style.display="none",t.style.display="block";return}const i=e.Exercise||"No Title",s=e.Rationale||"Not provided.",c=e["Desired outcome"]||"",l=e.Debrief||"",d=e.Alternate||"",u=e.Time||"Not specified",f=e.Materials||"Not specified.",$=e["The Challenge"]||"Not provided.",h=e.Preparation||"",p=e["What to do"]||"",g=e.PHASE,m=e["Phase BG"],x=e["Step IC"],k=x?`<img src="${x}" alt="Icon" class="detail-icon">`:"",y=(r,H)=>{let b="";for(let a=1;a<=H;a++)e[r+a+"T"]&&e[r+a]&&(b+=`<li><a href="${e[r+a]}" target="_blank">${e[r+a+"T"]}</a></li>`);return b?`<h4>${r}</h4><ul>${b}</ul>`:""},E=y("Resources",5),v=y("Information Sheets",5),I=y("Templates",5);let L=`
    <div class="detail-card" ${m?`style="background-image: linear-gradient(rgba(255,255,255,0.92), rgba(255,255,255,0.92)), url(${m});"`:""}>
      <a href="sessions.html?phase=${encodeURIComponent(g)}">&laquo; Back to ${g}</a>
      <div class="detail-header">
        <h2>${k}${i}</h2>
      </div>
      <div class="detail-body">
        <p><strong>Time:</strong> ${u} minutes</p>
        <p><strong>Materials:</strong> ${f}</p>
        <hr>
        <h3>Rationale</h3>
        <p>${s}</p>
        <h3>The Challenge</h3>
        <p>${$}</p>
        ${c?`<h3>Desired outcome</h3><p>${c}</p>`:""}
        <h3>Preparation</h3>
        <p>${h.replace(/\n/g,"<br>")}</p>
        <h3>What to do</h3>
        <p>${p.replace(/\n/g,"<br>")}</p>
        ${l?`<h3>Debrief</h3><p>${l.replace(/\n/g,"<br>")}</p>`:""}
        ${d?`<h3>Alternate</h3><p>${d.replace(/\n/g,"<br>")}</p>`:""}
        ${E}
        ${v}
        ${I}
      </div>
    </div>
  `;t.innerHTML=L,n.style.display="none",t.style.display="block"}
