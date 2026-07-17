// @ts-check
import { defineConfig } from 'astro/config';
import charm from "astro-charm";

/* 刷新前先应用已保存的配色，避免出现颜色闪烁（FOUC）。data-palette 与明暗 .dark 正交，互不干扰。 */
const palettePreload = `(function(){try{var p=localStorage.getItem('charm-palette');if(p&&['parchment','forest','ocean','sakura'].indexOf(p)>-1)document.documentElement.setAttribute('data-palette',p);}catch(e){}})();`;

/* 右下角配色切换器：构建 UI、记忆选择、并在 Astro 视图切换后重建。 */
const paletteSwitcher = `(function(){
  if(window.__cpsInit)return;window.__cpsInit=1;
  var KEY='charm-palette';
  var PALETTES=[
    {id:'',name:'默认',bg:'#fcfaf2',ac:'#f66260'},
    {id:'parchment',name:'羊皮纸',bg:'#f4ecd9',ac:'#a86a3c'},
    {id:'forest',name:'松林',bg:'#e7efdc',ac:'#4a7d3f'},
    {id:'ocean',name:'海蓝',bg:'#e6f0f7',ac:'#256d9c'},
    {id:'sakura',name:'樱粉',bg:'#fbeef1',ac:'#c15072'}
  ];
  function cur(){try{return localStorage.getItem(KEY)||'';}catch(e){return '';}}
  function apply(id){var r=document.documentElement;if(id)r.setAttribute('data-palette',id);else r.removeAttribute('data-palette');}
  function save(id){try{if(id)localStorage.setItem(KEY,id);else localStorage.removeItem(KEY);}catch(e){}}
  function mark(){document.querySelectorAll('#charm-palette-switcher .cps-swatch').forEach(function(s){s.classList.toggle('active',(s.getAttribute('data-id')||'')===cur());});}
  var ICON='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".6" fill="currentColor" stroke="none"/><circle cx="17" cy="10.5" r=".6" fill="currentColor" stroke="none"/><circle cx="8.5" cy="7.5" r=".6" fill="currentColor" stroke="none"/><circle cx="6.5" cy="12.5" r=".6" fill="currentColor" stroke="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c.93 0 1.68-.75 1.68-1.68 0-.44-.17-.83-.44-1.12-.28-.29-.44-.65-.44-1.12 0-.93.75-1.68 1.68-1.68H16c3.31 0 6-2.69 6-6 0-4.96-4.48-8.4-10-8.4z"/></svg>';
  function build(){
    if(document.getElementById('charm-palette-switcher'))return;
    var wrap=document.createElement('div');wrap.id='charm-palette-switcher';
    var panel=document.createElement('div');panel.className='cps-panel';
    PALETTES.forEach(function(p){
      var b=document.createElement('button');b.type='button';b.className='cps-swatch';b.setAttribute('data-id',p.id);
      b.innerHTML='<span class="cps-dot" style="background:linear-gradient(135deg,'+p.bg+' 0 50%,'+p.ac+' 50% 100%)"></span><span class="cps-name">'+p.name+'</span>';
      b.addEventListener('click',function(){apply(p.id);save(p.id);mark();wrap.classList.remove('open');});
      panel.appendChild(b);
    });
    var btn=document.createElement('button');btn.type='button';btn.className='cps-toggle';btn.title='配色主题';btn.setAttribute('aria-label','切换配色主题');btn.innerHTML=ICON;
    btn.addEventListener('click',function(e){e.stopPropagation();wrap.classList.toggle('open');});
    wrap.appendChild(panel);wrap.appendChild(btn);
    document.body.appendChild(wrap);
    mark();
  }
  function init(){apply(cur());build();}
  document.addEventListener('click',function(e){var w=document.getElementById('charm-palette-switcher');if(w&&!w.contains(e.target))w.classList.remove('open');});
  document.addEventListener('astro:after-swap',function(){apply(cur());build();});
  if(document.readyState!=='loading')init();else document.addEventListener('DOMContentLoaded',init);
})();`;

/** 本地集成：把配色切换器脚本注入到每一个页面。 */
const paletteIntegration = {
  name: "charm-palette-switcher",
  hooks: {
    "astro:config:setup": ({ injectScript }) => {
      injectScript("head-inline", palettePreload);
      injectScript("page", paletteSwitcher);
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
    paletteIntegration,
  ],
  devToolbar: {
    enabled: false
  }
});
