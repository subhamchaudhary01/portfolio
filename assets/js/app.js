// ---------- Background particles ----------
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let W = canvas.width = innerWidth;
let H = canvas.height = innerHeight;
window.addEventListener('resize', () => { W = canvas.width = innerWidth; H = canvas.height = innerHeight; init(); });

let particles = [];
function init(){
  particles = [];
  for(let i=0;i<120;i++){
    particles.push({
      x: Math.random()*W,
      y: Math.random()*H,
      r: Math.random()*1.8+0.3,
      vx: (Math.random()-0.5)*0.4,
      vy: (Math.random()-0.5)*0.4,
      hue: Math.random()*360
    });
  }
}
function draw(){
  ctx.clearRect(0,0,W,H);
  for(const p of particles){
    p.x += p.vx; p.y += p.vy;
    if(p.x<0)p.x=W; if(p.x>W)p.x=0;
    if(p.y<0)p.y=H; if(p.y>H)p.y=0;
    ctx.beginPath();
    ctx.fillStyle = `hsla(${p.hue},100%,70%,0.05)`;
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fill();
  }
  requestAnimationFrame(draw);
}
init(); draw();

// ---------- Typed.js for hero ----------
new Typed('#typed', {
  strings: [
    "Full Stack Developer.",
    "DevOps enthusiast.",
    "I build scalable, production-ready apps."
  ],
  typeSpeed: 40,
  backSpeed: 25,
  loop: true
});

window.addEventListener('load', () => {
  ScrollTrigger.refresh();
});



// ---------- Terminal simulation ----------
const terminal = document.getElementById('terminal');
const tlines = [
  "Languages: JavaScript (ES6+), C#, Java, Python",
  "Frontend: React, Redux, Tailwind, Bootstrap",
  "Backend: ASP.NET Core / Node.js",
  "Databases: MSSQL, MongoDB, MySQL",
  "Tools: Docker, Kubernetes, AWS, Git"
];
let ti = 0;
function typeLine(){
  if(!terminal) return;
  terminal.textContent = '';
  const text = tlines[ti % tlines.length];
  let i=0;
  const id = setInterval(()=> {
    terminal.textContent = text.slice(0,i++);
    if(i>text.length){ clearInterval(id); ti++; setTimeout(typeLine,900); }
  }, 28);
}
typeLine();

// ---------- GSAP animations ----------
gsap.registerPlugin(ScrollTrigger);
gsap.from('.hero', { y:30, opacity:0, duration:0.9, ease:'power3.out' });

// animate sections in sequence
gsap.utils.toArray('.panel-section').forEach((sec, idx) => {
  gsap.from(sec, {
    y: 30, opacity: 0, duration: 0.9, delay: idx*0.12,
    scrollTrigger: { trigger: sec, start: 'top 85%' }
  });
});

// // project cards entrance
// gsap.utils.toArray('.project-card').forEach((card,i)=>{
//   gsap.from(card, { y: 20, opacity: 0, duration: 0.9, delay: i*0.08, scrollTrigger: { trigger: card, start: 'top 90%' }});
// });

// Animate project cards
  gsap.utils.toArray('.project-card').forEach((card,i)=>{
    gsap.from(card, {
      y: 20,
      opacity: 0,
      duration: 0.9,
      delay: i*0.08,
      scrollTrigger: { trigger: card, start: 'top 90%' }
    });
  });


// small 3D tilt on project hover
// --- project card hover + click ---
document.querySelectorAll('.project-card').forEach(card=>{
  // 3D tilt on hover
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (py - 0.5) * 6;
    const ry = (px - 0.5) * -8;
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
  });
  card.addEventListener('mouseleave', () => card.style.transform = '');

  // open repo when clicking the card background
  card.addEventListener('click', e => {
    // ignore if they actually clicked a link inside
    if (e.target.tagName.toLowerCase() === 'a') return;
    const repo = card.dataset.repo;
    if (repo) window.open(repo, '_blank');
  });
});

// allow anchor buttons inside overlay to work normally
document.querySelectorAll('.project-overlay a').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation(); // prevents card click from overriding
  });
});


// // ---------- Section nav smooth scroll + active highlight ----------
// document.querySelectorAll('.nav-btn').forEach(btn=>{
//   btn.addEventListener('click', ()=> {
//     const target = document.querySelector(btn.dataset.target);
//     if(target) target.scrollIntoView({behavior:'smooth', block:'center'});
//   });
// });

// ---------- Section nav smooth scroll ----------
document.querySelectorAll('.nav-btn').forEach(btn=>{
  btn.addEventListener('click', ()=> {
    const target = document.querySelector(btn.dataset.target);
    if(target) target.scrollIntoView({ behavior:'smooth', block:'start' }); // changed 'center' -> 'start'
  });
});

// highlight currently active section (simple)
const sections = ['#top','#projects','#experience', '#process', '#stories', '#education','#achievements','#contact'];
window.addEventListener('scroll', ()=> {
  let sc = window.scrollY + innerHeight/2;
  sections.forEach(sel => {
    const el = document.querySelector(sel);
    if(!el) return;
    const top = el.offsetTop;
    const bottom = top + el.offsetHeight;
    const btn = document.querySelector(`.nav-btn[data-target="${sel}"]`);
    if(sc >= top && sc < bottom){
      btn && (btn.style.boxShadow = '0 8px 30px rgba(0,240,255,0.14)');
    } else {
      btn && (btn.style.boxShadow = 'none');
    }
  });
});

// cursor blink for cmdline
setInterval(()=>{ const c = document.getElementById('cmdcursor'); if(c) c.style.visibility = (c.style.visibility==='hidden')?'visible':'hidden'; }, 600);

// ---------- Count-up animation for hero stats ----------
function animateCounter(id, target, duration = 1500) {
  const el = document.getElementById(id);
  if (!el) return;
  let start = 0;
  const increment = target / (duration / 16);
  const update = () => {
    start += increment;
    if (start >= target) {
      el.textContent = target;
    } else {
      el.textContent = Math.floor(start);
      requestAnimationFrame(update);
    }
  };
  update();
}

// Animate in new sections
gsap.utils.toArray('.process-step, .story-card').forEach((el, i) => {
  gsap.from(el, {
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
    },
    opacity: 0,
    y: 40,
    duration: 0.6,
    delay: i * 0.1
  });
});




// trigger once when hero enters view
ScrollTrigger.create({
  trigger: ".hero",
  start: "top 80%",
  once: true,
  onEnter: () => {
    animateCounter("years", 2);
    animateCounter("projects", 10);
  }
});

setTimeout(() => {
  document.querySelectorAll('.stat-btn').forEach(btn => btn.classList.add('glow'));
}, 1700);
  
