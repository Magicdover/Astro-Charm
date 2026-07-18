/* =========================================================================
   似水流年 · 站点增强脚本（由 astro.config.mjs 以 injectScript('page') 注入）
   - 右下角齿轮：展开三个动作（特效循环 / 背景图循环 / 主题弹选）
   - 内容页右上角关闭按钮：智能返回（内容页→首页 / 筛选页→进入前的锚点），并恢复滚动位置
   - 多种背景特效（canvas）
   依赖 window.__CHARM = { backgrounds:[...], wallpapers:[...] }
   ========================================================================= */
import { navigate } from "astro:transitions/client";

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
    { id: "grape", name: "紫韵", bg: "#efeaf7", ac: "#7a5bb0" },
    { id: "ink", name: "黛墨", bg: "#eceff2", ac: "#41505f" },
    { id: "amber", name: "蜜橙", bg: "#fdf0e2", ac: "#c2721f" },
  ];
  function applyPalette(id) { id ? root.setAttribute("data-palette", id) : root.removeAttribute("data-palette"); }

  /* ---------- 背景图 ---------- */
  function bgList() { return C.backgrounds || []; }
  function bgLabel(n) { return n.replace(/\.[a-z0-9]+$/i, ""); }
  function applyBg(name) { if (name) root.style.setProperty("--charm-bg-image", 'url("/backgrounds/' + encodeURIComponent(name) + '")'); }
  function cycleBg() {
    var l = bgList(); if (!l.length) return;
    var cur = get(LS.bg) || l[0];
    var i = (l.indexOf(cur) + 1) % l.length;
    applyBg(l[i]); set(LS.bg, l[i]); toast("背景：" + bgLabel(l[i]));
  }

  /* ---------- 背景特效引擎 ---------- */
  var fx = { raf: 0, canvas: null, cleanup: null, listeners: [] };
  function stopFx() {
    if (fx.raf) cancelAnimationFrame(fx.raf); fx.raf = 0;
    fx.listeners.forEach(function (l) { window.removeEventListener(l[0], l[1]); }); fx.listeners = [];
    if (fx.cleanup) { try { fx.cleanup(); } catch (e) {} fx.cleanup = null; }
    if (fx.canvas && fx.canvas.parentNode) fx.canvas.parentNode.removeChild(fx.canvas);
    fx.canvas = null;
  }
  function makeCanvas() {
    var c = document.createElement("canvas"); c.id = "charm-fx";
    document.body.appendChild(c);
    var ctx = c.getContext("2d");
    function resize() { c.width = innerWidth; c.height = innerHeight; }
    resize(); fx.canvas = c;
    var rz = function () { resize(); if (fx.onResize) fx.onResize(); };
    window.addEventListener("resize", rz); fx.listeners.push(["resize", rz]);
    return ctx;
  }
  function loop(step) { function f() { step(); fx.raf = requestAnimationFrame(f); } f(); }
  function rand(a, b) { return a + Math.random() * (b - a); }

  function startMatrix() {
    var ctx = makeCanvas(), chars = "アイウエオカキ01ABCDEF古今笑谈中".split(""), fs = 16, cols, drops;
    function init() { cols = Math.ceil(innerWidth / fs); drops = []; for (var i = 0; i < cols; i++) drops[i] = Math.random() * -50; }
    init(); fx.onResize = init; var col = accent();
    loop(function () {
      ctx.fillStyle = isDark() ? "rgba(15,20,25,0.09)" : "rgba(250,250,245,0.11)";
      ctx.fillRect(0, 0, innerWidth, innerHeight);
      ctx.font = fs + "px monospace"; ctx.fillStyle = col;
      for (var i = 0; i < cols; i++) { ctx.fillText(chars[(Math.random() * chars.length) | 0], i * fs, drops[i] * fs); if (drops[i] * fs > innerHeight && Math.random() > 0.975) drops[i] = 0; drops[i]++; }
    });
  }
  function startWeb() {
    var ctx = makeCanvas(), N = Math.max(30, Math.min(90, (innerWidth * innerHeight / 16000) | 0)), pts = [];
    for (var i = 0; i < N; i++) pts.push({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, vx: rand(-0.5, 0.5), vy: rand(-0.5, 0.5) });
    var mouse = { x: -999, y: -999 };
    var mm = function (e) { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener("mousemove", mm); fx.listeners.push(["mousemove", mm]);
    loop(function () {
      ctx.clearRect(0, 0, innerWidth, innerHeight); var col = accent(), i, j;
      for (i = 0; i < pts.length; i++) { var p = pts[i]; p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > innerWidth) p.vx *= -1; if (p.y < 0 || p.y > innerHeight) p.vy *= -1; }
      for (i = 0; i < pts.length; i++) {
        var p = pts[i]; ctx.globalAlpha = 0.6; ctx.fillStyle = col; ctx.beginPath(); ctx.arc(p.x, p.y, 1.6, 0, 6.283); ctx.fill();
        for (j = i + 1; j < pts.length; j++) { var q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = Math.sqrt(dx * dx + dy * dy); if (d < 120) { ctx.globalAlpha = (1 - d / 120) * 0.35; ctx.strokeStyle = col; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); } }
        var mx = p.x - mouse.x, my = p.y - mouse.y, md = Math.sqrt(mx * mx + my * my); if (md < 160) { ctx.globalAlpha = (1 - md / 160) * 0.5; ctx.strokeStyle = col; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke(); }
      }
      ctx.globalAlpha = 1;
    });
  }
  function startSnow() {
    var ctx = makeCanvas(), N = Math.min(140, (innerWidth / 8) | 0), fl = [];
    for (var i = 0; i < N; i++) fl.push({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, r: rand(1, 4), d: rand(0.5, 1.5), s: rand(0, 6.28) });
    loop(function () {
      ctx.clearRect(0, 0, innerWidth, innerHeight); ctx.fillStyle = isDark() ? "rgba(255,255,255,0.85)" : "rgba(150,170,200,0.7)"; ctx.beginPath();
      for (var i = 0; i < fl.length; i++) { var f = fl[i]; ctx.moveTo(f.x, f.y); ctx.arc(f.x, f.y, f.r, 0, 6.283); } ctx.fill();
      for (var k = 0; k < fl.length; k++) { var g = fl[k]; g.s += 0.01; g.y += g.d; g.x += Math.sin(g.s) * 0.6; if (g.y > innerHeight) { g.y = -5; g.x = Math.random() * innerWidth; } }
    });
  }
  function startStars() {
    var ctx = makeCanvas(), N = Math.min(220, (innerWidth * innerHeight / 6000) | 0), st = [];
    for (var i = 0; i < N; i++) st.push({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, r: rand(0.4, 1.8), a: Math.random(), sp: rand(0.005, 0.03), vx: rand(-0.05, 0.05) });
    loop(function () {
      ctx.clearRect(0, 0, innerWidth, innerHeight); var col = isDark() ? "255,255,255" : "120,140,190";
      for (var i = 0; i < st.length; i++) { var s = st[i]; s.a += s.sp; var al = 0.3 + 0.5 * (0.5 + 0.5 * Math.sin(s.a)); s.x += s.vx; if (s.x < 0) s.x = innerWidth; if (s.x > innerWidth) s.x = 0; ctx.beginPath(); ctx.fillStyle = "rgba(" + col + "," + al.toFixed(3) + ")"; ctx.arc(s.x, s.y, s.r, 0, 6.283); ctx.fill(); }
    });
  }
  function startPetals() {
    var ctx = makeCanvas(), N = Math.min(60, (innerWidth / 22) | 0), ps = [];
    for (var i = 0; i < N; i++) ps.push({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, r: rand(6, 12), d: rand(0.6, 1.6), s: rand(0, 6.28), ss: rand(0.01, 0.03), rot: rand(0, 6.28), vr: rand(-0.03, 0.03) });
    loop(function () {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      for (var i = 0; i < ps.length; i++) {
        var p = ps[i]; p.s += p.ss; p.y += p.d; p.x += Math.sin(p.s) * 0.8; p.rot += p.vr;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = isDark() ? "rgba(232,160,190,0.65)" : "rgba(240,150,180,0.7)";
        ctx.beginPath(); ctx.ellipse(0, 0, p.r, p.r * 0.55, 0, 0, 6.283); ctx.fill(); ctx.restore();
        if (p.y > innerHeight + 12) { p.y = -12; p.x = Math.random() * innerWidth; }
      }
    });
  }
  function startBubbles() {
    var ctx = makeCanvas(), N = Math.min(30, (innerWidth / 46) | 0), bs = [];
    function mk() { return { x: Math.random() * innerWidth, y: innerHeight + rand(0, 200), r: rand(5, 16), d: rand(0.4, 1.3), s: rand(0, 6.28), ss: rand(0.02, 0.05) }; }
    for (var i = 0; i < N; i++) { var b = mk(); b.y = Math.random() * innerHeight; bs.push(b); }
    loop(function () {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      ctx.strokeStyle = accent(); ctx.globalAlpha = 0.4; ctx.lineWidth = 1.4; ctx.beginPath();
      for (var i = 0; i < bs.length; i++) {
        var b = bs[i]; b.s += b.ss; b.y -= b.d; b.x += Math.sin(b.s) * 0.5;
        if (b.y < -20) { bs[i] = mk(); b = bs[i]; }
        ctx.moveTo(b.x + b.r, b.y); ctx.arc(b.x, b.y, b.r, 0, 6.283);
      }
      ctx.stroke(); ctx.globalAlpha = 1;
    });
  }
  function startFireworks() {
    var ctx = makeCanvas(), parts = [], t = 0;
    function burst() {
      var x = rand(innerWidth * 0.15, innerWidth * 0.85), y = rand(innerHeight * 0.12, innerHeight * 0.5), n = 40 + (Math.random() * 40 | 0), hue = (Math.random() * 360) | 0;
      for (var i = 0; i < n; i++) { var ang = Math.random() * 6.283, sp = rand(1, 5); parts.push({ x: x, y: y, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp, life: 1, hue: hue }); }
    }
    loop(function () {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      if (t++ % 45 === 0) burst();
      ctx.lineWidth = 2; ctx.lineCap = "round";
      for (var i = parts.length - 1; i >= 0; i--) {
        var p = parts[i]; p.px = p.x; p.py = p.y; p.x += p.vx; p.y += p.vy; p.vy += 0.03; p.vx *= 0.99; p.life -= 0.012;
        if (p.life <= 0) { parts.splice(i, 1); continue; }
        ctx.globalAlpha = Math.max(0, p.life); ctx.strokeStyle = "hsl(" + p.hue + ",90%,62%)";
        ctx.beginPath(); ctx.moveTo(p.px, p.py); ctx.lineTo(p.x, p.y); ctx.stroke();
      }
      ctx.globalAlpha = 1;
    });
  }
  var EFFECTS = [
    { id: "", name: "无" },
    { id: "matrix", name: "代码雨", fn: startMatrix },
    { id: "web", name: "蛛网", fn: startWeb },
    { id: "stars", name: "星空", fn: startStars },
    { id: "snow", name: "飞雪", fn: startSnow },
    { id: "petals", name: "樱花", fn: startPetals },
    { id: "bubbles", name: "气泡", fn: startBubbles },
    { id: "fireworks", name: "烟花", fn: startFireworks },
  ];
  function applyFx(id) { stopFx(); fx.onResize = null; var e = EFFECTS.filter(function (x) { return x.id === id; })[0]; if (e && e.fn) e.fn(); }
  function cycleFx() {
    var ids = EFFECTS.map(function (e) { return e.id; }); var cur = get(LS.fx);
    var i = (ids.indexOf(cur) + 1) % ids.length; var e = EFFECTS[i];
    applyFx(e.id); set(LS.fx, e.id); toast("特效：" + e.name);
  }
  function resetAll() {
    applyPalette(""); set(LS.pal, "");
    var d = bgList()[0] || ""; applyBg(d); set(LS.bg, "");
    applyFx(""); set(LS.fx, "");
    markPal(); toast("已复原默认");
  }

  /* ---------- UI ---------- */
  function svg(inner) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + inner + "</svg>"; }
  var IC = {
    gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
    fx: '<path d="M12 3l1.9 4.6L18.5 9l-4.6 1.9L12 15l-1.9-4.1L5.5 9l4.6-1.4L12 3z"/><path d="M19 14l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2z"/>',
    bg: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="M21 16l-5-5L5 20"/>',
    theme: '<circle cx="13.5" cy="6.5" r=".6" fill="currentColor" stroke="none"/><circle cx="17" cy="10.5" r=".6" fill="currentColor" stroke="none"/><circle cx="8.5" cy="7.5" r=".6" fill="currentColor" stroke="none"/><circle cx="6.5" cy="12.5" r=".6" fill="currentColor" stroke="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c.93 0 1.68-.75 1.68-1.68 0-.44-.17-.83-.44-1.12-.28-.29-.44-.65-.44-1.12 0-.93.75-1.68 1.68-1.68H16c3.31 0 6-2.69 6-6 0-4.96-4.48-8.4-10-8.4z"/>',
    close: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    reset: '<polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>',
  };
  var toastEl;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg; toastEl.classList.add("show");
    clearTimeout(toastEl.__t); toastEl.__t = setTimeout(function () { toastEl.classList.remove("show"); }, 1300);
  }
  function actBtn(act, title, icon, onClick) {
    var b = document.createElement("button"); b.type = "button"; b.className = "cs-act"; b.setAttribute("data-act", act); b.title = title; b.setAttribute("aria-label", title); b.innerHTML = svg(icon);
    b.addEventListener("click", function (e) { e.stopPropagation(); onClick(b); });
    return b;
  }
  function buildPanel() {
    if (document.getElementById("charm-settings")) return;
    var wrap = document.createElement("div"); wrap.id = "charm-settings";
    var acts = document.createElement("div"); acts.className = "cs-actions";

    acts.appendChild(actBtn("fx", "切换背景特效", IC.fx, function () { cycleFx(); }));
    acts.appendChild(actBtn("bg", "切换背景图片", IC.bg, function () { cycleBg(); }));

    var themeBtn = actBtn("theme", "切换主题配色", IC.theme, function () { pop.classList.toggle("open"); });
    var pop = document.createElement("div"); pop.className = "cs-palette";
    PALETTES.forEach(function (p) {
      var s = document.createElement("button"); s.type = "button"; s.className = "cs-sw"; s.title = p.name; s.setAttribute("data-pal", p.id);
      s.style.background = "linear-gradient(135deg," + p.bg + " 0 50%," + p.ac + " 50% 100%)";
      s.addEventListener("click", function (e) { e.stopPropagation(); applyPalette(p.id); set(LS.pal, p.id); markPal(); pop.classList.remove("open"); toast("主题：" + p.name); });
      pop.appendChild(s);
    });
    themeBtn.appendChild(pop);
    acts.appendChild(themeBtn);

    var resetBtn = actBtn("reset", "一键复原默认（无特效 · 背景 02）", IC.reset, function () { resetAll(); });
    resetBtn.classList.add("cs-reset");
    acts.appendChild(resetBtn);

    var gear = document.createElement("button"); gear.type = "button"; gear.className = "cs-gear"; gear.title = "外观设置"; gear.setAttribute("aria-label", "外观设置"); gear.innerHTML = svg(IC.gear);
    gear.addEventListener("click", function (e) { e.stopPropagation(); wrap.classList.toggle("open"); if (!wrap.classList.contains("open")) pop.classList.remove("open"); });

    toastEl = document.createElement("div"); toastEl.className = "cs-toast";

    wrap.appendChild(acts); wrap.appendChild(gear); wrap.appendChild(toastEl);
    document.body.appendChild(wrap);
    markPal();
  }
  function markPal() {
    var cur = get(LS.pal);
    document.querySelectorAll("#charm-settings .cs-sw").forEach(function (s) { s.classList.toggle("on", (s.getAttribute("data-pal") || "") === cur); });
  }

  /* ---------- 关闭按钮：智能返回（不是「后退一步」） ----------
     规则（务求逻辑清晰）：
       · 在「内容页」（文章 /posts、独立页 /about 等）点 × → 回首页，并恢复首页当时的滚动位置。
       · 在「筛选页」（/tags、/categories）点 × → 回到进入这些筛选页之前所在的那张内容页/首页
         （= 锚点 anchor），而不是后退到上一个标签/分类（那才是回退）。
       例：首页→标签A→标签B，× 直接回首页；文章→标签，× 回到那篇文章。
     实现：每落到一张首页/内容页就把它记为 anchor；筛选页不更新 anchor。
     另用 sessionStorage 记录各页滚动位置，返回时恢复。 */
  var SS = { anchor: "charm-anchor", scroll: "charm-scroll" };
  function ssGet(k) { try { return sessionStorage.getItem(k) || ""; } catch (e) { return ""; } }
  function ssSet(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }
  function curPath() { return location.pathname.replace(/\/+$/, "") || "/"; }
  function pageType() {
    var p = curPath();
    if (p === "/") return "home";
    if (p === "/search") return "search";
    if (/^\/(tags|categories)(\/|$)/.test(p)) return "filter";
    return "content";   // 文章、独立页等
  }
  function scrollMap() { try { return JSON.parse(ssGet(SS.scroll) || "{}"); } catch (e) { return {}; } }
  function saveScroll() { var m = scrollMap(); m[curPath()] = Math.round(window.scrollY || window.pageYOffset || 0); ssSet(SS.scroll, JSON.stringify(m)); }
  function getScroll(path) { var v = scrollMap()[path]; return v ? +v : 0; }
  function updateAnchor() { var t = pageType(); if (t === "home" || t === "content") ssSet(SS.anchor, curPath()); }

  var pendingScroll = null;
  function goClose(target) {
    var de = document.documentElement;
    if (de.classList.contains("charm-dissolving")) return;
    pendingScroll = { path: target, y: getScroll(target) };
    de.classList.add("charm-dissolving");   // 当前页消解 + 视图切换无动画
    try { navigate(target); } catch (e) { location.href = target; }
  }
  function isFilePage() {
    var t = pageType();
    return t !== "home" && t !== "search";   // 首页与搜索页不显示 ×
  }
  function buildClose() {
    var ex = document.getElementById("charm-close");
    if (!isFilePage()) { if (ex) ex.remove(); return; }
    if (ex) return;
    var b = document.createElement("button"); b.id = "charm-close"; b.title = "关闭并返回"; b.setAttribute("aria-label", "关闭并返回"); b.innerHTML = svg(IC.close);
    b.addEventListener("click", function () {
      var target = pageType() === "filter" ? (ssGet(SS.anchor) || "/") : "/";
      goClose(target);
    });
    document.body.appendChild(b);
  }

  /* ---------- 左上角时钟 + 农历 ---------- */
  var LUNAR = (function () {
    var info = [0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,0x06ca0,0x0b550,0x15355,0x04da0,0x0a5b0,0x14573,0x052b0,0x0a9a8,0x0e950,0x06aa0,0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b6a0,0x195a6,0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,0x05aa0,0x076a3,0x096d0,0x04bd7,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0,0x14b63,0x09370,0x049f8,0x04970,0x064b0,0x168a6,0x0ea50,0x06b20,0x1a6c4,0x0aae0,0x0a2e0,0x0d2e3,0x0c960,0x0d557,0x0d4a0,0x0da50,0x05d55,0x056a0,0x0a6d0,0x055d4,0x052d0,0x0a9b8,0x0a950,0x0b4a0,0x0b6a6,0x0ad50,0x055a0,0x0aba4,0x0a5b0,0x052b0,0x0b273,0x06930,0x07337,0x06aa0,0x0ad50,0x14b55,0x04b60,0x0a570,0x054e4,0x0d160,0x0e968,0x0d520,0x0daa0,0x16aa6,0x056d0,0x04ae0,0x0a9d4,0x0a2d0,0x0d150,0x0f252,0x0d520];
    function leapMonth(y) { return info[y - 1900] & 0xf; }
    function leapDays(y) { return leapMonth(y) ? ((info[y - 1900] & 0x10000) ? 30 : 29) : 0; }
    function monthDays(y, m) { return (info[y - 1900] & (0x10000 >> m)) ? 30 : 29; }
    function yearDays(y) { var s = 348, i; for (i = 0x8000; i > 0x8; i >>= 1) s += (info[y - 1900] & i) ? 1 : 0; return s + leapDays(y); }
    var cm = ["正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "冬", "腊"];
    function cDay(d) { if (d === 10) return "初十"; if (d === 20) return "二十"; if (d === 30) return "三十"; return ["初", "十", "廿", "卅"][Math.floor(d / 10)] + ["", "一", "二", "三", "四", "五", "六", "七", "八", "九"][d % 10]; }
    var GAN = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"], ZHI = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"], ZO = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
    function full(dt) {
      var y = dt.getFullYear(), m = dt.getMonth() + 1, d = dt.getDate();
      var offset = (Date.UTC(y, m - 1, d) - Date.UTC(1900, 0, 31)) / 86400000, temp = 0, ly, lm;
      for (ly = 1900; ly < 2101 && offset > 0; ly++) { temp = yearDays(ly); offset -= temp; }
      if (offset < 0) { offset += temp; ly--; }
      var leap = leapMonth(ly), isLeap = false;
      for (lm = 1; lm < 13 && offset > 0; lm++) {
        if (leap > 0 && lm === (leap + 1) && !isLeap) { --lm; isLeap = true; temp = leapDays(ly); }
        else { temp = monthDays(ly, lm); }
        if (isLeap && lm === (leap + 1)) isLeap = false;
        offset -= temp;
      }
      if (offset === 0 && leap > 0 && lm === leap + 1) { if (isLeap) isLeap = false; else { isLeap = true; --lm; } }
      if (offset < 0) { offset += temp; --lm; }
      var gi = ((ly - 4) % 10 + 10) % 10, zi = ((ly - 4) % 12 + 12) % 12;
      return { ganzhi: GAN[gi] + ZHI[zi], zodiac: ZO[zi], md: (isLeap ? "闰" : "") + cm[lm - 1] + "月" + cDay(offset + 1) };
    }
    return { full: full };
  })();
  var WEEK = ["日", "一", "二", "三", "四", "五", "六"];
  function pad(n) { return n < 10 ? "0" + n : "" + n; }
  function updateClock() {
    var el = document.getElementById("charm-clock"); if (!el) return;
    var d = new Date(), l = LUNAR.full(d);
    var a = el.querySelector(".ck-1"), b = el.querySelector(".ck-2");
    if (a) a.textContent = d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate() + "日 周" + WEEK[d.getDay()] + "  " + pad(d.getHours()) + ":" + pad(d.getMinutes()) + ":" + pad(d.getSeconds());
    if (b) b.textContent = "农历 " + l.ganzhi + "年 " + l.md + " · " + l.zodiac + "年";
  }
  function buildClock() {
    if (document.getElementById("charm-clock")) return;
    var el = document.createElement("div"); el.id = "charm-clock";
    el.innerHTML = '<div class="ck-1"></div><div class="ck-2"></div>';
    document.body.appendChild(el);
    updateClock();
  }
  /* 时钟左边缘与侧栏导航图标严格对齐（实测像素，最可靠） */
  function alignClock() {
    var clk = document.getElementById("charm-clock"); if (!clk) return;
    var nav = document.querySelector(".side nav");
    if (nav) { var r = nav.getBoundingClientRect(); if (r.width > 0 && r.left > 0) clk.style.left = Math.round(r.left) + "px"; }
  }
  /* search 只应在首页出现：其它页面隐藏它，避免与右上角关闭按钮重合 */
  function hideSearch() {
    if (location.pathname.replace(/\/+$/, "") === "") return;
    document.querySelectorAll('a[href="/search"]').forEach(function (a) {
      if (getComputedStyle(a).position === "fixed") a.style.display = "none";
    });
  }

  /* ---------- 把主题内置的英文日期标签本地化为中文 ---------- */
  function localizeMeta() {
    document.querySelectorAll(".inline-meta span, .content-wrapper small span, article small span").forEach(function (s) {
      var t = s.textContent.trim();
      if (t === "published:") s.textContent = "发布于 ";
      else if (t === "updated:") s.textContent = "更新于 ";
      else if (t === "and") s.textContent = "，";
    });
  }

  /* ---------- 生命周期 ---------- */
  function apply() {
    applyPalette(get(LS.pal));
    var bg = get(LS.bg) || (bgList()[0] || ""); if (bg) applyBg(bg);
    applyFx(get(LS.fx));
  }
  function build() { buildPanel(); buildClose(); buildClock(); alignClock(); hideSearch(); localizeMeta(); }
  function init() { apply(); build(); updateAnchor(); }

  document.addEventListener("click", function (e) {
    var w = document.getElementById("charm-settings"); if (!w) return;
    if (!w.contains(e.target)) { w.classList.remove("open"); var p = w.querySelector(".cs-palette"); if (p) p.classList.remove("open"); }
  });
  document.addEventListener("astro:before-swap", function () { saveScroll(); stopFx(); });
  document.addEventListener("astro:after-swap", function () {
    document.documentElement.classList.remove("charm-dissolving"); toastEl = null;
    if (pendingScroll) {
      var ps = pendingScroll; pendingScroll = null;
      var applyScroll = function () { if (curPath() === ps.path) window.scrollTo(0, ps.y); };
      applyScroll(); requestAnimationFrame(applyScroll); setTimeout(applyScroll, 60);   // 多次写入以压过路由默认的置顶
    }
    init();
  });
  if (!window.__charmClockTimer) window.__charmClockTimer = setInterval(updateClock, 1000);
  window.addEventListener("resize", alignClock);
  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
})();
