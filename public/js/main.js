// ── Stats panel ──────────────────────────────────────────
fetch('/api/stats')
  .then(r => r.json())
  .then(data => {
    const qwEl = document.getElementById('stat-qw');
    const highEl = document.getElementById('stat-high');
    if (qwEl) qwEl.textContent = data.quickWins;
    if (highEl) highEl.textContent = data.byImpact['Alto'] || 0;
  })
  .catch(() => {});

// ── Client-side sort ─────────────────────────────────────
const sortSelect = document.getElementById('sortSelect');
const grid = document.getElementById('casesGrid');

if (sortSelect && grid) {
  sortSelect.addEventListener('change', () => {
    const cards = [...grid.querySelectorAll('.card')];
    const order = { 'Alto': 3, 'Medio': 2, 'Bajo': 1, 'Baja': 3, 'Media': 2, 'Alta': 1 };

    cards.sort((a, b) => {
      const key = sortSelect.value;
      if (key === 'impact') {
        return (order[b.dataset.impact] || 0) - (order[a.dataset.impact] || 0);
      }
      if (key === 'complexity') {
        return (order[b.dataset.complexity] || 0) - (order[a.dataset.complexity] || 0);
      }
      if (key === 'quickWin') {
        return (b.dataset.quickwin === 'true' ? 1 : 0) - (a.dataset.quickwin === 'true' ? 1 : 0);
      }
      // default: id
      return a.dataset.id.localeCompare(b.dataset.id);
    });

    cards.forEach(c => grid.appendChild(c));
  });
}

// ── Auto-submit filters on select change ─────────────────
const filterForm = document.getElementById('filterForm');
if (filterForm) {
  filterForm.querySelectorAll('select').forEach(sel => {
    sel.addEventListener('change', () => filterForm.submit());
  });
  const qwCheck = filterForm.querySelector('input[type=checkbox]');
  if (qwCheck) {
    qwCheck.addEventListener('change', () => filterForm.submit());
  }
}
