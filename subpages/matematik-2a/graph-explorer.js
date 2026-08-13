/**
 * ============================================================================
 * MATEMATIK 2A - FUNKTIONER & GRAFER (graph-explorer.js)
 * Interaktiva reglage för y = kx + m och y = ax² + bx + c samt GeoGebra-koppling
 * ============================================================================
 */

(function () {
  'use strict';

  // State för linjär funktion y = kx + m
  const linearState = {
    k: 1.5,
    m: -2
  };

  // State för andragradsfunktion y = ax² + bx + c
  const quadState = {
    a: 1,
    b: -2,
    c: -3
  };

  let activeTab = 'linear'; // 'linear', 'quadratic', 'geogebra'

  // --------------------------------------------------------------------------
  // 1. INITIERING
  // --------------------------------------------------------------------------
  function initGraphExplorer() {
    initTabs();
    initLinearControls();
    initQuadControls();
    initGeoGebraApplet();

    // Stoppa propagering på touch-händelser för att förhindra zoom vid drag i reglage
    document.querySelectorAll('input[type="range"]').forEach(slider => {
      slider.addEventListener('touchstart', (e) => { e.stopPropagation(); }, { passive: true });
      slider.addEventListener('touchmove', (e) => { e.stopPropagation(); }, { passive: true });
    });

    // Inledande beräkning och ritning
    updateLinearView();
    updateQuadView();

    window.addEventListener('resize', () => {
      if (activeTab === 'linear') drawLinearCanvas();
      if (activeTab === 'quadratic') drawQuadCanvas();
    });
  }

  // --------------------------------------------------------------------------
  // 2. FLIK-VÄXLING (TABS)
  // --------------------------------------------------------------------------
  function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        document.querySelectorAll('.tab-content').forEach(content => {
          content.style.display = 'none';
        });

        const targetEl = document.getElementById(`tab-${targetTab}`);
        if (targetEl) {
          targetEl.style.display = 'block';
        }

        activeTab = targetTab;

        // Vänta tills webbläsaren beräknat den nya flikens layout
        setTimeout(() => {
          if (activeTab === 'linear') drawLinearCanvas();
          if (activeTab === 'quadratic') drawQuadCanvas();
        }, 20);
      });
    });
  }

  // --------------------------------------------------------------------------
  // 3. RÄTA LINJEN (y = kx + m)
  // --------------------------------------------------------------------------
  function initLinearControls() {
    const kSlider = document.getElementById('slider-k');
    const mSlider = document.getElementById('slider-m');
    const kInput = document.getElementById('num-k');
    const mInput = document.getElementById('num-m');

    if (!kSlider || !mSlider) return;

    const syncK = (val) => {
      linearState.k = parseFloat(val) || 0;
      kSlider.value = linearState.k;
      if (kInput) kInput.value = linearState.k;
      const valEl = document.getElementById('val-k');
      if (valEl) valEl.textContent = formatNum(linearState.k);
      updateLinearView();
    };

    const syncM = (val) => {
      linearState.m = parseFloat(val) || 0;
      mSlider.value = linearState.m;
      if (mInput) mInput.value = linearState.m;
      const valEl = document.getElementById('val-m');
      if (valEl) valEl.textContent = formatNum(linearState.m);
      updateLinearView();
    };

    kSlider.addEventListener('input', (e) => syncK(e.target.value));
    mSlider.addEventListener('input', (e) => syncM(e.target.value));
    if (kInput) kInput.addEventListener('input', (e) => syncK(e.target.value));
    if (mInput) mInput.addEventListener('input', (e) => syncM(e.target.value));

    // Preset-knappar för räta linjen
    document.querySelectorAll('.preset-linear-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const k = btn.getAttribute('data-k');
        const m = btn.getAttribute('data-m');
        syncK(k);
        syncM(m);
      });
    });
  }

  function updateLinearView() {
    const { k, m } = linearState;

    // Formatera ekvation y = kx + m
    let eqText = 'y = ';
    if (k === 0) {
      eqText += `${formatNum(m)}`;
    } else {
      if (k === 1) eqText += 'x';
      else if (k === -1) eqText += '-x';
      else eqText += `${formatNum(k)}x`;

      if (m > 0) eqText += ` + ${formatNum(m)}`;
      else if (m < 0) eqText += ` - ${formatNum(Math.abs(m))}`;
    }

    document.querySelectorAll('.linear-eq-display').forEach(el => el.innerHTML = eqText);

    // Egenskaper
    const yInterceptText = `(0, ${formatNum(m)})`;
    let xInterceptText = 'Saknas (Parallell med x-axeln)';
    let slopeType = 'Horisontell (Konstant)';
    let angleDeg = 0;

    if (k !== 0) {
      const xZero = -m / k;
      xInterceptText = `(${formatNum(xZero)}, 0)`;
      slopeType = k > 0 ? 'Växande (Positiv lutning)' : 'Avtagande (Negativ lutning)';
      angleDeg = (Math.atan(k) * 180 / Math.PI).toFixed(1);
    }

    const yInterceptEl = document.getElementById('linear-y-intercept');
    const xInterceptEl = document.getElementById('linear-x-intercept');
    const slopeTypeEl = document.getElementById('linear-slope-type');
    const angleEl = document.getElementById('linear-angle');

    if (yInterceptEl) yInterceptEl.textContent = yInterceptText;
    if (xInterceptEl) xInterceptEl.textContent = xInterceptText;
    if (slopeTypeEl) slopeTypeEl.textContent = slopeType;
    if (angleEl) angleEl.textContent = `${angleDeg}°`;

    // Uppdatera värdetabell
    updateTable('linear-table-body', (x) => k * x + m);

    // Uppdatera Canvas
    drawLinearCanvas();

    // Uppdatera GeoGebra om tillgängligt
    updateGeoGebraLinear(k, m);
  }

  // --------------------------------------------------------------------------
  // CANVASTECKNINGSMOTOR (STABIL & SMIDIG RENDERING UTAN LAYOUT-REFLOW)
  // --------------------------------------------------------------------------
  function prepareCanvas(canvasId, targetHeight = 300) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return null;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    let width = canvas.clientWidth;
    if (!width || width < 100) {
      if (canvas.parentElement && canvas.parentElement.clientWidth > 100) {
        width = canvas.parentElement.clientWidth;
      } else {
        width = 600;
      }
    }
    const height = targetHeight;

    const expectedWidth = Math.floor(width * dpr);
    const expectedHeight = Math.floor(height * dpr);

    if (canvas.width !== expectedWidth || canvas.height !== expectedHeight) {
      canvas.width = expectedWidth;
      canvas.height = expectedHeight;
    }

    if (typeof ctx.resetTransform === 'function') {
      ctx.resetTransform();
    } else {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    return { canvas, ctx, width, height };
  }

  function drawLinearCanvas() {
    const prep = prepareCanvas('linearCanvas', 300);
    if (!prep) return;

    const { ctx, width, height } = prep;
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)';
    const axisColor = isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)';
    const lineColor = '#38bdf8';
    const textColor = isDark ? '#94a3b8' : '#475569';

    const { k, m } = linearState;
    const minX = -10, maxX = 10;
    const minY = -10, maxY = 10;

    const toX = (x) => ((x - minX) / (maxX - minX)) * width;
    const toY = (y) => height - ((y - minY) / (maxY - minY)) * height;

    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.clip();

    // Rutnät
    ctx.lineWidth = 1;
    ctx.strokeStyle = gridColor;
    for (let x = minX; x <= maxX; x += 2) {
      const sx = toX(x);
      ctx.beginPath(); ctx.moveTo(sx, 0); ctx.lineTo(sx, height); ctx.stroke();
    }
    for (let y = minY; y <= maxY; y += 2) {
      const sy = toY(y);
      ctx.beginPath(); ctx.moveTo(0, sy); ctx.lineTo(width, sy); ctx.stroke();
    }

    // Axlar
    ctx.strokeStyle = axisColor;
    ctx.lineWidth = 1.5;
    const origY = toY(0);
    const origX = toX(0);
    if (origY >= 0 && origY <= height) { ctx.beginPath(); ctx.moveTo(0, origY); ctx.lineTo(width, origY); ctx.stroke(); }
    if (origX >= 0 && origX <= width) { ctx.beginPath(); ctx.moveTo(origX, 0); ctx.lineTo(origX, height); ctx.stroke(); }

    // Rita linje y = kx + m
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 3;
    const y1 = k * minX + m;
    const y2 = k * maxX + m;
    ctx.beginPath();
    ctx.moveTo(toX(minX), toY(y1));
    ctx.lineTo(toX(maxX), toY(y2));
    ctx.stroke();

    // Marker m-punkt (0, m)
    const syM = toY(m);
    if (origX >= 0 && origX <= width && syM >= 0 && syM <= height) {
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(origX, syM, 6, 0, Math.PI * 2);
      ctx.fill();
    }

    // Markera nollställe (-m/k, 0)
    if (k !== 0) {
      const xZero = -m / k;
      const sxZero = toX(xZero);
      if (sxZero >= 0 && sxZero <= width && origY >= 0 && origY <= height) {
        ctx.fillStyle = '#f43f5e';
        ctx.beginPath();
        ctx.arc(sxZero, origY, 6, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.restore();

    ctx.fillStyle = textColor;
    ctx.font = '12px var(--font-mono)';
    ctx.fillText(`y = ${formatNum(k)}x + ${formatNum(m)}`, 14, 24);
  }

  // --------------------------------------------------------------------------
  // 4. ANDRAGRADSFUNKTION (y = ax² + bx + c)
  // --------------------------------------------------------------------------
  function initQuadControls() {
    const aSlider = document.getElementById('slider-a');
    const bSlider = document.getElementById('slider-b');
    const cSlider = document.getElementById('slider-c');
    const aInput = document.getElementById('num-a');
    const bInput = document.getElementById('num-b');
    const cInput = document.getElementById('num-c');

    if (!aSlider || !bSlider || !cSlider) return;

    const syncA = (val) => {
      quadState.a = parseFloat(val) || 0.1;
      aSlider.value = quadState.a;
      if (aInput) aInput.value = quadState.a;
      const valEl = document.getElementById('val-a');
      if (valEl) valEl.textContent = formatNum(quadState.a);
      updateQuadView();
    };

    const syncB = (val) => {
      quadState.b = parseFloat(val) || 0;
      bSlider.value = quadState.b;
      if (bInput) bInput.value = quadState.b;
      const valEl = document.getElementById('val-b');
      if (valEl) valEl.textContent = formatNum(quadState.b);
      updateQuadView();
    };

    const syncC = (val) => {
      quadState.c = parseFloat(val) || 0;
      cSlider.value = quadState.c;
      if (cInput) cInput.value = quadState.c;
      const valEl = document.getElementById('val-c');
      if (valEl) valEl.textContent = formatNum(quadState.c);
      updateQuadView();
    };

    aSlider.addEventListener('input', (e) => syncA(e.target.value));
    bSlider.addEventListener('input', (e) => syncB(e.target.value));
    cSlider.addEventListener('input', (e) => syncC(e.target.value));

    if (aInput) aInput.addEventListener('input', (e) => syncA(e.target.value));
    if (bInput) bInput.addEventListener('input', (e) => syncB(e.target.value));
    if (cInput) cInput.addEventListener('input', (e) => syncC(e.target.value));

    // Preset-knappar för parabel
    document.querySelectorAll('.preset-quad-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        syncA(btn.getAttribute('data-a'));
        syncB(btn.getAttribute('data-b'));
        syncC(btn.getAttribute('data-c'));
      });
    });
  }

  function updateQuadView() {
    const { a, b, c } = quadState;

    // Formatera ekvation y = ax² + bx + c
    let eqText = 'y = ';
    if (a === 1) eqText += 'x²';
    else if (a === -1) eqText += '-x²';
    else eqText += `${formatNum(a)}x²`;

    if (b > 0) eqText += ` + ${b === 1 ? '' : formatNum(b)}x`;
    else if (b < 0) eqText += ` - ${b === -1 ? '' : formatNum(Math.abs(b))}x`;

    if (c > 0) eqText += ` + ${formatNum(c)}`;
    else if (c < 0) eqText += ` - ${formatNum(Math.abs(c))}`;

    document.querySelectorAll('.quad-eq-display').forEach(el => el.innerHTML = eqText);

    // Vändpunkt / Vertex
    const vx = a !== 0 ? -b / (2 * a) : 0;
    const vy = a * vx * vx + b * vx + c;
    const vertexType = a > 0 ? 'Minimipunkt (Glad munn 😊)' : 'Maximipunkt (Sur munn ☹️)';

    // Diskriminant D = b² - 4ac
    const disc = b * b - 4 * a * c;
    let rootsText = '';

    if (disc > 0) {
      const r1 = (-b + Math.sqrt(disc)) / (2 * a);
      const r2 = (-b - Math.sqrt(disc)) / (2 * a);
      rootsText = `2 reella nollställen: x₁ = ${formatNum(r1)}, x₂ = ${formatNum(r2)}`;
    } else if (disc === 0) {
      const r = -b / (2 * a);
      rootsText = `1 dubbelrot: x = ${formatNum(r)}`;
    } else {
      rootsText = `Inga reella nollställen (D = ${formatNum(disc)} < 0)`;
    }

    const vertexEl = document.getElementById('quad-vertex');
    const symEl = document.getElementById('quad-sym');
    const shapeEl = document.getElementById('quad-shape');
    const rootsEl = document.getElementById('quad-roots');

    if (vertexEl) vertexEl.textContent = `(${formatNum(vx)}, ${formatNum(vy)})`;
    if (symEl) symEl.textContent = `x = ${formatNum(vx)}`;
    if (shapeEl) shapeEl.textContent = vertexType;
    if (rootsEl) rootsEl.textContent = rootsText;

    // Uppdatera värdetabell
    updateTable('quad-table-body', (x) => a * x * x + b * x + c);

    // Uppdatera Canvas
    drawQuadCanvas();

    // Uppdatera GeoGebra om tillgängligt
    updateGeoGebraQuad(a, b, c);
  }

  function drawQuadCanvas() {
    const prep = prepareCanvas('quadCanvas', 300);
    if (!prep) return;

    const { ctx, width, height } = prep;
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)';
    const axisColor = isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)';
    const curveColor = '#a855f7';
    const textColor = isDark ? '#94a3b8' : '#475569';

    const { a, b, c } = quadState;
    const vx = a !== 0 ? -b / (2 * a) : 0;
    const vy = a * vx * vx + b * vx + c;

    // Fast koordinatsystem så att nät och axlar står helt still när kurvan rör sig
    const minX = -10, maxX = 10;
    const minY = -10, maxY = 10;

    const toX = (x) => ((x - minX) / (maxX - minX)) * width;
    const toY = (y) => height - ((y - minY) / (maxY - minY)) * height;

    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.clip();

    // Rutnät
    ctx.lineWidth = 1;
    ctx.strokeStyle = gridColor;
    for (let x = Math.ceil(minX); x <= Math.floor(maxX); x += 2) {
      const sx = toX(x);
      ctx.beginPath(); ctx.moveTo(sx, 0); ctx.lineTo(sx, height); ctx.stroke();
    }
    for (let y = Math.ceil(minY); y <= Math.floor(maxY); y += 2) {
      const sy = toY(y);
      ctx.beginPath(); ctx.moveTo(0, sy); ctx.lineTo(width, sy); ctx.stroke();
    }

    // Axlar
    ctx.strokeStyle = axisColor;
    ctx.lineWidth = 1.5;
    const origY = toY(0);
    const origX = toX(0);
    if (origY >= 0 && origY <= height) { ctx.beginPath(); ctx.moveTo(0, origY); ctx.lineTo(width, origY); ctx.stroke(); }
    if (origX >= 0 && origX <= width) { ctx.beginPath(); ctx.moveTo(origX, 0); ctx.lineTo(origX, height); ctx.stroke(); }

    // Symmetrilinje
    const symX = toX(vx);
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.6)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(symX, 0); ctx.lineTo(symX, height); ctx.stroke();
    ctx.setLineDash([]);

    // Parabel (Rita smidig kurva)
    ctx.strokeStyle = curveColor;
    ctx.lineWidth = 3;
    ctx.beginPath();
    const step = (maxX - minX) / 160;
    let started = false;
    for (let x = minX; x <= maxX; x += step) {
      const y = a * x * x + b * x + c;
      const sx = toX(x);
      const sy = toY(y);
      if (!started) { ctx.moveTo(sx, sy); started = true; }
      else { ctx.lineTo(sx, sy); }
    }
    ctx.stroke();

    // Vändpunkt
    const svx = toX(vx);
    const svy = toY(vy);
    if (svx >= 0 && svx <= width && svy >= 0 && svy <= height) {
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(svx, svy, 6, 0, Math.PI * 2);
      ctx.fill();
    }

    // Nollställen
    const disc = b * b - 4 * a * c;
    if (disc >= 0 && a !== 0) {
      const r1 = (-b + Math.sqrt(disc)) / (2 * a);
      const r2 = (-b - Math.sqrt(disc)) / (2 * a);
      [r1, r2].forEach(r => {
        const rx = toX(r);
        const ry = toY(0);
        if (rx >= 0 && rx <= width && ry >= 0 && ry <= height) {
          ctx.fillStyle = '#f43f5e';
          ctx.beginPath();
          ctx.arc(rx, ry, 5, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    }

    ctx.restore();

    ctx.fillStyle = textColor;
    ctx.font = '12px var(--font-mono)';
    ctx.fillText(`y = ${formatNum(a)}x² + ${formatNum(b)}x + ${formatNum(c)}`, 14, 24);
  }

  // --------------------------------------------------------------------------
  // 5. GEOGEBRA INTEGRATION
  // --------------------------------------------------------------------------
  let ggbApplet = null;

  function initGeoGebraApplet() {
    const container = document.getElementById('geogebra-container');
    if (!container) return;

    // Om GeoGebra API skript laddats
    if (window.GGBApplet) {
      const params = {
        "appName": "graphing",
        "width": 800,
        "height": 500,
        "showToolBar": true,
        "showAlgebraInput": true,
        "showMenuBar": false,
        "enableLabelDrags": false,
        "enableShiftDragZoom": true,
        "enableRightClick": false,
        "capturingThreshold": null,
        "showResetIcon": true,
        "language": "sv",
        "useBrowserForJS": true
      };

      ggbApplet = new window.GGBApplet(params, true);
      ggbApplet.inject('geogebra-container');
    }
  }

  function updateGeoGebraLinear(k, m) {
    if (window.ggbApplet && typeof window.ggbApplet.evalCommand === 'function') {
      window.ggbApplet.evalCommand(`f(x) = ${k} * x + ${m}`);
    }
  }

  function updateGeoGebraQuad(a, b, c) {
    if (window.ggbApplet && typeof window.ggbApplet.evalCommand === 'function') {
      window.ggbApplet.evalCommand(`g(x) = ${a} * x^2 + ${b} * x + ${c}`);
    }
  }

  // --------------------------------------------------------------------------
  // HJÄLPFUNKTIONER
  // --------------------------------------------------------------------------
  function updateTable(tableBodyId, fn) {
    const tbody = document.getElementById(tableBodyId);
    if (!tbody) return;

    const xVals = [-3, -2, -1, 0, 1, 2, 3];
    tbody.innerHTML = xVals.map(x => {
      const y = fn(x);
      return `
        <tr>
          <td style="padding: 0.4rem 0.8rem; border-bottom: 1px solid var(--border-color); font-family: var(--font-mono);">${x}</td>
          <td style="padding: 0.4rem 0.8rem; border-bottom: 1px solid var(--border-color); font-family: var(--font-mono); font-weight: 600; color: var(--accent-primary);">${formatNum(y)}</td>
        </tr>
      `;
    }).join('');
  }

  function formatNum(num) {
    if (Number.isInteger(num)) return num.toString();
    return num.toFixed(2).replace(/\.?0+$/, '');
  }

  document.addEventListener('DOMContentLoaded', () => {
    initGraphExplorer();
  });

})();
