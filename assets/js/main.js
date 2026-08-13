/**
 * ============================================================================
 * HÅKAN.COM - HUVUDSCRIPT (main.js)
 * Temahantering (Dark/Light), Dynamisk projektfiltrering, Sök & Interaktivitet
 * ============================================================================
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. TEMAHANTERING (LJUST / MÖRKT LÄGE)
  // --------------------------------------------------------------------------
  const THEME_STORAGE_KEY = 'hakan_site_theme';

  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Använd sparat tema, annars systeminställning, annars dark som standard
    const activeTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(activeTheme, false);

    // Lyssna på ändringar i operativsystemets tema om användaren inte valt manuellt
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(THEME_STORAGE_KEY)) {
        setTheme(e.matches ? 'dark' : 'light', false);
      }
    });

    // Koppla event till temaknappar
    document.querySelectorAll('.theme-toggle-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme, true);
      });
    });
  }

  function setTheme(theme, saveToStorage = true) {
    document.documentElement.setAttribute('data-theme', theme);
    if (saveToStorage) {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
    updateThemeToggleIcons(theme);
  }

  function updateThemeToggleIcons(theme) {
    const isDark = theme === 'dark';
    const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
    const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

    document.querySelectorAll('.theme-toggle-btn').forEach((btn) => {
      btn.innerHTML = isDark ? sunIcon : moonIcon;
      btn.setAttribute('aria-label', isDark ? 'Växla till ljust läge' : 'Växla till mörkt läge');
      btn.setAttribute('title', isDark ? 'Växla till ljust läge' : 'Växla till mörkt läge');
    });
  }

  // --------------------------------------------------------------------------
  // 2. DYNAMISK RENDERING & FILTRERING AV PROJEKT
  // --------------------------------------------------------------------------
  let currentCategory = 'Alla';
  let currentSearchQuery = '';

  function initProjectsHub() {
    const gridEl = document.getElementById('projects-grid');
    const filterPillsContainer = document.getElementById('filter-pills');
    const searchInput = document.getElementById('search-input');
    const resultsCountEl = document.getElementById('results-count');

    if (!gridEl || !window.PROJECTS_DATA) return;

    // Bygg filterknappar dynamiskt baserat på kategorier i datan
    buildCategoryFilters(filterPillsContainer);

    // Initial rendering
    renderProjects(gridEl, resultsCountEl);

    // Sök-lyssnare
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        currentSearchQuery = e.target.value.toLowerCase().trim();
        renderProjects(gridEl, resultsCountEl);
      });

      // Tangentbordsgenväg för snabbsök (/)
      window.addEventListener('keydown', (e) => {
        const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
        const isEditing = activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select' || document.activeElement.isContentEditable;
        
        if (e.key === '/' && !isEditing) {
          e.preventDefault();
          searchInput.focus();
        } else if (e.key === 'Escape' && document.activeElement === searchInput) {
          searchInput.value = '';
          currentSearchQuery = '';
          searchInput.blur();
          renderProjects(gridEl, resultsCountEl);
        }
      });
    }
  }

  function buildCategoryFilters(container) {
    if (!container) return;

    // Räkna antal i varje kategori
    const categoryCounts = { 'Alla': window.PROJECTS_DATA.length };
    window.PROJECTS_DATA.forEach(p => {
      categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
    });

    const categories = ['Alla', ...Object.keys(categoryCounts).filter(c => c !== 'Alla')];

    container.innerHTML = categories.map(cat => {
      const isActive = cat === currentCategory ? 'active' : '';
      const count = categoryCounts[cat] || 0;
      return `
        <button class="filter-btn ${isActive}" data-category="${escapeHtml(cat)}">
          <span>${escapeHtml(cat)}</span>
          <span class="filter-count">${count}</span>
        </button>
      `;
    }).join('');

    // Koppla klickevent på filterknappar
    container.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.getAttribute('data-category');
        const gridEl = document.getElementById('projects-grid');
        const resultsCountEl = document.getElementById('results-count');
        renderProjects(gridEl, resultsCountEl);
      });
    });
  }

  function renderProjects(gridEl, countEl) {
    if (!gridEl) return;

    const filtered = window.PROJECTS_DATA.filter(project => {
      // 1. Kategorimatchning
      const matchCategory = currentCategory === 'Alla' || project.category === currentCategory;

      // 2. Sökmatchning
      const matchSearch = !currentSearchQuery || (
        project.title.toLowerCase().includes(currentSearchQuery) ||
        project.description.toLowerCase().includes(currentSearchQuery) ||
        project.category.toLowerCase().includes(currentSearchQuery) ||
        (project.tags && project.tags.some(t => t.toLowerCase().includes(currentSearchQuery)))
      );

      return matchCategory && matchSearch;
    });

    // Uppdatera räknare
    if (countEl) {
      countEl.textContent = `Visar ${filtered.length} av ${window.PROJECTS_DATA.length} resurser`;
    }

    if (filtered.length === 0) {
      gridEl.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🔍</div>
          <h3>Inga projekt matchar din sökning</h3>
          <p style="color: var(--text-secondary); margin-top: 0.5rem;">
            Testa ett annat sökord eller välj kategorin "Alla" ovan.
          </p>
        </div>
      `;
      return;
    }

    gridEl.innerHTML = filtered.map(project => {
      const isExt = project.isExternal;
      const targetAttr = isExt ? 'target="_blank" rel="noopener noreferrer"' : '';
      const actionText = isExt ? 'Besök webbplats ↗' : 'Öppna verktyg →';
      const badgeClass = project.badgeType === 'external' ? 'card-badge external' : 'card-badge internal';

      const tagsHtml = (project.tags || []).map(t => `<span class="tag-item">#${escapeHtml(t)}</span>`).join('');

      return `
        <a href="${escapeHtml(project.url)}" ${targetAttr} class="project-card" style="--card-accent: ${project.accentColor || 'var(--accent-primary)'};" id="card-${project.id}">
          <div class="card-header">
            <div class="card-icon-box">${project.icon || '📌'}</div>
            <span class="${badgeClass}">
              ${escapeHtml(project.badge || project.category)}
            </span>
          </div>

          <h3 class="card-title">
            ${escapeHtml(project.title)}
          </h3>

          <p class="card-desc">
            ${escapeHtml(project.description)}
          </p>

          <div class="card-footer">
            <div class="card-tags">
              ${tagsHtml}
            </div>
            <span class="card-action-btn">
              ${actionText}
            </span>
          </div>
        </a>
      `;
    }).join('');
  }

  // Hjälpfunktion för att förhindra XSS i text
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // --------------------------------------------------------------------------
  // INITIERING VID SIDLADDNING
  // --------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initProjectsHub();
  });

  // Exportera tema-funktioner globalt för undersidor
  window.HakanPortal = {
    setTheme,
    initTheme
  };

})();
