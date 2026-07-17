/* =========================================================================
   似水流年 · 站点增强脚本（由 astro.config.mjs 以 injectScript('page') 注入）
   功能：右下角设置面板（配色 / 背景图 / 背景特效）+ 右上角关闭按钮
   依赖：window.__CHARM = { backgrounds:[...], wallpapers:[...] }（由 head-inline 注入）
   ========================================================================= */
(function () {
  if (window.__charmEnhance) return;
  window.__charmEnhance = 1;

  var C = window.__CHARM || { backgrounds: [], wallpapers: [] };
  var root = document.documentElement;
  var LS = { pal: "charm-palette", bg: "charm-bg", fx: "charm-effect" };
  function get(k) { try { return localStorage.getItem(k) || ""; } catch (e) { return ""; } }
  function set(k, v) { try { v ? localStorage.setItem(k, v) : localStorage.removeItem(k); } catch (e) {} }
  function isDark() { return root.classList.contains("dark"); }
  function accent() { return (getComputedStyle(root).getPropertyValue("--charm-highlight-color") || "#4a7d3f").trim(); }

  /* ---------- 配色 ---------- */
  var PALETTES = [
    { id: "", name: "默认", bg: "#fcfaf2", ac: "#f66260" },
    { id: "parchment", name: "羊皮纸", bg: "#f4ecd9", ac: "#a86a3c" },
    { id: "forest", name: "松林", bg: "#e7efdc", ac: "#4a7d3f" },
    { id: "ocean", name: "海蓝", bg: "#e6f0f7", ac: "#256d9c" },
    { id: "sakura", name: "樱粉", bg: "#fbeef1", ac: "#c15072" },
  ];
  function applyPalette(id) { id ? root.setAttribute("data-palette", id) : root.removeAttribute("data-palette"); }

  /* ---------- 背景图 ---------- */
  function applyBg(name) { if (name) root.style.setProperty("--charm-bg-image", 'url("/backgrounds/' + name + '")'); }
  function bgLabel(name) { return name.replace(/\.[a-z0-9]+$/i, ""); }

  /* ---------- 背景特效引擎 ---------- */
  var fx = { raf: 0, canvas: null, cleanup: null };
  function stopFx() {
    if (fx.raf) cancelAnimationFrame(fx.raf);
    fx.raf = 0;
    if (fx.cleanup) { try { fx.cleanup(); } catch (e) {} fx.cleanup = null; }
    if (fx.canvas && fx.canvas.parentNode) fx.canvas.parentNode.removeChild(fx.canvas);
    fx.canvas = null;
  }
  function makeCanvas() {
    var c = document.createElement("canvas");
    c.id = "charm-fx";
    document.body.appendChild(c);
    var ctx = c.getContext("2d");
    function resize() { c.width = innerWidth; c.height = innerHeight; }
    resize();
    fx.canvas = c;
    fx._resize = resize;
    window.addEventListener("resize", resize);
    return ctx;
  }
  function startMatrix() {
    var ctx = makeCanvas();
    var chars = "アイウエオカキクケコサシスセソ0123456789ABCDEFZ古今多少事都付笑谈中".split("");
    var fontSize = 16, cols, drops;
    function init() { cols = Math.ceil(innerWidth / fontSize); drops = []; for (var i = 0; i < cols; i++) drops[i] = Math.random() * -50; }
    init();
    var reinit = function () { init(); };
    window.addEventListener("resize", reinit);
    var col = accent();
    function frame() {
      ctx.fillStyle = isDark() ? "rgba(15,20,25,0.09)" : "rgba(250,250,245,0.11)";
      ctx.fillRect(0, 0, innerWidth, innerHeight);
      ctx.font = fontSize + "px monospace";
      ctx.fillStyle = col;
      for (var i = 0; i < cols; i++) {
        ctx.fillText(chars[(Math.random() * chars.length) | 0], i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > innerHeight && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      fx.raf = requestAnimationFrame(frame);
    }
    fx.cleanup = function () { window.removeEventListener("resize", reinit); };
    frame();
  }
  function startWeb() {
    var ctx = makeCanvas();
    var N = Math.max(30, Math.min(90, (innerWidth * innerHeight / 16000) | 0)), pts = [];
    for (var i = 0; i < N; i++) pts.push({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5 });
    var mouse = { x: -999, y: -999 };
    function mm(e) { mouse.x = e.clientX; mouse.y = e.clientY; }
    window.addEventListener("mousemove", mm);
    function frame() {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      var col = accent(), i, j;
      for (i = 0; i < pts.length; i++) { var p = pts[i]; p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > innerWidth) p.vx *= -1; if (p.y < 0 || p.y > innerHeight) p.vy *= -1; }
      for (i = 0; i < pts.length; i++) {
        var p = pts[i];
        ctx.globalAlpha = 0.6; ctx.fillStyle = col;
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.6, 0, 6.283); ctx.fill();
        for (j = i + 1; j < pts.length; j++) {
          var q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) { ctx.globalAlpha = (1 - d / 120) * 0.35; ctx.strokeStyle = col; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); }
        }
        var mx = p.x - mouse.x, my = p.y - mouse.y, md = Math.sqrt(mx * mx + my * my);
        if (md < 160) { ctx.globalAlpha = (1 - md / 160) * 0.5; ctx.strokeStyle = col; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke(); }
      }
      ctx.globalAlpha = 1;
      fx.raf = requestAnimationFrame(frame);
    }
    fx.cleanup = function () { window.removeEventListener("mousemove", mm); };
    frame();
  }
  function startSnow() {
    var ctx = makeCanvas();
    var N = Math.min(140, (innerWidth / 8) | 0), fl = [];
    for (var i = 0; i < N; i++) fl.push({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, r: Math.random() * 3 + 1, d: Math.random() + 0.5, s: Math.random() * 6.28 });
    function frame() {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      ctx.fillStyle = isDark() ? "rgba(255,255,255,0.85)" : "rgba(150,170,200,0.7)";
      ctx.beginPath();
      for (var i = 0; i < fl.length; i++) { var f = fl[i]; ctx.moveTo(f.x, f.y); ctx.arc(f.x, f.y, f.r, 0, 6.283); }
      ctx.fill();
      for (var i2 = 0; i2 < fl.length; i2++) { var g = fl[i2]; g.s += 0.01; g.y += g.d; g.x += Math.sin(g.s) * 0.6; if (g.y > innerHeight) { g.y = -5; g.x = Math.random() * innerWidth; } }
      fx.raf = requestAnimationFrame(frame);
    }
    frame();
  }
  var EFFECTS = [
    { id: "", name: "无" },
    { id: "matrix", name: "代码雨", fn: startMatrix },
    { id: "web", name: "蛛网", fn: startWeb },
    { id: "snow", name: "飞雪", fn: startSnow },
  ];
  function applyFx(id) {
    stopFx();
    var e = EFFECTS.filter(function (x) { return x.id === id; })[0];
    if (e && e.fn) e.fn();
  }

  /* ---------- UI 组装 ---------- */
  function svg(inner) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + inner + "</svg>"; }
  function mark() {
    var pal = get(LS.pal), bg = get(LS.bg) || (C.backgrounds[0] || ""), fxv = get(LS.fx);
    document.querySelectorAll("#charm-settings .cs-item").forEach(function (el) {
      var g = el.getAttribute("data-group"), v = el.getAttribute("data-val");
      var on = (g === "pal" && v === pal) || (g === "bg" && v === bg) || (g === "fx" && v === fxv);
      el.classList.toggle("on", on);
    });
  }
  function itemBtn(group, val, dotStyle, label, onClick) {
    var b = document.createElement("button");
    b.type = "button"; b.className = "cs-item"; b.setAttribute("data-group", group); b.setAttribute("data-val", val);
    b.innerHTML = '<span class="cs-dot"' + (dotStyle ? ' style="' + dotStyle + '"' : "") + "></span><span class=\"cs-name\">" + label + "</span>";
    b.addEventListener("click", onClick);
    return b;
  }
  function section(title) {
    var el = document.createElement("div"); el.className = "cs-section";
    var h = document.createElement("div"); h.className = "cs-h"; h.textContent = title;
    var body = document.createElement("div"); body.className = "cs-body";
    el.appendChild(h); el.appendChild(body);
    return { el: el, body: body };
  }
  function buildPanel() {
    if (document.getElementById("charm-settings")) return;
    var wrap = document.createElement("div"); wrap.id = "charm-settings";
    var panel = document.createElement("div"); panel.className = "cs-panel";

    var sPal = section("配色主题");
    PALETTES.forEach(function (p) {
      sPal.body.appendChild(itemBtn("pal", p.id, "background:linear-gradient(135deg," + p.bg + " 0 50%," + p.ac + " 50% 100%)", p.name, function () { applyPalette(p.id); set(LS.pal, p.id); mark(); }));
    });
    panel.appendChild(sPal.el);

    var sBg = section("背景图片");
    if (C.backgrounds && C.backgrounds.length) {
      C.backgrounds.forEach(function (name) {
        sBg.body.appendChild(itemBtn("bg", name, 'background-image:url("/backgrounds/' + name + '");background-size:cover;background-position:center', bgLabel(name), function () { applyBg(name); set(LS.bg, name); mark(); }));
      });
    } else {
      var e = document.createElement("div"); e.className = "cs-empty"; e.textContent = "在 public/backgrounds/ 放入图片即可";
      sBg.body.appendChild(e);
    }
    panel.appendChild(sBg.el);

    var sFx = section("背景特效");
    EFFECTS.forEach(function (ef) {
      sFx.body.appendChild(itemBtn("fx", ef.id, "background:var(--charm-contrast-color-3)", ef.name, function () { applyFx(ef.id); set(LS.fx, ef.id); mark(); }));
    });
    panel.appendChild(sFx.el);

    var btn = document.createElement("button");
    btn.type = "button"; btn.className = "cs-toggle"; btn.title = "外观设置"; btn.setAttribute("aria-label", "外观设置");
    btn.innerHTML = svg('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>');
    btn.addEventListener("click", function (e) { e.stopPropagation(); wrap.classList.toggle("open"); });

    wrap.appendChild(panel); wrap.appendChild(btn);
    document.body.appendChild(wrap);
    mark();
  }

  /* ---------- 关闭按钮（内容页右上角，返回导航，带关闭动画） ---------- */
  function isFilePage() {
    var p = location.pathname.replace(/\/+$/, "");
    if (p === "" || p === "/search") return false;
    if (p.indexOf("/categories") === 0 || p.indexOf("/tags") === 0) return false;
    return true;
  }
  function buildClose() {
    var ex = document.getElementById("charm-close");
    if (!isFilePage()) { if (ex) ex.remove(); return; }
    if (ex) return;
    var b = document.createElement("button");
    b.id = "charm-close"; b.title = "关闭并返回导航"; b.setAttribute("aria-label", "关闭并返回导航");
    b.innerHTML = svg('<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>');
    b.addEventListener("click", function () {
      document.body.classList.add("charm-closing");
      setTimeout(function () { location.href = "/"; }, 340);
    });
    document.body.appendChild(b);
  }

  /* ---------- 生命周期 ---------- */
  function apply() {
    applyPalette(get(LS.pal));
    var bg = get(LS.bg) || (C.backgrounds[0] || ""); if (bg) applyBg(bg);
    applyFx(get(LS.fx));
  }
  function build() { buildPanel(); buildClose(); }
  function init() { apply(); build(); }

  document.addEventListener("click", function (e) { var w = document.getElementById("charm-settings"); if (w && !w.contains(e.target)) w.classList.remove("open"); });
  document.addEventListener("astro:before-swap", function () { stopFx(); });
  document.addEventListener("astro:after-swap", function () { document.body.classList.remove("charm-closing"); init(); });
  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
})();
