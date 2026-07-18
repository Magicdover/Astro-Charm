---
title: 壁纸
description: 分类浏览收藏的壁纸，支持图片、动图与视频，懒加载优化，点击可沉浸式缩放或播放。
icon:
  {
    default: "solar:gallery-wide-broken",
    hover: "solar:gallery-wide-outline",
    active: "solar:gallery-wide-bold-duotone",
  }
published: 2026-07-18
updated: 2026-07-18
index: 5
---

# 壁纸

按角色分类收藏的壁纸，含图片、动图与视频。上方可切换分类或看全部；缩略图**懒加载**（只加载进入视野的），避免一次性卡顿。点击任意一张进入沉浸式浏览：**图片**支持滚轮缩放、拖拽平移，**视频**可直接播放，`←` `→` 切换、`Esc` 关闭。

<style>
.wp-filter{display:flex;gap:.5rem;flex-wrap:wrap;margin:1.4rem 0;}
.wp-filter button{border:1px solid var(--charm-contrast-color-3);background:var(--charm-card-background);color:var(--charm-font-color);border-radius:2rem;padding:.35rem 1rem;cursor:pointer;font-size:.88rem;transition:background .2s,color .2s,border-color .2s;}
.wp-filter button.on{background:var(--charm-highlight-color);color:var(--charm-font-light-color,#fff);border-color:var(--charm-highlight-color);}
.wp-grid{columns:3 230px;column-gap:.8rem;margin:1rem 0;}
.wp-item{break-inside:avoid;margin:0 0 .8rem;position:relative;border-radius:.6rem;overflow:hidden;cursor:zoom-in;box-shadow:0 2px 10px #0000001a;transition:transform .25s ease,box-shadow .25s ease;}
.wp-item:hover{transform:translateY(-3px);box-shadow:0 10px 26px #00000026;}
.wp-item img,.wp-item video{width:100%;height:auto;display:block;}
.wp-item.hide{display:none;}
.wp-play{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#fff;background:linear-gradient(transparent,#00000055);pointer-events:none;}
.wp-play svg{width:2.6rem;height:2.6rem;filter:drop-shadow(0 2px 4px #0006);}
.wp-empty{opacity:.7;}
#wp-lightbox{position:fixed;inset:0;z-index:200;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,.93);backdrop-filter:blur(6px);}
#wp-lightbox.open{display:flex;animation:wp-fade .3s ease;}
@keyframes wp-fade{from{opacity:0}to{opacity:1}}
.wp-stage{max-width:100vw;max-height:100vh;overflow:hidden;display:flex;align-items:center;justify-content:center;}
.wp-stage img{max-width:92vw;max-height:88vh;object-fit:contain;opacity:0;border-radius:.3rem;will-change:transform;transition:opacity .35s ease;}
.wp-stage img.in{opacity:1;}
.wp-stage video{max-width:92vw;max-height:88vh;border-radius:.3rem;background:#000;}
#wp-lightbox .wp-btn{position:fixed;border:none;background:transparent;color:#fff;cursor:pointer;opacity:.75;transition:opacity .2s,transform .2s;}
#wp-lightbox .wp-btn:hover{opacity:1;}
.wp-close{top:.8rem;right:1.2rem;font-size:2.2rem;line-height:1;}
.wp-close:hover{transform:rotate(90deg);}
.wp-nav{top:50%;transform:translateY(-50%);font-size:2.6rem;padding:0 .6rem;}
.wp-prev{left:.6rem;} .wp-next{right:.6rem;}
.wp-hint{position:fixed;bottom:1rem;left:0;right:0;text-align:center;color:#fff9;font-size:.8rem;pointer-events:none;}
@media(max-width:640px){.wp-nav{font-size:2rem;}}
</style>

<div class="wp-filter" id="wp-filter"></div>
<div id="wp-grid" class="wp-grid"></div>

<script>
(function(){
  var GROUPS=(window.__CHARM&&window.__CHARM.wallpapers)||[];
  function enc(s){return s.split('/').map(encodeURIComponent).join('/');}
  var ALL=[];
  GROUPS.forEach(function(g){g.items.forEach(function(it){ALL.push({cat:g.cat,n:it.n,t:it.t,url:'/wallpapers/'+enc(g.cat)+'/'+encodeURIComponent(it.n)});});});
  var cur='all';
  function list(){return cur==='all'?ALL:ALL.filter(function(m){return m.cat===cur;});}
  var idx=0,scale=1,tx=0,ty=0,drag=false,px=0,py=0;
  var PLAY='<span class="wp-play"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span>';
  function img(){return document.querySelector('#wp-lightbox .wp-stage img');}
  function apply(){var im=img();if(!im)return;im.style.transform='translate('+tx+'px,'+ty+'px) scale('+scale+')';im.style.cursor=scale>1?(drag?'grabbing':'grab'):'default';}
  function zoomAt(cx,cy,f){var im=img();if(!im)return;var r=im.getBoundingClientRect();var Dx=r.left+r.width/2,Dy=r.top+r.height/2,ns=Math.max(1,Math.min(scale*f,8)),k=ns/scale;tx+=(cx-Dx)*(1-k);ty+=(cy-Dy)*(1-k);scale=ns;if(scale===1){tx=0;ty=0;}apply();}
  function load(i){
    var L=list();if(!L.length)return;idx=(i+L.length)%L.length;var m=L[idx];
    var stage=document.querySelector('#wp-lightbox .wp-stage');if(!stage)return;
    scale=1;tx=0;ty=0;
    if(m.t==='video'){stage.innerHTML='';var v=document.createElement('video');v.src=m.url;v.controls=true;v.autoplay=true;v.loop=true;v.playsInline=true;stage.appendChild(v);}
    else{stage.innerHTML='';var im=document.createElement('img');im.alt=m.n;im.onload=function(){apply();im.classList.add('in');};im.src=m.url;stage.appendChild(im);}
  }
  function getLb(){
    var lb=document.getElementById('wp-lightbox');if(lb)return lb;
    lb=document.createElement('div');lb.id='wp-lightbox';
    lb.innerHTML='<button class="wp-btn wp-close" aria-label="关闭">&times;</button><button class="wp-btn wp-nav wp-prev" aria-label="上一张">&#8249;</button><button class="wp-btn wp-nav wp-next" aria-label="下一张">&#8250;</button><div class="wp-stage"></div><div class="wp-hint">滚轮缩放（图片） · 拖拽平移 · ← → 切换 · Esc 关闭</div>';
    document.body.appendChild(lb);
    lb.querySelector('.wp-close').addEventListener('click',close);
    lb.querySelector('.wp-prev').addEventListener('click',function(e){e.stopPropagation();load(idx-1);});
    lb.querySelector('.wp-next').addEventListener('click',function(e){e.stopPropagation();load(idx+1);});
    lb.addEventListener('click',function(e){if(e.target===lb)close();});
    lb.querySelector('.wp-stage').addEventListener('wheel',function(e){if(!img())return;e.preventDefault();zoomAt(e.clientX,e.clientY,e.deltaY<0?1.14:1/1.14);},{passive:false});
    lb.querySelector('.wp-stage').addEventListener('mousedown',function(e){if(!img()||scale<=1)return;drag=true;px=e.clientX-tx;py=e.clientY-ty;e.preventDefault();});
    return lb;
  }
  function open(m){var lb=getLb();lb.classList.add('open');document.body.style.overflow='hidden';var L=list();for(var i=0;i<L.length;i++){if(L[i]===m){load(i);return;}}load(0);}
  function close(){var lb=document.getElementById('wp-lightbox');if(lb){lb.classList.remove('open');var s=lb.querySelector('.wp-stage');if(s)s.innerHTML='';}document.body.style.overflow='';}
  function applyFilter(){document.querySelectorAll('#wp-grid .wp-item').forEach(function(f){f.classList.toggle('hide',cur!=='all'&&f.getAttribute('data-cat')!==cur);});}
  function build(){
    var g=document.getElementById('wp-grid');if(!g||g.__built)return;g.__built=1;
    if(!ALL.length){g.innerHTML='<p class="wp-empty">在 public/wallpapers/ 下按分类放入图片/视频即可展示。</p>';return;}
    var bar=document.getElementById('wp-filter');
    var cats=['all'].concat(GROUPS.map(function(x){return x.cat;}));
    cats.forEach(function(c){var b=document.createElement('button');b.type='button';b.textContent=c==='all'?'全部':c;if(c==='all')b.classList.add('on');b.addEventListener('click',function(){cur=c;bar.querySelectorAll('button').forEach(function(x){x.classList.toggle('on',x===b);});applyFilter();});bar.appendChild(b);});
    ALL.forEach(function(m){
      var fig=document.createElement('figure');fig.className='wp-item';fig.setAttribute('data-cat',m.cat);
      if(m.t==='video'){var v=document.createElement('video');v.src=m.url;v.preload='metadata';v.muted=true;v.playsInline=true;fig.appendChild(v);fig.insertAdjacentHTML('beforeend',PLAY);}
      else{var im=document.createElement('img');im.src=m.url;im.alt=m.n;im.loading='lazy';im.decoding='async';fig.appendChild(im);}
      fig.addEventListener('click',function(){open(m);});
      g.appendChild(fig);
    });
  }
  if(!window.__wpGlobal){
    window.__wpGlobal=1;
    window.addEventListener('mousemove',function(e){if(!drag)return;tx=e.clientX-px;ty=e.clientY-py;apply();});
    window.addEventListener('mouseup',function(){if(drag){drag=false;apply();}});
    window.addEventListener('keydown',function(e){var lb=document.getElementById('wp-lightbox');if(!lb||!lb.classList.contains('open'))return;if(e.key==='Escape')close();else if(e.key==='ArrowLeft')load(idx-1);else if(e.key==='ArrowRight')load(idx+1);});
    document.addEventListener('astro:page-load',build);
  }
  build();
})();
</script>
