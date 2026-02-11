const svg = document.getElementById('triad-svg');
const dot = document.getElementById('triad-dot');
const btn = document.getElementById('submit-btn');

// Triangle Points (Matches SVG coordinates in triad.html)
const A = { x: 60, y: 10 };   // Head
const B = { x: 110, y: 96 };  // Heart
const C = { x: 10, y: 96 };   // Hands

let isDragging = false;

function updateUI(wA, wB, wC) {
    const head = Math.round(wA * 100);
    const heart = Math.round(wB * 100);
    const hands = Math.round(wC * 100);

    // Update the percentage text labels
    document.getElementById('val-head').innerText = `${head}%`;
    document.getElementById('val-heart').innerText = `${heart}%`;
    document.getElementById('val-hands').innerText = `${hands}%`;

    // Update the Dot position using the weights
    const dotX = A.x * wA + B.x * wB + C.x * wC;
    const dotY = A.y * wA + B.y * wB + C.y * wC;
    dot.setAttribute('cx', dotX);
    dot.setAttribute('cy', dotY);
}

function handleInteraction(e) {
    if (!isDragging) return;
    const rect = svg.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;
    
    // Convert screen pixels to SVG internal coordinates (0-120 range)
    const svgX = (x / rect.width) * 120;
    const svgY = (y / rect.height) * 106;

    // Barycentric Calculation (Math to keep the dot inside the triangle)
    const det = (B.y - C.y) * (A.x - C.x) + (C.x - B.x) * (A.y - C.y);
    let l1 = ((B.y - C.y) * (svgX - C.x) + (C.x - B.x) * (svgY - C.y)) / det;
    let l2 = ((C.y - A.y) * (svgX - C.x) + (A.x - C.x) * (svgY - C.y)) / det;
    
    // Clamp values so you can't drag the dot outside the lines
    l1 = Math.max(0, Math.min(1, l1));
    l2 = Math.max(0, Math.min(1, l2));
    let l3 = 1 - l1 - l2;
    if (l3 < 0) { l3 = 0; const total = l1 + l2; l1 /= total; l2 /= total; }

    updateUI(l1, l2, l3);
}

// Mouse and Touch listeners
svg.addEventListener('mousedown', () => isDragging = true);
svg.addEventListener('touchstart', (e) => { isDragging = true; e.preventDefault(); }, {passive: false});
window.addEventListener('mousemove', handleInteraction);
window.addEventListener('touchmove', handleInteraction, {passive: false});
window.addEventListener('mouseup', () => isDragging = false);
window.addEventListener('touchend', () => isDragging = false);

// Demo submission feedback
btn.addEventListener('click', () => {
    btn.innerText = "✓ Saved to Demo";
    btn.style.backgroundColor = "#10b981"; // Emerald green
    setTimeout(() => {
        btn.innerText = "Submit Signifier";
        btn.style.backgroundColor = ""; // Reset
    }, 2000);
});