/**
 * ============================================================================
 * PROJEKTDATA / PROJEKTREGISTER FÖR HÅKAN.COM
 * ============================================================================
 * 
 * Här lägger du enkelt till nya projekt, undersidor och externa webbplatser.
 * Varje objekt i listan genererar automatiskt ett snyggt projektkort på förstasidan!
 * 
 * FÄLT SOM KAN ANVÄNDAS:
 * - id:           Unikt id för projektet (t.ex. 'matematik-2a')
 * - title:        Projektets rubrik
 * - category:     Kategori ('Matematik', 'Kemi', 'AI & Verktyg', 'Webbresurser')
 * - description:  Kort och beskrivande text om projektet/verktyget
 * - icon:         Emoji eller ikon (t.ex. '📐', '🧪', '🤖', '⚡')
 * - url:          Länk till undersidan (t.ex. 'subpages/matematik-2a/index.html') eller extern URL ('https://kemi1.se')
 * - isExternal:   true om det är en extern länk (öppnas i ny flik), false om det är en intern sida
 * - badge:        Tagg-text på kortet (t.ex. 'Undersida', 'Extern länk', 'Interaktivt verktyg')
 * - badgeType:    'internal' eller 'external' (styr färgkodning)
 * - accentColor:  CSS-färg eller variabel för topplinjen (t.ex. 'var(--color-math)')
 * - tags:         Array med sökbara taggar (t.ex. ['Matematik 2a', 'Algebra', 'Gymnasiet'])
 * - featured:     true för att lyfta fram projektet lite extra
 */

const PROJECTS_DATA = [
  {
    id: 'matematik-1a-snabbtest',
    title: 'Matematik 1a – Modulbaserade Snabbtest',
    category: 'Matematik',
    description: 'Självrättande korta quiz delade per område (negativa tal, prioriteringsregler, bråk, algebra, formler/ekvationer) med direkt pedagogisk förklaring vid fel svar.',
    icon: '⚡',
    url: 'subpages/matematik-1a/index.html',
    isExternal: false,
    badge: 'Ny Repetitionsmodul',
    badgeType: 'internal',
    accentColor: 'var(--color-math)',
    tags: ['Matematik 1a', 'Quiz', 'Negativa tal', 'Algebra', 'Bråk', 'Ekvationer'],
    featured: true
  },
  {
    id: 'matematik-2a',
    title: 'Matematik 2a – Resurscenter',
    category: 'Matematik',
    description: 'En komplett resursportal för Matematik nivå 2a med interaktiva formelblad, lösningsguider, övningar och pedagogiska verktyg.',
    icon: '📐',
    url: 'subpages/matematik-2a/index.html',
    isExternal: false,
    badge: 'Interaktiv undersida',
    badgeType: 'internal',
    accentColor: 'var(--color-math)',
    tags: ['Matematik 2a', 'Algebra', 'Gymnasiet', 'Formler', 'Grafer'],
    featured: true
  },
  {
    id: 'kemi1-se',
    title: 'kemi1.se – Gymnasiekemi',
    category: 'Kemi',
    description: 'Huvudsidan för gymnasiets Kemi 1. Innehåller genomgångar, laborationshandledningar, begreppslistor och instuderingsfrågor.',
    icon: '🧪',
    url: 'https://kemi1.se',
    isExternal: true,
    badge: 'kemi1.se (Extern)',
    badgeType: 'external',
    accentColor: 'var(--color-chem)',
    tags: ['Kemi 1', 'Läromedel', 'Gymnasiet', 'Laborationer', 'Externt'],
    featured: true
  },
  {
    id: 'funktioner-grafer',
    title: 'Funktioner & Grafer (GeoGebra)',
    category: 'Matematik',
    description: 'Interaktiv verktygslåda med skjutreglage för y = kx + m och y = ax² + bx + c. Visar vändpunkter, lutning och nollställen med inbyggd GeoGebra grafräknare.',
    icon: '📉',
    url: 'subpages/matematik-2a/funktioner-grafer.html',
    isExternal: false,
    badge: 'GeoGebra & Reglage',
    badgeType: 'internal',
    accentColor: 'var(--color-ai)',
    tags: ['Räta linjen', 'Parabel', 'GeoGebra', 'Sliders', 'Graf'],
    featured: true
  },
  {
    id: 'pq-solver',
    title: 'PQ-formeln & Andragradslösare',
    category: 'Matematik',
    description: 'Interaktiv steg-för-steg-lösare för andragradsekvationer. Visar reella och komplexa rötter, diskriminantanalys samt dynamisk funktionsgraf.',
    icon: '⚡',
    url: 'subpages/matematik-2a/index.html#pq-solver',
    isExternal: false,
    badge: 'Matematikverktyg',
    badgeType: 'internal',
    accentColor: 'var(--color-math)',
    tags: ['PQ-formeln', 'Andragradsekvationer', 'Visualisering', 'Kalkylator'],
    featured: false
  },
  {
    id: 'periodiska-systemet',
    title: 'Periodiska Systemet – Digitalt',
    category: 'Kemi',
    description: 'Interaktiv utforskare av det periodiska systemet med elektronskal, atomradie, elektronegativitet och aggregationstillstånd.',
    icon: '⚛️',
    url: 'https://kemi1.se',
    isExternal: true,
    badge: 'kemi1.se / Verktyg',
    badgeType: 'external',
    accentColor: 'var(--color-chem)',
    tags: ['Periodiska systemet', 'Grundämnen', 'Elektroner', 'Kemi 1'],
    featured: false
  },
  {
    id: 'ai-pedagogik',
    title: 'AI & Studieassistans',
    category: 'AI & Verktyg',
    description: 'Samling av specialtränade prompter och AI-verktyg för att skapa individanpassade repetitionstester och matteuppgifter.',
    icon: '🤖',
    url: 'templates/subpage-template.html',
    isExternal: false,
    badge: 'AI-verktyg',
    badgeType: 'internal',
    accentColor: 'var(--color-ai)',
    tags: ['AI', 'Prompting', 'Studieteknik', 'Pedagogik'],
    featured: false
  },
  {
    id: 'enhetsomvandlare',
    title: 'Enhets- & Storhetsomvandlare',
    category: 'AI & Verktyg',
    description: 'Snabbt verktyg för att omvandla enheter inom substansmängd, molmassa, koncentration, SI-prefix och geometriska volymer.',
    icon: '🔄',
    url: 'templates/subpage-template.html',
    isExternal: false,
    badge: 'Verktygslåda',
    badgeType: 'internal',
    accentColor: 'var(--color-web)',
    tags: ['Enheter', 'Molaritet', 'SI-prefix', 'Kalkylator'],
    featured: false
  }
];

// Gör tillgänglig globalt
if (typeof window !== 'undefined') {
  window.PROJECTS_DATA = PROJECTS_DATA;
}
