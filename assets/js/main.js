import { PROJECTS_DATA, CATEGORIES } from './projects-data.js?v=2';

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
  const label = isDark ? 'Byt till ljust tema' : 'Byt till mörkt tema';
  dom.themeToggleBtn.setAttribute('aria-label', label);
  dom.themeToggleBtn.setAttribute('title', label);
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
    emptyState.innerHTML = `
      <div class="empty-state-icon" aria-hidden="true">🔍</div>
      <p>Inga resurser matchade din sökning.</p>
      <button type="button" class="filter-btn clear-filters-btn" style="margin-top: 1rem;">
        Rensa filter och sökning
      </button>
    `;
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
  // 0. Event Delegation för "Rensa filter"-knapp i empty state
  dom.grid?.addEventListener('click', (e) => {
    const clearBtn = e.target.closest('.clear-filters-btn');
    if (!clearBtn) return;

    state.searchQuery = '';
    state.activeCategory = 'Alla';
    if (dom.searchInput) dom.searchInput.value = '';
    updateFilterPillStates();
    renderProjects();
    if (dom.searchInput) dom.searchInput.focus();
  });

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
    const label = nextState ? 'Stäng meny' : 'Öppna meny';
    dom.mobileNavToggle.setAttribute('aria-label', label);
    dom.mobileNavToggle.setAttribute('title', label);
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
   TVÅSTEGSMENY (Global huvudmeny + kontextuell kursmeny på samtliga sidor)
   ========================================================================== */

function getSiteRootPrefix() {
  const path = window.location.pathname.replace(/\\/g, '/');
  if (path.includes('/subpages/')) {
    const after = path.split('/subpages/')[1] || '';
    const depth = after.split('/').length; // t.ex. 'matematik-2a/index.html' -> 2 -> '../../'
    return '../'.repeat(depth);
  }
  if (path.includes('/templates/')) {
    return '../';
  }
  return '';
}

function getActiveSectionInfo() {
  const path = window.location.pathname.replace(/\\/g, '/').toLowerCase();
  if (path.includes('/subpages/matematik-1a')) {
    return { main: 'ma1a', sub: 'overview' };
  }
  if (path.includes('/subpages/matematik-2a')) {
    const file = path.split('/').pop() || 'index.html';
    return { main: 'ma2a', sub: file === '' ? 'index.html' : file };
  }
  if (path.includes('/subpages/traningsstudio')) {
    return { main: 'studio', sub: 'studio' };
  }
  return { main: 'home', sub: '' };
}

function buildSubNavbar(prefix, section) {
  if (section.main !== 'ma2a' && section.main !== 'ma1a') {
    return null;
  }

  const subNav = document.createElement('nav');
  subNav.className = 'sub-navbar';

  // Steg 2: Kursmeny för Matematik 2a
  if (section.main === 'ma2a') {
    subNav.setAttribute('aria-label', 'Kursmeny för Matematik 2a');
    const ma2aBase = `${prefix}subpages/matematik-2a/`;
    const items = [
      { file: 'index.html', label: '📚 Översikt' },
      { divider: true },
      { file: 'modul-1.html', label: '1. Algebra & Funktioner' },
      { file: 'modul-2.html', label: '2. Räta linjen & System' },
      { file: 'modul-3.html', label: '3. Potenser & PQ' },
      { file: 'modul-4.html', label: '4. Geometri & Statistik' },
      { divider: true },
      { file: 'pq-formeln.html', label: '⚡ PQ-Lösare' },
      { file: 'funktioner-grafer.html', label: '📉 Grafer & GeoGebra' }
    ];

    const listHtml = items.map(item => {
      if (item.divider) {
        return `<li class="sub-nav-divider" aria-hidden="true"></li>`;
      }
      const isActive = section.sub === item.file;
      const activeClass = isActive ? ' active' : '';
      const ariaCurrent = isActive ? ' aria-current="page"' : '';
      return `<li><a href="${ma2aBase}${item.file}" class="sub-nav-link${activeClass}"${ariaCurrent}>${item.label}</a></li>`;
    }).join('');

    subNav.innerHTML = `
      <div class="container sub-navbar-inner">
        <span class="sub-navbar-label">📊 Matematik 2a</span>
        <ul class="sub-navbar-links">
          ${listHtml}
        </ul>
      </div>
    `;
    return subNav;
  }

  // Steg 2: Kursmeny för Matematik 1a
  if (section.main === 'ma1a') {
    subNav.setAttribute('aria-label', 'Kursmeny för Matematik 1a');
    subNav.innerHTML = `
      <div class="container sub-navbar-inner">
        <span class="sub-navbar-label">📐 Matematik 1a</span>
        <ul class="sub-navbar-links">
          <li>
            <a href="${prefix}subpages/matematik-1a/index.html" class="sub-nav-link active" aria-current="page">🧠 Modulbaserade Snabbtest (1–6)</a>
          </li>
          <li class="sub-nav-divider" aria-hidden="true"></li>
          <li>
            <a href="${prefix}subpages/traningsstudio/index.html" class="sub-nav-link">🎯 Mängdträna Ma 1a i Träningsstudion ➔</a>
          </li>
        </ul>
      </div>
    `;
    return subNav;
  }

  return null;
}

function initSharedNavigation() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const prefix = getSiteRootPrefix();
  const section = getActiveSectionInfo();

  // Uppdatera logotypens länk och badge så att den är konsekvent överallt
  const brandLogo = header.querySelector('.brand-logo');
  if (brandLogo) {
    brandLogo.href = `${prefix}index.html`;
    const badge = brandLogo.querySelector('.brand-badge');
    if (badge) badge.textContent = 'PORTAL';
  }

  // Säkerställ att mobilmeny-knappen finns i nav-group (t.ex. i Träningsstudion)
  const navGroup = header.querySelector('.nav-group');
  const navList = header.querySelector('.nav-links');
  if (navGroup && navList) {
    navList.id = 'primary-navigation';

    if (!header.querySelector('.mobile-nav-toggle')) {
      const toggleBtn = document.createElement('button');
      toggleBtn.type = 'button';
      toggleBtn.className = 'mobile-nav-toggle';
      toggleBtn.id = 'mobile-nav-toggle';
      toggleBtn.setAttribute('aria-label', 'Öppna meny');
      toggleBtn.setAttribute('title', 'Öppna meny');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.setAttribute('aria-controls', 'primary-navigation');
      toggleBtn.innerHTML = `
        <svg class="hamburger-icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
        <svg class="close-icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24" hidden>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      `;
      navGroup.insertBefore(toggleBtn, navList);
      dom.mobileNavToggle = toggleBtn;
    }

    // Update existing mobile nav toggle title if it was hardcoded without one
    if (dom.mobileNavToggle) {
      if (!dom.mobileNavToggle.getAttribute('title')) {
        dom.mobileNavToggle.setAttribute('title', dom.mobileNavToggle.getAttribute('aria-label') || 'Öppna meny');
      }
    }

    // Bygg enhetlig Steg 1-huvudmeny
    navList.innerHTML = `
      <li>
        <a href="${prefix}index.html" class="nav-link${section.main === 'home' ? ' active' : ''}"${section.main === 'home' ? ' aria-current="page"' : ''}>
          <span aria-hidden="true">🏠</span> Startsida
        </a>
      </li>
      <li class="nav-divider" aria-hidden="true"></li>
      <li>
        <a href="${prefix}subpages/matematik-1a/index.html" class="nav-link${section.main === 'ma1a' ? ' active' : ''}"${section.main === 'ma1a' ? ' aria-current="page"' : ''}>
          <span aria-hidden="true">📐</span> Matematik 1a
        </a>
      </li>
      <li>
        <a href="${prefix}subpages/matematik-2a/index.html" class="nav-link${section.main === 'ma2a' ? ' active' : ''}"${section.main === 'ma2a' ? ' aria-current="page"' : ''}>
          <span aria-hidden="true">📊</span> Matematik 2a
        </a>
      </li>
      <li class="nav-divider" aria-hidden="true"></li>
      <li>
        <a href="${prefix}subpages/traningsstudio/index.html" class="nav-link nav-link-tool${section.main === 'studio' ? ' active' : ''}"${section.main === 'studio' ? ' aria-current="page"' : ''}>
          <span aria-hidden="true">🎯</span> Träningsstudio
        </a>
      </li>
      <li class="nav-divider" aria-hidden="true"></li>
      <li>
        <a href="https://kemi1.se" target="_blank" rel="noopener noreferrer" class="nav-link nav-link-external">
          <span aria-hidden="true">🧪</span> kemi1.se <span class="nav-external-arrow" aria-hidden="true">↗</span>
          <span class="sr-only">(öppnas i ny flik)</span>
        </a>
      </li>
      <li class="mobile-only-link">
        <a href="https://ko-fi.com/lararehakan" target="_blank" rel="noopener noreferrer" class="nav-link kofi-nav-item">
          <span aria-hidden="true">☕</span> Stöd på Ko-fi <span aria-hidden="true">↗</span>
          <span class="sr-only">(öppnas i ny flik)</span>
        </a>
      </li>
      <li class="mobile-only-link">
        <a href="mailto:stark@xn--hkan-qoa.com" class="nav-link">
          <span aria-hidden="true">✉</span> Kontakt
        </a>
      </li>
    `;
    dom.navLinks = navList;
  }

  // Lägg till Steg 2 (Sekundär kursmeny) om sådan inte redan finns
  if (!header.querySelector('.sub-navbar')) {
    const subNav = buildSubNavbar(prefix, section);
    if (subNav) {
      header.appendChild(subNav);
    }
  }
}

/* ==========================================================================
   INITIERING
   ========================================================================== */

function init() {
  initSharedNavigation();
  renderThemeButton();
  renderFilterPills();
  renderProjects();
  initEventListeners();
}

init();