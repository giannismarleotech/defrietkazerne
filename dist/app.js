// Short serving-hatch entrance. Always releases the page, including cached navigation.
(()=>{const root=document.documentElement,loader=document.querySelector('.page-loader');if(!loader)return;const started=performance.now();let first=true;try{first=!sessionStorage.getItem('fk-visited');sessionStorage.setItem('fk-visited','1')}catch{}const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;const minimum=reduced?0:(first?1050:520);let finished=false;function finish(){if(finished)return;finished=true;setTimeout(()=>{root.classList.remove('js-boot');root.classList.add('page-ready');loader.classList.add('finished');setTimeout(()=>loader.remove(),500)},Math.max(0,minimum-(performance.now()-started)))}if(document.readyState==='complete')finish();else window.addEventListener('load',finish,{once:true});setTimeout(finish,1250);window.addEventListener('pageshow',e=>{if(e.persisted){root.classList.remove('js-boot');loader.remove()}})})();
const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('header nav');toggle.addEventListener('click',()=>{const o=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',o);toggle.setAttribute('aria-label',o?'Menu sluiten':'Menu openen');nav.classList.toggle('open',o);toggle.textContent=o?'×':'☰'});document.addEventListener('keydown',e=>{if(e.key==='Escape'){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.textContent='☰'}});
const cookie=document.querySelector('.cookie');let choice=false;try{choice=!!localStorage.getItem('frietkazerne-cookie-keuze')}catch{}if(!choice)cookie.hidden=false;document.querySelectorAll('[data-cookies]').forEach(b=>b.addEventListener('click',()=>cookie.hidden=false));document.querySelector('#cookie-ok').addEventListener('click',()=>{try{localStorage.setItem('frietkazerne-cookie-keuze','noodzakelijk')}catch{}cookie.hidden=true});document.querySelector('.cookie-close').addEventListener('click',()=>cookie.hidden=true);
if('IntersectionObserver'in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll('.feature,.steps article,.menuitem,.formula,.menu-visual,.closing h2').forEach(e=>{e.classList.add('reveal');io.observe(e)})}
const hero=document.querySelector('.hero-image');if(hero){const badge=document.createElement('div');badge.className='logo-orbit';badge.innerHTML='<div><img src="/assets/logo.png" alt="De Frietkazerne — het originele logo" width="100" height="90"></div>';hero.appendChild(badge);if(matchMedia('(pointer:fine) and (prefers-reduced-motion:no-preference)').matches){hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;badge.style.transform=`rotateX(${-y*12}deg) rotateY(${x*16}deg)`});hero.addEventListener('pointerleave',()=>badge.style.transform='')}}
const form=document.querySelector('#request-form');
if(form){
 const email=form.elements.email,gsm=form.elements.gsm,error=document.querySelector('#contact-error'),output=document.querySelector('#request-output');
 const clearError=()=>{email.setCustomValidity('');gsm.setCustomValidity('');error.hidden=true;output.hidden=true};
 form.addEventListener('input',clearError);
 form.addEventListener('submit',e=>{
  e.preventDefault();
  const address=email.value.trim(),phone=gsm.value.trim();
  if(!address&&!phone){error.textContent='Vul je e-mailadres of gsm-nummer in, zodat we je kunnen bereiken.';error.hidden=false;email.focus();return}
  if(phone&&(!/^[+()\d\s.-]{6,30}$/.test(phone)||phone.replace(/\D/g,'').length<6)){error.textContent='Controleer je gsm-nummer.';error.hidden=false;gsm.focus();return}
  const data=new FormData(form),lines=['FEESTAANVRAAG DE FRIETKAZERNE','Naam: '+data.get('naam')];
  if(address)lines.push('E-mail: '+address);if(phone)lines.push('Gsm: '+phone);
  lines.push('Interesse: '+data.get('dienst'),'Datum: '+data.get('datum'),'Gasten: '+data.get('gasten'),'Locatie: '+data.get('locatie'),'Wensen: '+data.get('wensen'));
  const message=lines.join('\n');output.replaceChildren();
  const title=document.createElement('strong');title.textContent='Je aanvraag staat klaar.';output.append(title);
  const summary=document.createElement('p');summary.className='request-summary';summary.textContent=message;output.append(summary);
  const note=document.createElement('p');note.className='request-note';note.textContent='Nog niet verzonden. Open je berichtenapp en verzend de sms naar 0472 82 94 25. Gewone sms-kosten kunnen gelden.';output.append(note);
  const actions=document.createElement('div');actions.className='request-actions';
  const sms=document.createElement('a');sms.className='button';sms.textContent='Open sms met mijn aanvraag';const ios=/iPad|iPhone|iPod/.test(navigator.userAgent);sms.href='sms:+32472829425'+(ios?'&':'?')+'body='+encodeURIComponent(message);actions.append(sms);
  const copy=document.createElement('button');copy.type='button';copy.className='button outline';copy.textContent='Kopieer aanvraag';copy.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(message);copy.textContent='Aanvraag gekopieerd'}catch{copy.textContent='Selecteer de tekst om te kopiëren'}});actions.append(copy);output.append(actions);
  const help=document.createElement('p');help.className='request-note';help.textContent='Geen berichtenapp op dit toestel? Kopieer de aanvraag of bel ons rechtstreeks.';output.append(help);
  output.hidden=false;output.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth',block:'nearest'});
 });
}

// Keep the tap target separate from the artwork and any surrounding links.
const mascotMotion = matchMedia('(prefers-reduced-motion: reduce)');
function addMascotAction(host, label, message, react) {
 const button = document.createElement('button');
 button.type = 'button';
 button.className = 'mascot-tap';
 button.setAttribute('aria-label', label);
 button.title = label;
 const bubble = document.createElement('span');
 bubble.className = 'mascot-reaction';
 bubble.setAttribute('aria-hidden', 'true');
 bubble.textContent = message;
 bubble.hidden = true;
 let timer;
 button.addEventListener('click', () => {
  clearTimeout(timer);
  bubble.hidden = false;
  timer = setTimeout(() => { bubble.hidden = true }, 1400);
  if (!mascotMotion.matches) react();
 });
 host.append(button, bubble);
}

const mascotReactions = [
 ['.catering-mascot', 'img, canvas', 'Laat de traiteur groeten', 'Smakelijk!', 'bow'],
 ['.truck-mascot', 'img, canvas', 'Laat de frietmobiel groeten', 'Frietjes op komst!', 'bounce'],
 ['.contact-sitter', 'img, canvas', 'Zeg hallo tegen het mannetje', 'Hoi!', 'wave'],
 ['.order-phone', '.phone-holder-art', 'Laat het mannetje bij de besteltelefoon groeten', 'Goesting in frietjes?', 'wave']
];
mascotReactions.forEach(([selector, artwork, label, message, motion]) => {
 let host = document.querySelector(selector);
 if (!host) return;
 if (host.matches('a.order-phone')) {
  // The character has its own button. The phone screen still opens Unipage.
  const link = host;
  host = document.createElement('div');
  host.className = 'order-phone mascot-phone-stage';
  link.className = 'mascot-order-link';
  link.before(host);
  host.append(link);
 }
 host.removeAttribute('aria-hidden');
 let reaction;
 addMascotAction(host, label, message, () => {
  reaction?.cancel();
  const frames = {
   bow: ['none', 'translateY(5px) rotate(6deg)', 'translateY(-6px) rotate(-3deg)', 'none'],
   bounce: ['none', 'translateY(-14px) rotate(-3deg)', 'translateY(2px) rotate(2deg)', 'none'],
   wave: ['none', 'rotate(-7deg)', 'rotate(5deg)', 'rotate(-4deg)', 'none']
  };
  const art = host.querySelector(artwork);
  // Tilt from the base so the character stays connected to the ground.
  reaction = art.animate?.(frames[motion].map(transform => ({
   transform, transformOrigin: host.matches('.mascot-phone-stage') ? '92% 88%' : '50% 88%'
  })), { duration: 650, easing: 'ease-in-out' });
 });
});

const mascot=document.querySelector('.animated-mascot');
if(mascot){
 const canvas=mascot.querySelector('canvas'),ctx=canvas.getContext('2d');
 const compact=matchMedia('(max-width: 760px)');
 let ratio;
 function sizeCanvas(){
  const width=canvas.getBoundingClientRect().width||771;
  const density=Math.min(window.devicePixelRatio||1,compact.matches?2:3);
  ratio=Math.max(1,Math.min(3,Math.ceil(width*density/771*2)/2));
  canvas.width=771*ratio;
  canvas.height=520*ratio;
  ctx.imageSmoothingEnabled=true;
  ctx.imageSmoothingQuality='high';
 }
 sizeCanvas();
 const man=new Image(),fries=new Image(),setting=new Image();let loaded=0,time=0,last=0,raf=0,acc=0,visible=true;
 const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
 const gaze={x:500,y:260,tx:500,ty:260,active:false};
 let seed=371;const rnd=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296};
 const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
 const head=new Path2D('M805 0H1449V440H1175L1145 488L945 580L850 510Z');
 const arms=new Path2D('M643 503L735 490L823 526L884 562L967 578L1082 589L1177 619L1215 665L1202 722L1126 746L995 722L927 709L875 663L790 650L748 615L700 582L645 559Z');
 const body=new Path2D();body.rect(0,0,1449,1085);body.addPath(head);body.addPath(arms);
 let flying=[],pile=[],crumbs=[],nextBlink=2.6,blinkStart=-10,boostStart=-10,boostFries=0;
 addMascotAction(mascot,'Laat het mannetje extra frietjes spuiten','Extra frietjes!',()=>{
  boostStart=time;
  boostFries=6;
  blinkStart=time;
  start();
 });
 function mascotPose(){
  const boost=Math.max(0,1-(time-boostStart)/.75);
  const recoil=Math.sin(time*(boost>0?16:4.1));
  return {
   sway:Math.sin(time*1.8)*.014+recoil*(.004+boost*.009),
   bob:Math.sin(time*3.6)*1.35-boost*Math.abs(recoil)*4,
   arm:-.014+recoil*(.032+boost*.07)
  };
 }
 const rest=()=>{const x=219+rnd()*146,c=Math.max(0,1-Math.abs(x-292)/77);return{x,y:448-c*(12+rnd()*30),a:.8+(rnd()-.5)*1.8,size:30+rnd()*11,born:-5}};
 for(let i=0;i<27;i++)pile.push(rest());pile.sort((a,b)=>a.y-b.y);
 window.addEventListener('pointermove',e=>{if(e.pointerType==='touch')return;const r=canvas.getBoundingClientRect();gaze.tx=(e.clientX-r.left)*771/r.width;gaze.ty=(e.clientY-r.top)*520/r.height;gaze.active=true},{passive:true});
 document.documentElement.addEventListener('pointerleave',()=>gaze.active=false);
 function drawFry(x,y,size,a,roll=0,alpha=1){ctx.save();ctx.translate(x,y);ctx.rotate(a);ctx.scale(.68+.32*Math.abs(Math.cos(roll)),1);ctx.globalAlpha=alpha;ctx.drawImage(fries,1094,185,200,195,-size/2,-size/2,size,size*.975);ctx.restore()}
 function paint(){
  ctx.setTransform(ratio,0,0,ratio,0,0);ctx.clearRect(0,0,771,520);
  // A common camera and ground plane connect the whole scene.
  ctx.drawImage(setting,0,0,771,514);
  // Blend only the landscape into the full-width sky; keep the mascot crisp.
  ctx.save();ctx.globalCompositeOperation='destination-in';
  const groundFade=ctx.createLinearGradient(0,360,32,512);groundFade.addColorStop(0,'#000');groundFade.addColorStop(.34,'rgba(0,0,0,.97)');groundFade.addColorStop(.68,'rgba(0,0,0,.50)');groundFade.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=groundFade;ctx.fillRect(0,0,771,520);
  ctx.restore();

  // Leaves move independently while the architecture stays firmly grounded.
  if(!reduced)for(let i=0;i<9;i++){const u=(time*.095+i/9)%1,x=90+i*67+Math.sin(time*1.2+i)*13+u*21,y=72+u*135;ctx.save();ctx.globalAlpha=Math.sin(u*Math.PI)*.70;ctx.translate(x,y);ctx.rotate(time*.7+i);ctx.fillStyle=i%2?'#6e8b25':'#a0ac3d';ctx.beginPath();ctx.ellipse(0,0,4.4,1.9,0,0,Math.PI*2);ctx.fill();ctx.restore()}

  ctx.fillStyle='rgba(82,52,27,.12)';ctx.beginPath();ctx.ellipse(602,453,86,9,0,0,Math.PI*2);ctx.fill();
  ctx.beginPath();ctx.ellipse(293,466,91,8,0,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#fff6df';ctx.strokeStyle='#5c402b';ctx.lineWidth=2;ctx.lineJoin='round';
  ctx.beginPath();ctx.moveTo(199,439);ctx.quadraticCurveTo(290,422,385,439);ctx.lineTo(365,464);ctx.quadraticCurveTo(292,480,219,463);ctx.closePath();ctx.fill();ctx.stroke();
  ctx.fillStyle='#dfbd85';ctx.beginPath();ctx.ellipse(292,440,88,12,0,0,Math.PI*2);ctx.fill();
  const {sway,bob,arm}=mascotPose();
  ctx.save();ctx.translate(610,449+bob);ctx.rotate(sway);ctx.translate(-312,-309);ctx.scale(.3,.3);
  // Solid torso backing prevents gaps when the independent arm layer moves.
  ctx.save();ctx.fillStyle='#155b78';ctx.beginPath();ctx.moveTo(941,584);ctx.lineTo(1143,588);ctx.lineTo(1191,716);ctx.lineTo(965,719);ctx.closePath();ctx.fill();ctx.restore();
  ctx.save();ctx.clip(body,'evenodd');ctx.drawImage(man,0,0);ctx.restore();
  ctx.save();ctx.translate(1120,686);ctx.rotate(arm);ctx.translate(-1120,-686);
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
  pile.slice().sort((a,b)=>a.y-b.y).forEach(p=>{const age=time-p.born;const spring=age>=0&&age<.45?Math.sin(age/.45*Math.PI*2)*2.8*Math.exp(-age*6):0;drawFry(p.x,p.y-spring,p.size,p.a+spring*.025)});
  // Front paper rim occludes the lowest fries.
  ctx.fillStyle='#f7dfad';ctx.strokeStyle='#5c402b';ctx.lineWidth=2;
  ctx.beginPath();ctx.moveTo(205,451);ctx.quadraticCurveTo(292,467,379,451);ctx.lineTo(365,464);ctx.quadraticCurveTo(292,480,219,463);ctx.closePath();ctx.fill();ctx.stroke();
  ctx.strokeStyle='#d5ac6a';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(230,461);ctx.lineTo(354,463);ctx.stroke();
  flying.forEach(p=>{const age=time-p.born,u=clamp(age/p.duration,0,1);const x=p.x+p.vx*age,y=p.y+p.vy*age+210*age*age;drawFry(x,y,p.size*(.27+.73*Math.min(1,u/.16)),p.angle+age*p.spin,age*p.roll)});
  crumbs.forEach(p=>{const a=time-p.born;ctx.fillStyle='#d99c32';ctx.globalAlpha=Math.max(0,1-a/.45)*.6;ctx.beginPath();ctx.arc(p.x+p.vx*a,p.y+p.vy*a+100*a*a,1.4,0,Math.PI*2);ctx.fill()});ctx.globalAlpha=1;
  // Barely visible steam rises from the warm pile, never across the face.
  for(let i=0;i<3;i++){const u=(time*.22+i*.31)%1;ctx.save();ctx.globalAlpha=Math.sin(u*Math.PI)*.16;ctx.strokeStyle='#bc965f';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(263+i*26,409-u*20);ctx.bezierCurveTo(253+i*26,397-u*20,279+i*26,390-u*20,267+i*26,377-u*20);ctx.stroke();ctx.restore()}
  return nozzle;
 }
 function nozzlePosition(){const {sway,bob,arm}=mascotPose();const matrix=new DOMMatrix().translate(610,449+bob).rotate(sway*180/Math.PI).translate(-312,-309).scale(.3).translate(1120,686).rotate(arm*180/Math.PI).translate(-1120,-686);return new DOMPoint(666,535).matrixTransform(matrix)}
 function frame(stamp){raf=0;if(loaded<3||document.hidden||!visible)return;if(!reduced&&compact.matches&&last&&stamp-last<31){raf=requestAnimationFrame(frame);return}const dt=last?Math.min(.08,(stamp-last)/1000):0;last=stamp;
  if(!reduced){time+=dt;acc+=dt;const ease=1-Math.exp(-dt*8);if(gaze.active){gaze.x+=(gaze.tx-gaze.x)*ease;gaze.y+=(gaze.ty-gaze.y)*ease}
   if(time>=nextBlink){blinkStart=time;nextBlink=time+2.6+rnd()*3.2}
   const nozzle=nozzlePosition();
   if(acc>(boostFries > 0 ? .075 : .22)){acc=0;if(boostFries)boostFries--;const end=rest(),duration=.80+rnd()*.19;flying.push({x:nozzle.x-2,y:nozzle.y,born:time,duration,vx:(end.x-nozzle.x)/duration,vy:(end.y-nozzle.y-210*duration*duration)/duration,angle:.8+Math.atan2(end.y-nozzle.y-210*duration*duration,end.x-nozzle.x),spin:(rnd()-.5)*5,roll:3+rnd()*4,size:end.size,end});if(rnd()>.4)crumbs.push({x:nozzle.x-5,y:nozzle.y,born:time,vx:-55-rnd()*35,vy:-15-rnd()*35})}
   flying=flying.filter(p=>{if(time-p.born<p.duration)return true;p.end.born=time;pile.push(p.end);if(pile.length>45)pile.shift();return false});crumbs=crumbs.filter(p=>time-p.born<.45);
  }
  paint();if(!reduced)raf=requestAnimationFrame(frame);
 }
 const start=()=>{if(loaded!==3||raf||document.hidden||!visible)return;last=0;raf=requestAnimationFrame(frame)};
 window.addEventListener('resize',()=>{sizeCanvas();start()},{passive:true});
 man.onload=fries.onload=setting.onload=()=>{loaded++;start()};man.src='/assets/firefighter-cutout.png';fries.src='/assets/fries-cutout.png';setting.src='/assets/kazerne-streetview.webp';
 document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;last=0}else start()});
 new IntersectionObserver(es=>{visible=es[0].isIntersecting;if(visible)start();else{cancelAnimationFrame(raf);raf=0;last=0}},{threshold:.05}).observe(canvas);
}

const menuSearch=document.querySelector('#menu-search');if(menuSearch){let category='all';const buttons=[...document.querySelectorAll('[data-menu-category]')],sections=[...document.querySelectorAll('[data-food-category]')];function filterMenu(){const term=menuSearch.value.toLocaleLowerCase('nl').trim();let total=0;sections.forEach(section=>{let visible=0;section.querySelectorAll('[data-food-name]').forEach(row=>{const show=(category==='all'||category===section.dataset.foodCategory)&&row.dataset.foodName.toLocaleLowerCase('nl').includes(term);row.hidden=!show;if(show)visible++});section.hidden=!visible;const details=section.querySelector(".food-accordion");if(details)details.open=Boolean(term||category!=="all");total+=visible});document.querySelector('.menu-empty').hidden=total>0}buttons.forEach(button=>button.addEventListener('click',()=>{category=button.dataset.menuCategory;const picker=document.querySelector('#menu-category-select');if(picker)picker.value=category;buttons.forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button))});filterMenu()}));menuSearch.addEventListener('input',filterMenu);const picker=document.querySelector('#menu-category-select');if(picker)picker.addEventListener('change',()=>{const button=buttons.find(b=>b.dataset.menuCategory===picker.value);if(button)button.click()})}

document.querySelectorAll('[data-load-google]').forEach(button=>button.addEventListener('click',()=>{const box=button.closest('.google-map-box');const iframe=document.createElement('iframe');iframe.title='Google Maps: De Frietkazerne';iframe.src='https://maps.google.com/maps?q=De%20Frietkazerne%20Brandweerstraat%202%209850%20Deinze&z=16&output=embed';iframe.loading='lazy';iframe.referrerPolicy='strict-origin-when-cross-origin';iframe.allowFullscreen=true;box.replaceChildren(iframe)}));

document.querySelectorAll('.compact-google-reviews').forEach(section=>{const track=section.querySelector('.google-review-track'),prev=section.querySelector('[data-review-step="-1"]'),next=section.querySelector('[data-review-step="1"]'),status=section.querySelector('.review-position');function sync(){const card=track.querySelector('.google-review-card'),step=card.getBoundingClientRect().width+18,total=track.children.length;const first=Math.min(total,Math.round(track.scrollLeft/step)+1),visible=Math.max(1,Math.round(track.clientWidth/step));status.textContent=first+'–'+Math.min(total,first+visible-1)+' van '+total+' beoordelingen';prev.disabled=track.scrollLeft<5;next.disabled=track.scrollLeft+track.clientWidth>=track.scrollWidth-5}section.querySelectorAll('[data-review-step]').forEach(button=>button.addEventListener('click',()=>{const card=track.querySelector('.google-review-card');track.scrollBy({left:(card.getBoundingClientRect().width+18)*Number(button.dataset.reviewStep),behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'})}));track.addEventListener('scroll',sync,{passive:true});window.addEventListener('resize',sync);sync()});

// Shared gaze rig: coordinates stay attached to the illustration, including CSS motion.
(()=>{
 const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
 const pointer={x:0,y:0,active:false};
 window.addEventListener('pointermove',e=>{if(e.pointerType==='touch')return;pointer.x=e.clientX;pointer.y=e.clientY;pointer.active=true},{passive:true});
 document.documentElement.addEventListener('pointerleave',()=>pointer.active=false);
 const rigs=[
  ['.catering-mascot img',[[608,229,16.5,28,.42],[651,240,17,28,.42]]],
  ['.truck-mascot img',[[906,412,7.5,12,.38],[925,417,8,12,.40]]],
  ['.contact-sitter img',[[572,253,16,28,.32],[615,264,17,28,.40]]],
  ['.phone-holder-art',[[882,228,12,22,.35],[917,236,14,22,.40]]],
  ['.loading-mascot',[[1024,210,14,22,.30],[1057,218,14,22,.37]],[620,0,720,1085]]
 ];
 rigs.forEach(([selector,eyes,crop])=>{
  const original=document.querySelector(selector);if(!original)return;
  const source=original.tagName.toLowerCase()==='svg'?original.querySelector('image').getAttribute('href'):original.getAttribute('src');
  const picture=new Image();picture.onload=()=>{
   if(!original.isConnected)return;
   const [ox,oy,w,h]=crop||[0,0,picture.naturalWidth,picture.naturalHeight];
   const canvas=document.createElement('canvas');canvas.className=original.getAttribute('class')||'';canvas.width=w;canvas.height=h;
   const alt=original.getAttribute('alt');if(alt){canvas.setAttribute('role','img');canvas.setAttribute('aria-label',alt)}else canvas.setAttribute('aria-hidden','true');
   const ctx=canvas.getContext('2d');if(!ctx)return;
   original.replaceWith(canvas);let visible=true,raf=0,last=0,time=0,nextBlink=1.8+Math.random()*2,blinkAt=-10,gx=0,gy=0;
   const clamp=n=>Math.max(-1,Math.min(1,n));
   function frame(stamp){raf=0;if(!canvas.isConnected){observer.disconnect();return}if(document.hidden||!visible)return;
    const dt=last?Math.min(.05,(stamp-last)/1000):0;last=stamp;if(!reduced)time+=dt;
    if(time>nextBlink){blinkAt=time;nextBlink=time+2.5+Math.random()*3.3}
    const r=canvas.getBoundingClientRect(),scale=Math.min(r.width/w,r.height/h),left=r.left+(r.width-w*scale)/2,top=r.top+(r.height-h*scale)/2;
    const cx=(eyes[0][0]+eyes[1][0])/2,cy=(eyes[0][1]+eyes[1][1])/2;
    const tx=reduced?0:pointer.active?clamp((pointer.x-left-(cx-ox)*scale)/180):Math.sin(time*.65)*.65;
    const ty=reduced?0:pointer.active?clamp((pointer.y-top-(cy-oy)*scale)/180):Math.sin(time*.48)*.4;
    const ease=1-Math.exp(-dt*9);gx+=(tx-gx)*ease;gy+=(ty-gy)*ease;
    ctx.clearRect(0,0,w,h);ctx.drawImage(picture,ox,oy,w,h,0,0,w,h);
    const phase=(time-blinkAt)/.28,blink=phase>=0&&phase<=1?Math.sin(phase*Math.PI):0;
    eyes.forEach(([x,y,rx,ry,a])=>{
     ctx.save();ctx.translate(x-ox,y-oy);ctx.rotate(a);
     ctx.beginPath();ctx.ellipse(0,0,rx,ry,0,0,Math.PI*2);ctx.clip();ctx.fillStyle='#fffdf7';ctx.fillRect(-rx,-ry,rx*2,ry*2);
     ctx.fillStyle='#111a18';ctx.beginPath();ctx.ellipse(gx*rx*.48,gy*ry*.35+ry*.12,rx*.43,ry*.46,0,0,Math.PI*2);ctx.fill();
     ctx.fillStyle='#fff';ctx.beginPath();ctx.ellipse(gx*rx*.48+rx*.13,gy*ry*.35-ry*.09,rx*.14,ry*.12,0,0,Math.PI*2);ctx.fill();
     if(blink>0){ctx.fillStyle='#ffad8c';ctx.fillRect(-rx,-ry,rx*2,ry*blink);ctx.fillRect(-rx,ry*(1-blink),rx*2,ry*blink);ctx.strokeStyle='#38281f';ctx.lineWidth=Math.max(1,rx*.12);ctx.beginPath();ctx.moveTo(-rx,-ry+ry*blink);ctx.lineTo(rx,-ry+ry*blink);ctx.stroke()}
     ctx.restore();
    });
    if(!reduced)raf=requestAnimationFrame(frame);
   }
   const start=()=>{last=0;if(!raf&&canvas.isConnected)raf=requestAnimationFrame(frame)};
   const observer=new IntersectionObserver(es=>{visible=es[0].isIntersecting;if(visible)start();else{cancelAnimationFrame(raf);raf=0}},{threshold:0});observer.observe(canvas);
   document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0}else start()});start();
  };picture.src=source;
 });
})();
