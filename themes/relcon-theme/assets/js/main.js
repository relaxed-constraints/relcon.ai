// Hero grid-walker animation — dots travel the 48px grid, turn at intersections.
// Mounts on any canvas with id="hero-walkers".
function startHeroWalkers() {
  var canvas = document.getElementById('hero-walkers');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var GRID = 48;
  var REVEAL_RADIUS = 80;
  var w = 0, h = 0, cols = 0, rows = 0, raf;
  var walkers = [];
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var DIRS = [[1,0],[0,1],[-1,0],[0,-1]];

  function token(name, fallback) {
    var cs = getComputedStyle(document.documentElement);
    return cs.getPropertyValue(name).trim() || fallback;
  }
  function accent() {
    return token('--c-accent', '#b8421e');
  }
  function colorRgba(color, a) {
    // Parse hex to rgb so we can inject alpha regardless of notation.
    var hex = color.replace('#','');
    if (hex.length === 3) hex = hex.split('').map(function(c){return c+c;}).join('');
    var r = parseInt(hex.slice(0,2),16), g = parseInt(hex.slice(2,4),16), b = parseInt(hex.slice(4,6),16);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
  }
  function accentRgba(a) {
    return colorRgba(accent(), a);
  }
  function gridRgba(a) {
    return colorRgba(token('--c-text', '#111114'), a);
  }

  function isDark() {
    return document.documentElement.classList.contains('dark');
  }

  function resize() {
    var r = canvas.getBoundingClientRect();
    w = r.width || canvas.offsetWidth || 800;
    h = r.height || canvas.offsetHeight || 640;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cols = Math.ceil(w / GRID) + 2;
    rows = Math.ceil(h / GRID) + 2;
  }

  function spawnWalker() {
    var d = DIRS[Math.floor(Math.random() * 4)];
    return {
      gx: Math.floor(Math.random() * cols),
      gy: Math.floor(Math.random() * rows),
      dx: d[0], dy: d[1],
      t: 0,
      speed: 0.006 + Math.random() * 0.01,
    };
  }

  function offscreen(wk) {
    return wk.gx < -2 || wk.gx > cols + 2 || wk.gy < -2 || wk.gy > rows + 2;
  }

  function init() {
    resize();
    walkers = Array.from({length: 16}, spawnWalker);
  }

  function advanceWalkers() {
    var positions = [];
    for (var i = 0; i < walkers.length; i++) {
      var wk = walkers[i];
      wk.t += wk.speed;
      if (wk.t >= 1) {
        wk.t -= 1;
        wk.gx += wk.dx;
        wk.gy += wk.dy;
        // 40% chance of a perpendicular turn (no U-turns)
        if (Math.random() < 0.4) {
          if (wk.dx !== 0) { wk.dy = Math.random() < 0.5 ? 1 : -1; wk.dx = 0; }
          else              { wk.dx = Math.random() < 0.5 ? 1 : -1; wk.dy = 0; }
        }
        if (offscreen(wk)) Object.assign(wk, spawnWalker());
      }
      var cx = (wk.gx + wk.dx * wk.t) * GRID;
      var cy = (wk.gy + wk.dy * wk.t) * GRID;
      positions.push([cx, cy]);
    }
    return positions;
  }

  function drawFogGrid(positions) {
    var baseAlpha = isDark() ? 0.2 : 0.14;
    ctx.lineWidth = 1;

    for (var i = 0; i < positions.length; i++) {
      var cx = positions[i][0];
      var cy = positions[i][1];
      var left = Math.floor((cx - REVEAL_RADIUS) / GRID) * GRID;
      var right = Math.ceil((cx + REVEAL_RADIUS) / GRID) * GRID;
      var top = Math.floor((cy - REVEAL_RADIUS) / GRID) * GRID;
      var bottom = Math.ceil((cy + REVEAL_RADIUS) / GRID) * GRID;

      for (var x = left; x <= right; x += GRID) {
        var dx = x - cx;
        if (Math.abs(dx) > REVEAL_RADIUS) continue;
        var half = Math.sqrt(REVEAL_RADIUS * REVEAL_RADIUS - dx * dx);
        var alpha = baseAlpha * Math.pow(1 - Math.abs(dx) / REVEAL_RADIUS, 0.55);
        var vg = ctx.createLinearGradient(x, cy - half, x, cy + half);
        vg.addColorStop(0, gridRgba(0));
        vg.addColorStop(0.5, gridRgba(alpha));
        vg.addColorStop(1, gridRgba(0));
        ctx.strokeStyle = vg;
        ctx.beginPath();
        ctx.moveTo(x, cy - half);
        ctx.lineTo(x, cy + half);
        ctx.stroke();
      }

      for (var y = top; y <= bottom; y += GRID) {
        var dy = y - cy;
        if (Math.abs(dy) > REVEAL_RADIUS) continue;
        var halfX = Math.sqrt(REVEAL_RADIUS * REVEAL_RADIUS - dy * dy);
        var hAlpha = baseAlpha * Math.pow(1 - Math.abs(dy) / REVEAL_RADIUS, 0.55);
        var hg = ctx.createLinearGradient(cx - halfX, y, cx + halfX, y);
        hg.addColorStop(0, gridRgba(0));
        hg.addColorStop(0.5, gridRgba(hAlpha));
        hg.addColorStop(1, gridRgba(0));
        ctx.strokeStyle = hg;
        ctx.beginPath();
        ctx.moveTo(cx - halfX, y);
        ctx.lineTo(cx + halfX, y);
        ctx.stroke();
      }
    }
  }

  function drawDots(positions) {
    var dotColor = accent();
    var glowStrength = isDark() ? 0.4 : 0.28;

    for (var i = 0; i < positions.length; i++) {
      var cx = positions[i][0];
      var cy = positions[i][1];
      // Soft glow
      var g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 18);
      g.addColorStop(0, accentRgba(glowStrength));
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, 18, 0, Math.PI * 2);
      ctx.fill();
      // Dot
      ctx.fillStyle = dotColor;
      ctx.globalAlpha = 0.9;
      ctx.beginPath();
      ctx.arc(cx, cy, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    var positions = advanceWalkers();
    drawFogGrid(positions);
    drawDots(positions);
    raf = requestAnimationFrame(draw);
  }

  init();
  raf = requestAnimationFrame(draw);
  window.addEventListener('resize', init);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startHeroWalkers);
} else {
  startHeroWalkers();
}
