
/* CINEMATIC VISUAL DIRECTOR V4 — real-time game rendering, no still-image substitution */
(()=>{
'use strict';
if(window.__CC_VISUAL_V4__)return;
const arena=document.getElementById('arena');if(!arena||typeof renderFrame!=='function'||typeof roster==='undefined')return;
window.__CC_VISUAL_V4__={version:'4.0',style:'neon-chrome cinematic 2.5D',quality:2,shots:['PORTRAIT PUSH-IN','LOW-ANGLE LAUNCH','TRACKING IMPACT','ORBIT PULLBACK'],guestSafe:true};
const vis=window.__CC_VISUAL_V4__;
const hud=document.createElement('div');hud.className='cc-finishhud';hud.id='ccFinishHud';
hud.innerHTML='<span class="cc-shot" id="ccShotName">CINEMATIC FINISH</span><span class="cc-shot-sub" id="ccShotSub">MULTI-CAMERA EDIT</span><div class="cc-cutpoints" id="ccCutpoints"><span></span><span></span><span></span><span></span></div>';
arena.appendChild(hud);
const shotName=document.getElementById('ccShotName'),shotSub=document.getElementById('ccShotSub'),shotBars=Array.from(hud.querySelectorAll('.cc-cutpoints span'));
const vfxBtn=document.createElement('button');vfxBtn.className='small-btn cc-vfx-btn';vfxBtn.textContent='✦ VFX HIGH';vfxBtn.title='Switch detailed cinematic effects on/off for smoother play';
document.querySelector('#brandbar .brandtools')?.appendChild(vfxBtn);
vfxBtn.addEventListener('click',()=>{vis.quality=vis.quality===2?1:vis.quality===1?0:2;vfxBtn.textContent=['✦ VFX OFF','✦ VFX LITE','✦ VFX HIGH'][vis.quality];});
const oldMenu=showMenu;
showMenu=function(){oldMenu();const sub=el.screen.querySelector('.subhead');if(sub)sub.textContent='CINEMATIC WEAPON ARTS • EXPRESSIVE 3D-CARTOON FIGHTERS • FINISHER DIRECTOR • 27-CHARACTER ROSTER';const bt=el.screen.querySelector('button[data-go="styles"]');if(bt)bt.textContent='⚔ 27 WEAPON ARTS & COMBOS';const mode=el.screen.querySelector('.modecard span');if(mode)mode.textContent='27 illustrated fighters • combo chains • weapon techniques • touch / keyboard / gamepad';const kicker=el.screen.querySelector('.kicker');if(kicker){const p=document.createElement('div');p.style.cssText='color:#ffdf82;font:900 11px system-ui;letter-spacing:2px;padding:3px;';p.textContent='✦ NEON CHROME VISUAL EDITION ✦';kicker.after(p);}};
const oldSelect=renderSelect;
renderSelect=function(){oldSelect();const host=el.screen.querySelector('.select-top');if(!host)return;const who=byId[selected[pickSlot<2?'p1':'p2'][pickSlot%2]]||byId.blackwayne;const art=EMBEDDED_ASSETS[who.id+'_0']||'';const style=FIGHT_STYLES[who.id];const spec=(typeof PROFILES!=='undefined'&&PROFILES[who.id])||{};const feature=document.createElement('div');feature.className='cc-selectfeature';feature.innerHTML='<img alt="Preview fighter" src="'+art+'"><div class="cc-dossier-info"><strong>'+who.name.replace(/[<>]/g,'')+'</strong><small>STYLE: '+(style?.name||'UNIQUE COMBAT')+'</small><small>WEAPON: '+(spec.weapon||style?.weapon||'SIGNATURE ARTS')+' · FINISHER: '+who.finisher+'</small></div><div class="cc-card-kicker">CINEMATIC DOSSIER // C5</div>';host.after(feature);};
// Parallax light volumes, moving glints and stage architecture are painted behind the fighters.
const oldStage=drawStage;
drawStage=function(t,s){oldStage(t,s);if(vis.quality===0)return;ctx.save();ctx.globalCompositeOperation='screen';const a=(.46+.1*Math.sin(t*1.5));const hue=s.kind==='trapstones'?'#ffbc50':s.kind==='wolcott'?'#ff508b':'#9a4dff';
for(const xx of [125,1040]){const g=ctx.createRadialGradient(xx,156,4,xx,156,vis.quality===2?440:320);g.addColorStop(0,(xx<300?'#ed70ff':hue)+'4b');g.addColorStop(.48,'#d268ff17');g.addColorStop(1,'#12001e00');ctx.fillStyle=g;ctx.fillRect(xx-450,-40,900,550);}
ctx.globalAlpha=.09*a;for(let j=0;j<4;j++){const xx=(j*381+t*(j%2?9:-7))%1370-110;ctx.fillStyle=j%2?'#f9c5ff':'#43c5ff';ctx.beginPath();ctx.moveTo(xx,0);ctx.lineTo(xx+195,0);ctx.lineTo(xx+150,525);ctx.lineTo(xx+105,525);ctx.fill();}
ctx.globalAlpha=.7;ctx.lineWidth=1.6;for(let i=0;i<(vis.quality===2?17:7);i++){const x=(i*113+Math.sin(t*.65+i)*21)%1210,y=95+(i*41)%390;const size=1.5+(i%4)*.8;ctx.fillStyle=i%3===0?'#ffe6b0':'#b0c3ff';ctx.globalAlpha=.19+.25*Math.sin(t*2+i)**2;ctx.fillRect(x,y,size,size*2.8);}
ctx.globalAlpha=.65;ctx.shadowColor='#e480ff';ctx.shadowBlur=18;ctx.strokeStyle='#bb55fa66';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(600,526,545,23,0,0,Math.PI*2);ctx.stroke();ctx.restore();};
const oldFighter=drawFighter;
drawFighter=function(f,t){if(!f||vis.quality===0){oldFighter(f,t);return;}const who=activeWho(f);const index=roster.findIndex(w=>w.id===who.id);const isKO=f.hp[f.active]<=0;const atk=f.attack;const frame=atk?Math.min(1,atk.t/Math.max(.06,atk.duration)):0;const wave=Math.sin(Math.PI*frame);const pivotY=FLOOR+f.y-126;
ctx.save();if(!isKO){let sx=1+.013*Math.sin(t*(2.5+(index%5)*.38)+index);let sy=1+.014*Math.cos(t*(2.9+(index%4)*.31)+index);let tilt=0,dx=0,dy=0;
if(atk){const k=(index*37)%11;const moveKind=atk.kind;
 if(moveKind==='punch'){dx=f.face*(7+k)*wave;tilt=f.face*.07*wave;}
 else if(moveKind==='kick'||moveKind==='highkick'){dx=f.face*(5+k)*wave;dy=-8*wave;tilt=-f.face*.08*wave;}
 else if(moveKind==='lowkick'){sy=1-.08*wave;sx=1+.06*wave;dy=9*wave;}
 else if(moveKind==='special'||moveKind==='finish'){dx=f.face*(8+(index%4)*5)*wave;dy=-12*wave;tilt=f.face*((index%2)?-.12:.11)*wave;}
if(who.id==='trapdad'){sy=1-.08*wave;dx*=.5;}
if(who.id==='trapmom'){tilt+=.13*wave;dy-=8*wave;}
if(who.id==='jstyles'){tilt+=f.face*.11*wave;dx+=f.face*18*wave;}
}
ctx.translate(f.x+dx,pivotY+dy);ctx.rotate(tilt);ctx.scale(sx,sy);ctx.translate(-f.x,-pivotY);
}
oldFighter(f,t);ctx.restore();
if(!isKO&&atk&&vis.quality>0){const phase=Math.min(1,atk.t/Math.max(.01,atk.duration));const fl=Math.sin(phase*Math.PI);if(fl>.1){ctx.save();const x=f.x+f.face*100,y=FLOOR+f.y-172;ctx.globalCompositeOperation='screen';ctx.globalAlpha=.25+.46*fl;ctx.strokeStyle=who.color;ctx.shadowColor=who.color;ctx.shadowBlur=24;ctx.lineWidth=3+4*fl;ctx.beginPath();const u=who.id==='trapdad'?110:who.id==='trapmom'?90:who.id==='jstyles'?100:80;ctx.ellipse(x,y,u+26*fl,32+25*fl,(index%2?-.35:.45)*f.face,-.8,2.45);ctx.stroke();ctx.restore();}}
};
// Camera Director animates the actual game scene, not a fullscreen prerecorded finisher poster.
const oldFrame=renderFrame;
renderFrame=function(t){const c=cinematic;const isFinal=!!c&&c.kind==='finish'&&c.left>0;const active=!!c&&c.left>0;const pct=active?Math.max(0,Math.min(1,1-c.left/c.total)):0;const cut=Math.min(3,Math.floor(pct*4));
ctx.save();if(active&&vis.quality>0){const f=game?.teams?.[c.side],other=f?enemyOf(f):null;let focusX=W/2,focusY=H/2,zoom=1,rot=0;
if(cut===0){focusX=f?.x||c.x;focusY=335;zoom=isFinal?1.16:1.10;rot=-.014*(f?.face||1);}
else if(cut===1){focusX=(f?.x||c.x)*.70+(other?.x||600)*.3;focusY=425;zoom=isFinal?1.18:1.10;rot=.012*(f?.face||1);}
else if(cut===2){focusX=other?.x||600;focusY=345;zoom=isFinal?1.24:1.15;rot=-.025*(f?.face||1);}
else {focusX=(f?.x||400)+(other?.x||800);focusX/=2;focusY=H/2;zoom=1;rot=0;}
const smooth=(x)=>x*x*(3-2*x);const sub=smooth((pct*4)%1);if(cut===3){zoom=Math.max(1,1.15-sub*.15);}
focusX=Math.max(375,Math.min(825,focusX));ctx.translate(W/2,H/2);ctx.rotate(rot);ctx.scale(zoom,zoom);ctx.translate(-focusX,-focusY);
}
oldFrame(t);ctx.restore();
hud.classList.toggle('active',isFinal&&vis.quality>0);
if(isFinal){const who=c.who||byId[c.id];shotName.textContent=(who?.name||'FIGHTER').toUpperCase()+' • '+vis.shots[cut];shotSub.textContent=(who?.finisher||'CINEMATIC FINISH')+' / SHOT '+(cut+1)+'/4';shotBars.forEach((b,i)=>b.classList.toggle('hot',i<=cut));}
if(vis.quality>0){const over=ctx;over.save();const g=over.createRadialGradient(W/2,H/2,230,W/2,H/2,850);g.addColorStop(0,'#00000000');g.addColorStop(.6,'#180b2400');g.addColorStop(1,'#0904199a');over.fillStyle=g;over.fillRect(0,0,W,H);if(active){over.globalAlpha=.35;over.strokeStyle='#ffffff';over.lineWidth=4;over.strokeRect(10,10,W-20,H-20);}over.restore();}
};
const origLaunch=launchCinematic;
launchCinematic=function(f,kind){origLaunch(f,kind);if(cinematic&&kind==='finish'){cinematic.total=cinematic.left=Math.max(2.45,cinematic.total);}}
// expose deterministic hooks for test tooling and tuning; owner privileges are untouched.
vis.getState=()=>({state,roster:roster.length,cinematic:cinematic?{id:cinematic.id,kind:cinematic.kind,left:cinematic.left,total:cinematic.total}:null,quality:vis.quality});
vis.setQuality=v=>{vis.quality=Math.max(0,Math.min(2,+v||0));vfxBtn.textContent=['✦ VFX OFF','✦ VFX LITE','✦ VFX HIGH'][vis.quality]};
showMenu();
})();