const body=document.body, themeBtn=document.getElementById('themeBtn'), themePanel=document.getElementById('themePanel'), closeTheme=document.getElementById('closeTheme'), overlay=document.getElementById('overlay'), menuBtn=document.getElementById('menuBtn'), navLinks=document.getElementById('navLinks'), typing=document.getElementById('typing'), year=document.getElementById('year'), progress=document.getElementById('progress'), toTop=document.getElementById('toTop');

year.textContent=new Date().getFullYear();
const themes=['dark','light','aurora','rose'];
const saved=localStorage.getItem('anik-theme');
if(saved&&themes.includes(saved)&&saved!=='dark') body.classList.add('theme-'+saved);

themeBtn.onclick=()=>{themePanel.classList.toggle('open');overlay.classList.toggle('open')};
closeTheme.onclick=()=>{themePanel.classList.remove('open');overlay.classList.remove('open')};
overlay.onclick=()=>{themePanel.classList.remove('open');overlay.classList.remove('open');navLinks.classList.remove('open')};
document.querySelectorAll('.theme-options button').forEach(b=>b.onclick=()=>{
  const t=b.dataset.theme;
  body.className=body.className.replace(/\btheme-\S+/g,'').trim();
  if(t!=='dark') body.classList.add('theme-'+t);
  localStorage.setItem('anik-theme',t);
  themePanel.classList.remove('open');overlay.classList.remove('open');
});
menuBtn.onclick=()=>{navLinks.classList.toggle('open');overlay.classList.toggle('open')};
document.querySelectorAll('.nav-links a').forEach(a=>a.onclick=()=>{navLinks.classList.remove('open');overlay.classList.remove('open')});

const words=['Student & Developer','Web Designer','Telegram Bot Designer','Video Editor','Photo Editor','Logo Designer'];
let wi=0,ci=0,del=false;
function type(){
  const w=words[wi];
  typing.textContent=del?w.slice(0,ci--):w.slice(0,ci++);
  if(!del&&ci>w.length){del=true;setTimeout(type,1200);return}
  if(del&&ci<0){del=false;wi=(wi+1)%words.length;ci=0}
  setTimeout(type,del?45:80)
} type();

const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(e=>obs.observe(e));

const sections=[...document.querySelectorAll('main section[id]')];
window.addEventListener('scroll',()=>{
  const y=window.scrollY, h=document.documentElement.scrollHeight-innerHeight;
  progress.style.width=(h?y/h*100:0)+'%';
  toTop.classList.toggle('show',y>500);
  let current='home';
  sections.forEach(s=>{if(y>=s.offsetTop-180) current=s.id});
  document.querySelectorAll('.nav-links a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+current));
});
toTop.onclick=()=>window.scrollTo({top:0,behavior:'smooth'});

const lightbox=document.getElementById('lightbox'), lightboxImg=document.getElementById('lightboxImg'), lightboxClose=document.getElementById('lightboxClose');
document.querySelectorAll('.gallery-item').forEach(item=>item.onclick=()=>{
  lightboxImg.src=item.dataset.img;lightbox.classList.add('open');document.body.style.overflow='hidden';
});
function closeLight(){lightbox.classList.remove('open');document.body.style.overflow=''}
lightboxClose.onclick=closeLight;
lightbox.onclick=e=>{if(e.target===lightbox)closeLight()};
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeLight();themePanel.classList.remove('open');overlay.classList.remove('open')}});

if('serviceWorker' in navigator){
  // No service worker is required for GitHub Pages; keep site lightweight and cache-safe.
}
