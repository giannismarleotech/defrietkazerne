// Short serving-hatch entrance. Always releases the page, including cached navigation.
(()=>{const root=document.documentElement,loader=document.querySelector('.page-loader');if(!loader)return;const started=performance.now();let first=true;try{first=!sessionStorage.getItem('fk-visited');sessionStorage.setItem('fk-visited','1')}catch{}const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;const minimum=reduced?0:(first?1050:520);let finished=false;function finish(){if(finished)return;finished=true;setTimeout(()=>{root.classList.remove('js-boot');root.classList.add('page-ready');loader.classList.add('finished');setTimeout(()=>loader.remove(),500)},Math.max(0,minimum-(performance.now()-started)))}if(document.readyState==='complete')finish();else window.addEventListener('load',finish,{once:true});setTimeout(finish,1250);window.addEventListener('pageshow',e=>{if(e.persisted){root.classList.remove('js-boot');loader.remove()}})})();
const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('header nav');toggle.addEventListener('click',()=>{const o=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',o);toggle.setAttribute('aria-label',o?'Menu sluiten':'Menu openen');nav.classList.toggle('open',o);toggle.textContent=o?'×':'☰'});document.addEventListener('keydown',e=>{if(e.key==='Escape'){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.textContent='☰'}});
const cookie=document.querySelector('.cookie');let choice=false;try{choice=!!localStorage.getItem('frietkazerne-cookie-keuze')}catch{}if(!choice)cookie.hidden=false;document.querySelectorAll('[data-cookies]').forEach(b=>b.addEventListener('click',()=>cookie.hidden=false));document.querySelector('#cookie-ok').addEventListener('click',()=>{try{localStorage.setItem('frietkazerne-cookie-keuze','noodzakelijk')}catch{}cookie.hidden=true});document.querySelector('.cookie-close').addEventListener('click',()=>cookie.hidden=true);
if('IntersectionObserver'in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll('.feature,.steps article,.menuitem,.formula,.menu-visual,.closing h2').forEach(e=>{e.classList.add('reveal');io.observe(e)})}
const hero=document.querySelector('.hero-image');if(hero){const badge=document.createElement('div');badge.className='logo-orbit';badge.innerHTML='<div><img src="/assets/logo.png" alt="De Frietkazerne — het originele logo" width="100" height="90"></div>';hero.appendChild(badge);if(matchMedia('(pointer:fine) and (prefers-reduced-motion:no-preference)').matches){hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;badge.style.transform=`rotateX(${-y*12}deg) rotateY(${x*16}deg)`});hero.addEventListener('pointerleave',()=>badge.style.transform='')}}
const form=document.querySelector('#request-form');if(form){form.addEventListener('submit',async e=>{e.preventDefault();const data=new FormData(form);const lines=['MIJN FEESTAANVRAAG','Naam: '+data.get('naam'),'Interesse: '+data.get('dienst'),'Datum: '+data.get('datum'),'Gasten: '+data.get('gasten'),'Locatie: '+data.get('locatie'),'Wensen: '+data.get('wensen'),'','Bel De Frietkazerne: 0472 82 94 25','Dit overzicht is niet verzonden.'];const output=document.querySelector('#request-output');output.textContent=lines.join('\n');output.hidden=false;const b=document.createElement('button');b.type='button';b.className='button';b.textContent='Kopieer overzicht';b.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(lines.join('\n'));b.textContent='Gekopieerd ✓'}catch{b.textContent='Selecteer de tekst om te kopiëren'}});output.appendChild(document.createElement('br'));output.appendChild(b);output.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth',block:'center'})})}


const mascot=document.querySelector('.animated-mascot');
if(mascot){
 const canvas=mascot.querySelector('canvas'),ctx=canvas.getContext('2d'),ratio=Math.min(window.devicePixelRatio||1,2);
 canvas.width=771*ratio;canvas.height=520*ratio;
 const man=new Image(),fries=new Image();let loaded=0,time=0,last=0,raf=0,acc=0,visible=true;
 const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
 const gaze={x:500,y:260,tx:500,ty:260,active:false};
 let seed=371;const rnd=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296};
 const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
 const head=new Path2D('M805 0H1449V440H1175L1145 488L945 580L850 510Z');
 const arms=new Path2D('M643 503L735 490L823 526L884 562L967 578L1082 589L1177 619L1215 665L1202 722L1126 746L995 722L927 709L875 663L790 650L748 615L700 582L645 559Z');
 const body=new Path2D();body.rect(0,0,1449,1085);body.addPath(head);body.addPath(arms);
 let flying=[],pile=[],crumbs=[],nextBlink=2.6,blinkStart=-10;
 const rest=()=>{const x=78+rnd()*216,c=1-Math.abs(x-188)/112;return{x,y:449-rnd()*(15+Math.max(0,c)*75),a:(rnd()-.5)*Math.PI*2,size:41+rnd()*16,born:-5}};
 for(let i=0;i<78;i++)pile.push(rest());pile.sort((a,b)=>a.y-b.y);
 window.addEventListener('pointermove',e=>{if(e.pointerType==='touch')return;const r=canvas.getBoundingClientRect();gaze.tx=(e.clientX-r.left)*771/r.width;gaze.ty=(e.clientY-r.top)*520/r.height;gaze.active=true},{passive:true});
 document.documentElement.addEventListener('pointerleave',()=>gaze.active=false);
 function drawFry(x,y,size,a,roll=0,alpha=1){ctx.save();ctx.translate(x,y);ctx.rotate(a);ctx.scale(.68+.32*Math.abs(Math.cos(roll)),1);ctx.globalAlpha=alpha;ctx.drawImage(fries,1094,185,200,195,-size/2,-size/2,size,size*.975);ctx.restore()}
 function paint(){
  ctx.setTransform(ratio,0,0,ratio,0,0);ctx.clearRect(0,0,771,520);
  ctx.fillStyle='rgba(101,48,13,.10)';ctx.beginPath();ctx.ellipse(188,460,122,8,0,0,Math.PI*2);ctx.fill();
  const recoil=Math.sin(time*4.1),sway=Math.sin(time*1.8)*.022+recoil*.006,bob=Math.sin(time*3.6)*1.7;
  ctx.save();ctx.translate(600,426+bob);ctx.rotate(sway);ctx.translate(-420,-411);ctx.scale(590/1449,590/1449);
  // Solid torso backing prevents gaps when the independent arm layer moves.
  ctx.save();ctx.fillStyle='#155b78';ctx.beginPath();ctx.moveTo(941,584);ctx.lineTo(1143,588);ctx.lineTo(1191,716);ctx.lineTo(965,719);ctx.closePath();ctx.fill();ctx.restore();
  ctx.save();ctx.clip(body,'evenodd');ctx.drawImage(man,0,0);ctx.restore();
  ctx.save();ctx.translate(1120,686);ctx.rotate(-.014+recoil*.021);ctx.translate(-1120,-686);
  const muzzleMatrix=ctx.getTransform();const muzzle=new DOMPoint(666,535).matrixTransform(muzzleMatrix);const nozzle={x:muzzle.x/ratio,y:muzzle.y/ratio};
  ctx.clip(arms);ctx.drawImage(man,0,0);ctx.restore();
  ctx.save();const headAngle=Math.sin(time*1.15)*.036+Math.sin(time*2.3)*.01+(gaze.active?clamp((gaze.x-610)/12500,-.035,.035):0);
  ctx.translate(1020,520);ctx.rotate(headAngle);ctx.translate(-1020,-520);ctx.clip(head);ctx.drawImage(man,0,0);
  const eyeTarget=new DOMPoint(gaze.x*ratio,gaze.y*ratio).matrixTransform(ctx.getTransform().inverse());
  const gx=gaze.active?clamp((eyeTarget.x-1040)/80,-6.7,6.7):Math.sin(time*.7)*3-2;
  const gy=gaze.active?clamp((eyeTarget.y-215)/90,-8,6):1.5+Math.sin(time*.9)*2;
  const blinkPhase=(time-blinkStart)/.32;
  const blink=blinkPhase>=0&&blinkPhase<=1?Math.pow(Math.sin(blinkPhase*Math.PI),.6):0;
  [[1024,210,.30],[1057,218,.37]].forEach(([x,y,angle],i)=>{
   ctx.save();ctx.translate(x,y);ctx.rotate(angle);ctx.fillStyle='#ffa489';ctx.beginPath();ctx.ellipse(0,0,16.5,25,0,0,Math.PI*2);ctx.fill();
   const happy=.96+.035*Math.sin(time*1.2),open=Math.max(.025,(1-blink)*happy);
   ctx.strokeStyle='#30251d';ctx.lineWidth=2.5;ctx.lineCap='round';
   if(open>.11){ctx.fillStyle='#fffdf9';ctx.beginPath();ctx.ellipse(0,0,14,22*open,0,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.save();ctx.clip();ctx.fillStyle='#111d1a';ctx.beginPath();ctx.ellipse(gx,gy+5,6.4,10,0,0,Math.PI*2);ctx.fill();ctx.fillStyle='white';ctx.beginPath();ctx.arc(gx+1.7,gy+.5,2.2,0,Math.PI*2);ctx.fill();ctx.restore()}
   else{ctx.beginPath();ctx.moveTo(-12,0);ctx.quadraticCurveTo(0,6,12,0);ctx.stroke()}
   ctx.restore();
  });
  ctx.restore();ctx.restore();
  pile.forEach(p=>{const age=time-p.born;const spring=age>=0&&age<.45?Math.sin(age/.45*Math.PI*2)*5*Math.exp(-age*6):0;drawFry(p.x,p.y-spring,p.size,p.a+spring*.025)});
  flying.forEach(p=>{const age=time-p.born,u=clamp(age/p.duration,0,1);const x=p.x+p.vx*age,y=p.y+p.vy*age+210*age*age;drawFry(x,y,p.size*(.27+.73*Math.min(1,u/.16)),p.angle+age*p.spin,age*p.roll)});
  crumbs.forEach(p=>{const a=time-p.born;ctx.fillStyle='#d99c32';ctx.globalAlpha=Math.max(0,1-a/.45)*.6;ctx.beginPath();ctx.arc(p.x+p.vx*a,p.y+p.vy*a+100*a*a,1.4,0,Math.PI*2);ctx.fill()});ctx.globalAlpha=1;
  // Barely visible steam rises from the warm pile, never across the face.
  for(let i=0;i<3;i++){const u=(time*.22+i*.31)%1;ctx.save();ctx.globalAlpha=Math.sin(u*Math.PI)*.16;ctx.strokeStyle='#bc965f';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(145+i*34,376-u*24);ctx.bezierCurveTo(135+i*34,364-u*24,161+i*34,357-u*24,149+i*34,344-u*24);ctx.stroke();ctx.restore()}
  return nozzle;
 }
 function nozzlePosition(){const recoil=Math.sin(time*4.1),sway=Math.sin(time*1.8)*.022+recoil*.006,bob=Math.sin(time*3.6)*1.7;const matrix=new DOMMatrix().translate(600,426+bob).rotate(sway*180/Math.PI).translate(-420,-411).scale(590/1449).translate(1120,686).rotate((-.014+recoil*.021)*180/Math.PI).translate(-1120,-686);return new DOMPoint(666,535).matrixTransform(matrix)}
 function frame(stamp){raf=0;if(loaded<2||document.hidden||!visible)return;const dt=last?Math.min(.04,(stamp-last)/1000):0;last=stamp;
  if(!reduced){time+=dt;acc+=dt;const ease=1-Math.exp(-dt*8);if(gaze.active){gaze.x+=(gaze.tx-gaze.x)*ease;gaze.y+=(gaze.ty-gaze.y)*ease}
   if(time>=nextBlink){blinkStart=time;nextBlink=time+2.6+rnd()*3.2}
   const nozzle=nozzlePosition();
   if(acc>.155){acc=0;const end=rest(),duration=1.05+rnd()*.25;flying.push({x:nozzle.x-2,y:nozzle.y,born:time,duration,vx:(end.x-nozzle.x)/duration,vy:(end.y-nozzle.y-210*duration*duration)/duration,angle:-.6,spin:(rnd()-.5)*5,roll:3+rnd()*4,size:end.size,end});if(rnd()>.4)crumbs.push({x:nozzle.x-5,y:nozzle.y,born:time,vx:-55-rnd()*35,vy:-15-rnd()*35})}
   flying=flying.filter(p=>{if(time-p.born<p.duration)return true;p.end.born=time;pile.push(p.end);if(pile.length>105)pile.shift();return false});crumbs=crumbs.filter(p=>time-p.born<.45);
  }
  paint();if(!reduced)raf=requestAnimationFrame(frame);
 }
 const start=()=>{last=0;if(loaded===2&&!raf)raf=requestAnimationFrame(frame)};
 man.onload=fries.onload=()=>{loaded++;start()};man.src='/assets/firefighter-cutout.png';fries.src='/assets/fries-cutout.png';
 document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;last=0}else start()});
 new IntersectionObserver(es=>{visible=es[0].isIntersecting;if(visible)start();else{cancelAnimationFrame(raf);raf=0;last=0}},{threshold:.05}).observe(canvas);
}

const menuSearch=document.querySelector('#menu-search');if(menuSearch){let category='all';const buttons=[...document.querySelectorAll('[data-menu-category]')],sections=[...document.querySelectorAll('[data-food-category]')];function filterMenu(){const term=menuSearch.value.toLocaleLowerCase('nl').trim();let total=0;sections.forEach(section=>{let visible=0;section.querySelectorAll('[data-food-name]').forEach(row=>{const show=(category==='all'||category===section.dataset.foodCategory)&&row.dataset.foodName.toLocaleLowerCase('nl').includes(term);row.hidden=!show;if(show)visible++});section.hidden=!visible;const details=section.querySelector(".food-accordion");if(details)details.open=Boolean(term||category!=="all");total+=visible});document.querySelector('.menu-empty').hidden=total>0}buttons.forEach(button=>button.addEventListener('click',()=>{category=button.dataset.menuCategory;const picker=document.querySelector('#menu-category-select');if(picker)picker.value=category;buttons.forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button))});filterMenu()}));menuSearch.addEventListener('input',filterMenu);const picker=document.querySelector('#menu-category-select');if(picker)picker.addEventListener('change',()=>{const button=buttons.find(b=>b.dataset.menuCategory===picker.value);if(button)button.click()})}

document.querySelectorAll('[data-load-google]').forEach(button=>button.addEventListener('click',()=>{const box=button.closest('.google-map-box');const iframe=document.createElement('iframe');iframe.title='Google Maps: De Frietkazerne';iframe.src='https://maps.google.com/maps?q=De%20Frietkazerne%20Brandweerstraat%202%209850%20Deinze&z=16&output=embed';iframe.loading='lazy';iframe.referrerPolicy='strict-origin-when-cross-origin';iframe.allowFullscreen=true;box.replaceChildren(iframe)}));

document.querySelectorAll('.compact-google-reviews').forEach(section=>{const track=section.querySelector('.google-review-track'),prev=section.querySelector('[data-review-step="-1"]'),next=section.querySelector('[data-review-step="1"]'),status=section.querySelector('.review-position');function sync(){const card=track.querySelector('.google-review-card'),step=card.getBoundingClientRect().width+18,total=track.children.length;const first=Math.min(total,Math.round(track.scrollLeft/step)+1),visible=Math.max(1,Math.round(track.clientWidth/step));status.textContent=first+'–'+Math.min(total,first+visible-1)+' van '+total+' beoordelingen';prev.disabled=track.scrollLeft<5;next.disabled=track.scrollLeft+track.clientWidth>=track.scrollWidth-5}section.querySelectorAll('[data-review-step]').forEach(button=>button.addEventListener('click',()=>{const card=track.querySelector('.google-review-card');track.scrollBy({left:(card.getBoundingClientRect().width+18)*Number(button.dataset.reviewStep),behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'})}));track.addEventListener('scroll',sync,{passive:true});window.addEventListener('resize',sync);sync()});
