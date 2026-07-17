---
title: 壁纸
description: 沉浸式浏览收藏的壁纸，支持滚轮缩放、拖拽平移与键盘切换。
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

一些收藏的壁纸。点击任意一张即可进入沉浸式浏览：**滚轮缩放、拖拽平移、双击复位、`←` `→` 切换、`Esc` 关闭**。想增减图片，往 `public/wallpapers/` 里放即可。

<style>
.wp-grid{columns:3 250px;column-gap:.8rem;margin:1.6rem 0;}
.wp-item{break-inside:avoid;margin:0 0 .8rem;}
.wp-item img{width:100%;height:auto;display:block;border-radius:.6rem;cursor:zoom-in;transition:transform .3s ease,box-shadow .3s ease;}
.wp-item img:hover{transform:translateY(-3px) scale(1.01);box-shadow:0 10px 26px #00000026;}
.wp-empty{opacity:.7;}
#wp-lightbox{position:fixed;inset:0;z-index:200;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,.92);backdrop-filter:blur(6px);}
#wp-lightbox.open{display:flex;animation:wp-fade .32s ease;}
@keyframes wp-fade{from{opacity:0}to{opacity:1}}
.wp-stage{max-width:100vw;max-height:100vh;overflow:hidden;display:flex;align-items:center;justify-content:center;}
#wp-img{max-width:92vw;max-height:88vh;object-fit:contain;opacity:0;border-radius:.3rem;will-change:transform;transition:opacity .4s ease;}
#wp-img.in{opacity:1;}
#wp-lightbox button{border:none;background:transparent;color:#fff;cursor:pointer;opacity:.75;transition:opacity .2s ease,transform .2s ease;}
#wp-lightbox button:hover{opacity:1;}
.wp-close{position:fixed;top:.8rem;right:1.2rem;font-size:2.2rem;line-height:1;}
.wp-close:hover{transform:rotate(90deg);}
.wp-nav{position:fixed;top:50%;transform:translateY(-50%);font-size:2.6rem;padding:0 .6rem;}
.wp-prev{left:.6rem;} .wp-next{right:.6rem;}
.wp-hint{position:fixed;bottom:1rem;left:0;right:0;text-align:center;color:#ffffffcc;font-size:.82rem;pointer-events:none;}
@media(max-width:640px){.wp-nav{font-size:2rem;}.wp-hint{font-size:.72rem;}}
</style>

<div id="wp-grid" class="wp-grid"></div>

<script>
(function(){
  var W=(window.__CHARM&&window.__CHARM.wallpapers)||[];
  function src(n){return '/wallpapers/'+encodeURIComponent(n);}
  var idx=0,scale=1,tx=0,ty=0,drag=false,px=0,py=0;
  function img(){return document.getElementById('wp-img');}
  function apply(){var im=img();if(!im)return;im.style.transform='translate('+tx+'px,'+ty+'px) scale('+scale+')';im.style.cursor=scale>1?(drag?'grabbing':'grab'):'default';}
  function load(i){var im=img();if(!im)return;idx=(i+W.length)%W.length;scale=1;tx=0;ty=0;im.classList.remove('in');im.onload=function(){apply();im.classList.add('in');};im.src=src(W[idx]);}
  function getLb(){
    var lb=document.getElementById('wp-lightbox');if(lb)return lb;
    lb=document.createElement('div');lb.id='wp-lightbox';
    lb.innerHTML='<button class="wp-close" aria-label="关闭">&times;</button><button class="wp-nav wp-prev" aria-label="上一张">&#8249;</button><button class="wp-nav wp-next" aria-label="下一张">&#8250;</button><div class="wp-stage"><img id="wp-img" alt="壁纸"></div><div class="wp-hint">滚轮缩放 · 拖拽平移 · 双击复位 · ← → 切换 · Esc 关闭</div>';
    document.body.appendChild(lb);
    lb.querySelector('.wp-close').addEventListener('click',close);
    lb.querySelector('.wp-prev').addEventListener('click',function(e){e.stopPropagation();load(idx-1);});
    lb.querySelector('.wp-next').addEventListener('click',function(e){e.stopPropagation();load(idx+1);});
    lb.addEventListener('click',function(e){if(e.target===lb)close();});
    var stage=lb.querySelector('.wp-stage');
    stage.addEventListener('wheel',function(e){e.preventDefault();scale*=e.deltaY<0?1.15:0.87;scale=Math.max(1,Math.min(scale,8));if(scale===1){tx=0;ty=0;}apply();},{passive:false});
    var im=lb.querySelector('#wp-img');
    im.addEventListener('dblclick',function(){scale=1;tx=0;ty=0;apply();});
    im.addEventListener('mousedown',function(e){if(scale<=1)return;drag=true;px=e.clientX-tx;py=e.clientY-ty;e.preventDefault();});
    return lb;
  }
  function open(i){var lb=getLb();lb.classList.add('open');document.body.style.overflow='hidden';load(i);}
  function close(){var lb=document.getElementById('wp-lightbox');if(lb)lb.classList.remove('open');document.body.style.overflow='';}
  function build(){
    var g=document.getElementById('wp-grid');if(!g||g.__built)return;g.__built=1;
    if(!W.length){g.innerHTML='<p class="wp-empty">在 public/wallpapers/ 放入图片即可展示。</p>';return;}
    W.forEach(function(n,i){var fig=document.createElement('figure');fig.className='wp-item';var im=document.createElement('img');im.src=src(n);im.alt=n;im.loading='lazy';im.addEventListener('click',function(){open(i);});fig.appendChild(im);g.appendChild(fig);});
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
