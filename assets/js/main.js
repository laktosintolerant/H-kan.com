import { PROJECTS_DATA, CATEGORIES } from './projects-data.js';

const THEME_STORAGE_KEY = 'hakan_site_theme';

// Applikationstillstånd
const state = {
  activeCategory: 'Alla',
  searchQuery: '',
  theme: document.documentElement.getAttribute('data-theme') || 'dark'
};

// Cachelagrade DOM-referenser
const dom = {
  grid: document.getElementById('projects-grid'),
  filterPills: document.getElementById('filter-pills'),
  searchInput: document.getElementById('search-input'),
  resultsCount: document.getElementById('results-count'),
  themeToggleBtn: document.getElementById('theme-toggle-btn'),
  mobileNavToggle: document.getElementById('mobile-nav-toggle'),
  navLinks: document.getElementById('primary-navigation')
};

/* ==========================================================================
   HJÄLPFUNKTIONER (Prestanda)
   ========================================================================== */

function debounce(fn, delay = 120) {
  let timerId = null;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(...args), delay);
  };
}

/* ==========================================================================
   TEMAHANTERING
   ========================================================================== */

function renderThemeButton() {
  if (!dom.themeToggleBtn) return;
  const isDark = state.theme === 'dark';
  dom.themeToggleBtn.setAttribute('aria-pressed', String(isDark));
  dom.themeToggleBtn.setAttribute(
    'aria-label',
    isDark ? 'Byt till ljust tema' : 'Byt till mörkt tema'
  );
  dom.themeToggleBtn.textContent = isDark ? '☀️' : '🌙';
}

function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', state.theme);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, state.theme);
  } catch {
    // Ignorera om localStorage är blockerat
  }
  renderThemeButton();
}

/* ==========================================================================
   FILTER & KORTRENDERING (Ingen innerHTML-injektion, 1 samlad DOM-uppdatering)
   ========================================================================== */

function renderFilterPills() {
  if (!dom.filterPills) return;
  const fragment = document.createDocumentFragment();

  for (const category of CATEGORIES) {
    const btn = document.createElement('button');
    btn.type = 'button';
    const isActive = category === state.activeCategory;
    btn.className = `filter-pill${isActive ? ' active' : ''}`;
    btn.dataset.category = category;
    btn.setAttribute('aria-pressed', String(isActive));
    btn.textContent = category;
    fragment.appendChild(btn);
  }

  dom.filterPills.replaceChildren(fragment);
}

function updateFilterPillStates() {
  if (!dom.filterPills) return;
  const buttons = dom.filterPills.querySelectorAll('.filter-pill');
  for (const btn of buttons) {
    const isActive = btn.dataset.category === state.activeCategory;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', String(isActive));
  }
}

function createProjectCard(project) {
  const card = document.createElement('article');
  card.className = 'project-card';
  if (project.accentColor) {
    card.style.setProperty('--card-accent', project.accentColor);
  }

  // Header (Ikon + Badge)
  const header = document.createElement('div');
  header.className = 'card-header';

  const icon = document.createElement('span');
  icon.className = 'card-icon';
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = project.icon;

  const badge = document.createElement('span');
  badge.className = `card-badge badge-${project.badgeType}`;
  badge.textContent = project.badge;

  header.append(icon, badge);

  // Titel & Länk
  const title = document.createElement('h2');
  title.className = 'card-title';

  const link = document.createElement('a');
  link.href = project.url;
  link.className = 'card-link';
  link.textContent = project.title;

  if (project.isExternal) {
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    const srText = document.createElement('span');
    srText.className = 'sr-only';
    srText.textContent = ' (öppnas i ny flik)';
    link.appendChild(srText);
  }

  title.appendChild(link);

  // Beskrivning
  const desc = document.createElement('p');
  desc.className = 'card-description';
  desc.textContent = project.description;

  // Taggar
  const tagsList = document.createElement('ul');
  tagsList.className = 'card-tags';
  tagsList.setAttribute('aria-label', 'Taggar');

  for (const tag of project.tags) {
    const tagItem = document.createElement('li');
    tagItem.className = 'card-tag';
    tagItem.textContent = tag;
    tagsList.appendChild(tagItem);
  }

  card.append(header, title, desc, tagsList);
  return card;
}

function renderProjects() {
  if (!dom.grid || !dom.resultsCount) return;

  const normalizedQuery = state.searchQuery.trim().toLowerCase();

  const filtered = PROJECTS_DATA.filter((project) => {
    const matchesCategory =
      state.activeCategory === 'Alla' || project.category === state.activeCategory;
    const matchesSearch =
      normalizedQuery === '' || project._searchIndex.includes(normalizedQuery);
    return matchesCategory && matchesSearch;
  });

  // Uppdatera resultaträknare
  const count = filtered.length;
  dom.resultsCount.textContent =
    count === 1 ? 'Visar 1 resurs' : `Visar ${count} resurser`;

  // Bygg DOM i minnet via DocumentFragment (en enda reflow)
  const fragment = document.createDocumentFragment();

  if (count === 0) {
    const emptyState = document.createElement('div');
    emptyState.className = 'empty-state';
    emptyState.textContent = 'Inga resurser matchade din sökning.';
    fragment.appendChild(emptyState);
  } else {
    for (const project of filtered) {
      fragment.appendChild(createProjectCard(project));
    }
  }

  dom.grid.replaceChildren(fragment);
}

/* ==========================================================================
   EVENT LISTENERS (Delegerade & Optimerade)
   ========================================================================== */

function initEventListeners() {
  // 1. Event Delegation för filterknappar (endast 1 lyssnare för hela verktygsfältet)
  dom.filterPills?.addEventListener('click', (e) => {
    const pill = e.target.closest('.filter-pill');
    if (!pill) return;

    const selectedCategory = pill.dataset.category;
    if (selectedCategory && selectedCategory !== state.activeCategory) {
      state.activeCategory = selectedCategory;
      updateFilterPillStates(); // Uppdaterar endast attribut, bygger inte om knapparna
      renderProjects();
    }
  });

  // 2. Debounced sökning (undviker onödiga omrenderingar vid snabb inmatning)
  const handleSearch = debounce((value) => {
    state.searchQuery = value;
    renderProjects();
  }, 100);

  dom.searchInput?.addEventListener('input', (e) => {
    handleSearch(e.target.value);
  });

  // 3. Tangentbordsgenväg '/' för sökfokus (ignorerar om användaren redan skriver i ett fält)
  document.addEventListener('keydown', (e) => {
    const activeTag = document.activeElement?.tagName;
    const isInputFocused =
      activeTag === 'INPUT' ||
      activeTag === 'TEXTAREA' ||
      document.activeElement?.isContentEditable;

    if (e.key === '/' && !isInputFocused) {
      e.preventDefault();
      dom.searchInput?.focus();
    } else if (e.key === 'Escape' && document.activeElement === dom.searchInput) {
      if (dom.searchInput.value !== '') {
        dom.searchInput.value = '';
        state.searchQuery = '';
        renderProjects();
      } else {
        dom.searchInput.blur();
      }
    }
  });

  // 4. Temaväxlare
  dom.themeToggleBtn?.addEventListener('click', toggleTheme);

  // 5. Mobilnavigation med tillgänglighetsstöd (Escape stänger menyn)
  dom.mobileNavToggle?.addEventListener('click', () => {
    const isExpanded = dom.mobileNavToggle.getAttribute('aria-expanded') === 'true';
    const nextState = !isExpanded;
    dom.mobileNavToggle.setAttribute('aria-expanded', String(nextState));
    dom.mobileNavToggle.setAttribute(
      'aria-label',
      nextState ? 'Stäng meny' : 'Öppna meny'
    );
    dom.navLinks?.classList.toggle('is-open', nextState);

    const hamburgerIcon = dom.mobileNavToggle.querySelector('.hamburger-icon');
    const closeIcon = dom.mobileNavToggle.querySelector('.close-icon');
    if (hamburgerIcon && closeIcon) {
      hamburgerIcon.hidden = nextState;
      closeIcon.hidden = !nextState;
    }
  });
}

/* ==========================================================================
   INITIERING
   ========================================================================== */

function init() {
  renderThemeButton();
  renderFilterPills();
  renderProjects();
  initEventListeners();
}

init();