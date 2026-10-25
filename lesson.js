'use strict';
const sections=[...document.querySelectorAll('.scam-topic')];
const toggle=document.getElementById('present-toggle');
const controls=document.getElementById('present-controls');
let presenting=false,index=0;
function render(focus=false){
 sections.forEach((section,i)=>section.hidden=presenting&&i!==index);
 controls.hidden=!presenting;
 toggle.setAttribute('aria-pressed',String(presenting));
 toggle.textContent=presenting?'Show all topics':'Present one topic';
 document.getElementById('previous-topic').disabled=index===0;
 document.getElementById('next-topic').disabled=index===sections.length-1;
 document.getElementById('topic-count').textContent=(index+1)+' of '+sections.length+' · '+sections[index].querySelector('h2').childNodes[0].textContent;
 document.querySelectorAll('[data-topic]').forEach(a=>{if(a.dataset.topic===sections[index].id&&presenting)a.setAttribute('aria-current','step');else a.removeAttribute('aria-current')});
 if(focus){sections[index].scrollIntoView({block:'start'});sections[index].querySelector('h2').focus({preventScroll:true});}
}
toggle.addEventListener('click',()=>{presenting=!presenting;render(presenting)});
document.getElementById('previous-topic').addEventListener('click',()=>{index=Math.max(0,index-1);render(true)});
document.getElementById('next-topic').addEventListener('click',()=>{index=Math.min(sections.length-1,index+1);render(true)});
document.querySelectorAll('[data-topic]').forEach(a=>a.addEventListener('click',()=>{index=sections.findIndex(s=>s.id===a.dataset.topic);render(false)}));
window.addEventListener('hashchange',()=>{const found=sections.findIndex(s=>'#'+s.id===location.hash);if(found>=0){index=found;render(false)}});
render();
