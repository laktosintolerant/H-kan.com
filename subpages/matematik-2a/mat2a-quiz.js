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
      title: 'Modul 1: Algebra & Funktioner',
      badge: 'Test Kap 1',
      icon: '🔣',
      description: 'Negativa tal, bråk, algebraiska uttryck, formler, ekvationer och funktionsbegreppet.',
      weeks: 'Vecka 35–39',
      questions: [
        {
          id: 'm1-q1',
          difficulty: 'Grund',
          question: 'Vad blir förenklingen av bråkuttrycket: <span class="math-expr">3x/4 − x/6</span> ?',
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
              'Subtrahera täljarna: (9x − 2x) / 12 = 7x / 12'
            ]
          }
        },
        {
          id: 'm1-q2',
          difficulty: 'Grund',
          question: 'Förenkla uttrycket genom att multiplicera in i parenteserna och kombinera termer: <span class="math-expr">4(2x − 3) − 3(x − 5)</span>',
          options: [
            { text: '5x + 3', correct: true },
            { text: '5x − 27', correct: false },
            { text: '5x − 3', correct: false },
            { text: '11x + 3', correct: false }
          ],
          explanation: {
            summary: 'Var särskilt uppmärksam på minustecknet framför den andra parentesen: −3 multiplicerat med −5 ger +15.',
            steps: [
              'Multiplicera in 4 i första parentesen: 4 · 2x − 4 · 3 = 8x − 12',
              'Multiplicera in −3 i andra parentesen: −3 · x − 3 · (−5) = −3x + 15',
              'Sätt ihop uttrycket: 8x − 12 − 3x + 15',
              'Kombinera x-termer och siffertermer: (8x − 3x) + (−12 + 15) = 5x + 3'
            ]
          }
        },
        {
          id: 'm1-q3',
          difficulty: 'Medel',
          question: 'Lös ut accelerationen <span class="math-expr">a</span> ur formeln: <span class="math-expr">v = v₀ + a · t</span>',
          options: [
            { text: 'a = (v − v₀) / t', correct: true },
            { text: 'a = (v + v₀) / t', correct: false },
            { text: 'a = v − v₀ − t', correct: false },
            { text: 'a = (v / t) − v₀', correct: false }
          ],
          explanation: {
            summary: 'Använd balansmetoden för att isolera a ensamt på ena sidan av likhetstecknet.',
            steps: [
              'Börja med formeln: v = v₀ + a · t',
              'Subtrahera v₀ från båda sidor: v − v₀ = a · t',
              'Dividera båda sidor med tiden t (där t ≠ 0): a = (v − v₀) / t'
            ]
          }
        },
        {
          id: 'm1-q4',
          difficulty: 'Medel',
          question: 'För funktionen <span class="math-expr">f(x) = 3x² − 5x + 2</span>, vad är funktionsvärdet <span class="math-expr">f(−2)</span> ?',
          options: [
            { text: '24', correct: true },
            { text: '4', correct: false },
            { text: '0', correct: false },
            { text: '−20', correct: false }
          ],
          explanation: {
            summary: 'När vi beräknar f(−2) ersätter vi varje x med (−2). Kom ihåg att (−2)² = +4 och −5 · (−2) = +10.',
            steps: [
              'f(−2) = 3 · (−2)² − 5 · (−2) + 2',
              '(−2)² = 4  =>  3 · 4 = 12',
              '−5 · (−2) = +10',
              'Summera alla delar: 12 + 10 + 2 = 24'
            ]
          }
        },
        {
          id: 'm1-q5',
          difficulty: 'Medel',
          question: 'Givet funktionen <span class="math-expr">g(x) = 5x − 7</span>, för vilket värde på <span class="math-expr">x</span> gäller att <span class="math-expr">g(x) = 18</span> ?',
          options: [
            { text: 'x = 5', correct: true },
            { text: 'x = 2,2', correct: false },
            { text: 'x = 83', correct: false },
            { text: 'x = −5', correct: false }
          ],
          explanation: {
            summary: 'Att lösa g(x) = 18 innebär att vi ställer upp en ekvation för att bestämma vilket invärde x som ger funktionsvärdet 18.',
            steps: [
              'Sätt upp ekvationen: 5x − 7 = 18',
              'Addera 7 på båda sidor: 5x = 25',
              'Dividera med 5: x = 25 / 5 = 5',
              'Kontrollräkning: g(5) = 5(5) − 7 = 25 − 7 = 18 (Stämmer!)'
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
            summary: 'Ett uttryck (t.ex. 3x + 5) anger en sammansättning av tal och variabler. En ekvation (t.ex. 3x + 5 = 14) är ett påstående om likhet som binder samman två uttryck.',
            steps: [
              'Uttryck: saknar likhetstecken (förenklas eller beräknas för givna variabelvärden).',
              'Ekvation: innehåller ett likhetstecken (löses för att hitta de variabelvärden som gör likheten sann).',
              'Funktion: beskriver ett beroende/samband mellan en oberoende variabel (x) och en beroende variabel (y).'
            ]
          }
        },
        {
          id: 'm1-q7',
          difficulty: 'Grund',
          question: 'Lös den linjära ekvationen: <span class="math-expr">5x − 7 = 2x + 8</span>',
          options: [
            { text: 'x = 5', correct: true },
            { text: 'x = 1/3', correct: false },
            { text: 'x = 15', correct: false },
            { text: 'x = 3', correct: false }
          ],
          explanation: {
            summary: 'Samla alla x-termer på ena sidan och siffertermerna på den andra sidan med hjälp av balansmetoden.',
            steps: [
              'Börja med: 5x − 7 = 2x + 8',
              'Subtrahera 2x från båda led: 3x − 7 = 8',
              'Addera 7 till båda led: 3x = 15',
              'Dividera med 3: x = 15 / 3 = 5',
              'Prövning: VL = 5(5) − 7 = 18. HL = 2(5) + 8 = 18. (Stämmer!)'
            ]
          }
        },
        {
          id: 'm1-q8',
          difficulty: 'Grund',
          question: 'Kostnaden för att hyra en skåpbil ges av formeln <span class="math-expr">K(x) = 300 + 25x</span> kr, där <span class="math-expr">x</span> är antalet körda mil. Vad blir totalkostnaden om man kör 8 mil, dvs beräkna <span class="math-expr">K(8)</span>?',
          options: [
            { text: '500 kr', correct: true },
            { text: '325 kr', correct: false },
            { text: '200 kr', correct: false },
            { text: '550 kr', correct: false }
          ],
          explanation: {
            summary: 'Ersätt x med 8 i formeln och beräkna värdet enligt prioriteringsreglerna (multiplikation före addition).',
            steps: [
              'Sätt in x = 8: K(8) = 300 + 25 · 8',
              'Multiplicera milersättningen först: 25 · 8 = 200 kr',
              'Addera grundavgiften: 300 + 200 = 500 kr',
              'Svar: Att köra 8 mil kostar 500 kr.'
            ]
          }
        }
      ]
    },
    {
      id: 'modul-2-rata-linjen-system',
      title: 'Modul 2: Räta Linjen & Ekvationssystem',
      badge: 'Prov Kap 1',
      icon: '⚖️',
      description: 'Räta linjens ekvation y = kx + m, tolkning av k och m, parallella linjer, grafisk lösning samt substitutions- och additionsmetoden.',
      weeks: 'Vecka 40–47',
      questions: [
        {
          id: 'm2-q1',
          difficulty: 'Grund',
          question: 'Vilken lutning (<span class="math-expr">k</span>-värde) och vilket skärningsvärde med <span class="math-expr">y</span>-axeln (<span class="math-expr">m</span>-värde) har den räta linjen: <span class="math-expr">y = 4x − 7</span> ?',
          options: [
            { text: 'k = 4 och m = −7', correct: true },
            { text: 'k = −7 och m = 4', correct: false },
            { text: 'k = 4 och m = 7', correct: false },
            { text: 'k = −4 och m = −7', correct: false }
          ],
          explanation: {
            summary: 'I räta linjens ekvation på formen y = kx + m är talet framför x alltid linjens riktningskoefficient (k), och den fristående konstanten är m-värdet.',
            steps: [
              'Jämför ekvationen y = 4x − 7 med standardformen y = kx + m.',
              'Lutningen k står framför x: k = 4 (grafen ökar med 4 enheter i y-led för varje steg i x-led).',
              'Konstanten m anger var linjen skär y-axeln: m = −7 (linjen korsar y-axeln vid punkten (0, −7)). Glöm inte minustecknet framför 7!'
            ]
          }
        },
        {
          id: 'm2-q2',
          difficulty: 'Grund',
          question: 'En hantverkare fakturerar enligt formeln <span class="math-expr">K = 450x + 600</span>, där <span class="math-expr">K</span> är totalkostnaden i kronor och <span class="math-expr">x</span> är antalet arbetade timmar. Vad representerar talen <strong>600</strong> och <strong>450</strong>?',
          options: [
            { text: '600 kr är startavgiften (fast kostnad, m-värde) och 450 kr är timpriset (rörlig kostnad, k-värde)', correct: true },
            { text: '450 kr är startavgiften och 600 kr är timpriset', correct: false },
            { text: '600 kr är maxpriset och 450 kr är totala antalet arbetstimmar', correct: false },
            { text: 'Båda talen representerar timpriser för olika hantverkare', correct: false }
          ],
          explanation: {
            summary: 'I en linjär kostnadsmodell motsvarar m-värdet alltid den fasta startkostnaden (då x = 0), och k-värdet är den rörliga kostnaden per enhet (här timpriset).',
            steps: [
              'Om hantverkaren arbetar 0 timmar (x = 0): K = 450 · 0 + 600 = 600 kr. 600 kr är alltså den fasta framkörningsavgiften/startavgiften (m-värdet).',
              'För varje timme x ökar kostnaden med 450 kr. 450 kr är alltså timpriset (lutningen, k-värdet).',
              'Att tolka fasta och rörliga kostnader som m- och k-värden är ett mycket centralt moment i Matematik 2a.'
            ]
          }
        },
        {
          id: 'm2-q3',
          difficulty: 'Grund',
          question: 'Om en rät linje lutar nedåt från vänster till höger (grafen sjunker), vad gäller då för linjens riktningskoefficient (<span class="math-expr">k</span>-värde)?',
          options: [
            { text: 'k < 0 (lutningen är negativ)', correct: true },
            { text: 'k > 0 (lutningen är positiv)', correct: false },
            { text: 'k = 0 (linjen är horisontell)', correct: false },
            { text: 'k = 1', correct: false }
          ],
          explanation: {
            summary: 'Riktningskoefficienten anger linjens lutning och tecknet bestämmer om linjen stiger eller sjunker.',
            steps: [
              'k > 0 (positiv lutning): Grafen stiger från vänster till höger ("uppförsbacke").',
              'k < 0 (negativ lutning): Grafen sjunker från vänster till höger ("nedförsbacke").',
              'k = 0: Grafen är helt vågrät (horisontell linje, y = m).'
            ]
          }
        },
        {
          id: 'm2-q4',
          difficulty: 'Grund',
          question: 'En rät linje passerar genom punkterna <span class="math-expr">(1, 3)</span> och <span class="math-expr">(4, 12)</span>. Vad är linjens lutning (<span class="math-expr">k</span>-värde)?',
          options: [
            { text: 'k = 3', correct: true },
            { text: 'k = −3', correct: false },
            { text: 'k = 1/3', correct: false },
            { text: 'k = 9', correct: false }
          ],
          explanation: {
            summary: 'Riktningskoefficienten k beräknas med ändringskvoten Δy / Δx.',
            steps: [
              'Formel: k = (y₂ − y₁) / (x₂ − x₁)',
              'Sätt in punkterna (x₁, y₁) = (1, 3) och (x₂, y₂) = (4, 12):',
              'Δy = 12 − 3 = 9',
              'Δx = 4 − 1 = 3',
              'k = 9 / 3 = 3'
            ]
          }
        },
        {
          id: 'm2-q5',
          difficulty: 'Grund',
          question: 'En rät linje har lutningen <span class="math-expr">k = 2</span> och skär <span class="math-expr">y</span>-axeln i punkten <span class="math-expr">(0, 5)</span>. Vad är linjens ekvation?',
          options: [
            { text: 'y = 2x + 5', correct: true },
            { text: 'y = 5x + 2', correct: false },
            { text: 'y = 2x − 5', correct: false },
            { text: 'y = −2x + 5', correct: false }
          ],
          explanation: {
            summary: 'När linjens skärning med y-axeln är känd kan vi läsa av m-värdet direkt: punkten (0, 5) innebär att m = 5.',
            steps: [
              'Räta linjens ekvation är y = kx + m.',
              'Givet att lutningen är k = 2.',
              'Eftersom linjen skär y-axeln i (0, 5) är startvärdet m = 5.',
              'Ekvationen blir direkt: y = 2x + 5.'
            ]
          }
        },
        {
          id: 'm2-q6',
          difficulty: 'Grund',
          question: 'En rät linje har lutningen <span class="math-expr">k = −2</span> och går genom punkten <span class="math-expr">(3, 4)</span>. Vad är linjens ekvation?',
          options: [
            { text: 'y = −2x + 10', correct: true },
            { text: 'y = −2x − 2', correct: false },
            { text: 'y = −2x + 4', correct: false },
            { text: 'y = 2x + 10', correct: false }
          ],
          explanation: {
            summary: 'Använd y = kx + m och sätt in k samt punktens koordinater för att beräkna m-värdet.',
            steps: [
              'y = kx + m med k = −2 ger: y = −2x + m',
              'Sätt in x = 3 och y = 4:',
              '4 = −2 · 3 + m',
              '4 = −6 + m  =>  m = 4 + 6 = 10',
              'Linjens ekvation är alltså: y = −2x + 10'
            ]
          }
        },
        {
          id: 'm2-q7',
          difficulty: 'Grund',
          question: 'Två linjer är <em>parallella</em>. Den ena linjen har ekvationen <span class="math-expr">y = 3x − 2</span>. Vilken av följande linjer är parallell med den?',
          options: [
            { text: 'y = 3x + 5', correct: true },
            { text: 'y = −3x − 2', correct: false },
            { text: 'y = (1/3)x + 5', correct: false },
            { text: 'y = 2x + 3', correct: false }
          ],
          explanation: {
            summary: 'Parallella linjer har alltid exakt samma lutning, vilket betyder att de har samma k-värde (k₁ = k₂).',
            steps: [
              'Linjen y = 3x − 2 har lutningen k = 3.',
              'En linje som är parallell måste också ha k = 3.',
              'Bland alternativen har endast linjen y = 3x + 5 lutningen k = 3.',
              '(Eftersom linjerna har olika m-värden, −2 och +5, kommer de aldrig att skära varandra).'
            ]
          }
        },
        {
          id: 'm2-q8',
          difficulty: 'Begrepp',
          question: 'Två räta linjer ritas i ett koordinatsystem och skär varandra i punkten <span class="math-expr">(2, 7)</span>. Vad är lösningen till det linjära ekvationssystem som linjerna representerar?',
          options: [
            { text: 'x = 2 och y = 7', correct: true },
            { text: 'x = 7 och y = 2', correct: false },
            { text: 'x = 9 och y = 0', correct: false },
            { text: 'Det går inte att avgöra utan att veta linjernas formler', correct: false }
          ],
          explanation: {
            summary: 'Den grafiska lösningen till ett linjärt ekvationssystem är alltid linjernas gemensamma skärningspunkt (x, y).',
            steps: [
              'Skärningspunkten är den enda punkt som ligger på båda linjerna samtidigt.',
              'Det innebär att koordinaterna i punkten gör båda ekvationerna sanna på en gång.',
              'Skärningspunkten (2, 7) betyder direkt att lösningen är x = 2 och y = 7.'
            ]
          }
        },
        {
          id: 'm2-q9',
          difficulty: 'Medel',
          question: 'Lös ekvationssystemet med substitutionsmetoden: <br><span class="math-expr">y = 2x − 1</span><br><span class="math-expr">3x + 2y = 12</span>',
          options: [
            { text: 'x = 2, y = 3', correct: true },
            { text: 'x = 3, y = 5', correct: false },
            { text: 'x = 1, y = 1', correct: false },
            { text: 'x = 4, y = 7', correct: false }
          ],
          explanation: {
            summary: 'Ersätt y i den andra ekvationen med uttrycket (2x − 1).',
            steps: [
              'Sätt in y = (2x − 1) i 3x + 2y = 12:',
              '3x + 2(2x − 1) = 12',
              '3x + 4x − 2 = 12  =>  7x − 2 = 12',
              '7x = 14  =>  x = 2',
              'Beräkna y med första ekvationen: y = 2(2) − 1 = 4 − 1 = 3',
              'Lösning: x = 2, y = 3'
            ]
          }
        },
        {
          id: 'm2-q10',
          difficulty: 'Medel',
          question: 'Lös ekvationssystemet med additionsmetoden: <br><span class="math-expr">2x + y = 9</span><br><span class="math-expr">3x − y = 6</span>',
          options: [
            { text: 'x = 3, y = 3', correct: true },
            { text: 'x = 4, y = 1', correct: false },
            { text: 'x = 2, y = 5', correct: false },
            { text: 'x = 5, y = −1', correct: false }
          ],
          explanation: {
            summary: 'Eftersom koefficienterna framför y är +1 och −1 slås y ut direkt när vi adderar ekvationerna.',
            steps: [
              'Addera ekvationerna ledvis:',
              '(2x + y) + (3x − y) = 9 + 6',
              '5x + 0 = 15  =>  5x = 15',
              'x = 15 / 5 = 3',
              'Sätt in x = 3 i första ekvationen: 2(3) + y = 9  =>  6 + y = 9  =>  y = 3',
              'Lösning: x = 3, y = 3'
            ]
          }
        },
        {
          id: 'm2-q11',
          difficulty: 'Grund',
          question: 'På ett bygge köper man in material i två omgångar: <br>• Inköp 1: <strong>2 paket skruv och 1 paket spik</strong> kostar <strong>140 kr</strong>.<br>• Inköp 2: <strong>1 paket skruv och 1 paket spik</strong> kostar <strong>90 kr</strong>.<br>Vad kostar ett paket skruv (<span class="math-expr">x</span>)?',
          options: [
            { text: '50 kr', correct: true },
            { text: '40 kr', correct: false },
            { text: '45 kr', correct: false },
            { text: '70 kr', correct: false }
          ],
          explanation: {
            summary: 'Ställ upp ett ekvationssystem där skillnaden mellan inköpen ger priset direkt.',
            steps: [
              'Låt x = pris per paket skruv och y = pris per paket spik.',
              'Ekvation 1: 2x + y = 140',
              'Ekvation 2: x + y = 90',
              'Subtrahera ekvation 2 från ekvation 1: (2x − x) + (y − y) = 140 − 90',
              'x = 50 kr.',
              'Ett paket skruv kostar 50 kr (och ett paket spik kostar 90 − 50 = 40 kr).'
            ]
          }
        },
        {
          id: 'm2-q12',
          difficulty: 'Begrepp',
          question: 'Två linjer har ekvationerna <span class="math-expr">y = 2x + 3</span> och <span class="math-expr">y = 2x − 5</span>. Hur många lösningar har ekvationssystemet som bildas av linjerna?',
          options: [
            { text: 'Saknar lösning (0 lösningar)', correct: true },
            { text: 'Exakt en unik lösning', correct: false },
            { text: 'Oändligt många lösningar', correct: false },
            { text: 'Två lösningar', correct: false }
          ],
          explanation: {
            summary: 'Linjer som har samma lutning men olika m-värden är parallella och skär aldrig varandra.',
            steps: [
              'Linje 1 har k = 2 och m = 3.',
              'Linje 2 har k = 2 och m = −5.',
              'Eftersom de har samma lutning (k₁ = k₂ = 2) är de parallella.',
              'Eftersom m₁ ≠ m₂ möts linjerna aldrig i något gemensamt värdepar (x, y).',
              'Ekvationssystemet saknar därför skärningspunkt och har 0 lösningar.'
            ]
          }
        }
      ]
    },
    {
      id: 'modul-3-potenser-pq-andragrad',
      title: 'Modul 3: Potenser & Andragradsfunktioner',
      badge: 'Prov Kap 2',
      icon: '📈',
      description: 'Potenslagar, kvadrerings- & konjugatreglerna, PQ-formeln, andragradsfunktionens graf och extrempunkter.',
      weeks: 'Vecka 48–v. 6',
      questions: [
        {
          id: 'm3-q1',
          difficulty: 'Grund',
          question: 'Förenkla uttrycket med hjälp av potenslagarna: <span class="math-expr">((2³)\u2074 · 2⁻⁵) / 2³</span>',
          options: [
            { text: '2⁴ = 16', correct: true },
            { text: '2⁷ = 128', correct: false },
            { text: '2² = 4', correct: false },
            { text: '2⁻⁴', correct: false }
          ],
          explanation: {
            summary: 'Tillämpa potenslagarna: (a^x)^y = a^(x·y), a^x · a^y = a^(x+y) och a^x / a^y = a^(x−y).',
            steps: [
              '(2³)\u2074 = 2^(3·4) = 2¹²',
              'Täljaren: 2¹² · 2⁻⁵ = 2^(12 − 5) = 2⁷',
              'Dela med nämnaren: 2⁷ / 2³ = 2^(7 − 3) = 2⁴',
              '2⁴ = 2 · 2 · 2 · 2 = 16'
            ]
          }
        },
        {
          id: 'm3-q2',
          difficulty: 'Grund',
          question: 'Utveckla och förenkla uttrycket: <span class="math-expr">(x + 4)² − (x − 3)(x + 3)</span>',
          options: [
            { text: '8x + 25', correct: true },
            { text: '8x + 7', correct: false },
            { text: '2x² + 8x + 7', correct: false },
            { text: '8x − 25', correct: false }
          ],
          explanation: {
            summary: 'Använd första kvadreringsregeln på (x + 4)² och konjugatregeln på (x − 3)(x + 3).',
            steps: [
              'Första kvadreringsregeln: (x + 4)² = x² + 2·x·4 + 4² = x² + 8x + 16',
              'Konjugatregeln: (x − 3)(x + 3) = x² − 3² = x² − 9',
              'Subtrahera: (x² + 8x + 16) − (x² − 9)',
              'Ta bort parentes med teckenbyte: x² + 8x + 16 − x² + 9 = 8x + 25'
            ]
          }
        },
        {
          id: 'm3-q3',
          difficulty: 'Medel',
          question: 'Lös andragradsekvationen med PQ-formeln: <span class="math-expr">x² − 8x + 12 = 0</span>',
          options: [
            { text: 'x₁ = 6, x₂ = 2', correct: true },
            { text: 'x₁ = −6, x₂ = −2', correct: false },
            { text: 'x₁ = 4, x₂ = −4', correct: false },
            { text: 'x₁ = 8, x₂ = 12', correct: false }
          ],
          explanation: {
            summary: 'PQ-formeln: x = −(p/2) ± √((p/2)² − q). Här är p = −8 och q = 12.',
            steps: [
              '−p/2 = −(−8/2) = 4',
              'Under rottecknet: (p/2)² − q = (−4)² − 12 = 16 − 12 = 4',
              'x = 4 ± √4  =>  x = 4 ± 2',
              'x₁ = 4 + 2 = 6',
              'x₂ = 4 − 2 = 2'
            ]
          }
        },
        {
          id: 'm3-q4',
          difficulty: 'Medel',
          question: 'Lös andragradsekvationen: <span class="math-expr">2x² + 12x − 14 = 0</span>',
          options: [
            { text: 'x₁ = 1, x₂ = −7', correct: true },
            { text: 'x₁ = 7, x₂ = −1', correct: false },
            { text: 'x₁ = 2, x₂ = −14', correct: false },
            { text: 'x₁ = 14, x₂ = −2', correct: false }
          ],
          explanation: {
            summary: 'Innan PQ-formeln kan användas MÅSTE koefficienten framför x² vara 1. Dividera därför hela ekvationen med 2 först.',
            steps: [
              'Dela alla termer med 2: x² + 6x − 7 = 0',
              'Nu är p = 6 och q = −7',
              'x = −(6/2) ± √((6/2)² − (−7)) = −3 ± √(9 + 7)',
              'x = −3 ± √16 = −3 ± 4',
              'x₁ = −3 + 4 = 1',
              'x₂ = −3 − 4 = −7'
            ]
          }
        },
        {
          id: 'm3-q5',
          difficulty: 'Grund',
          question: 'Lös andragradsekvationen med nollproduktmetoden: <span class="math-expr">3x(2x − 8) = 0</span>',
          options: [
            { text: 'x₁ = 0, x₂ = 4', correct: true },
            { text: 'x₁ = 3, x₂ = 8', correct: false },
            { text: 'x₁ = 0, x₂ = −4', correct: false },
            { text: 'x₁ = 0, x₂ = 8/3', correct: false }
          ],
          explanation: {
            summary: 'Nollproduktmetoden: Om en produkt av två faktorer är noll måste minst en faktor vara noll.',
            steps: [
              'Faktor 1: 3x = 0  =>  x₁ = 0',
              'Faktor 2: 2x − 8 = 0  =>  2x = 8  =>  x₂ = 4',
              'Rötterna är x₁ = 0 och x₂ = 4.'
            ]
          }
        },
        {
          id: 'm3-q6',
          difficulty: 'Fördjupning',
          question: 'För andragradsfunktionen <span class="math-expr">f(x) = x² − 6x + 5</span>, vad är symmetrilinjens ekvation och extrempunktens koordinater?',
          options: [
            { text: 'Symmetrilinje x = 3, minimipunkt (3, −4)', correct: true },
            { text: 'Symmetrilinje x = −3, minimipunkt (−3, 32)', correct: false },
            { text: 'Symmetrilinje x = 6, minimipunkt (6, 5)', correct: false },
            { text: 'Symmetrilinje x = 3, maximipunkt (3, −4)', correct: false }
          ],
          explanation: {
            summary: 'Symmetrilinjen ligger alltid vid x = −p/2. Eftersom koefficienten framför x² är positiv (a = 1 > 0) är kurvan U-formad och har en minimipunkt.',
            steps: [
              'Symmetrilinje: x = −(−6)/2 = 3',
              'Beräkna minimivärdet genom att sätta in x = 3 i f(x):',
              'f(3) = 3² − 6(3) + 5 = 9 − 18 + 5 = −4',
              'Extrempunkten är därför minimipunkten (3, −4).'
            ]
          }
        },
        {
          id: 'm3-q7',
          difficulty: 'Medel',
          question: 'Värdet på en moped minskar exponentiellt med 15% varje år. Inköpspriset var 20 000 kr. Vilken funktionsmodell beskriver mopedens värde <span class="math-expr">y</span> efter <span class="math-expr">x</span> år?',
          options: [
            { text: 'y = 20 000 · 0,85^x', correct: true },
            { text: 'y = 20 000 · 1,15^x', correct: false },
            { text: 'y = 20 000 − 0,15x', correct: false },
            { text: 'y = 20 000 · 0,15^x', correct: false }
          ],
          explanation: {
            summary: 'Exponentialfunktionen har formen y = C · a^x där C är startvärdet och a är förändringsfaktorn.',
            steps: [
              'Startvärde: C = 20 000 kr',
              'Minskning med 15% ger förändringsfaktorn: a = 1 − 0,15 = 0,85',
              'Modellen blir: y = 20 000 · 0,85^x'
            ]
          }
        },
        {
          id: 'm3-q8',
          difficulty: 'Medel',
          question: 'Lös exponentialekvationen med hjälp av tiologaritmer: <span class="math-expr">3 · 2^x = 48</span>',
          options: [
            { text: 'x = 4', correct: true },
            { text: 'x = 8', correct: false },
            { text: 'x = 16', correct: false },
            { text: 'x = 2', correct: false }
          ],
          explanation: {
            summary: 'Isolera potensen 2^x först genom att dividera med 3, och logaritmera sedan båda sidor.',
            steps: [
              'Dividera båda sidor med 3: 2^x = 48 / 3 = 16',
              'Logaritmera båda led: lg(2^x) = lg(16)',
              'Flytta ner exponenten: x · lg(2) = lg(16)',
              'Beräkna x: x = lg(16) / lg(2) = 4 (eftersom 2⁴ = 16)'
            ]
          }
        }
      ]
    },
    {
      id: 'modul-4-geometri-statistik',
      title: 'Modul 4: Geometri & Statistik',
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
              'Δx = 4 − 1 = 3',
              'Δy = 6 − 2 = 4',
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
              'Tredje inre vinkeln: 180° − (45° + 70°) = 180° − 115° = 65°',
              'Yttervinkeln = 180° − 65° = 115° (vilket är lika med 45° + 70° enligt yttervinkelsatsen).'
            ]
          }
        },
        {
          id: 'm4-q4',
          difficulty: 'Medel',
          question: 'En talserie med månadslöner (i tusen kr) är: <span class="math-expr">24, 26, 27, 28, 30, 31, 98</span>. Vilket lägesmått ger den mest representativa bilden av typiska lönen, och vad är medianen?',
          options: [
            { text: 'Medianen (28 tkr), eftersom den inte snedvrids av det extrema värdet 98 tkr', correct: true },
            { text: 'Medelvärdet (37,7 tkr), eftersom alla observationer räknas med', correct: false },
            { text: 'Typvärdet (24 tkr)', correct: false },
            { text: 'Variationsbredden (74 tkr)', correct: false }
          ],
          explanation: {
            summary: 'Medianen är det mittersta värdet i en sorterad datamängd och är okänslig för extremvärden.',
            steps: [
              'Talserien har 7 värden och är redan sorterad: 24, 26, 27, [28], 30, 31, 98.',
              'Mittersta värdet (position 4) är 28 tkr.',
              'Medelvärdet är (24+26+27+28+30+31+98)/7 = 264/7 ≈ 37,7 tkr, vilket ger en missvisande hög bild på grund av extremvärdet 98.'
            ]
          }
        },
        {
          id: 'm4-q5',
          difficulty: 'Medel',
          question: 'Ett lådagram visar att undre kvartilen är <span class="math-expr">Q₁ = 14</span> och övre kvartilen är <span class="math-expr">Q₃ = 26</span>. Vad är kvartilavståndet och vad beskriver det?',
          options: [
            { text: 'Kvartilavståndet är 12 och rymmer de mittersta 50% av observationerna', correct: true },
            { text: 'Kvartilavståndet är 20 och rymmer 100% av observationerna', correct: false },
            { text: 'Kvartilavståndet är 12 och visar medelvärdet', correct: false },
            { text: 'Kvartilavståndet är 40', correct: false }
          ],
          explanation: {
            summary: 'Kvartilavståndet (IQR) är skillnaden mellan övre och undre kvartilen: IQR = Q₃ − Q₁.',
            steps: [
              'IQR = Q₃ − Q₁ = 26 − 14 = 12',
              'Mellan Q₁ och Q₃ ligger exakt hälften (50%) av alla mätvärden.',
              'Lådans bredd i ett lådagram motsvarar just kvartilavståndet.'
            ]
          }
        },
        {
          id: 'm4-q6',
          difficulty: 'Medel',
          question: 'Längden hos en grupp gymnasieelever är normalfördelad med medelvärdet <span class="math-expr">μ = 175</span> cm och standardavvikelsen <span class="math-expr">σ = 6</span> cm. Ungefär hur stor andel av eleverna är mellan <span class="math-expr">169</span> cm och <span class="math-expr">181</span> cm långa?',
          options: [
            { text: 'Cirka 68,2%', correct: true },
            { text: 'Cirka 95,4%', correct: false },
            { text: 'Cirka 50,0%', correct: false },
            { text: 'Cirka 34,1%', correct: false }
          ],
          explanation: {
            summary: 'I en normalfördelning ligger cirka 68,2% av observationerna inom ±1 standardavvikelse från medelvärdet (μ ± 1σ).',
            steps: [
              'Undre gräns: μ − 1σ = 175 − 6 = 169 cm',
              'Övre gräns: μ + 1σ = 175 + 6 = 181 cm',
              'Intervallet [169, 181] motsvarar exakt [μ − σ, μ + σ], vilket enligt normalfördelningens regler innehåller cirka 68,2% av observationerna.'
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
            summary: 'Under medelvärdet ligger 50% av fördelningen. Mellan medelvärdet och +1 standardavvikelse ligger ytterligare ca 34,1%.',
            steps: [
              'Andel under medelvärdet (μ) = 50%',
              'Andel mellan μ och μ + 1σ = 34,1%',
              'Total andel under μ + 1σ = 50% + 34,1% = 84,1% ≈ 84%',
              'Poängen för 84:e percentilen = μ + 1σ = 50 + 10 = 60 poäng.'
            ]
          }
        },
        {
          id: 'm4-q8',
          difficulty: 'Medel',
          question: 'En förpackning förstoras så att alla dess sidor görs <strong>3 gånger så långa</strong> (längdskalan är 3 : 1). Hur många gånger större blir förpackningens <strong>volym</strong>?',
          options: [
            { text: '27 gånger större (3³ = 27)', correct: true },
            { text: '9 gånger större (3² = 9)', correct: false },
            { text: '3 gånger större (lika med längdskalan)', correct: false },
            { text: '6 gånger större', correct: false }
          ],
          explanation: {
            summary: 'Vid geometrisk förstoring/förminskning är volymskalan lika med längdskalan upphöjt till 3: Volymskala = (Längdskala)³.',
            steps: [
              'Längdskalan är k = 3.',
              'Areaskalan motsvarar k² = 3² = 9 (ytarean ökar med 9 gånger).',
              'Volymskalan motsvarar k³ = 3³ = 3 · 3 · 3 = 27 (volymen rymmer 27 gånger mer).',
              'Detta samband mellan längd-, area- och volymskala är ett centralt kunskapsmål i Matematik 2a.'
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

  function bindElements() {
    topicGridEl = document.getElementById('mat2a-topic-selector-grid');
    quizContainerEl = document.getElementById('single-module-quiz-container') || document.getElementById('mat2a-quiz-container');
    quizTopicTitleEl = document.getElementById('single-module-topic-title') || document.getElementById('mat2a-quiz-topic-title');
    questionProgressTextEl = document.getElementById('single-module-progress-text') || document.getElementById('mat2a-question-progress-text');
    quizProgressFillEl = document.getElementById('single-module-progress-fill') || document.getElementById('mat2a-quiz-progress-fill');
    quizCardContentEl = document.getElementById('single-module-card-content') || document.getElementById('mat2a-quiz-card-content');
  }

  const PROGRESS_KEY_PREFIX = 'hakan_m2a_progress_';

  function saveProgress(topicId, score, total, percentage) {
    try {
      localStorage.setItem(PROGRESS_KEY_PREFIX + topicId, JSON.stringify({
        topicId,
        score,
        total,
        percentage,
        timestamp: Date.now()
      }));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }

  function getProgress(topicId) {
    try {
      const data = localStorage.getItem(PROGRESS_KEY_PREFIX + topicId);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  function resetProgress(topicId) {
    try {
      localStorage.removeItem(PROGRESS_KEY_PREFIX + topicId);
      bindElements();
      if (topicGridEl) renderTopics();
      updateOverviewBadges();
    } catch (e) {}
  }

  function updateOverviewBadges() {
    MAT2A_TOPICS.forEach((topic, idx) => {
      const prog = getProgress(topic.id);
      const link = document.querySelector(`.modules-grid .module-card a[href*="modul-${idx + 1}.html"]`);
      if (link) {
        const card = link.closest('.module-card');
        if (card) {
          let badgeEl = card.querySelector('.progress-badge-pill');
          if (prog) {
            if (!badgeEl) {
              badgeEl = document.createElement('span');
              badgeEl.className = 'progress-badge-pill';
              const headerBox = card.querySelector('div[style*="justify-content: space-between"]') || card.querySelector('div');
              if (headerBox) {
                headerBox.appendChild(badgeEl);
              }
            }
            badgeEl.innerHTML = `✓ ${prog.score}/${prog.total} (${prog.percentage}%)${prog.percentage === 100 ? ' ⭐' : ''}`;
          } else if (badgeEl) {
            badgeEl.remove();
          }
        }
      }
    });
  }

  function triggerMathRender(container) {
    if (window.renderMathInElement) {
      try {
        window.renderMathInElement(container || document.body, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false }
          ],
          throwOnError: false
        });
      } catch (err) {
        // Fallback gracefull
      }
    }
  }

  let keyboardInitialized = false;
  function initKeyboardNav() {
    if (keyboardInitialized) return;
    keyboardInitialized = true;

    window.addEventListener('keydown', (e) => {
      const activeEl = document.activeElement;
      const tag = activeEl ? activeEl.tagName.toLowerCase() : '';
      if (tag === 'input' || tag === 'textarea' || tag === 'select' || activeEl?.isContentEditable) return;

      if (currentTopicIndex < 0 || currentTopicIndex >= MAT2A_TOPICS.length) return;
      const topic = MAT2A_TOPICS[currentTopicIndex];
      if (!topic || currentQuestionIndex >= topic.questions.length) return;
      const q = topic.questions[currentQuestionIndex];
      if (!q) return;

      if (!isAnswered) {
        let optIdx = -1;
        if (e.key === '1' || e.code === 'Digit1') optIdx = 0;
        else if (e.key === '2' || e.code === 'Digit2') optIdx = 1;
        else if (e.key === '3' || e.code === 'Digit3') optIdx = 2;
        else if (e.key === '4' || e.code === 'Digit4') optIdx = 3;
        else if (e.key.toLowerCase() === 'a') optIdx = 0;
        else if (e.key.toLowerCase() === 'b') optIdx = 1;
        else if (e.key.toLowerCase() === 'c') optIdx = 2;
        else if (e.key.toLowerCase() === 'd') optIdx = 3;

        if (optIdx >= 0 && optIdx < q.options.length) {
          e.preventDefault();
          handleOptionSelect(optIdx);
        }
      } else {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          nextQuestion();
        }
      }
    });
  }

  function initQuizEngine() {
    bindElements();
    initKeyboardNav();
    updateOverviewBadges();

    // Render KaTeX for theory sections and formulas
    triggerMathRender(document.body);
    document.querySelectorAll('.theory-accordion').forEach(details => {
      details.addEventListener('toggle', () => {
        if (details.open) {
          triggerMathRender(details);
        }
      });
    });

    // Check if the page is a standalone single module subpage
    const bodyModuleAttr = document.body.getAttribute('data-module-index');
    if (bodyModuleAttr !== null && bodyModuleAttr !== undefined && bodyModuleAttr !== '') {
      const modIdx = parseInt(bodyModuleAttr, 10);
      if (!isNaN(modIdx) && modIdx >= 0 && modIdx < MAT2A_TOPICS.length) {
        initSingleModule(modIdx);
        return;
      }
    }

    if (topicGridEl && quizContainerEl) {
      renderTopics();
      selectTopic(0, false); // initial view without scrolling
    }
  }

  function initSingleModule(topicIndex) {
    bindElements();
    initKeyboardNav();
    currentTopicIndex = topicIndex;
    currentQuestionIndex = 0;
    userAnswers = [];
    isAnswered = false;

    if (!quizContainerEl || !quizCardContentEl) return;

    quizContainerEl.classList.add('visible');
    quizContainerEl.style.display = 'block';
    loadQuestion();
  }

  function renderTopics() {
    bindElements();
    if (!topicGridEl) return;
    topicGridEl.innerHTML = '';

    MAT2A_TOPICS.forEach((topic, index) => {
      const card = document.createElement('div');
      card.className = `topic-card ${index === currentTopicIndex ? 'active' : ''}`;
      card.onclick = () => selectTopic(index, true);

      const prog = getProgress(topic.id);
      const progBadge = prog 
        ? `<span class="progress-badge-pill">✓ ${prog.score}/${prog.total} (${prog.percentage}%)${prog.percentage === 100 ? ' ⭐' : ''}</span>`
        : '';

      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem;">
          <div class="topic-icon">${topic.icon}</div>
          <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 0.25rem;">
            <span class="topic-badge-pill">${escapeHtml(topic.badge)}</span>
            ${progBadge}
          </div>
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

    if (topicGridEl) renderTopics();
    loadQuestion();

    if (quizContainerEl) {
      quizContainerEl.classList.add('visible');
      if (shouldScroll) {
        quizContainerEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  let currentShuffledOptions = [];

  function shuffleArray(arr) {
    const copy = arr.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = copy[i];
      copy[i] = copy[j];
      copy[j] = tmp;
    }
    return copy;
  }

  function loadQuestion() {
    const topic = MAT2A_TOPICS[currentTopicIndex];
    const q = topic.questions[currentQuestionIndex];
    isAnswered = false;
    currentShuffledOptions = shuffleArray(q.options);

    if (quizTopicTitleEl) quizTopicTitleEl.textContent = `${topic.icon} ${topic.title}`;
    if (questionProgressTextEl) questionProgressTextEl.textContent = `Fråga ${currentQuestionIndex + 1} av ${topic.questions.length}`;

    if (quizProgressFillEl) {
      const progressPercent = (currentQuestionIndex / topic.questions.length) * 100;
      quizProgressFillEl.style.width = `${progressPercent}%`;
    }

    let optionsHTML = '';
    currentShuffledOptions.forEach((opt, idx) => {
      optionsHTML += `
        <button class="option-btn" onclick="window.Mat2aQuiz.handleOptionSelect(${idx})" id="m2a-opt-btn-${idx}">
          <div style="display: flex; align-items: center;">
            <span class="opt-key-badge">${idx + 1}</span>
            <span>${opt.text}</span>
          </div>
          <span class="opt-indicator" id="m2a-opt-ind-${idx}"></span>
        </button>
      `;
    });

    const diffBadge = q.difficulty ? `<span class="difficulty-pill ${q.difficulty.toLowerCase()}">${q.difficulty}</span>` : '';

    if (quizCardContentEl) {
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
            ${currentQuestionIndex === topic.questions.length - 1 ? 'Visa modulresultat 🏁 (Enter)' : 'Nästa fråga ➔ (Enter)'}
          </button>
        </div>
      `;
      triggerMathRender(quizCardContentEl);
    }
  }

  function handleOptionSelect(selectedIndex) {
    if (isAnswered) return;
    isAnswered = true;

    const topic = MAT2A_TOPICS[currentTopicIndex];
    const q = topic.questions[currentQuestionIndex];
    const options = currentShuffledOptions.length ? currentShuffledOptions : q.options;
    const selectedOpt = options[selectedIndex];
    const isCorrect = selectedOpt.correct;

    userAnswers.push({ questionId: q.id, isCorrect: isCorrect, selectedIndex: selectedIndex });

    options.forEach((opt, idx) => {
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
      triggerMathRender(feedbackPanel);
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

    // Spara i LocalStorage
    saveProgress(topic.id, correctCount, totalCount, percentage);
    updateOverviewBadges();

    if (quizProgressFillEl) quizProgressFillEl.style.width = '100%';
    if (questionProgressTextEl) questionProgressTextEl.textContent = 'Modul Slutförd!';

    let feedbackMsg = '';
    if (percentage === 100) {
      feedbackMsg = '🌟 Perfekt resultat! Du har fullständig förståelse för momenten i denna del av kursplaneringen.';
    } else if (percentage >= 70) {
      feedbackMsg = '👍 Mycket bra! Du behärskar de flesta centrala begrepp och metoder väl.';
    } else {
      feedbackMsg = '💪 Bra repetition! Gå gärna igenom de pedagogiska steg-för-steg-lösningarna och gör om modulen för att befästa kunskaperna inför provet.';
    }

    const isStandalone = document.body.getAttribute('data-module-index') !== null;
    const nextModulHref = `modul-${currentTopicIndex + 2}.html`;

    let nextButtonHTML = '';
    if (currentTopicIndex < MAT2A_TOPICS.length - 1) {
      if (isStandalone) {
        nextButtonHTML = `
          <a href="${nextModulHref}" class="filter-btn active" style="padding: 0.75rem 1.5rem; font-size: 0.95rem; text-decoration: none; display: inline-flex; align-items: center; gap: 0.4rem;">
            Nästa modul: ${escapeHtml(MAT2A_TOPICS[currentTopicIndex + 1].badge)} ➔
          </a>
        `;
      } else {
        nextButtonHTML = `
          <button class="filter-btn active" style="padding: 0.75rem 1.5rem; font-size: 0.95rem;" onclick="window.Mat2aQuiz.selectTopic(${currentTopicIndex + 1})">
            Nästa modul: ${escapeHtml(MAT2A_TOPICS[currentTopicIndex + 1].badge)} ➔
          </button>
        `;
      }
    } else if (isStandalone) {
      nextButtonHTML = `
        <a href="index.html" class="filter-btn active" style="padding: 0.75rem 1.5rem; font-size: 0.95rem; text-decoration: none; display: inline-flex; align-items: center; gap: 0.4rem;">
          📚 Tillbaka till översikten ➔
        </a>
      `;
    }

    if (quizCardContentEl) {
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

          <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-bottom: 1.5rem;">
            <button class="next-btn" onclick="window.Mat2aQuiz.selectTopic(${currentTopicIndex})">
              🔄 Gör om denna modul
            </button>
            ${nextButtonHTML}
          </div>

          <div>
            <button class="reset-progress-btn" onclick="window.Mat2aQuiz.resetProgress('${topic.id}'); window.Mat2aQuiz.selectTopic(${currentTopicIndex});">
              🗑️ Nollställ sparad poäng för denna modul
            </button>
          </div>
        </div>
      `;
      triggerMathRender(quizCardContentEl);
    }
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
    initSingleModule,
    selectTopic,
    handleOptionSelect,
    nextQuestion,
    resetProgress,
    getProgress,
    updateOverviewBadges,
    TOPICS: MAT2A_TOPICS
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initQuizEngine);
  } else {
    initQuizEngine();
  }

})();
