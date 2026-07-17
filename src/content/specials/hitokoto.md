---
title: 一言
description: 中英双语的随机名言与梗，每次刷新或点击都换一句。
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

一句话，也许是名家的箴言，也许是流传的段子。点击「换一句」，或每次刷新，都会随机换一条中英双语的短句。

<style>
.hk-wrap{margin:1.8rem 0;padding:1.8rem 1.6rem;border-radius:1rem;background:var(--charm-card-background);border:1px solid var(--charm-contrast-color-3);box-shadow:0 4px 18px #00000012;text-align:center;}
.hk-zh{font-size:1.35rem;line-height:1.7;font-weight:600;margin:0 0 .6rem;border:none;padding:0;color:var(--charm-font-color);}
.hk-en{font-style:italic;opacity:.8;margin:.2rem 0;}
.hk-from{margin:.6rem 0 1.2rem;color:var(--charm-highlight-color);font-weight:600;}
.hk-btn{border:none;border-radius:2rem;padding:.5rem 1.4rem;cursor:pointer;font-size:.95rem;color:var(--charm-font-light-color,#fff);background:var(--charm-highlight-color);transition:transform .2s ease,box-shadow .2s ease;}
.hk-btn:hover{transform:translateY(-2px);box-shadow:0 6px 16px #00000022;}
</style>

<div class="hk-wrap"><blockquote class="hk-zh" id="hk-zh">载入中……</blockquote><p class="hk-en" id="hk-en"></p><p class="hk-from" id="hk-from"></p><button class="hk-btn" id="hk-btn" type="button">换一句</button></div>

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
    {zh:"这世界并不会在意你的自尊，只会要求你先做出成绩，再去强调自己的感受。",en:"The world doesn't care about your self-esteem; it expects you to deliver first, and feel later.",from:"比尔·盖茨"},
    {zh:"再不疯狂我们就老了。",en:"If we don't go a little wild now, we'll soon be old.",from:"歌词"},
    {zh:"所谓天才，就是把 99% 的汗水，用在 1% 的灵感值得的地方。",en:"Genius is spending your ninety-nine percent of sweat where the one percent of inspiration is worth it.",from:"改编自爱迪生"}
  ];
  var last=-1;
  function pick(){
    var i=Q.length<2?0:(Math.random()*Q.length)|0;
    if(Q.length>1){while(i===last)i=(Math.random()*Q.length)|0;}
    last=i;var q=Q[i];
    var z=document.getElementById('hk-zh'),e=document.getElementById('hk-en'),f=document.getElementById('hk-from');
    if(!z)return;
    z.style.opacity=0;
    setTimeout(function(){z.textContent=q.zh;e.textContent=q.en;f.textContent='—— '+q.from;z.style.transition='opacity .35s ease';z.style.opacity=1;},120);
  }
  function init(){
    var z=document.getElementById('hk-zh');if(!z)return;
    var b=document.getElementById('hk-btn');if(b&&!b.__bound){b.__bound=1;b.addEventListener('click',pick);}
    pick();
  }
  if(!window.__hkBound){window.__hkBound=1;document.addEventListener('astro:page-load',init);}
  init();
})();
</script>
