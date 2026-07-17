// @ts-check
import { defineConfig } from 'astro/config';
import fs from 'node:fs';
import charm from "astro-charm";

/* 构建时读取图片目录，自动生成背景图与壁纸列表（按文件名排序）。
   之后往 public/backgrounds/ 或 public/wallpapers/ 里增删图片，重新构建即可生效。 */
function listImages(dir) {
  try {
    return fs.readdirSync(dir).filter((f) => /\.(webp|jpe?g|png|gif|avif)$/i.test(f)).sort();
  } catch (e) {
    return [];
  }
}
const backgrounds = listImages('./public/backgrounds');
const wallpapers = listImages('./public/wallpapers');

/* head-inline：注入图片清单，并在刷新前应用配色与背景，避免闪烁（FOUC）。 */
const preload =
  `window.__CHARM=${JSON.stringify({ backgrounds, wallpapers })};` +
  `(function(){try{var r=document.documentElement;var p=localStorage.getItem('charm-palette');if(p)r.setAttribute('data-palette',p);var b=localStorage.getItem('charm-bg')||(window.__CHARM.backgrounds[0]||'');if(b)r.style.setProperty('--charm-bg-image','url("/backgrounds/'+b+'")');}catch(e){}})();`;

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
  // 开启鼠标悬停预取，站内跳转更顺滑（主题官方推荐）。
  prefetch: true,
  integrations: [
    charm({
      config: {
        "lang": "zh-CN",
        "title": "似水流年",
        "description": "代码与诗意的交织，记录技术、阅读、光影与生活的点滴。",
        "author": "似水流年",
        "licenseId": "CC-BY-4.0",
        "side": {
          "title": "似水流年",
          "sub": "代码与诗意的交织",
          "bio": "文艺青年一枚，热爱编程，用代码书写逻辑之美，用文字记录生活之光。在技术与艺术间寻找平衡，创造属于自己的独特风景。",
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
