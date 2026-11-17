const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('header nav');toggle.addEventListener('click',()=>{const o=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',o);toggle.setAttribute('aria-label',o?'Menu sluiten':'Menu openen');nav.classList.toggle('open',o);toggle.textContent=o?'×':'☰'});document.addEventListener('keydown',e=>{if(e.key==='Escape'){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.textContent='☰'}});
const cookie=document.querySelector('.cookie');let choice=false;try{choice=!!localStorage.getItem('frietkazerne-cookie-keuze')}catch{}if(!choice)cookie.hidden=false;document.querySelectorAll('[data-cookies]').forEach(b=>b.addEventListener('click',()=>cookie.hidden=false));document.querySelector('#cookie-ok').addEventListener('click',()=>{try{localStorage.setItem('frietkazerne-cookie-keuze','noodzakelijk')}catch{}cookie.hidden=true});document.querySelector('.cookie-close').addEventListener('click',()=>cookie.hidden=true);
if('IntersectionObserver'in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll('.feature,.steps article,.menuitem,.formula,.menu-visual,.closing h2').forEach(e=>{e.classList.add('reveal');io.observe(e)})}
const hero=document.querySelector('.hero-image');if(hero){const badge=document.createElement('div');badge.className='logo-orbit';badge.innerHTML='<div><img src="/assets/logo.png" alt="De Frietkazerne — het originele logo" width="100" height="90"></div>';hero.appendChild(badge);if(matchMedia('(pointer:fine) and (prefers-reduced-motion:no-preference)').matches){hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;badge.style.transform=`rotateX(${-y*12}deg) rotateY(${x*16}deg)`});hero.addEventListener('pointerleave',()=>badge.style.transform='')}}
const form=document.querySelector('#request-form');if(form){form.addEventListener('submit',async e=>{e.preventDefault();const data=new FormData(form);const lines=['MIJN FEESTAANVRAAG','Naam: '+data.get('naam'),'Interesse: '+data.get('dienst'),'Datum: '+data.get('datum'),'Gasten: '+data.get('gasten'),'Locatie: '+data.get('locatie'),'Wensen: '+data.get('wensen'),'','Bel De Frietkazerne: 0472 82 94 25','Dit overzicht is niet verzonden.'];const output=document.querySelector('#request-output');output.textContent=lines.join('\n');output.hidden=false;const b=document.createElement('button');b.type='button';b.className='button';b.textContent='Kopieer overzicht';b.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(lines.join('\n'));b.textContent='Gekopieerd ✓'}catch{b.textContent='Selecteer de tekst om te kopiëren'}});output.appendChild(document.createElement('br'));output.appendChild(b);output.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth',block:'center'})})}


const mascot=document.querySelector('.animated-mascot');
if(mascot){
 const canvas=mascot.querySelector('canvas'),ctx=canvas.getContext('2d');
 const man=new Image(),fries=new Image();man.src='/assets/firefighter-cutout.png';fries.src='/assets/fries-cutout.png';
 let ready=0,paused=matchMedia('(prefers-reduced-motion:reduce)').matches,time=0,last=0,spawn=0,raf=0;
 let flying=[],settled=[];let seed=371;
 const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296};
 const makeRest=(i)=>{const x=85+random()*205;const center=1-Math.abs(x-190)/110;return{x,y:448-random()*(18+Math.max(0,center)*77),angle:(random()-.5)*Math.PI*2,size:43+random()*15,landed:-10}};
 for(let i=0;i<80;i++)settled.push(makeRest(i));
 settled.sort((a,b)=>a.y-b.y);
 const fry=(x,y,size,angle,opacity=1)=>{ctx.save();ctx.translate(x,y);ctx.rotate(angle);ctx.globalAlpha=opacity;ctx.drawImage(fries,1094,185,200,195,-size/2,-size/2,size,size*.975);ctx.restore()};
 function draw(){
  ctx.clearRect(0,0,771,520);
  ctx.save();ctx.fillStyle='rgba(101,48,13,.12)';ctx.beginPath();ctx.ellipse(189,460,125,9,0,0,Math.PI*2);ctx.fill();ctx.restore();
  const sway=Math.sin(time*2.1)*.013+Math.sin(time*4.2)*.003;
  const px=600,py=426,ix=180,iy=15,iw=590,ih=iw*1085/1449;
  const sourceX=ix+665/1449*iw,sourceY=iy+534/1085*ih;
  const dx=sourceX-px,dy=sourceY-py;
  const nozzle={x:px+dx*Math.cos(sway)-dy*Math.sin(sway),y:py+dx*Math.sin(sway)+dy*Math.cos(sway)};
  // Draw the original cutout; the emitter uses the identical transform.
  ctx.save();ctx.translate(px,py);ctx.rotate(sway);ctx.translate(ix-px,iy-py);ctx.scale(iw/1449,ih/1085);
  // Split at the collar so the head can nod independently of the hose and torso.
  const head=new Path2D('M805 0H1449V440H1175L1145 488L945 580L850 510Z');
  ctx.save();ctx.beginPath();ctx.rect(0,0,1449,1085);
  const body=new Path2D();body.rect(0,0,1449,1085);body.addPath(head);ctx.clip(body,'evenodd');ctx.drawImage(man,0,0);ctx.restore();
  ctx.save();const headAngle=Math.sin(time*1.35)*.023+Math.sin(time*2.7)*.006;
  ctx.translate(1020,520);ctx.rotate(headAngle);ctx.translate(-1020,-520);ctx.clip(head);ctx.drawImage(man,0,0);
  // Eyes are redrawn in the original illustration coordinates, within the head rig.
  const cycle=time%4.7;const blink=cycle>3.65&&cycle<3.94?Math.sin((cycle-3.65)/.29*Math.PI):0;
  const glance=Math.sin(time*.95)*2.7-2;const down=2+Math.sin(time*1.35)*1.5;
  [[1024,210,.30],[1057,218,.37]].forEach(([ex,ey,tilt],index)=>{
   ctx.save();ctx.translate(ex,ey);ctx.rotate(tilt);
   ctx.fillStyle='#ffa489';ctx.beginPath();ctx.ellipse(0,0,16.5,25,0,0,Math.PI*2);ctx.fill();
   const openness=Math.max(.035,1-blink);
   if(openness>.12){
    ctx.fillStyle='#fffdf9';ctx.strokeStyle='#242019';ctx.lineWidth=2.4;ctx.beginPath();ctx.ellipse(0,0,14.2,22*openness,0,0,Math.PI*2);ctx.fill();ctx.stroke();
    ctx.save();ctx.clip();ctx.fillStyle='#181e1c';ctx.beginPath();ctx.ellipse(glance,down+6,6.4,10.2,0,0,Math.PI*2);ctx.fill();ctx.fillStyle='white';ctx.beginPath();ctx.arc(glance+1.7,down+1.5,2.3,0,Math.PI*2);ctx.fill();ctx.restore();
   }else{ctx.strokeStyle='#39231c';ctx.lineWidth=3.2;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(-12,0);ctx.quadraticCurveTo(0,5,12,0);ctx.stroke()}
   ctx.restore();
  });
  ctx.restore();ctx.restore();
  settled.forEach(p=>{const age=time-p.landed;const bounce=age>=0&&age<.3?-Math.sin(age/.3*Math.PI)*6:0;fry(p.x,p.y+bounce,p.size,p.angle)});
  flying.forEach(p=>{const u=Math.min(1,(time-p.born)/p.duration),v=1-u;
   const x=v*v*p.start.x+2*v*u*p.control.x+u*u*p.end.x;
   const y=v*v*p.start.y+2*v*u*p.control.y+u*u*p.end.y;
   // Small at the hose opening; grows naturally as each fry clears the nozzle.
   const size=p.size*(.35+.65*Math.min(1,u/.18));
   fry(x,y,size,p.angle+u*p.spin);
  });
  if(!paused){const phase=(time*4)%1;ctx.save();ctx.globalAlpha=(1-phase)*.45;ctx.strokeStyle='#f5b83b';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(nozzle.x-6-phase*10,nozzle.y-phase*4,3+phase*4,6+phase*4,-.4,0,Math.PI*2);ctx.stroke();ctx.restore()}
  return nozzle;
 }
 function frame(stamp){raf=0;if(ready!==true||document.hidden)return;
  const dt=last?Math.min(.04,(stamp-last)/1000):0;last=stamp;
  if(!paused){time+=dt;spawn+=dt;
   const nozzle=draw();
   if(spawn>=.19){spawn=0;const rest=makeRest(settled.length);flying.push({born:time,duration:1.15+random()*.23,start:{x:nozzle.x-3,y:nozzle.y},control:{x:315+random()*35,y:170+random()*25},end:rest,size:rest.size,angle:-.6,spin:(random()-.5)*4,rest})}
   flying=flying.filter(p=>{if(time-p.born<p.duration)return true;p.rest.landed=time;settled.push(p.rest);if(settled.length>105)settled.shift();return false});
  }
  draw();if(!paused)raf=requestAnimationFrame(frame);
 }
 function sync(){last=0;if(ready===true&&!raf)raf=requestAnimationFrame(frame)}
 
 const loaded=()=>{ready++;if(ready===2){ready=true;sync()}};
 man.onload=loaded;fries.onload=loaded;
 document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;last=0}else sync()});sync();
}

const menuSearch=document.querySelector('#menu-search');if(menuSearch){let category='all';const buttons=[...document.querySelectorAll('[data-menu-category]')],sections=[...document.querySelectorAll('[data-food-category]')];function filterMenu(){const term=menuSearch.value.toLocaleLowerCase('nl').trim();let total=0;sections.forEach(section=>{let visible=0;section.querySelectorAll('[data-food-name]').forEach(row=>{const show=(category==='all'||category===section.dataset.foodCategory)&&row.dataset.foodName.toLocaleLowerCase('nl').includes(term);row.hidden=!show;if(show)visible++});section.hidden=!visible;total+=visible});document.querySelector('.menu-empty').hidden=total>0}buttons.forEach(button=>button.addEventListener('click',()=>{category=button.dataset.menuCategory;buttons.forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button))});filterMenu()}));menuSearch.addEventListener('input',filterMenu)}
