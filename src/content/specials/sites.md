---
title: 导航
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

## 常用网址

<div class="nav-quick" id="nav-quick"></div>

<style>
.nav-quick{display:grid;grid-template-columns:repeat(12,1fr);gap:.7rem;margin:1.2rem 0 2.4rem;}
.nav-quick-item{position:relative;display:flex;align-items:center;justify-content:center;aspect-ratio:1;border-radius:.7rem;background:var(--charm-card-background);border:1px solid var(--charm-contrast-color-3);text-decoration:none;transition:transform .2s ease,box-shadow .2s ease,border-color .2s ease;}
.nav-quick-item::after{content:none!important;}
.nav-quick-item:hover{transform:translateY(-3px);box-shadow:0 6px 16px #00000018;border-color:var(--charm-highlight-color);}
.nav-quick-item .ni{width:56%;height:56%;object-fit:contain;color:var(--charm-font-color);transition:color .2s ease;}
.nav-quick-item:hover .ni{color:var(--charm-highlight-color);}
@media (width <= 48rem){.nav-quick{grid-template-columns:repeat(6,1fr);}}
</style>

<script>
(function(){
  /* 图标为 Simple Icons 的官方透明 logo（单色路径，内联渲染，fill=currentColor 跟随主题色），
     离线可用、无跨域。linux.do 无对应图标，退化为首字母徽标。 */
  var QUICK=[
    {n:"LINUX DO",u:"https://linux.do",img:"/linuxdo.png"},
    {n:"V2EX",u:"https://www.v2ex.com",p:"M.671 1.933h13.821a1.342 1.342 0 0 1 .98.425l8.166 8.725a1.342 1.342 0 0 1 0 1.834l-8.166 8.724a1.342 1.342 0 0 1-.98.426H.673A.671.671 0 0 1 0 21.395v-6.878h13.19l2.276-2.28a.336.336 0 0 0 0-.474l-2.276-2.28H0V2.604a.671.671 0 0 1 .671-.671Z"},
    {n:"Photopea",u:"https://www.photopea.com",p:"M20.098 0A3.899 3.899 0 0 1 24 3.903v16.194A3.899 3.899 0 0 1 20.098 24H6.393l-.051-10.34v-.074c0-3.92 3.112-7.09 6.963-7.09 2.31 0 4.177 1.902 4.177 4.254 0 2.352-1.867 4.254-4.177 4.254-.77 0-1.393-.634-1.393-1.418 0-.783.623-1.418 1.393-1.418.769 0 1.392-.634 1.392-1.418 0-.784-.623-1.418-1.392-1.418-2.31 0-4.178 1.9-4.178 4.253 0 2.352 1.868 4.254 4.178 4.254 3.85 0 6.962-3.169 6.962-7.09 0-3.92-3.112-7.089-6.962-7.089-5.39 0-9.75 4.436-9.75 9.925v.086l.023 10.315A3.899 3.899 0 0 1 0 20.097V3.903A3.899 3.899 0 0 1 3.902 0z"},
    {n:"Google",u:"https://www.google.com",p:"M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"},
    {n:"Apple",u:"https://www.apple.com",p:"M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"},
    {n:"X",u:"https://x.com",p:"M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z"},
    {n:"GitHub",u:"https://github.com",p:"M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"},
    {n:"DeepSeek",u:"https://www.deepseek.com",p:"M23.748 4.651c-.254-.124-.364.113-.512.233-.051.04-.094.09-.137.137-.372.397-.806.657-1.373.626-.829-.046-1.537.214-2.163.848-.133-.782-.575-1.248-1.247-1.548-.352-.155-.708-.311-.955-.65-.172-.24-.219-.509-.305-.774-.055-.16-.11-.323-.293-.35-.2-.031-.278.136-.356.276-.313.572-.434 1.202-.422 1.84.027 1.436.633 2.58 1.838 3.393.137.094.172.187.129.323-.082.28-.18.553-.266.833-.055.179-.137.218-.328.14a5.5 5.5 0 0 1-1.737-1.179c-.857-.828-1.631-1.743-2.597-2.46a12 12 0 0 0-.689-.47c-.985-.957.13-1.743.387-1.836.27-.098.094-.433-.778-.428-.872.003-1.67.295-2.687.685a3 3 0 0 1-.465.136 9.6 9.6 0 0 0-2.883-.101c-1.885.21-3.39 1.1-4.497 2.622C.082 8.776-.231 10.854.152 13.02c.403 2.284 1.568 4.175 3.36 5.653 1.857 1.533 3.997 2.284 6.438 2.14 1.482-.085 3.132-.284 4.994-1.86.47.234.962.328 1.78.398.629.058 1.235-.031 1.705-.129.735-.155.684-.836.418-.961-2.155-1.004-1.682-.595-2.112-.926 1.095-1.295 2.768-3.598 3.284-6.733.05-.346.115-.834.108-1.114-.004-.171.035-.238.23-.257a4.2 4.2 0 0 0 1.545-.475c1.397-.763 1.96-2.016 2.093-3.517.02-.23-.004-.467-.247-.588M11.58 18.168c-2.088-1.642-3.101-2.183-3.52-2.16-.39.024-.32.472-.234.763.09.288.207.487.371.74.114.167.192.416-.113.603-.673.416-1.842-.14-1.897-.168-1.361-.801-2.5-1.86-3.301-3.306-.775-1.393-1.225-2.888-1.299-4.482-.02-.385.094-.522.477-.592a4.7 4.7 0 0 1 1.53-.038c2.131.311 3.946 1.264 5.467 2.774.868.86 1.525 1.887 2.202 2.89.72 1.066 1.494 2.082 2.48 2.915.348.291.626.513.892.677-.802.09-2.14.109-3.055-.615zm1.001-6.44a.306.306 0 0 1 .415-.287.3.3 0 0 1 .113.074.3.3 0 0 1 .086.214c0 .17-.136.307-.308.307a.303.303 0 0 1-.306-.307m3.11 1.596c-.2.081-.4.151-.591.16a1.25 1.25 0 0 1-.798-.254c-.274-.23-.47-.358-.551-.758a1.7 1.7 0 0 1 .015-.588c.07-.327-.007-.537-.238-.727-.188-.156-.426-.199-.689-.199a.6.6 0 0 1-.254-.078.253.253 0 0 1-.114-.358 1 1 0 0 1 .192-.21c.356-.202.767-.136 1.146.016.352.144.618.408 1.001.782.392.451.462.576.685.915.176.264.336.536.446.848.066.194-.02.353-.25.45"},
    {n:"YouTube",u:"https://www.youtube.com",p:"M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"},
    {n:"bilibili",u:"https://www.bilibili.com",p:"M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373Z"},
    {n:"Claude",u:"https://claude.ai",p:"m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z"},
    {n:"Reddit",u:"https://www.reddit.com",p:"M12 0C5.373 0 0 5.373 0 12c0 3.314 1.343 6.314 3.515 8.485l-2.286 2.286C.775 23.225 1.097 24 1.738 24H12c6.627 0 12-5.373 12-12S18.627 0 12 0Zm4.388 3.199c1.104 0 1.999.895 1.999 1.999 0 1.105-.895 2-1.999 2-.946 0-1.739-.657-1.947-1.539v.002c-1.147.162-2.032 1.15-2.032 2.341v.007c1.776.067 3.4.567 4.686 1.363.473-.363 1.064-.58 1.707-.58 1.547 0 2.802 1.254 2.802 2.802 0 1.117-.655 2.081-1.601 2.531-.088 3.256-3.637 5.876-7.997 5.876-4.361 0-7.905-2.617-7.998-5.87-.954-.447-1.614-1.415-1.614-2.538 0-1.548 1.255-2.802 2.803-2.802.645 0 1.239.218 1.712.585 1.275-.79 2.881-1.291 4.64-1.365v-.01c0-1.663 1.263-3.034 2.88-3.207.188-.911.993-1.595 1.959-1.595Zm-8.085 8.376c-.784 0-1.459.78-1.506 1.797-.047 1.016.64 1.429 1.426 1.429.786 0 1.371-.369 1.418-1.385.047-1.017-.553-1.841-1.338-1.841Zm7.406 0c-.786 0-1.385.824-1.338 1.841.047 1.017.634 1.385 1.418 1.385.785 0 1.473-.413 1.426-1.429-.046-1.017-.721-1.797-1.506-1.797Zm-3.703 4.013c-.974 0-1.907.048-2.77.135-.147.015-.241.168-.183.305.483 1.154 1.622 1.964 2.953 1.964 1.33 0 2.47-.81 2.953-1.964.057-.137-.037-.29-.184-.305-.863-.087-1.795-.135-2.769-.135Z"}
  ];
  function build(){
    var box=document.getElementById("nav-quick");if(!box||box.__built)return;box.__built=1;
    QUICK.forEach(function(s){
      var a=document.createElement("a");a.className="nav-quick-item";a.href=s.u;a.target="_blank";a.rel="noopener";a.setAttribute("aria-label",s.n);
      if(s.img){
        a.innerHTML='<img class="ni" src="'+s.img+'" alt="'+s.n+'" loading="lazy">';
      }else{
        a.innerHTML='<svg class="ni" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="'+s.p+'"/></svg>';
      }
      box.appendChild(a);
    });
  }
  if(!window.__navQuickBound){window.__navQuickBound=1;document.addEventListener("astro:page-load",build);}
  build();
})();
</script>

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
      {n:"搜狗",u:"https://www.sogou.com",d:"接入微信与知乎内容的搜索。",cn:1},
      {n:"Google",u:"https://www.google.com",d:"全球最大的搜索引擎。",cn:0},
      {n:"DuckDuckGo",u:"https://duckduckgo.com",d:"注重隐私、不追踪的搜索。",cn:0},
      {n:"Perplexity",u:"https://www.perplexity.ai",d:"带引用的 AI 对话式搜索。",cn:0}
    ]},
    {cat:"AI 大模型",sites:[
      {n:"ChatGPT",u:"https://chat.openai.com",d:"OpenAI 的对话式大模型。",cn:0},
      {n:"Claude",u:"https://claude.ai",d:"Anthropic 的对话式大模型。",cn:0},
      {n:"Gemini",u:"https://gemini.google.com",d:"谷歌的多模态大模型。",cn:0},
      {n:"Grok",u:"https://grok.com",d:"xAI 推出的对话大模型。",cn:0},
      {n:"DeepSeek",u:"https://www.deepseek.com",d:"国产强推理开源大模型。",cn:1},
      {n:"Kimi",u:"https://kimi.moonshot.cn",d:"擅长长文本的国产助手。",cn:1},
      {n:"通义千问",u:"https://tongyi.aliyun.com",d:"阿里的通用大模型。",cn:1},
      {n:"文心一言",u:"https://yiyan.baidu.com",d:"百度的对话大模型。",cn:1},
      {n:"豆包",u:"https://www.doubao.com",d:"字节跳动的 AI 助手。",cn:1},
      {n:"智谱清言",u:"https://chatglm.cn",d:"清华系 GLM 大模型。",cn:1},
      {n:"Midjourney",u:"https://www.midjourney.com",d:"顶尖的 AI 绘画工具。",cn:0},
      {n:"Hugging Face",u:"https://huggingface.co",d:"开源模型与数据集社区。",cn:0}
    ]},
    {cat:"开发者",sites:[
      {n:"GitHub",u:"https://github.com",d:"全球最大的代码托管平台。",cn:0},
      {n:"GitLab",u:"https://gitlab.com",d:"一体化的 DevOps 平台。",cn:0},
      {n:"Gitee 码云",u:"https://gitee.com",d:"国内的代码托管平台。",cn:1},
      {n:"Stack Overflow",u:"https://stackoverflow.com",d:"程序员的问答社区。",cn:0},
      {n:"MDN Web Docs",u:"https://developer.mozilla.org",d:"权威的前端与 Web 文档。",cn:0},
      {n:"npm",u:"https://www.npmjs.com",d:"最大的 JavaScript 包仓库。",cn:0},
      {n:"Docker Hub",u:"https://hub.docker.com",d:"容器镜像的托管与分发。",cn:0},
      {n:"CodePen",u:"https://codepen.io",d:"前端代码在线演练场。",cn:0},
      {n:"LeetCode",u:"https://leetcode.cn",d:"算法刷题与面试准备。",cn:1},
      {n:"掘金",u:"https://juejin.cn",d:"国内活跃的技术社区。",cn:1},
      {n:"CSDN",u:"https://www.csdn.net",d:"老牌中文技术博客社区。",cn:1},
      {n:"V2EX",u:"https://www.v2ex.com",d:"极客与创意工作者社区。",cn:1}
    ]},
    {cat:"设计与灵感",sites:[
      {n:"Dribbble",u:"https://dribbble.com",d:"设计师作品与灵感社区。",cn:0},
      {n:"Behance",u:"https://www.behance.net",d:"Adobe 旗下创意作品平台。",cn:0},
      {n:"Figma",u:"https://www.figma.com",d:"协作式在线设计工具。",cn:0},
      {n:"Canva 可画",u:"https://www.canva.cn",d:"人人可用的在线设计。",cn:1},
      {n:"站酷 ZCOOL",u:"https://www.zcool.com.cn",d:"国内设计师作品社区。",cn:1},
      {n:"花瓣",u:"https://huaban.com",d:"设计素材采集与灵感。",cn:1},
      {n:"Awwwards",u:"https://www.awwwards.com",d:"全球优秀网页设计评选。",cn:0},
      {n:"Coolors",u:"https://coolors.co",d:"快速生成配色方案。",cn:0},
      {n:"Pinterest",u:"https://www.pinterest.com",d:"海量视觉灵感图墙。",cn:0}
    ]},
    {cat:"图库素材",sites:[
      {n:"Unsplash",u:"https://unsplash.com",d:"免费高清可商用图片。",cn:0},
      {n:"Pexels",u:"https://www.pexels.com",d:"免费图片与视频素材。",cn:0},
      {n:"Pixabay",u:"https://pixabay.com",d:"免费图像、插画与音乐。",cn:0},
      {n:"iconfont",u:"https://www.iconfont.cn",d:"阿里巴巴矢量图标库。",cn:1},
      {n:"Iconify",u:"https://icon-sets.iconify.design",d:"聚合海量开源图标集。",cn:0},
      {n:"Freepik",u:"https://www.freepik.com",d:"矢量图与素材资源库。",cn:0}
    ]},
    {cat:"影音娱乐",sites:[
      {n:"哔哩哔哩",u:"https://www.bilibili.com",d:"国内年轻人的视频社区。",cn:1},
      {n:"腾讯视频",u:"https://v.qq.com",d:"影视综艺的正版平台。",cn:1},
      {n:"爱奇艺",u:"https://www.iqiyi.com",d:"热门剧集与自制内容。",cn:1},
      {n:"优酷",u:"https://www.youku.com",d:"阿里旗下视频平台。",cn:1},
      {n:"网易云音乐",u:"https://music.163.com",d:"评论区最有故事的音乐。",cn:1},
      {n:"QQ 音乐",u:"https://y.qq.com",d:"曲库丰富的音乐平台。",cn:1},
      {n:"YouTube",u:"https://www.youtube.com",d:"全球最大的视频网站。",cn:0},
      {n:"Spotify",u:"https://www.spotify.com",d:"全球流行的流媒体音乐。",cn:0},
      {n:"Netflix",u:"https://www.netflix.com",d:"全球在线影视流媒体。",cn:0}
    ]},
    {cat:"社交社区",sites:[
      {n:"微博",u:"https://weibo.com",d:"国内的公共社交广场。",cn:1},
      {n:"知乎",u:"https://www.zhihu.com",d:"中文问答与讨论社区。",cn:1},
      {n:"豆瓣",u:"https://www.douban.com",d:"书影音评分与文艺社区。",cn:1},
      {n:"小红书",u:"https://www.xiaohongshu.com",d:"生活方式分享社区。",cn:1},
      {n:"百度贴吧",u:"https://tieba.baidu.com",d:"以兴趣聚合的老牌论坛。",cn:1},
      {n:"即刻",u:"https://web.okjike.com",d:"兴趣圈子与动态分享。",cn:1},
      {n:"X（推特）",u:"https://x.com",d:"全球实时资讯与社交。",cn:0},
      {n:"Reddit",u:"https://www.reddit.com",d:"海外最大的兴趣论坛。",cn:0},
      {n:"Instagram",u:"https://www.instagram.com",d:"图片与短视频社交。",cn:0}
    ]},
    {cat:"学习教育",sites:[
      {n:"中国大学 MOOC",u:"https://www.icourse163.org",d:"国内高校慕课平台。",cn:1},
      {n:"学堂在线",u:"https://www.xuetangx.com",d:"清华发起的慕课平台。",cn:1},
      {n:"网易公开课",u:"https://open.163.com",d:"名校公开课与讲座。",cn:1},
      {n:"Coursera",u:"https://www.coursera.org",d:"世界名校在线课程。",cn:0},
      {n:"edX",u:"https://www.edx.org",d:"哈佛与 MIT 发起的慕课。",cn:0},
      {n:"Khan Academy",u:"https://www.khanacademy.org",d:"免费的可汗学院课程。",cn:0},
      {n:"维基百科",u:"https://www.wikipedia.org",d:"全球最大的开放百科。",cn:0},
      {n:"TED",u:"https://www.ted.com",d:"值得分享的思想演讲。",cn:0},
      {n:"Brilliant",u:"https://brilliant.org",d:"互动式的理科学习。",cn:0}
    ]},
    {cat:"效率办公",sites:[
      {n:"语雀",u:"https://www.yuque.com",d:"国内好用的文档知识库。",cn:1},
      {n:"飞书",u:"https://www.feishu.cn",d:"一体化的协作办公套件。",cn:1},
      {n:"钉钉",u:"https://www.dingtalk.com",d:"企业沟通与协同平台。",cn:1},
      {n:"腾讯文档",u:"https://docs.qq.com",d:"多人实时协作文档。",cn:1},
      {n:"石墨文档",u:"https://shimo.im",d:"轻量的在线协作文档。",cn:1},
      {n:"WPS",u:"https://www.wps.cn",d:"国产办公软件与云文档。",cn:1},
      {n:"Notion",u:"https://www.notion.so",d:"灵活的笔记与协作空间。",cn:0},
      {n:"Trello",u:"https://trello.com",d:"看板式的任务管理。",cn:0},
      {n:"Excalidraw",u:"https://excalidraw.com",d:"手绘风格的白板画图。",cn:0}
    ]},
    {cat:"资讯阅读",sites:[
      {n:"少数派",u:"https://sspai.com",d:"高质量数字生活方式媒体。",cn:1},
      {n:"36 氪",u:"https://36kr.com",d:"关注创投与科技的资讯。",cn:1},
      {n:"虎嗅",u:"https://www.huxiu.com",d:"有观点的商业科技媒体。",cn:1},
      {n:"澎湃新闻",u:"https://www.thepaper.cn",d:"深度时政与调查报道。",cn:1},
      {n:"财新网",u:"https://www.caixin.com",d:"专业的财经新闻媒体。",cn:1},
      {n:"知乎日报",u:"https://daily.zhihu.com",d:"每日精选的知乎好文。",cn:1},
      {n:"Hacker News",u:"https://news.ycombinator.com",d:"硅谷极客的资讯聚合。",cn:0},
      {n:"Medium",u:"https://medium.com",d:"英文优质长文写作平台。",cn:0},
      {n:"The Verge",u:"https://www.theverge.com",d:"科技与数码前沿资讯。",cn:0}
    ]},
    {cat:"购物电商",sites:[
      {n:"淘宝",u:"https://www.taobao.com",d:"国内最大的综合购物。",cn:1},
      {n:"京东",u:"https://www.jd.com",d:"自营为主、配送快的电商。",cn:1},
      {n:"天猫",u:"https://www.tmall.com",d:"品牌旗舰的购物平台。",cn:1},
      {n:"拼多多",u:"https://www.pinduoduo.com",d:"主打拼团的低价电商。",cn:1},
      {n:"唯品会",u:"https://www.vip.com",d:"品牌特卖折扣电商。",cn:1},
      {n:"Amazon",u:"https://www.amazon.com",d:"全球最大的综合电商。",cn:0}
    ]},
    {cat:"云与开发平台",sites:[
      {n:"阿里云",u:"https://www.aliyun.com",d:"国内领先的云计算服务。",cn:1},
      {n:"腾讯云",u:"https://cloud.tencent.com",d:"腾讯的云计算平台。",cn:1},
      {n:"华为云",u:"https://www.huaweicloud.com",d:"华为的企业级云服务。",cn:1},
      {n:"Vercel",u:"https://vercel.com",d:"前端与全栈部署平台。",cn:0},
      {n:"Cloudflare",u:"https://www.cloudflare.com",d:"CDN、安全与边缘计算。",cn:0},
      {n:"Netlify",u:"https://www.netlify.com",d:"静态站点托管与部署。",cn:0}
    ]},
    {cat:"游戏",sites:[
      {n:"Steam",u:"https://store.steampowered.com",d:"全球最大的 PC 游戏平台。",cn:0},
      {n:"Epic Games",u:"https://www.epicgames.com",d:"常送免费游戏的商店。",cn:0},
      {n:"米哈游",u:"https://www.mihoyo.com",d:"《原神》等的国产厂商。",cn:1},
      {n:"4399 小游戏",u:"https://www.4399.com",d:"经典的在线小游戏站。",cn:1},
      {n:"itch.io",u:"https://itch.io",d:"独立游戏的聚集地。",cn:0},
      {n:"Nintendo",u:"https://www.nintendo.com",d:"任天堂官方游戏平台。",cn:0}
    ]},
    {cat:"生活服务",sites:[
      {n:"美团",u:"https://www.meituan.com",d:"外卖与本地生活服务。",cn:1},
      {n:"大众点评",u:"https://www.dianping.com",d:"餐饮与商户口碑点评。",cn:1},
      {n:"高德地图",u:"https://www.amap.com",d:"导航、出行与本地服务。",cn:1},
      {n:"12306",u:"https://www.12306.cn",d:"官方铁路购票平台。",cn:1},
      {n:"携程",u:"https://www.ctrip.com",d:"机票、酒店与旅行预订。",cn:1},
      {n:"百度地图",u:"https://map.baidu.com",d:"地图导航与位置服务。",cn:1}
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
