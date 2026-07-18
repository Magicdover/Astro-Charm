---
title: 一言
description: 中英双语的随机名言与梗，每 5 秒自动切换，也可手动暂停、随机、下一句。
icon:
  {
    default: "solar:chat-square-like-broken",
    hover: "solar:chat-square-like-outline",
    active: "solar:chat-square-like-bold-duotone",
  }
published: 2026-07-18
updated: 2026-07-18
index: 6
---

# 一言

一句话，也许是名家的箴言，也许是流传的段子。默认**每 5 秒自动切换**，也可以随时暂停、随机或看下一句。

<style>
.hk-wrap{margin:2rem auto;max-width:40rem;padding:2rem 1.8rem 1.6rem;border-radius:1.1rem;background:var(--charm-card-background);border:1px solid var(--charm-contrast-color-3);box-shadow:0 6px 24px #00000012;text-align:center;transform:translateZ(0);}
.hk-mark{font-family:Georgia,"Times New Roman",serif;font-size:3.4rem;line-height:.6;color:var(--charm-highlight-color);opacity:.32;height:1.4rem;user-select:none;}
.hk-zh{font-size:1.4rem;line-height:1.8;font-weight:600;color:var(--charm-font-color);margin:.4rem auto .7rem;max-width:34rem;text-align:center;transition:opacity .35s ease;will-change:opacity;}
.hk-en{font-style:italic;opacity:.78;margin:.2rem auto;max-width:34rem;line-height:1.65;text-align:center;transition:opacity .35s ease;will-change:opacity;}
.hk-from{margin:1rem 0 1.3rem;color:var(--charm-highlight-color);font-weight:600;text-align:center;}
.hk-ctrl{display:flex;justify-content:center;gap:.6rem;flex-wrap:wrap;}
.hk-btn{border:1px solid var(--charm-contrast-color-3);border-radius:2rem;padding:.42rem 1.15rem;cursor:pointer;font-size:.9rem;color:var(--charm-font-color);background:transparent;transition:background .2s ease,color .2s ease,border-color .2s ease,transform .2s ease;}
.hk-btn:hover{transform:translateY(-2px);border-color:var(--charm-highlight-color);color:var(--charm-highlight-color);}
.hk-btn.primary{color:var(--charm-font-light-color,#fff);background:var(--charm-highlight-color);border-color:var(--charm-highlight-color);}
</style>

<div class="hk-wrap"><div class="hk-mark">&#8220;</div><div class="hk-zh" id="hk-zh">载入中……</div><div class="hk-en" id="hk-en"></div><div class="hk-from" id="hk-from"></div><div class="hk-ctrl"><button class="hk-btn" id="hk-pause" type="button">暂停</button><button class="hk-btn" id="hk-rand" type="button">随机</button><button class="hk-btn primary" id="hk-next" type="button">下一句</button></div></div>

<script>
(function(){
  // ↓↓↓ 想增减句子，直接改这个数组即可（zh 中文、en 英文、from 出处）
  var Q=[
    {zh:"知之为知之，不知为不知，是知也。",en:"To know what you know, and to know what you do not know — that is true knowledge.",from:"《论语》"},
    {zh:"路漫漫其修远兮，吾将上下而求索。",en:"The road ahead is long and far; yet I will search high and low.",from:"屈原"},
    {zh:"人生得意须尽欢，莫使金樽空对月。",en:"When life gives you joy, drink your fill; never let the golden cup face the moon empty.",from:"李白"},
    {zh:"我思故我在。",en:"I think, therefore I am.",from:"笛卡尔"},
    {zh:"求知若饥，虚心若愚。",en:"Stay hungry, stay foolish.",from:"史蒂夫·乔布斯"},
    {zh:"世上只有一种真正的英雄主义，就是认清生活的真相后依然热爱它。",en:"There is only one heroism in the world: to see the world as it is, and to love it.",from:"罗曼·罗兰"},
    {zh:"不要温和地走进那个良夜。",en:"Do not go gentle into that good night.",from:"狄兰·托马斯"},
    {zh:"念念不忘，必有回响。",en:"Every thought held long enough will find its echo.",from:"《一代宗师》"},
    {zh:"愿你出走半生，归来仍是少年。",en:"May you wander half a lifetime, and return still young at heart.",from:"佚名"},
    {zh:"生活不止眼前的苟且，还有诗和远方。",en:"Life is more than the drudgery before you; there is also poetry and the distance.",from:"高晓松"},
    {zh:"代码千万行，注释第一行；命名不规范，同事泪两行。",en:"Ten thousand lines of code — comment the first; name things poorly, and your teammates weep.",from:"程序员梗"},
    {zh:"删库跑路一时爽，一直删库一直爽。",en:"Dropping the database and fleeing feels great — right up until it doesn't.",from:"程序员梗"},
    {zh:"这世界并不在意你的自尊，只会要求你先做出成绩，再去强调自己的感受。",en:"The world doesn't care about your self-esteem; it expects you to deliver first, and feel later.",from:"比尔·盖茨"},
    {zh:"再不疯狂我们就老了。",en:"If we don't go a little wild now, we'll soon be old.",from:"歌词"},
    {zh:"所谓天才，就是把 99% 的汗水，用在 1% 的灵感值得的地方。",en:"Genius is spending your ninety-nine percent of sweat where the one percent of inspiration is worth it.",from:"改编自爱迪生"}
  ];
  var idx=-1, timer=null, paused=false;
  function show(i){
    idx=i;var q=Q[i];
    var z=document.getElementById('hk-zh'),e=document.getElementById('hk-en'),f=document.getElementById('hk-from');
    if(!z){stopTimer();return;}
    z.style.opacity=0;e.style.opacity=0;
    setTimeout(function(){var zz=document.getElementById('hk-zh');if(!zz)return;zz.textContent=q.zh;document.getElementById('hk-en').textContent=q.en;document.getElementById('hk-from').textContent='—— '+q.from;zz.style.opacity=1;document.getElementById('hk-en').style.opacity=1;},150);
  }
  function randOne(){var i=Q.length<2?0:(Math.random()*Q.length)|0;while(Q.length>1&&i===idx)i=(Math.random()*Q.length)|0;show(i);}
  function nextOne(){show((idx+1)%Q.length);}
  function stopTimer(){if(timer){clearInterval(timer);timer=null;}}
  function startTimer(){stopTimer();if(!paused)timer=setInterval(function(){if(!document.getElementById('hk-zh')){stopTimer();return;}randOne();},5000);}
  function init(){
    var z=document.getElementById('hk-zh');if(!z)return;
    var pb=document.getElementById('hk-pause');
    if(pb&&!pb.__b){pb.__b=1;
      pb.addEventListener('click',function(){paused=!paused;pb.textContent=paused?'播放':'暂停';pb.classList.toggle('primary',paused);startTimer();});
      document.getElementById('hk-rand').addEventListener('click',function(){randOne();startTimer();});
      document.getElementById('hk-next').addEventListener('click',function(){nextOne();startTimer();});
    }
    randOne();startTimer();
  }
  if(!window.__hkBound){window.__hkBound=1;document.addEventListener('astro:page-load',init);}
  init();
})();
</script>
