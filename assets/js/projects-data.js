const RAW_PROJECTS = [
  {
    id: 'matematik-1a',
    title: 'Matematik 1a',
    category: 'Matematik',
    description: 'Interaktiva verktyg, övningar och formelsamlingar för gymnasiets Matematik 1a.',
    icon: '📐',
    url: 'subpages/matematik-1a/index.html',
    isExternal: false,
    badge: 'Ämnesportal',
    badgeType: 'internal',
    accentColor: 'var(--color-math)',
    tags: ['Matematik 1a', 'Procent', 'Algebra', 'Geometri']
  },
  {
    id: 'matematik-2a',
    title: 'Matematik 2a',
    category: 'Matematik',
    description: 'Steg-för-steg PQ-formellösare, parabelritare med Canvas och moduler för Matematik 2a.',
    icon: '📊',
    url: 'subpages/matematik-2a/index.html',
    isExternal: false,
    badge: 'Ämnesportal',
    badgeType: 'internal',
    accentColor: 'var(--color-math)',
    tags: ['Matematik 2a', 'PQ-formeln', 'Andragradsekvationer', 'Graf']
  },
  {
    id: 'kemi-1',
    title: 'kemi1.se',
    category: 'Kemi',
    description: 'Komplett läromedel och interaktiva övningar för Kemi 1 på gymnasiet.',
    icon: '🧪',
    url: 'https://kemi1.se',
    isExternal: true,
    badge: 'Extern länk',
    badgeType: 'external',
    accentColor: 'var(--color-chem)',
    tags: ['Kemi 1', 'Periodiska systemet', 'Stökiometri', 'Gymnasiet']
  },
  {
    id: 'traningsstudio',
    title: 'Träningsstudio – Mängdträning (E / C / A)',
    category: 'Matematik',
    description: 'Slumpa fram obegränsat med övningsuppgifter i Matematik 1a och 2a på E-, C- och A-nivå med direkt rättning och steg-för-steg-lösningar.',
    icon: '🎯',
    url: 'subpages/traningsstudio/index.html',
    isExternal: false,
    badge: 'Interaktivt verktyg',
    badgeType: 'internal',
    accentColor: 'var(--color-ai)',
    tags: ['Matematik 1a', 'Matematik 2a', 'Mängdträning', 'PQ-formeln', 'Ekvationer', 'Procent']
  },
  {
    id: 'acid-base-barista',
    title: 'The Acid/Base Barista – pH Lab Arcade',
    category: 'Spel & Labb',
    description: 'Interaktivt kemispel där du blandar syror, baser och buffertar i realtid. Utforska pH, BTB-indikator och kemisk jämvikt på molekylnivå.',
    icon: '🕹️',
    url: 'subpages/Spel/acidbasebarista.html',
    isExternal: false,
    badge: 'Vibe-kodat spel',
    badgeType: 'internal',
    accentColor: 'var(--color-web)',
    tags: ['Kemi 1', 'Spel', 'Syror & Baser', 'pH', 'Buffert', 'Simulering']
  }
];

// Förberäkna sökindex en gång vid laddning för O(1) strängmatchning per projekt vid sökning
export const PROJECTS_DATA = Object.freeze(
  RAW_PROJECTS.map((project) =>
    Object.freeze({
      ...project,
      tags: Object.freeze([...(project.tags || [])]),
      _searchIndex: [
        project.title,
        project.category,
        project.description,
        ...(project.tags || [])
      ]
        .join(' ')
        .toLowerCase()
    })
  )
);

export const CATEGORIES = Object.freeze([
  'Alla',
  ...new Set(RAW_PROJECTS.map((p) => p.category))
]);