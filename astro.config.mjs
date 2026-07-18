// @ts-check
import { defineConfig } from 'astro/config';
import fs from 'node:fs';
import charm from "astro-charm";

/* 构建时读取图片目录，自动生成背景图与壁纸列表。
   背景：public/backgrounds/ 平铺。
   壁纸：public/wallpapers/ 下按子目录分类；只收录带 astro- 前缀的「精品图」
   （规则见 .gitignore：只有 astro- 前缀的壁纸才入库上传，其余仅保留在本地）。 */
const IMG_RE = /\.(webp|jpe?g|png|gif|avif|bmp)$/i;
function typeOf(f) { return /\.gif$/i.test(f) ? "gif" : "image"; }
function listImages(dir) {
  try {
    return fs.readdirSync(dir).filter((f) => IMG_RE.test(f)).sort();
  } catch (e) {
    return [];
  }
}
const wpOk = (f) => /^astro-/i.test(f) && IMG_RE.test(f);
function listWallpapers(dir) {
  const groups = [];
  try {
    const top = fs.readdirSync(dir, { withFileTypes: true });
    const loose = top.filter((e) => e.isFile() && wpOk(e.name)).map((e) => e.name).sort();
    if (loose.length) groups.push({ cat: "未分类", items: loose.map((n) => ({ n, t: typeOf(n) })) });
    top.filter((e) => e.isDirectory()).sort((a, b) => a.name.localeCompare(b.name)).forEach((d) => {
      const files = fs.readdirSync(`${dir}/${d.name}`).filter(wpOk).sort();
      if (files.length) groups.push({ cat: d.name, items: files.map((n) => ({ n, t: typeOf(n) })) });
    });
  } catch (e) {}
  return groups;
}
const backgrounds = listImages('./public/backgrounds');
const wallpapers = listWallpapers('./public/wallpapers');

/* head-inline：注入图片清单，并在刷新前应用配色与背景，避免闪烁（FOUC）。
   KaTeX 样式已通过 custom-charm.css 的 @import 打包，无需在此注入。 */
const preload =
  `window.__CHARM=${JSON.stringify({ backgrounds, wallpapers })};` +
  `(function(){try{var r=document.documentElement;var p=localStorage.getItem('charm-palette');if(p)r.setAttribute('data-palette',p);var b=localStorage.getItem('charm-bg')||(window.__CHARM.backgrounds[0]||'');if(b)r.style.setProperty('--charm-bg-image','url(\"/backgrounds/'+encodeURIComponent(b)+'\")');}catch(e){}})();`;

/* page：站点增强脚本（设置面板 + 关闭按钮 + 背景特效），源码见 src/enhance/enhance.js。 */
const enhance = fs.readFileSync('./src/enhance/enhance.js', 'utf8');

/** 本地集成：把上述脚本注入到每一个页面。 */
const charmEnhance = {
  name: "charm-enhance",
  hooks: {
    "astro:config:setup": ({ injectScript }) => {
      injectScript("head-inline", preload);
      injectScript("page", enhance);
    },
  },
};

export default defineConfig({
  // 已在 GitHub + Vercel 部署，此处填正式域名，用于 sitemap 与 RSS 的绝对链接。
  site: "https://astro-charm-two.vercel.app",
  // 路径不带尾斜杠：否则 Astro.url.pathname 为「/about/」，与主题侧栏 active 判断
  // 「=== /about」（无尾斜杠）不匹配，导致切到某页后左侧对应导航图标不进入选中态。
  trailingSlash: "never",
  // 开启鼠标悬停预取，站内跳转更顺滑（主题官方推荐）。
  prefetch: true,
  integrations: [
    charm({
      // 禁用主题自带首页（路由 /），改用项目 src/pages/index.astro 覆盖：
      // 一次性展示全部文章（不分页）+ 底部统计。避免二者路由冲突。
      pages: { "/": false },
      config: {
        "lang": "zh-CN",
        "title": "似水流年",
        "description": "代码与诗意的交织，记录技术、阅读、光影与生活的点滴。",
        "author": "似水流年",
        "licenseId": "CC-BY-4.0",
        "side": {
          "title": "似水流年",
          "sub": "代码与诗意的交织",
          "bio": "文艺青年一枚，热爱编程，用代码书写逻辑之美，用文字记录生活之光。在技术与艺术间寻找平衡，创造属于自己的独特风景。\n\n白天钻研大模型与氛围编程，着迷于让机器读懂人的偏好；夜里读诗、看电影、听老歌，也追一追世界杯球赛与新出的游戏。在极客与文艺的交界处，把寻常的日子，过成自己偏爱的模样。",
          "navHome": {
            "title": "首页"
          },
          "footer": [
            {
              "title": "GitHub",
              "link": "https://github.com/yuhanawa/astro-charm",
              "icon": "simple-icons:github"
            },
            {
              "title": "Linux",
              "link": "https://linux.do/",
              "icon": "simple-icons:linux"
            },
            {
              "title": "Twitter",
              "link": "https://x.com/",
              "icon": "simple-icons:twitter"
            },
            {
              "title": "Facebook",
              "link": "https://facebook.com/",
              "icon": "simple-icons:facebook"
            },
            {
              "title": "RSS",
              "link": "/rss.xml",
              "icon": "simple-icons:rss"
            }
          ]
        }
      }
    }),
    charmEnhance,
  ],
  devToolbar: {
    enabled: false
  }
});
