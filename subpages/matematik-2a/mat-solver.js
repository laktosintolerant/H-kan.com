/**
 * ============================================================================
 * MATEMATIK 2A - PQ-FORMELLÖSARE & GRAFVISUALISERING (mat-solver.js)
 * ============================================================================
 */

(function () {
  'use strict';

  function initSolver() {
    const pInput = document.getElementById('input-p');
    const qInput = document.getElementById('input-q');
    const aInput = document.getElementById('input-a');
    const solveBtn = document.getElementById('btn-solve');
    const canvas = document.getElementById('graphCanvas');

    if (!pInput || !qInput || !solveBtn) return;

    solveBtn.addEventListener('click', () => solveEquation());

    // Beräkna automatiskt vid enter-tryck i inmatningsfälten
    [pInput, qInput, aInput].forEach(inp => {
      if (inp) {
        inp.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') solveEquation();
        });
      }
    });

    // Preset-knappar
    document.querySelectorAll('.preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const a = btn.getAttribute('data-a') || '1';
        const p = btn.getAttribute('data-p') || '0';
        const q = btn.getAttribute('data-q') || '0';
        if (aInput) aInput.value = a;
        pInput.value = p;
        qInput.value = q;
        solveEquation();
      });
    });

    // Lös initialt exempel
    solveEquation();

    // Rita om graf om fönstret ändrar storlek
    window.addEventListener('resize', () => {
      drawGraph();
    });
  }

  let lastCalculation = null;

  function solveEquation() {
    const aVal = parseFloat(document.getElementById('input-a')?.value) || 1;
    let pVal = parseFloat(document.getElementById('input-p')?.value) || 0;
    let qVal = parseFloat(document.getElementById('input-q')?.value) || 0;

    if (aVal === 0) {
      alert('Koefficienten a kan inte vara 0 för en andragradsekvation.');
      return;
    }

    // Om a != 1, dividera hela ekvationen med a så vi får x² + px + q = 0
    let normalizedP = pVal;
    let normalizedQ = qVal;
    let dividedByA = false;

    if (aVal !== 1) {
      normalizedP = pVal / aVal;
      normalizedQ = qVal / aVal;
      dividedByA = true;
    }

    const halfP = normalizedP / 2;
    const halfPSq = Math.pow(halfP, 2);
    const discriminant = halfPSq - normalizedQ;

    const symmetryX = -halfP;
    // Vertex y: f(symmetryX) = a*(symX)^2 + pVal*symX + qVal
    const vertexY = aVal * Math.pow(symmetryX, 2) + pVal * symmetryX + qVal;

    let rootsText = '';
    let isComplex = false;
    let root1 = null;
    let root2 = null;

    if (Math.abs(discriminant) < 1e-9) {
      // En dubbelrot
      const r = -halfP;
      root1 = r;
      root2 = r;
      rootsText = `Dubbelrot: x₁ = x₂ = ${formatNum(r)}`;
    } else if (discriminant > 0) {
      // Två reella rötter
      const sqrtD = Math.sqrt(discriminant);
      root1 = -halfP + sqrtD;
      root2 = -halfP - sqrtD;
      rootsText = `x₁ = ${formatNum(root1)}, &nbsp; x₂ = ${formatNum(root2)}`;
    } else {
      // Komplexa rötter
      isComplex = true;
      const sqrtD = Math.sqrt(-discriminant);
      rootsText = `x = ${formatNum(-halfP)} ± ${formatNum(sqrtD)}i <span style="font-size: 0.85rem; font-weight: normal; color: var(--text-muted);">(Icke-reella)</span>`;
    }

    // Bygg steg-för-steg text
    const steps = [];
    if (dividedByA) {
      steps.push(`1. Dividera med a = ${aVal}: <code>x² + (${formatNum(normalizedP)})x + (${formatNum(normalizedQ)}) = 0</code>`);
    } else {
      steps.push(`1. Identifiera p och q: <code>p = ${formatNum(normalizedP)}</code>, <code>q = ${formatNum(normalizedQ)}</code>`);
    }

    steps.push(`2. Beräkna halva p med ombytt tecken: <code>-p/2 = ${formatNum(-halfP)}</code>`);
    steps.push(`3. Beräkna diskriminanten under rottecknet: <code>(-p/2)² - q = (${formatNum(halfP)})² - (${formatNum(normalizedQ)}) = ${formatNum(discriminant)}</code>`);

    if (discriminant > 0) {
      steps.push(`4. Dra roten ur diskriminanten: <code>√(${formatNum(discriminant)}) = ${formatNum(Math.sqrt(discriminant))}</code>`);
      steps.push(`5. Rötter: <code>x = ${formatNum(-halfP)} ± ${formatNum(Math.sqrt(discriminant))}</code>`);
    } else if (Math.abs(discriminant) < 1e-9) {
      steps.push(`4. Diskriminanten är 0, vilket ger en dubbelrot: <code>x = ${formatNum(-halfP)}</code>`);
    } else {
      steps.push(`4. Diskriminanten är negativ (< 0). Ekvationen saknar reella nollställen men har två komplexa rötter.`);
    }

    steps.push(`📌 Symmetrilinje: <code>x = ${formatNum(symmetryX)}</code> | Vändpunkt: <code>(${formatNum(symmetryX)}, ${formatNum(vertexY)})</code>`);

    // Uppdatera DOM
    document.getElementById('roots-output').innerHTML = rootsText;
    document.getElementById('steps-output').innerHTML = steps.map(s => `<div class="step-item">${s}</div>`).join('');

    lastCalculation = {
      a: aVal,
      p: pVal,
      q: qVal,
      normalizedP,
      normalizedQ,
      discriminant,
      symmetryX,
      vertexY,
      root1,
      root2,
      isComplex
    };

    drawGraph();
  }

  function drawGraph() {
    const canvas = document.getElementById('graphCanvas');
    if (!canvas || !lastCalculation) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.clientWidth || 500;
    const height = 260;
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)';
    const axisColor = isDark ? 'rgba(255, 255, 255, 0.35)' : 'rgba(0, 0, 0, 0.35)';
    const curveColor = '#38bdf8';
    const pointColor = '#f43f5e';
    const textColor = isDark ? '#94a3b8' : '#475569';

    ctx.clearRect(0, 0, width, height);

    // Skala & origo
    const { a, p, q, symmetryX, vertexY, root1, root2, isComplex } = lastCalculation;
    
    // Beräkna lämplig vy
    let minX = symmetryX - 6;
    let maxX = symmetryX + 6;
    if (!isComplex && root1 !== null && root2 !== null) {
      const span = Math.abs(root1 - root2) + 4;
      minX = Math.min(minX, symmetryX - span / 2);
      maxX = Math.max(maxX, symmetryX + span / 2);
    }

    const minY = Math.min(-6, vertexY - 4);
    const maxY = Math.max(6, vertexY + 10);

    const toScreenX = (x) => ((x - minX) / (maxX - minX)) * width;
    const toScreenY = (y) => height - ((y - minY) / (maxY - minY)) * height;

    // Rita rutnät
    ctx.lineWidth = 1;
    ctx.strokeStyle = gridColor;
    for (let x = Math.ceil(minX); x <= Math.floor(maxX); x += 2) {
      const sx = toScreenX(x);
      ctx.beginPath();
      ctx.moveTo(sx, 0);
      ctx.lineTo(sx, height);
      ctx.stroke();
    }
    for (let y = Math.ceil(minY); y <= Math.floor(maxY); y += 2) {
      const sy = toScreenY(y);
      ctx.beginPath();
      ctx.moveTo(0, sy);
      ctx.lineTo(width, sy);
      ctx.stroke();
    }

    // Rita x- och y-axlar
    ctx.strokeStyle = axisColor;
    ctx.lineWidth = 1.5;
    
    // X-axel (y=0)
    const originY = toScreenY(0);
    if (originY >= 0 && originY <= height) {
      ctx.beginPath();
      ctx.moveTo(0, originY);
      ctx.lineTo(width, originY);
      ctx.stroke();
    }

    // Y-axel (x=0)
    const originX = toScreenX(0);
    if (originX >= 0 && originX <= width) {
      ctx.beginPath();
      ctx.moveTo(originX, 0);
      ctx.lineTo(originX, height);
      ctx.stroke();
    }

    // Rita symmetrilinje
    const symScreenX = toScreenX(symmetryX);
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.6)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(symScreenX, 0);
    ctx.lineTo(symScreenX, height);
    ctx.stroke();
    ctx.setLineDash([]);

    // Rita parabeln f(x) = ax² + px + q
    ctx.strokeStyle = curveColor;
    ctx.lineWidth = 2.5;
    ctx.beginPath();

    const step = (maxX - minX) / 120;
    let started = false;
    for (let x = minX; x <= maxX; x += step) {
      const y = a * x * x + p * x + q;
      const sx = toScreenX(x);
      const sy = toScreenY(y);

      if (!started) {
        ctx.moveTo(sx, sy);
        started = true;
      } else {
        ctx.lineTo(sx, sy);
      }
    }
    ctx.stroke();

    // Markera vändpunkt
    const vScreenX = toScreenX(symmetryX);
    const vScreenY = toScreenY(vertexY);
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(vScreenX, vScreenY, 5, 0, Math.PI * 2);
    ctx.fill();

    // Markera nollställen
    if (!isComplex && root1 !== null && root2 !== null) {
      [root1, root2].forEach(r => {
        const rx = toScreenX(r);
        const ry = toScreenY(0);
        ctx.fillStyle = pointColor;
        ctx.beginPath();
        ctx.arc(rx, ry, 5, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    // Textförklaring på grafen
    ctx.fillStyle = textColor;
    ctx.font = '11px sans-serif';
    ctx.fillText(`f(x) = ${a}x² + ${p}x + ${q}`, 12, 20);
    ctx.fillText(`Vändpunkt: (${formatNum(symmetryX)}, ${formatNum(vertexY)})`, 12, 38);
  }

  function formatNum(num) {
    if (Number.isInteger(num)) return num.toString();
    return num.toFixed(2).replace(/\.?0+$/, '');
  }

  document.addEventListener('DOMContentLoaded', () => {
    initSolver();
  });

})();
