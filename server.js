const express = require('express');
const path = require('path');
const cases = require('./data/cases.json');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Helper: unique values for filters
function unique(arr, key) {
  return [...new Set(arr.map(c => c[key]).flat())].sort();
}

// GET / — main listing with optional filters
app.get('/', (req, res) => {
  const { category, complexity, impact, tech, quickWin, q } = req.query;

  let filtered = [...cases];

  if (category) filtered = filtered.filter(c => c.category === category);
  if (complexity) filtered = filtered.filter(c => c.complexity === complexity);
  if (impact) filtered = filtered.filter(c => c.impact === impact);
  if (tech) filtered = filtered.filter(c => c.technologies.includes(tech));
  if (quickWin === 'true') filtered = filtered.filter(c => c.quickWin === true);
  if (q) {
    const term = q.toLowerCase();
    filtered = filtered.filter(c =>
      c.title.toLowerCase().includes(term) ||
      c.description.toLowerCase().includes(term) ||
      c.tags.some(t => t.toLowerCase().includes(term))
    );
  }

  const filters = {
    categories: unique(cases, 'category'),
    complexities: ['Baja', 'Media', 'Alta'],
    impacts: ['Bajo', 'Medio', 'Alto'],
    technologies: unique(cases, 'technologies'),
  };

  res.render('index', {
    cases: filtered,
    total: cases.length,
    filters,
    active: { category, complexity, impact, tech, quickWin, q }
  });
});

// GET /case/:id — detail view
app.get('/case/:id', (req, res) => {
  const c = cases.find(c => c.id === req.params.id);
  if (!c) return res.status(404).render('404');
  res.render('detail', { item: c });
});

// GET /api/cases — JSON API
app.get('/api/cases', (req, res) => {
  res.json({ total: cases.length, cases });
});

// GET /api/stats — summary stats
app.get('/api/stats', (req, res) => {
  const stats = {
    total: cases.length,
    quickWins: cases.filter(c => c.quickWin).length,
    byCategory: {},
    byComplexity: {},
    byImpact: {},
    byTechnology: {}
  };

  cases.forEach(c => {
    stats.byCategory[c.category] = (stats.byCategory[c.category] || 0) + 1;
    stats.byComplexity[c.complexity] = (stats.byComplexity[c.complexity] || 0) + 1;
    stats.byImpact[c.impact] = (stats.byImpact[c.impact] || 0) + 1;
    c.technologies.forEach(t => {
      stats.byTechnology[t] = (stats.byTechnology[t] || 0) + 1;
    });
  });

  res.json(stats);
});

app.listen(PORT, () => {
  console.log(`Regulatory Cases running on http://localhost:${PORT}`);
});
