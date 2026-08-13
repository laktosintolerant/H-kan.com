# 🌐 Håkan.com – Projektportal & Samlingshemsida

En stilren, modern och modulär webbportal för alla dina digitala läromedel, matematikverktyg (t.ex. *Matematik 2a*), länkar till *kemi1.se* och framtida AI-skapade appar.

---

## ✨ Funktioner i grundstommen

- 🌓 **Ljust och Mörkt läge (Dark & Light Mode)** – Byter tema med mjuk övergång, sparar användarens val i `localStorage` och känner automatiskt av systeminställning (`prefers-color-scheme`).
- ⚡ **Blixtsnabb filtrering & sökning i realtid** – Filtrera på kategorier (*Matematik*, *Kemi*, *AI & Verktyg*) eller sök direkt med tangentbordsgenväg (`/`).
- 📱 **100% Responsiv design** – Perfekt anpassad för dator, surfplatta och mobil.
- 📐 **Färdig undersida för Matematik 2a** – Innehåller en interaktiv steg-för-steg PQ-formellösare, parabelritare med Canvas och formelsamling.
- 🚀 **Noll byggsteg (Zero-build)** – Körs direkt i valfri webbläsare eller publiceras enkelt på GitHub Pages, Netlify, Vercel eller One.com.

---

## 📁 Fil- och mappstruktur

```text
Håkan.com/
├── index.html                   # Huvudportalen (startsidan med hero, filter & kort)
├── README.md                    # Denna guide
├── assets/
│   ├── css/
│   │   └── style.css            # Komplett designsystem med alla CSS-variabler och teman
│   └── js/
│       ├── main.js              # Temahantering, sök, filter och kortrendering
│       └── projects-data.js     # Registret där du lägger till eller ändrar projekt
├── subpages/
│   └── matematik-2a/            # Exempel på undersida / ämnesportal
│       ├── index.html           # Matematik 2a huvudsida
│       ├── mat-style.css        # Matematikspecifik CSS
│       └── mat-solver.js        # PQ-beräknare och dynamisk graf
└── templates/
    └── subpage-template.html    # Färdig mall för nya AI-byggda verktyg
```

---

## 🛠️ Så lägger du till ett nytt projekt

### 1. Om det är en extern länk (som kemi1.se):
Öppna `assets/js/projects-data.js` och lägg till ett objekt i listan:

```javascript
{
  id: 'nytt-externt-projekt',
  title: 'Min Nya Webbsida',
  category: 'Kemi', // eller 'Matematik', 'AI & Verktyg', 'Webbresurser'
  description: 'Beskrivning av vad sidan innehåller...',
  icon: '🧪',
  url: 'https://min-externa-lank.se',
  isExternal: true,
  badge: 'Extern länk',
  badgeType: 'external',
  accentColor: 'var(--color-chem)',
  tags: ['Kemi', 'Laboration', 'Gymnasiet']
}
```

### 2. Om du vill skapa en ny interaktiv undersida / verktyg:
1. Kopiera filen `templates/subpage-template.html` till en ny undermapp, t.ex. `subpages/mitt-nya-verktyg/index.html`.
2. Be din AI koda verktyget (se promptmall nedan).
3. Lägg till projektet i `assets/js/projects-data.js`:

```javascript
{
  id: 'mitt-nya-verktyg',
  title: 'Mitt Nya Verktyg',
  category: 'AI & Verktyg',
  description: 'Interaktivt verktyg för att beräkna...',
  icon: '⚡',
  url: 'subpages/mitt-nya-verktyg/index.html',
  isExternal: false,
  badge: 'Verktyg',
  badgeType: 'internal',
  accentColor: 'var(--color-ai)',
  tags: ['Verktyg', 'Interaktivt', 'Kalkylator']
}
```

---

## 🤖 Promptmall att ge till AI för nya undersidor

Kopiera och klistra in följande prompt när du vill att en AI ska bygga en ny undersida:

> *"Jag vill skapa ett nytt interaktivt verktyg till min webbplats Håkan.com.*
> *Använd mallen i `templates/subpage-template.html` och länka till `../../assets/css/style.css`.*
> *Sidan ska ärva samma ljust/mörkt tema och design. Skapa [beskriv ditt verktyg här, t.ex: en interaktiv kalkylator för trigonometri i triangel och cirkel med grafvisning]."*

---

## 🚀 Publicering (Hosting)

Eftersom portalen är byggd med ren HTML, CSS och JavaScript kan du driftsätta den gratis på sekunder via:
- **GitHub Pages** (Pusha repot och aktivera Pages i Settings)
- **Netlify / Vercel** (Dra och släpp mappen)
- **Vanligt webbhotell** (Ladda upp filerna via FTP/Filhanterare)
