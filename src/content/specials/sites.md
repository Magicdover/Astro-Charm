---
title: 网址导航
description: 分门别类收集全球各领域的知名网站，支持国内/国外筛选，点击直达。
icon:
  {
    default: "solar:compass-broken",
    hover: "solar:compass-outline",
    active: "solar:compass-bold-duotone",
  }
published: 2026-07-18
updated: 2026-07-18
index: 4
---

# 网址导航

按领域收集的一批常用与知名网站，点击卡片即可直达。标注**国外**的站点可能需要科学上网，用上方的筛选可以只看**国内**可直接访问的部分。

<style>
.nav-filter{display:flex;gap:.5rem;margin:1.4rem 0;flex-wrap:wrap;}
.nav-filter button{border:1px solid var(--charm-contrast-color-3);background:var(--charm-card-background);color:var(--charm-font-color);border-radius:2rem;padding:.35rem 1.1rem;cursor:pointer;font-size:.9rem;transition:background .2s ease,color .2s ease,border-color .2s ease;}
.nav-filter button.on{background:var(--charm-highlight-color);color:var(--charm-font-light-color,#fff);border-color:var(--charm-highlight-color);}
.nav-cat{margin:1.5rem 0;}
.nav-cat-title{font-weight:700;font-size:1.05rem;margin:0 0 .7rem;color:var(--charm-highlight-color);}
.nav-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(12rem,1fr));gap:.7rem;}
.nav-card{display:block;padding:.7rem .85rem;border-radius:.6rem;background:var(--charm-card-background);border:1px solid var(--charm-contrast-color-3);text-decoration:none;color:inherit;transition:transform .2s ease,box-shadow .2s ease,border-color .2s ease;}
.nav-card:hover{transform:translateY(-3px);box-shadow:0 6px 16px #00000018;border-color:var(--charm-highlight-color);}
.nav-card .nc-top{display:flex;align-items:center;justify-content:space-between;gap:.4rem;}
.nav-card .nc-name{font-weight:700;color:var(--charm-highlight-color);}
.nav-card .nc-tag{font-size:.66rem;padding:.08rem .45rem;border-radius:1rem;background:var(--charm-contrast-color-2);white-space:nowrap;opacity:.85;}
.nav-card .nc-desc{margin-top:.28rem;font-size:.8rem;opacity:.82;line-height:1.5;}
.nav-hidden{display:none!important;}
</style>

<div id="nav-app"></div>

<script>
(function(){
  var DATA=[
    {cat:"搜索引擎",sites:[
      {n:"百度",u:"https://www.baidu.com",d:"国内最大的中文搜索引擎。",cn:1},
      {n:"必应 Bing",u:"https://www.bing.com",d:"微软搜索，国内可直接访问。",cn:1},
      {n:"Google",u:"https://www.google.com",d:"全球最大的搜索引擎。",cn:0},
      {n:"DuckDuckGo",u:"https://duckduckgo.com",d:"注重隐私、不追踪的搜索。",cn:0}
    ]},
    {cat:"开发者",sites:[
      {n:"GitHub",u:"https://github.com",d:"全球最大的代码托管平台。",cn:0},
      {n:"Gitee 码云",u:"https://gitee.com",d:"国内的代码托管平台。",cn:1},
      {n:"Stack Overflow",u:"https://stackoverflow.com",d:"程序员的问答社区。",cn:0},
      {n:"MDN Web Docs",u:"https://developer.mozilla.org",d:"权威的前端与 Web 文档。",cn:0},
      {n:"掘金",u:"https://juejin.cn",d:"国内活跃的技术社区。",cn:1},
      {n:"CSDN",u:"https://www.csdn.net",d:"老牌中文技术博客社区。",cn:1}
    ]},
    {cat:"AI 工具",sites:[
      {n:"ChatGPT",u:"https://chat.openai.com",d:"OpenAI 的对话式大模型。",cn:0},
      {n:"Claude",u:"https://claude.ai",d:"Anthropic 的对话式大模型。",cn:0},
      {n:"DeepSeek",u:"https://www.deepseek.com",d:"国产强推理开源大模型。",cn:1},
      {n:"Kimi",u:"https://kimi.moonshot.cn",d:"擅长长文本的国产助手。",cn:1},
      {n:"通义千问",u:"https://tongyi.aliyun.com",d:"阿里的通用大模型。",cn:1},
      {n:"文心一言",u:"https://yiyan.baidu.com",d:"百度的对话大模型。",cn:1}
    ]},
    {cat:"设计与灵感",sites:[
      {n:"Dribbble",u:"https://dribbble.com",d:"设计师作品与灵感社区。",cn:0},
      {n:"Behance",u:"https://www.behance.net",d:"Adobe 旗下创意作品平台。",cn:0},
      {n:"Figma",u:"https://www.figma.com",d:"协作式在线设计工具。",cn:0},
      {n:"站酷 ZCOOL",u:"https://www.zcool.com.cn",d:"国内设计师作品社区。",cn:1}
    ]},
    {cat:"影音娱乐",sites:[
      {n:"哔哩哔哩",u:"https://www.bilibili.com",d:"国内年轻人的视频社区。",cn:1},
      {n:"网易云音乐",u:"https://music.163.com",d:"评论区最有故事的音乐平台。",cn:1},
      {n:"YouTube",u:"https://www.youtube.com",d:"全球最大的视频网站。",cn:0},
      {n:"Spotify",u:"https://www.spotify.com",d:"全球流行的流媒体音乐。",cn:0}
    ]},
    {cat:"社交社区",sites:[
      {n:"知乎",u:"https://www.zhihu.com",d:"中文问答与讨论社区。",cn:1},
      {n:"豆瓣",u:"https://www.douban.com",d:"书影音评分与文艺社区。",cn:1},
      {n:"微博",u:"https://weibo.com",d:"国内的公共社交广场。",cn:1},
      {n:"X（推特）",u:"https://x.com",d:"全球实时资讯与社交平台。",cn:0},
      {n:"Reddit",u:"https://www.reddit.com",d:"海外最大的兴趣论坛。",cn:0}
    ]},
    {cat:"学习教育",sites:[
      {n:"中国大学 MOOC",u:"https://www.icourse163.org",d:"国内高校慕课平台。",cn:1},
      {n:"Coursera",u:"https://www.coursera.org",d:"世界名校在线课程。",cn:0},
      {n:"Khan Academy",u:"https://www.khanacademy.org",d:"免费的可汗学院课程。",cn:0},
      {n:"维基百科",u:"https://www.wikipedia.org",d:"全球最大的开放百科。",cn:0}
    ]},
    {cat:"效率工具",sites:[
      {n:"语雀",u:"https://www.yuque.com",d:"国内好用的文档与知识库。",cn:1},
      {n:"飞书",u:"https://www.feishu.cn",d:"一体化的协作办公套件。",cn:1},
      {n:"Notion",u:"https://www.notion.so",d:"灵活的笔记与协作空间。",cn:0},
      {n:"Excalidraw",u:"https://excalidraw.com",d:"手绘风格的白板画图工具。",cn:0}
    ]},
    {cat:"资讯阅读",sites:[
      {n:"少数派",u:"https://sspai.com",d:"高质量的数字生活方式媒体。",cn:1},
      {n:"36 氪",u:"https://36kr.com",d:"关注创投与科技的资讯站。",cn:1},
      {n:"Hacker News",u:"https://news.ycombinator.com",d:"硅谷极客的资讯聚合。",cn:0},
      {n:"Medium",u:"https://medium.com",d:"英文优质长文写作平台。",cn:0}
    ]}
  ];
  var cur="all";
  function inFilter(s){return cur==="all"||(cur==="cn"&&s.cn)||(cur==="global"&&!s.cn);}
  function esc(t){return String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}
  function build(){
    var app=document.getElementById("nav-app");if(!app||app.__built)return;app.__built=1;
    var bar=document.createElement("div");bar.className="nav-filter";
    [["all","全部"],["cn","国内"],["global","国外"]].forEach(function(f){
      var b=document.createElement("button");b.type="button";b.textContent=f[1];b.setAttribute("data-f",f[0]);if(f[0]==="all")b.classList.add("on");
      b.addEventListener("click",function(){cur=f[0];bar.querySelectorAll("button").forEach(function(x){x.classList.toggle("on",x.getAttribute("data-f")===cur);});applyFilter();});
      bar.appendChild(b);
    });
    app.appendChild(bar);
    DATA.forEach(function(c){
      var sec=document.createElement("div");sec.className="nav-cat";sec.setAttribute("data-cat","1");
      var h=document.createElement("div");h.className="nav-cat-title";h.textContent=c.cat;
      var grid=document.createElement("div");grid.className="nav-grid";
      c.sites.forEach(function(s){
        var a=document.createElement("a");a.className="nav-card";a.href=s.u;a.target="_blank";a.rel="noopener";a.setAttribute("data-cn",s.cn?"1":"0");
        a.innerHTML='<div class="nc-top"><span class="nc-name">'+esc(s.n)+'</span><span class="nc-tag">'+(s.cn?"国内":"国外")+'</span></div><div class="nc-desc">'+esc(s.d)+'</div>';
        grid.appendChild(a);
      });
      sec.appendChild(h);sec.appendChild(grid);app.appendChild(sec);
    });
    applyFilter();
  }
  function applyFilter(){
    var app=document.getElementById("nav-app");if(!app)return;
    app.querySelectorAll(".nav-cat").forEach(function(sec){
      var shown=0;
      sec.querySelectorAll(".nav-card").forEach(function(a){
        var cn=a.getAttribute("data-cn")==="1";var ok=cur==="all"||(cur==="cn"&&cn)||(cur==="global"&&!cn);
        a.classList.toggle("nav-hidden",!ok);if(ok)shown++;
      });
      sec.classList.toggle("nav-hidden",shown===0);
    });
  }
  if(!window.__navBound){window.__navBound=1;document.addEventListener("astro:page-load",build);}
  build();
})();
</script>
