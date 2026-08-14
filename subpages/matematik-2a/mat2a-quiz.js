/**
 * ============================================================================
 * MATEMATIK 2A - INTERAKTIVA MODULER & REPETITIONSTEST (mat2a-quiz.js)
 * Utformat efter kursplaneringen för Matematik nivå 2a:
 * Modul 1: v.35-39 (Fram till Test Kap 1)
 * Modul 2: v.40-47 (Fram till Prov Kap 1)
 * Modul 3: v.48-v.6 (Fram till Prov Kap 2)
 * Modul 4: v.12-17 (Fram till Prov Kap 3 + Statistik)
 * ============================================================================
 */

(function () {
  'use strict';

  const MAT2A_TOPICS = [
    {
      id: 'modul-1-algebra-funktioner',
      title: 'Modul 1: Algebra & Funktioner (v. 35–39)',
      badge: 'Test Kap 1',
      icon: '🔣',
      description: 'Negativa tal, bråk, algebraiska uttryck, formler, ekvationer och funktionsbegreppet.',
      weeks: 'Vecka 35–39',
      questions: [
        {
          id: 'm1-q1',
          difficulty: 'Grund',
          question: 'Vad blir förenklingen av bråkuttrycket: <span class="math-expr">\\frac{3x}{4} - \\frac{x}{6}</span> ?',
          options: [
            { text: '7x / 12', correct: true },
            { text: '2x / 2 = x', correct: false },
            { text: '2x / 12', correct: false },
            { text: '7x / 24', correct: false }
          ],
          explanation: {
            summary: 'Vid subtraktion av bråk med olika nämnare måste vi först hitta minsta gemensamma nämnare (MGN).',
            steps: [
              'MGN för 4 och 6 är 12.',
              'Förläng första bråket med 3: (3x · 3) / (4 · 3) = 9x / 12',
              'Förläng andra bråket med 2: (x · 2) / (6 · 2) = 2x / 12',
              'Subtrahera täljarna: (9x - 2x) / 12 = 7x / 12'
            ]
          }
        },
        {
          id: 'm1-q2',
          difficulty: 'Grund',
          question: 'Förenkla uttrycket genom att multiplicera in i parenteserna och kombinera termer: <span class="math-expr">4(2x - 3) - 3(x - 5)</span>',
          options: [
            { text: '5x + 3', correct: true },
            { text: '5x - 27', correct: false },
            { text: '5x - 3', correct: false },
            { text: '11x + 3', correct: false }
          ],
          explanation: {
            summary: 'Var särskilt uppmärksam på minustecknet framför den andra parentesen: -3 multiplicerat med -5 ger +15.',
            steps: [
              'Multiplicera in 4 i första parentesen: 4 · 2x - 4 · 3 = 8x - 12',
              'Multiplicera in -3 i andra parentesen: -3 · x - 3 · (-5) = -3x + 15',
              'Sätt ihop uttrycket: 8x - 12 - 3x + 15',
              'Kombinera x-termer och siffertermer: (8x - 3x) + (-12 + 15) = 5x + 3'
            ]
          }
        },
        {
          id: 'm1-q3',
          difficulty: 'Medel',
          question: 'Lös ut accelerationen <span class="math-expr">a</span> ur den fysikaliska hastighetsformeln: <span class="math-expr">v = v_0 + at</span>',
          options: [
            { text: 'a = (v - v₀) / t', correct: true },
            { text: 'a = (v + v₀) / t', correct: false },
            { text: 'a = v - v₀ - t', correct: false },
            { text: 'a = (v / t) - v₀', correct: false }
          ],
          explanation: {
            summary: 'Använd balansmetoden för att isolera a ensamt på ena sidan.',
            steps: [
              'Börja med: v = v₀ + at',
              'Subtrahera v₀ från båda sidor: v - v₀ = at',
              'Dividera båda sidor med tiden t (där t ≠ 0): a = (v - v₀) / t'
            ]
          }
        },
        {
          id: 'm1-q4',
          difficulty: 'Medel',
          question: 'För funktionen <span class="math-expr">f(x) = 3x^2 - 5x + 2</span>, vad är funktionsvärdet <span class="math-expr">f(-2)</span> ?',
          options: [
            { text: '24', correct: true },
            { text: '4', correct: false },
            { text: '0', correct: false },
            { text: '-20', correct: false }
          ],
          explanation: {
            summary: 'När vi beräknar f(-2) ersätter vi varje förekomst av x med (-2). Kom ihåg att (-2)² = +4.',
            steps: [
              'f(-2) = 3 · (-2)² - 5 · (-2) + 2',
              '(-2)² = 4  =>  3 · 4 = 12',
              '-5 · (-2) = +10',
              'Summera: 12 + 10 + 2 = 24'
            ]
          }
        },
        {
          id: 'm1-q5',
          difficulty: 'Medel',
          question: 'Givet funktionen <span class="math-expr">g(x) = 5x - 7</span>, för vilket värde på <span class="math-expr">x</span> gäller att <span class="math-expr">g(x) = 18</span> ?',
          options: [
            { text: 'x = 5', correct: true },
            { text: 'x = 2.2', correct: false },
            { text: 'x = 83', correct: false },
            { text: 'x = -5', correct: false }
          ],
          explanation: {
            summary: 'Att lösa g(x) = 18 innebär att vi söker det invärde x som ger utvärdet 18.',
            steps: [
              'Sätt upp ekvationen: 5x - 7 = 18',
              'Addera 7 på båda sidor: 5x = 25',
              'Dividera med 5: x = 25 / 5 = 5',
              'Kontroll: g(5) = 5(5) - 7 = 25 - 7 = 18 (Stämmer!)'
            ]
          }
        },
        {
          id: 'm1-q6',
          difficulty: 'Begrepp',
          question: 'Vilket av följande påståenden förklarar bäst skillnaden mellan ett <em>algebraiskt uttryck</em> och en <em>ekvation</em>?',
          options: [
            { text: 'En ekvation innehåller ett likhetstecken och kan lösas för obekanta variabler, medan ett uttryck saknar likhetstecken och kan endast förenklas/beräknas.', correct: true },
            { text: 'Ett uttryck har alltid två lösningar medan en ekvation bara har en lösning.', correct: false },
            { text: 'Det finns ingen skillnad, begreppen är synonyma i Matematik 2a.', correct: false },
            { text: 'Ekvationer används bara för geometri och uttryck bara för funktioner.', correct: false }
          ],
          explanation: {
            summary: 'Ett uttryck (t.ex. 3x + 5) anger en matematisk sammansättning av tal och variabler. En ekvation (t.ex. 3x + 5 = 14) är ett påstående om likhet som binder samman två uttryck.',
            steps: [
              'Uttryck: saknar likhetstecken (förenklas eller beräknas för givna variabelvärden).',
              'Ekvation: innehåller ett likhetstecken (löses för att hitta de variabelvärden som gör likheten sann).',
              'Funktion: beskriver ett beroende/samband mellan en oberoende variabel (x) och en beroende variabel (y).'
            ]
          }
        }
      ]
    },
    {
      id: 'modul-2-rata-linjen-system',
      title: 'Modul 2: Räta Linjen & Ekvationssystem (v. 40–47)',
      badge: 'Prov Kap 1',
      icon: '⚖️',
      description: 'Räta linjens ekvation y = kx + m, grafisk lösning, substitutions- och additionsmetoden.',
      weeks: 'Vecka 40–47',
      questions: [
        {
          id: 'm2-q1',
          difficulty: 'Grund',
          question: 'En rät linje passerar genom punkterna <span class="math-expr">(1, 3)</span> och <span class="math-expr">(4, 12)</span>. Vad är linjens lutning (<span class="math-expr">k</span>-värde)?',
          options: [
            { text: 'k = 3', correct: true },
            { text: 'k = -3', correct: false },
            { text: 'k = 1/3', correct: false },
            { text: 'k = 9', correct: false }
          ],
          explanation: {
            summary: 'Riktningskoefficienten k beräknas med ändringskvoten Δy / Δx.',
            steps: [
              'Formel: k = (y₂ - y₁) / (x₂ - x₁)',
              'Sätt in punkterna (x₁, y₁) = (1, 3) och (x₂, y₂) = (4, 12):',
              'Δy = 12 - 3 = 9',
              'Δx = 4 - 1 = 3',
              'k = 9 / 3 = 3'
            ]
          }
        },
        {
          id: 'm2-q2',
          difficulty: 'Grund',
          question: 'En rät linje har lutningen <span class="math-expr">k = -2</span> och går genom punkten <span class="math-expr">(3, 4)</span>. Vad är linjens ekvation?',
          options: [
            { text: 'y = -2x + 10', correct: true },
            { text: 'y = -2x - 2', correct: false },
            { text: 'y = -2x + 4', correct: false },
            { text: 'y = 2x + 10', correct: false }
          ],
          explanation: {
            summary: 'Använd räta linjens ekvation y = kx + m och bestäm m-värdet genom att sätta in den kända punkten.',
            steps: [
              'y = kx + m med k = -2 ger: y = -2x + m',
              'Sätt in x = 3 och y = 4:',
              '4 = -2 · 3 + m',
              '4 = -6 + m  =>  m = 4 + 6 = 10',
              'Linjens ekvation är alltså: y = -2x + 10'
            ]
          }
        },
        {
          id: 'm2-q3',
          difficulty: 'Medel',
          question: 'Två linjer är <em>vinkelräta</em> mot varandra. Den ena linjen har ekvationen <span class="math-expr">y = 4x - 5</span>. Vad måste den andra linjens <span class="math-expr">k</span>-värde vara?',
          options: [
            { text: 'k = -1/4 = -0.25', correct: true },
            { text: 'k = 4', correct: false },
            { text: 'k = -4', correct: false },
            { text: 'k = 1/4 = 0.25', correct: false }
          ],
          explanation: {
            summary: 'Villkoret för att två linjer ska vara vinkelräta (ortogonala) är k₁ · k₂ = -1.',
            steps: [
              'Givet k₁ = 4:',
              '4 · k₂ = -1',
              'k₂ = -1 / 4 = -0.25',
              '(Om linjerna istället hade varit parallella hade k₂ varit lika med 4).'
            ]
          }
        },
        {
          id: 'm2-q4',
          difficulty: 'Medel',
          question: 'Lös ekvationssystemet med substitutionsmetoden: <br><span class="math-expr">y = 2x - 1</span><br><span class="math-expr">3x + 2y = 12</span>',
          options: [
            { text: 'x = 2, y = 3', correct: true },
            { text: 'x = 3, y = 5', correct: false },
            { text: 'x = 1, y = 1', correct: false },
            { text: 'x = 4, y = 7', correct: false }
          ],
          explanation: {
            summary: 'Ersätt y i den andra ekvationen med uttrycket (2x - 1).',
            steps: [
              'Sätt in y = (2x - 1) i 3x + 2y = 12:',
              '3x + 2(2x - 1) = 12',
              '3x + 4x - 2 = 12  =>  7x - 2 = 12',
              '7x = 14  =>  x = 2',
              'Beräkna y med första ekvationen: y = 2(2) - 1 = 4 - 1 = 3',
              'Svar: x = 2, y = 3'
            ]
          }
        },
        {
          id: 'm2-q5',
          difficulty: 'Medel',
          question: 'Lös ekvationssystemet med additionsmetoden: <br><span class="math-expr">2x + y = 9</span><br><span class="math-expr">3x - y = 6</span>',
          options: [
            { text: 'x = 3, y = 3', correct: true },
            { text: 'x = 4, y = 1', correct: false },
            { text: 'x = 2, y = 5', correct: false },
            { text: 'x = 5, y = -1', correct: false }
          ],
          explanation: {
            summary: 'Eftersom koefficienterna framför y är +1 och -1 slås y ut direkt när vi adderar ekvationerna.',
            steps: [
              'Addera vänsterled med vänsterled och högerled med högerled:',
              '(2x + y) + (3x - y) = 9 + 6',
              '5x + 0 = 15  =>  5x = 15',
              'x = 15 / 5 = 3',
              'Sätt in x = 3 i första ekvationen: 2(3) + y = 9  =>  6 + y = 9  =>  y = 3',
              'Lösning: x = 3, y = 3'
            ]
          }
        },
        {
          id: 'm2-q6',
          difficulty: 'Fördjupning',
          question: 'Hur många lösningar har ekvationssystemet: <br><span class="math-expr">2x - y = 4</span><br><span class="math-expr">4x - 2y = 6</span> ?',
          options: [
            { text: 'Saknar lösning (0 lösningar)', correct: true },
            { text: 'Exakt en unik lösning', correct: false },
            { text: 'Oändligt många lösningar', correct: false },
            { text: 'Två lösningar', correct: false }
          ],
          explanation: {
            summary: 'Skriv om ekvationerna på formen y = kx + m för att jämföra lutning och skärningspunkt med y-axeln.',
            steps: [
              'Ekvation 1: 2x - y = 4  =>  y = 2x - 4 (k = 2, m = -4)',
              'Ekvation 2: 4x - 2y = 6  =>  2y = 4x - 6  =>  y = 2x - 3 (k = 2, m = -3)',
              'Linjerna har samma lutning (k = 2) men olika m-värden (-4 resp -3).',
              'De är alltså parallella och kommer aldrig att skära varandra. Systemet saknar därför lösning!'
            ]
          }
        }
      ]
    },
    {
      id: 'modul-3-potenser-pq-andragrad',
      title: 'Modul 3: Potenser & Andragradsfunktioner (v. 48–v. 6)',
      badge: 'Prov Kap 2',
      icon: '📈',
      description: 'Potenslagar, kvadrerings- & konjugatreglerna, PQ-formeln, andragradsfunktionens graf och extrempunkter.',
      weeks: 'Vecka 48–v. 6',
      questions: [
        {
          id: 'm3-q1',
          difficulty: 'Grund',
          question: 'Förenkla uttrycket med hjälp av potenslagarna: <span class="math-expr">\\frac{(2^3)^4 \\cdot 2^{-5}}{2^3}</span>',
          options: [
            { text: '2⁴ = 16', correct: true },
            { text: '2⁷ = 128', correct: false },
            { text: '2² = 4', correct: false },
            { text: '2⁻⁴', correct: false }
          ],
          explanation: {
            summary: 'Tillämpa potenslagarna: (a^x)^y = a^(x·y), a^x · a^y = a^(x+y) och a^x / a^y = a^(x-y).',
            steps: [
              '(2³)\u2074 = 2^(3·4) = 2¹²',
              'Täljaren: 2¹² · 2⁻⁵ = 2^(12 - 5) = 2⁷',
              'Dela med nämnaren: 2⁷ / 2³ = 2^(7 - 3) = 2⁴',
              '2⁴ = 2 · 2 · 2 · 2 = 16'
            ]
          }
        },
        {
          id: 'm3-q2',
          difficulty: 'Grund',
          question: 'Utveckla och förenkla uttrycket: <span class="math-expr">(x + 4)^2 - (x - 3)(x + 3)</span>',
          options: [
            { text: '8x + 25', correct: true },
            { text: '8x + 7', correct: false },
            { text: '2x² + 8x + 7', correct: false },
            { text: '8x - 25', correct: false }
          ],
          explanation: {
            summary: 'Använd första kvadreringsregeln på (x + 4)² och konjugatregeln på (x - 3)(x + 3).',
            steps: [
              'Första kvadreringsregeln: (x + 4)² = x² + 2·x·4 + 4² = x² + 8x + 16',
              'Konjugatregeln: (x - 3)(x + 3) = x² - 3² = x² - 9',
              'Subtrahera: (x² + 8x + 16) - (x² - 9)',
              'Ta bort parentes: x² + 8x + 16 - x² + 9 = 8x + 25'
            ]
          }
        },
        {
          id: 'm3-q3',
          difficulty: 'Medel',
          question: 'Lös andragradsekvationen med PQ-formeln: <span class="math-expr">x^2 - 8x + 12 = 0</span>',
          options: [
            { text: 'x₁ = 6, x₂ = 2', correct: true },
            { text: 'x₁ = -6, x₂ = -2', correct: false },
            { text: 'x₁ = 4, x₂ = -4', correct: false },
            { text: 'x₁ = 8, x₂ = 12', correct: false }
          ],
          explanation: {
            summary: 'PQ-formeln: x = -(p/2) ± √((p/2)² - q). Här är p = -8 och q = 12.',
            steps: [
              '-p/2 = -(-8/2) = 4',
              'Under rottecknet: (p/2)² - q = (-4)² - 12 = 16 - 12 = 4',
              'x = 4 ± √4  =>  x = 4 ± 2',
              'x₁ = 4 + 2 = 6',
              'x₂ = 4 - 2 = 2'
            ]
          }
        },
        {
          id: 'm3-q4',
          difficulty: 'Medel',
          question: 'Lös andragradsekvationen: <span class="math-expr">2x^2 + 12x - 14 = 0</span>',
          options: [
            { text: 'x₁ = 1, x₂ = -7', correct: true },
            { text: 'x₁ = 7, x₂ = -1', correct: false },
            { text: 'x₁ = 2, x₂ = -14', correct: false },
            { text: 'x₁ = 14, x₂ = -2', correct: false }
          ],
          explanation: {
            summary: 'Innan PQ-formeln kan användas MÅSTE koefficienten framför x² vara 1. Dividera därför hela ekvationen med 2 först.',
            steps: [
              'Dela alla termer med 2: x² + 6x - 7 = 0',
              'Nu är p = 6 och q = -7',
              'x = -(6/2) ± √((6/2)² - (-7)) = -3 ± √(9 + 7)',
              'x = -3 ± √16 = -3 ± 4',
              'x₁ = -3 + 4 = 1',
              'x₂ = -3 - 4 = -7'
            ]
          }
        },
        {
          id: 'm3-q5',
          difficulty: 'Grund',
          question: 'Lös andragradsekvationen med nollproduktmetoden: <span class="math-expr">3x(2x - 8) = 0</span>',
          options: [
            { text: 'x₁ = 0, x₂ = 4', correct: true },
            { text: 'x₁ = 3, x₂ = 8', correct: false },
            { text: 'x₁ = 0, x₂ = -4', correct: false },
            { text: 'x₁ = 0, x₂ = 8/3', correct: false }
          ],
          explanation: {
            summary: 'Nollproduktmetoden: Om en produkt av två faktorer är noll måste minst en faktor vara noll.',
            steps: [
              'Faktor 1: 3x = 0  =>  x₁ = 0',
              'Faktor 2: 2x - 8 = 0  =>  2x = 8  =>  x₂ = 4',
              'Rötterna är x₁ = 0 och x₂ = 4.'
            ]
          }
        },
        {
          id: 'm3-q6',
          difficulty: 'Fördjupning',
          question: 'För andragradsfunktionen <span class="math-expr">f(x) = x^2 - 6x + 5</span>, vad är symmetrilinjens ekvation och extrempunktens koordinater?',
          options: [
            { text: 'Symmetrilinje x = 3, minimipunkt (3, -4)', correct: true },
            { text: 'Symmetrilinje x = -3, minimipunkt (-3, 32)', correct: false },
            { text: 'Symmetrilinje x = 6, minimipunkt (6, 5)', correct: false },
            { text: 'Symmetrilinje x = 3, maximipunkt (3, -4)', correct: false }
          ],
          explanation: {
            summary: 'Symmetrilinjen ligger alltid vid x = -p/2. Eftersom koefficienten framför x² är positiv (a = 1 > 0) är kurvan U-formad och har en minimipunkt.',
            steps: [
              'Symmetrilinje: x = -(-6)/2 = 3',
              'Beräkna minimivärdet genom att sätta in x = 3 i f(x):',
              'f(3) = 3² - 6(3) + 5 = 9 - 18 + 5 = -4',
              'Extrempunkten är därför minimipunkten (3, -4).'
            ]
          }
        },
        {
          id: 'm3-q7',
          difficulty: 'Medel',
          question: 'Värdet på en moped minskar exponentiellt med 15% varje år. Inköpspriset var 20 000 kr. Vilken funktionsmodell beskriver mopedens värde <span class="math-expr">y</span> efter <span class="math-expr">x</span> år?',
          options: [
            { text: 'y = 20 000 · 0.85^x', correct: true },
            { text: 'y = 20 000 · 1.15^x', correct: false },
            { text: 'y = 20 000 - 0.15x', correct: false },
            { text: 'y = 20 000 · 0.15^x', correct: false }
          ],
          explanation: {
            summary: 'Exponentialfunktionen har formen y = C · a^x där C är startvärdet och a är förändringsfaktorn.',
            steps: [
              'Startvärde: C = 20 000 kr',
              'Minskning med 15% ger förändringsfaktorn: a = 1 - 0.15 = 0.85',
              'Modellen blir: y = 20 000 · 0.85^x'
            ]
          }
        }
      ]
    },
    {
      id: 'modul-4-geometri-statistik',
      title: 'Modul 4: Geometri & Statistik (v. 12–17)',
      badge: 'Prov Kap 3 + Statistik',
      icon: '📊',
      description: 'Vinklar, likformighet, Pythagoras sats, läges- & spridningsmått och normalfördelning.',
      weeks: 'Vecka 12–17',
      questions: [
        {
          id: 'm4-q1',
          difficulty: 'Grund',
          question: 'Beräkna avståndet mellan punkterna <span class="math-expr">A(1, 2)</span> och <span class="math-expr">B(4, 6)</span> i ett koordinatsystem.',
          options: [
            { text: '5 l.e.', correct: true },
            { text: '√7 l.e.', correct: false },
            { text: '7 l.e.', correct: false },
            { text: '25 l.e.', correct: false }
          ],
          explanation: {
            summary: 'Avståndsformeln bygger direkt på Pythagoras sats: d = √((Δx)² + (Δy)²).',
            steps: [
              'Δx = 4 - 1 = 3',
              'Δy = 6 - 2 = 4',
              'd = √(3² + 4²) = √(9 + 16) = √25 = 5 längdenheter'
            ]
          }
        },
        {
          id: 'm4-q2',
          difficulty: 'Grund',
          question: 'Två trianglar är <em>likformiga</em>. Den mindre triangeln har sidorna 3 cm, 4 cm och 5 cm. Den större triangelns kortaste sida är 9 cm. Hur lång är hypotenusan i den större triangeln?',
          options: [
            { text: '15 cm', correct: true },
            { text: '12 cm', correct: false },
            { text: '10 cm', correct: false },
            { text: '25 cm', correct: false }
          ],
          explanation: {
            summary: 'Vid likformighet är förhållandet mellan motsvarande sidor konstant (skalan är samma).',
            steps: [
              'Kortaste sida i lilla triangeln = 3 cm, i stora = 9 cm.',
              'Längdskala = 9 / 3 = 3 (den stora triangeln är 3 ggr så stor).',
              'Hypotenusan i lilla triangeln är 5 cm.',
              'Hypotenusan i stora triangeln = 5 · 3 = 15 cm.'
            ]
          }
        },
        {
          id: 'm4-q3',
          difficulty: 'Grund',
          question: 'I en triangel är två av vinklarna <span class="math-expr">45°</span> och <span class="math-expr">70°</span>. Vad är den tredje vinkeln samt yttervinkeln till den tredje vinkeln?',
          options: [
            { text: 'Tredje vinkel: 65°, Yttervinkel: 115°', correct: true },
            { text: 'Tredje vinkel: 75°, Yttervinkel: 105°', correct: false },
            { text: 'Tredje vinkel: 65°, Yttervinkel: 65°', correct: false },
            { text: 'Tredje vinkel: 55°, Yttervinkel: 125°', correct: false }
          ],
          explanation: {
            summary: 'Vinkelsumman i en triangel är 180°. En yttervinkel är summan av de två motstående inre vinklarna.',
            steps: [
              'Tredje inre vinkeln: 180° - (45° + 70°) = 180° - 115° = 65°',
              'Yttervinkeln = 180° - 65° = 115° (vilket är lika med 45° + 70° enligt yttervinkelsatsen).'
            ]
          }
        },
        {
          id: 'm4-q4',
          difficulty: 'Medel',
          question: 'En talserie med månadslöner (i tusen kr) är: <span class="math-expr">24, 26, 27, 28, 30, 31, 98</span>. Vilket lägesmått ger den mest representativa bilden av typiska lönen, och vad är medianen?',
          options: [
            { text: 'Medianen (28 tkr), eftersom den inte snedvrids av det extrema värdet 98 tkr', correct: true },
            { text: 'Medelvärdet (37.7 tkr), eftersom alla observationer räknas med', correct: false },
            { text: 'Typvärdet (24 tkr)', correct: false },
            { text: 'Variationsbredden (74 tkr)', correct: false }
          ],
          explanation: {
            summary: 'Medianen är det mittersta värdet i en sorterad datamängd och är okänslig för extremvärden.',
            steps: [
              'Talserien har 7 värden och är redan sorterad: 24, 26, 27, [28], 30, 31, 98.',
              'Mittersta värdet (position 4) är 28 tkr.',
              'Medelvärdet är (24+26+27+28+30+31+98)/7 = 264/7 ≈ 37.7 tkr, vilket ger en missvisande hög bild på grund av extremvärdet 98.'
            ]
          }
        },
        {
          id: 'm4-q5',
          difficulty: 'Medel',
          question: 'Ett lådagram visar att undre kvartilen är <span class="math-expr">Q_1 = 14</span> och övre kvartilen är <span class="math-expr">Q_3 = 26</span>. Vad är kvartilavståndet och vad beskriver det?',
          options: [
            { text: 'Kvartilavståndet är 12 och rymmer de mittersta 50% av observationerna', correct: true },
            { text: 'Kvartilavståndet är 20 och rymmer 100% av observationerna', correct: false },
            { text: 'Kvartilavståndet är 12 och visar medelvärdet', correct: false },
            { text: 'Kvartilavståndet är 40', correct: false }
          ],
          explanation: {
            summary: 'Kvartilavståndet (IQR) är skillnaden mellan övre och undre kvartilen: IQR = Q₃ - Q₁.',
            steps: [
              'IQR = Q₃ - Q₁ = 26 - 14 = 12',
              'Mellan Q₁ och Q₃ ligger exakt hälften (50%) av alla mätvärden.',
              'Lådans bredd i ett lådagram motsvarar just kvartilavståndet.'
            ]
          }
        },
        {
          id: 'm4-q6',
          difficulty: 'Medel',
          question: 'Längden hos en grupp gymnasieelever är normalfördelad med medelvärdet <span class="math-expr">\\mu = 175</span> cm och standardavvikelsen <span class="math-expr">\\sigma = 6</span> cm. Ungefär hur stor andel av eleverna är mellan <span class="math-expr">169</span> cm och <span class="math-expr">181</span> cm långa?',
          options: [
            { text: 'Cirka 68.2%', correct: true },
            { text: 'Cirka 95.4%', correct: false },
            { text: 'Cirka 50.0%', correct: false },
            { text: 'Cirka 34.1%', correct: false }
          ],
          explanation: {
            summary: 'I en normalfördelning ligger cirka 68.2% av observationerna inom ±1 standardavvikelse från medelvärdet (μ ± 1σ).',
            steps: [
              'Undre gräns: μ - 1σ = 175 - 6 = 169 cm',
              'Övre gräns: μ + 1σ = 175 + 6 = 181 cm',
              'Intervallet [169, 181] motsvarar exakt [μ - σ, μ + σ], vilket enligt normalfördelningens regler innehåller cirka 68.2% av observationerna.'
            ]
          }
        },
        {
          id: 'm4-q7',
          difficulty: 'Fördjupning',
          question: 'Resultaten på ett prov är normalfördelade med medelvärdet <span class="math-expr">50</span> poäng och standardavvikelsen <span class="math-expr">10</span> poäng. Vilken poänggräns motsvarar ungefär den <em>84:e percentilen</em>?',
          options: [
            { text: '60 poäng (μ + 1σ)', correct: true },
            { text: '70 poäng (μ + 2σ)', correct: false },
            { text: '50 poäng (Medelvärdet)', correct: false },
            { text: '84 poäng', correct: false }
          ],
          explanation: {
            summary: 'Under medelvärdet ligger 50% av fördelningen. Mellan medelvärdet och +1 standardavvikelse ligger ytterligare ca 34.1%.',
            steps: [
              'Andel under medelvärdet (μ) = 50%',
              'Andel mellan μ och μ + 1σ = 34.1%',
              'Total andel under μ + 1σ = 50% + 34.1% = 84.1% ≈ 84%',
              'Poängen för 84:e percentilen = μ + 1σ = 50 + 10 = 60 poäng.'
            ]
          }
        }
      ]
    }
  ];

  // --------------------------------------------------------------------------
  // STATE MANAGEMENT
  // --------------------------------------------------------------------------
  let currentTopicIndex = 0;
  let currentQuestionIndex = 0;
  let userAnswers = [];
  let isAnswered = false;

  // DOM Elements
  let topicGridEl = null;
  let quizContainerEl = null;
  let quizTopicTitleEl = null;
  let questionProgressTextEl = null;
  let quizProgressFillEl = null;
  let quizCardContentEl = null;

  function initQuizEngine() {
    topicGridEl = document.getElementById('mat2a-topic-selector-grid');
    quizContainerEl = document.getElementById('mat2a-quiz-container');
    quizTopicTitleEl = document.getElementById('mat2a-quiz-topic-title');
    questionProgressTextEl = document.getElementById('mat2a-question-progress-text');
    quizProgressFillEl = document.getElementById('mat2a-quiz-progress-fill');
    quizCardContentEl = document.getElementById('mat2a-quiz-card-content');

    if (!topicGridEl || !quizContainerEl) return;

    renderTopics();
    selectTopic(0, false); // initial view without scrolling
  }

  function renderTopics() {
    if (!topicGridEl) return;
    topicGridEl.innerHTML = '';

    MAT2A_TOPICS.forEach((topic, index) => {
      const card = document.createElement('div');
      card.className = `topic-card ${index === currentTopicIndex ? 'active' : ''}`;
      card.onclick = () => selectTopic(index, true);

      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div class="topic-icon">${topic.icon}</div>
          <span class="topic-badge-pill">${escapeHtml(topic.badge)}</span>
        </div>
        <div class="topic-title">${escapeHtml(topic.title)}</div>
        <div class="topic-weeks">📅 ${escapeHtml(topic.weeks)}</div>
        <div class="topic-meta">${topic.questions.length} frågor • ${escapeHtml(topic.description)}</div>
      `;
      topicGridEl.appendChild(card);
    });
  }

  function selectTopic(index, shouldScroll = true) {
    currentTopicIndex = index;
    currentQuestionIndex = 0;
    userAnswers = [];
    isAnswered = false;

    renderTopics();
    loadQuestion();

    quizContainerEl.classList.add('visible');
    if (shouldScroll) {
      quizContainerEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function loadQuestion() {
    const topic = MAT2A_TOPICS[currentTopicIndex];
    const q = topic.questions[currentQuestionIndex];
    isAnswered = false;

    quizTopicTitleEl.textContent = `${topic.icon} ${topic.title}`;
    questionProgressTextEl.textContent = `Fråga ${currentQuestionIndex + 1} av ${topic.questions.length}`;

    const progressPercent = (currentQuestionIndex / topic.questions.length) * 100;
    quizProgressFillEl.style.width = `${progressPercent}%`;

    let optionsHTML = '';
    q.options.forEach((opt, idx) => {
      optionsHTML += `
        <button class="option-btn" onclick="window.Mat2aQuiz.handleOptionSelect(${idx})" id="m2a-opt-btn-${idx}">
          <span class="opt-label">${String.fromCharCode(65 + idx)}.</span>
          <span class="opt-text">${opt.text}</span>
          <span class="opt-indicator" id="m2a-opt-ind-${idx}"></span>
        </button>
      `;
    });

    const diffBadge = q.difficulty ? `<span class="difficulty-pill ${q.difficulty.toLowerCase()}">${q.difficulty}</span>` : '';

    quizCardContentEl.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
        <span style="font-size: 0.82rem; font-weight: 600; color: var(--color-math); text-transform: uppercase; letter-spacing: 0.05em;">Delområde: ${topic.badge}</span>
        ${diffBadge}
      </div>
      <div class="question-text">${q.question}</div>
      <div class="options-grid">${optionsHTML}</div>
      <div class="feedback-panel" id="m2a-feedback-panel" style="display: none;"></div>
      <div class="quiz-actions" id="m2a-quiz-actions" style="display: none;">
        <button class="next-btn" onclick="window.Mat2aQuiz.nextQuestion()">
          ${currentQuestionIndex === topic.questions.length - 1 ? 'Visa modulresultat 🏁' : 'Nästa fråga ➔'}
        </button>
      </div>
    `;
  }

  function handleOptionSelect(selectedIndex) {
    if (isAnswered) return;
    isAnswered = true;

    const topic = MAT2A_TOPICS[currentTopicIndex];
    const q = topic.questions[currentQuestionIndex];
    const selectedOpt = q.options[selectedIndex];
    const isCorrect = selectedOpt.correct;

    userAnswers.push({ questionId: q.id, isCorrect: isCorrect, selectedIndex: selectedIndex });

    q.options.forEach((opt, idx) => {
      const btn = document.getElementById(`m2a-opt-btn-${idx}`);
      const ind = document.getElementById(`m2a-opt-ind-${idx}`);
      if (!btn) return;
      btn.disabled = true;

      if (opt.correct) {
        btn.classList.add('correct');
        if (ind) ind.textContent = '✓ Rätt svar';
      } else if (idx === selectedIndex && !isCorrect) {
        btn.classList.add('incorrect');
        if (ind) ind.textContent = '✗ Ditt svar';
      }
    });

    const feedbackPanel = document.getElementById('m2a-feedback-panel');
    if (feedbackPanel) {
      feedbackPanel.style.display = 'block';

      if (isCorrect) {
        feedbackPanel.className = 'feedback-panel correct-bg';
        feedbackPanel.innerHTML = `
          <div class="feedback-title correct-text">
            <span>🎉 Helt rätt! Bra resonerat.</span>
          </div>
          <div class="feedback-body">
            <p>${q.explanation.summary}</p>
          </div>
        `;
      } else {
        feedbackPanel.className = 'feedback-panel incorrect-bg';

        let stepsHTML = '';
        (q.explanation.steps || []).forEach(step => {
          stepsHTML += `<li>${step}</li>`;
        });

        feedbackPanel.innerHTML = `
          <div class="feedback-title incorrect-text">
            <span>💡 Pedagogisk genomgång & förklaring:</span>
          </div>
          <div class="feedback-body">
            <p><strong>Kort sammanfattning:</strong> ${q.explanation.summary}</p>
            <ol class="feedback-steps">${stepsHTML}</ol>
          </div>
        `;
      }
    }

    const actionsEl = document.getElementById('m2a-quiz-actions');
    if (actionsEl) {
      actionsEl.style.display = 'flex';
    }
  }

  function nextQuestion() {
    const topic = MAT2A_TOPICS[currentTopicIndex];
    currentQuestionIndex++;

    if (currentQuestionIndex < topic.questions.length) {
      loadQuestion();
    } else {
      renderSummary();
    }
  }

  function renderSummary() {
    const topic = MAT2A_TOPICS[currentTopicIndex];
    const correctCount = userAnswers.filter(a => a.isCorrect).length;
    const totalCount = topic.questions.length;
    const percentage = Math.round((correctCount / totalCount) * 100);

    quizProgressFillEl.style.width = '100%';
    questionProgressTextEl.textContent = 'Modul Slutförd!';

    let feedbackMsg = '';
    if (percentage === 100) {
      feedbackMsg = '🌟 Perfekt resultat! Du har fullständig förståelse för momenten i denna del av kursplaneringen.';
    } else if (percentage >= 70) {
      feedbackMsg = '👍 Mycket bra! Du behärskar de flesta centrala begrepp och metoder väl.';
    } else {
      feedbackMsg = '💪 Bra repetition! Gå gärna igenom de pedagogiska steg-för-steg-lösningarna och gör om modulen för att befästa kunskaperna inför provet.';
    }

    quizCardContentEl.innerHTML = `
      <div class="summary-card">
        <div class="score-circle">
          <span class="score-number">${correctCount}/${totalCount}</span>
          <span class="score-label">${percentage}% RÄTT</span>
        </div>
        <h2 style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 700; margin-bottom: 0.35rem;">
          Modul slutförd: ${topic.title}
        </h2>
        <p style="font-size: 0.9rem; color: var(--color-math); font-weight: 600; margin-bottom: 0.5rem;">
          Inriktning: ${topic.badge} (${topic.weeks})
        </p>
        <p style="color: var(--text-secondary); margin-bottom: 2rem; max-width: 540px; margin-left: auto; margin-right: auto; line-height: 1.6;">
          ${feedbackMsg}
        </p>

        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
          <button class="next-btn" onclick="window.Mat2aQuiz.selectTopic(${currentTopicIndex})">
            🔄 Gör om denna modul
          </button>
          ${currentTopicIndex < MAT2A_TOPICS.length - 1 ? `
            <button class="filter-btn active" style="padding: 0.75rem 1.5rem; font-size: 0.95rem;" onclick="window.Mat2aQuiz.selectTopic(${currentTopicIndex + 1})">
              Nästa modul: ${escapeHtml(MAT2A_TOPICS[currentTopicIndex + 1].badge)} ➔
            </button>
          ` : ''}
        </div>
      </div>
    `;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Global namespace for event handlers
  window.Mat2aQuiz = {
    selectTopic,
    handleOptionSelect,
    nextQuestion
  };

  document.addEventListener('DOMContentLoaded', initQuizEngine);

})();
