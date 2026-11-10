// Cartographie des cas régénératifs — données lues depuis Grist (data/cases.js, régénéré automatiquement)
const CASES = window.GRIST_CASES || [];
const WORLD = window.WORLD;
const UPDATED = window.GRIST_UPDATED || '';

const SIZE_ORDER = ['TPE / PME','ETI','Grand groupe','Territoire - Petite échelle (< 100k hab.)','Territoire - Moyenne échelle (100k - 500k hab.)','Territoire - Grande échelle (> 500k hab.)'];
const RAMP = ['#dfe9dc','#bfd8c0','#93c0a0','#62a07c','#3d7f5d','#235c41'];

// Logos et portraits des experts sources (fichiers dans img/experts/)
const AV = {
  niels:[{src:'img/experts/fraguier.jpg'}],
  das:[{src:'img/experts/das.jpg'},{src:'img/experts/bocken.jpg'}],
  regen:[{src:'img/experts/regen-logo.png',logo:true}],
  deal:[{src:'img/experts/deal-logo.png',logo:true}],
  nsv:[{src:'img/experts/nsv-logo.png',logo:true}],
  bpi:[{src:'img/experts/bpi-logo.jpg',logo:true},{src:'img/experts/cec-logo.png',logo:true},{src:'img/experts/lumia-logo.svg',logo:true}],
  lumia:[{src:'img/experts/lumia-logo.svg',logo:true}],
  hec:[{src:'img/experts/hec-logo.png',logo:true},{src:'img/experts/lehmann.jpg'},{src:'img/experts/dubreil.jpg'}],
  brunel:[{src:'img/experts/brunel.jpg'},{src:'img/experts/dubreil.jpg'}],
};

// ---------- experts sources ----------
// "match" : texte cherché dans le libellé de la source (table Sources_cles de Grist)
const PARTNERS = [
  {id:'niels', match:'Niels de Fraguier', short:'Niels de Fraguier', name:"Niels de Fraguier — L'Entreprise régénérative", type:'Livre & base de cas', ini:'NF',
   desc:"Entrepreneur et auteur engagé sur la régénération, Niels de Fraguier a co-écrit avec Stephen Vasconcellos « The Regenerative Enterprise » (2023), paru en français sous le titre « L'entreprise régénérative – Prospérer avec le vivant » (L'éditeur à part, 2025). L'ouvrage s'appuie sur plus de 120 exemples d'entreprises pionnières, et la base de cas constituée par l'auteur est la première source de cette cartographie.",
   facts:["Co-fondateur de Positive, initiative mondiale ayant rassemblé plus de 200 entreprises, et de Corporate ReGeneration International","Enseigne l'entrepreneuriat régénératif à Sciences Po Paris"],
   li:[['https://fr.linkedin.com/in/nielsdefraguier','Niels de Fraguier']],
   link:['https://empoweringpotential.org/','empoweringpotential.org']},
  {id:'das', match:'Regenerative business strategies', short:'Das & Bocken (2024)', name:'Das & Bocken — Regenerative Business Case Database', type:'Étude académique', ini:'D&B',
   desc:"Article scientifique d'Ankita Das et Nancy Bocken publié en 2024 dans la revue Sustainable Production and Consumption. Les autrices y constituent une base de 84 cas d'entreprises régénératives répartis dans 15 secteurs, et en dégagent une typologie de six stratégies : leadership régénératif, régénération de la nature, régénération sociale, approvisionnement responsable, santé et bien-être, et un axe centré sur les salariés.",
   facts:["Revue à comité de lecture (Elsevier), vol. 49, 2024","Exemples d'entreprises régénératives stables dont certaines remontent aux années 1870"],
   li:[['https://www.linkedin.com/in/nancy-bocken-b7384614/','Nancy Bocken']],
   link:['https://doi.org/10.1016/j.spc.2024.06.024',"Lire l'article"]},
  {id:'regen', match:'Regen Conseil', short:'Conseil REGEN', name:'Conseil REGEN — Communs de l’observatoire', type:'Communauté de conseil', ini:'CR',
   desc:"Conseil REGEN est la communauté du conseil à visée régénérative. Hébergée par Syntec Conseil, elle réunit plus de 30 cabinets passés en 2023 par le parcours CEC Consulting de la Convention des Entreprises pour le Climat. Les cas partagés en communs par son observatoire renvoient pour la plupart aux feuilles de route rendues publiques par les entreprises ayant suivi un parcours CEC.",
   facts:["La CEC est une association d'intérêt général dont la raison d'être est de rendre irrésistible la bascule vers une économie régénérative d'ici 2030"],
   link:['https://feuillesderoute.cec-impact.org/','Feuilles de route CEC']},
  {id:'deal', match:'Doughnut Economics', short:'Doughnut Economics Action Lab', name:'Doughnut Economics Action Lab (DEAL)', type:'Laboratoire international', ini:'DEAL',
   desc:"Fondé en 2019 autour de l'économiste Kate Raworth, le DEAL aide villes, entreprises et communautés à mettre en pratique la « théorie du donut » : prospérer dans un espace sûr et juste, entre un plancher social et un plafond écologique. Ses études de cas portent d'une part sur des territoires (villes, régions, parcs) qui s'en inspirent, d'autre part sur des entreprises lues au prisme du « Doughnut Design for Business ».",
   facts:["Le DEAL ne certifie ni ne labellise les entreprises qu'il étudie : ses cas sont des exemples inspirants"],
   li:[['https://www.linkedin.com/company/doughnut-economics-action-lab-deal','DEAL']],
   link:['https://doughnuteconomics.org/','doughnuteconomics.org']},
  {id:'nsv', match:'Nous Sommes Vivants', short:'Lauriers de la Régénération', name:'Nous Sommes Vivants — Lauriers de la Régénération', type:'Concours & réseau', ini:'NSV',
   desc:"Nous Sommes Vivants est une association qui fédère un réseau de consultants accompagnant entreprises et collectivités vers la régénération du vivant, humains compris. Chaque année, ses Lauriers de la Régénération, concours suivi d'un événement, distinguent des organisations ayant lancé des produits ou services qui régénèrent la nature et le vivant tout en restant économiquement viables.",
   facts:[],
   li:[['https://fr.linkedin.com/company/noussommesvivants','Nous Sommes Vivants']],
   link:['https://noussommesvivants.co/','noussommesvivants.co']},
  {id:'bpi', match:'BPI-CEC-Lumia', short:'Bpifrance Le Lab × CEC × LUMIÅ', name:'Bpifrance Le Lab × CEC × LUMIÅ — Études de cas', type:'Études de cas', ini:'BCL',
   desc:"Série d'études de cas de Bpifrance Le Lab consacrée à des entreprises qui visent un modèle régénératif après leur parcours à la Convention des Entreprises pour le Climat. Chaque entreprise est analysée selon une grille en cinq dimensions, élaborée avec la CEC et LUMIÅ.",
   facts:["Entreprises analysées : PME et ETI dont le dirigeant vise un modèle régénératif à horizon 2035"],
   link:['https://cec-impact.org/','cec-impact.org']},
  {id:'lumia', match:'LUMI', short:'LUMIÅ', name:'LUMIÅ — Recherche-action sur l’économie régénérative', type:'Centre de recherche-action', ini:'Lå',
   desc:"LUMIÅ est un centre de recherche-action et de formation consacré à la transformation des organisations vers l'économie régénérative, fondé et dirigé par Christophe Sempels. Partenaire de la CEC, il est l'auteur de l'étude de référence « L'entreprise à visée régénérative » et de ses onze principes, puis de guides sur l'urbanisme et le tourisme régénératifs.",
   facts:[],
   li:[['https://www.linkedin.com/company/lumiaedu/','LUMIÅ']],
   link:['https://lumia-edu.fr/','lumia-edu.fr']},
  {id:'hec', match:'Lehmann-Ortega', short:'HEC Paris — The Regenerative Shift', name:'HEC Paris — The Regenerative Shift', type:'Livre blanc', ini:'HEC',
   desc:"Livre blanc publié en 2025 par Laurence Lehmann-Ortega, professeure de stratégie à HEC Paris, et Sarah Dubreil, fondatrice de circl.earth. À partir de 39 organisations pionnières, il propose sept attributs de maturité régénérative et sept archétypes d'entreprises régénératives.",
   facts:["Exemples d'archétypes : réseau de fournisseurs régénératif, site régénératif, catalyseur de capacité collective"],
   li:[['https://www.linkedin.com/in/laurence-lehmann-ortega-95a3ab9/','Laurence Lehmann-Ortega'],['https://www.linkedin.com/in/sarahdubreil/','Sarah Dubreil']],
   link:['https://www.hec.edu/en/society-organizations-institute/news/regenerative-business-isn-t-buzzword-it-s-blueprint','Présentation HEC Paris']},
  {id:'brunel', match:'Brunel', short:'Brunel, Dubreil et al. (2023)', name:'Brunel, Dubreil et al. — Entreprendre pour la régénération du vivant', type:'Livre blanc', ini:'VB',
   desc:"Livre blanc publié en 2023 par Valérie Brunel, praticienne-chercheuse en transition socio-écologique, Sarah Dubreil, entrepreneure et investisseuse dans l'environnement, et leurs coauteurs, avec le soutien de Bpifrance Le Lab. Il explore ce qu'est une approche régénérative de l'entrepreneuriat, et à quelles conditions elle peut émerger et être viable.",
   facts:[],
   li:[['https://fr.linkedin.com/in/valerie-brunel','Valérie Brunel'],['https://www.linkedin.com/in/sarahdubreil/','Sarah Dubreil']],
   link:['https://lelab.bpifrance.fr/get_pdf/3894/2023-10-livre_blanc_l%27approche_regenerative_pour_les_entreprises_-_bpifrance_le_lab_-_valerie_brunel_sarah_dubreil.pdf','Lire le livre blanc']},
];
const PMAP = Object.fromEntries(PARTNERS.map(p=>[p.id,p]));
const partnerOf = src => (PARTNERS.find(p=>src.includes(p.match))||{}).id;

const norm = s => (s||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
CASES.forEach((c,i)=>{
  c.i=i;
  c.n = (c.n||'').replace(/\s*\n\s*/g,' ');
  c.pt = [...new Set((c.o||[]).map(partnerOf).filter(Boolean))];
  c._q = norm([c.n,c.x,c.s.join(' '),c.t.join(' '),c.p.join(' '),(c.o||[]).join(' ')].join(' '));
});

// ---------- filtres ----------
const FACETS = [
  {key:'s', title:"Secteur d'activité", get:c=>c.s},
  {key:'t', title:'Taille', get:c=>c.t, order:SIZE_ORDER, groups:[['Entreprises',v=>!v.startsWith('Territoire')],['Territoires',v=>v.startsWith('Territoire')]], label:v=>v.replace('Territoire - ','')},
  {key:'p', title:'Pays', get:c=>c.p, limit:8},
  {key:'pt', title:'Expert source', get:c=>c.pt.map(id=>PMAP[id].short), limit:5},
];
const state = {q:'', sel:Object.fromEntries(FACETS.map(f=>[f.key,new Set()])), sort:'az', shown:60, expanded:{}};

function matches(c, skipKey){
  if (state.q){ for (const t of state.q.split(/\s+/)) if (t && !c._q.includes(t)) return false; }
  for (const f of FACETS){
    if (f.key===skipKey) continue;
    const s = state.sel[f.key]; if (!s.size) continue;
    if (!f.get(c).some(v=>s.has(v))) return false;
  }
  return true;
}
const filtered = () => CASES.filter(c=>matches(c));

function el(tag, attrs={}, ...kids){
  const e=document.createElement(tag);
  for (const [k,v] of Object.entries(attrs)){
    if (k==='class') e.className=v; else if (k.startsWith('on')) e.addEventListener(k.slice(2),v);
    else if (v!==false && v!=null) e.setAttribute(k, v===true?'':v);
  }
  for (const k of kids.flat()) if (k!=null && k!==false) e.append(k.nodeType?k:document.createTextNode(k));
  return e;
}

function renderFacets(){
  const box = document.getElementById('facets'); box.innerHTML='';
  for (const f of FACETS){
    const base = CASES.filter(c=>matches(c,f.key));
    const cnt = new Map();
    for (const c of base) for (const v of f.get(c)) cnt.set(v,(cnt.get(v)||0)+1);
    const all = new Map(); for (const c of CASES) for (const v of f.get(c)) all.set(v,0);
    let vals = [...all.keys()];
    if (f.order) vals.sort((a,b)=>(f.order.indexOf(a)+1||99)-(f.order.indexOf(b)+1||99));
    else vals.sort((a,b)=>(cnt.get(b)||0)-(cnt.get(a)||0) || a.localeCompare(b,'fr'));
    const sel = state.sel[f.key];
    const head = el('h3',{}, f.title, sel.size ? el('button',{onclick:()=>{sel.clear();update();}},'effacer') : null);
    const sec = el('div',{class:'facet'}, head);
    const mk = v => el('label',{class:'opt'+((cnt.get(v)||0)===0&&!sel.has(v)?' zero':'')},
      el('input',{type:'checkbox', checked:sel.has(v), onchange:e=>{e.target.checked?sel.add(v):sel.delete(v); update();}}),
      el('span',{class:'lab'}, f.label?f.label(v):v), el('span',{class:'cnt'}, String(cnt.get(v)||0)));
    if (f.groups){
      for (const [g,test] of f.groups){ sec.append(el('div',{class:'subhead'},g)); vals.filter(test).forEach(v=>sec.append(mk(v))); }
    } else {
      const lim = f.limit && !state.expanded[f.key] ? f.limit : Infinity;
      const vis = vals.filter((v,i)=>i<lim || sel.has(v));
      vis.forEach(v=>sec.append(mk(v)));
      if (vals.length>vis.length || (f.limit && state.expanded[f.key])) sec.append(el('button',{class:'more',onclick:()=>{state.expanded[f.key]=!state.expanded[f.key];renderFacets();}}, state.expanded[f.key]?'Voir moins':`Voir les ${vals.length}`));
    }
    box.append(sec);
  }
}

function renderChips(){
  const box=document.getElementById('chips'); box.innerHTML='';
  let any=false;
  if (state.q){ any=true; box.append(el('button',{class:'chip',onclick:()=>{state.q='';document.getElementById('q').value='';update();}},`« ${document.getElementById('q').value} »`,' ✕')); }
  for (const f of FACETS) for (const v of state.sel[f.key]){ any=true;
    box.append(el('button',{class:'chip',title:'Retirer ce filtre',onclick:()=>{state.sel[f.key].delete(v);update();}}, (f.label?f.label(v):v),' ✕')); }
  if (any) box.append(el('button',{class:'chip clear',onclick:()=>{state.q='';document.getElementById('q').value='';FACETS.forEach(f=>state.sel[f.key].clear());update();}},'Tout effacer'));
}

const cmp = (a,b)=>a.localeCompare(b,'fr',{sensitivity:'base'});
function sorted(list){
  const by = {
    az:(a,b)=>cmp(a.n,b.n),
    pays:(a,b)=>cmp(a.p[0]||'',b.p[0]||'')||cmp(a.n,b.n),
    secteur:(a,b)=>cmp(a.s[0]||'',b.s[0]||'')||cmp(a.n,b.n),
  }[state.sort];
  return list.slice().sort(by);
}

let current = [];
function caseCard(c, list){
  return el('button',{class:'case',onclick:()=>openCase(c.i, list)},
    el('h4',{},c.n),
    el('div',{class:'meta'}, [c.p.join(', '), c.t.map(t=>t.replace('Territoire - ','Territoire · ')).join(', ')].filter(Boolean).join(' · ')),
    el('div',{class:'tags'}, c.s.map(s=>el('span',{class:'tag'},s))),
    c.x ? el('p',{},c.x) : null,
    c.pt.length ? el('div',{class:'src'},'Source : '+c.pt.map(id=>PMAP[id].short).join(' · ')) : null);
}
function renderGrid(list){
  current = sorted(list);
  const g=document.getElementById('grid'); g.innerHTML='';
  document.getElementById('rescount').textContent = `${list.length} cas` + (list.length!==CASES.length?` sur ${CASES.length}`:'');
  if (!list.length){ g.append(el('div',{class:'empty'},'Aucun cas ne correspond à ces critères.')); document.getElementById('more').hidden=true; return; }
  for (const c of current.slice(0,state.shown)) g.append(caseCard(c, current));
  const m=document.getElementById('more'); m.hidden = current.length<=state.shown;
  m.textContent = `Afficher plus (${current.length-state.shown} restants)`;
}

// ---------- carte ----------
const svg=document.getElementById('map'), vp=document.getElementById('vp'), land=document.getElementById('land'), bubs=document.getElementById('bubbles'), tip=document.getElementById('tip');
const NS='http://www.w3.org/2000/svg';
svg.setAttribute('viewBox',`0 0 ${WORLD.W} ${WORLD.H}`);
svg.setAttribute('preserveAspectRatio','xMidYMid meet');
const nameOf = {}; for (const [n,a] of Object.entries(WORLD.nameToA2)) if (!nameOf[a]) nameOf[a]=n;
const paths = {};
for (const c of WORLD.countries){
  const p=document.createElementNS(NS,'path'); p.setAttribute('d',c.d); p.setAttribute('class','country');
  p.dataset.a=c.a; land.append(p); (paths[c.a] ||= []).push(p);
}
// nom affiché pour un code pays : celui utilisé dans Grist
const usedName = {}; for (const c of CASES) for (const p of c.p){ const a=WORLD.nameToA2[p]; if(a) usedName[a]=p; }
const label = a => usedName[a] || nameOf[a];
let T={x:0,y:0,k:1};
function applyT(){ vp.setAttribute('transform',`translate(${T.x} ${T.y}) scale(${T.k})`); layoutBubbles(); }
function clampT(){ T.k=Math.max(1,Math.min(14,T.k)); const W=WORLD.W,H=WORLD.H; T.x=Math.min(0,Math.max(W-W*T.k,T.x)); T.y=Math.min(0,Math.max(H-H*T.k,T.y)); }
function svgPt(e){ const r=svg.getBoundingClientRect(); const s=Math.min(r.width/WORLD.W, r.height/WORLD.H); const ox=(r.width-WORLD.W*s)/2, oy=(r.height-WORLD.H*s)/2; return [(e.clientX-r.left-ox)/s,(e.clientY-r.top-oy)/s]; }
function zoomAt(px,py,f){ const k=Math.max(1,Math.min(14,T.k*f)); f=k/T.k; T.x=px-(px-T.x)*f; T.y=py-(py-T.y)*f; T.k=k; clampT(); applyT(); }
let anim=null;
function flyTo(target){
  cancelAnimationFrame(anim); const s={...T}, t0=performance.now(), D=450;
  const step=now=>{ const u=Math.min(1,(now-t0)/D), e=u<.5?2*u*u:1-Math.pow(-2*u+2,2)/2;
    T={x:s.x+(target.x-s.x)*e,y:s.y+(target.y-s.y)*e,k:s.k+(target.k-s.k)*e}; applyT(); if(u<1) anim=requestAnimationFrame(step); };
  anim=requestAnimationFrame(step);
}
function fitBox(x0,y0,x1,y1){ const k=Math.min(14,0.9*Math.min(WORLD.W/(x1-x0), WORLD.H/(y1-y0))); const t={k,x:WORLD.W/2-k*(x0+x1)/2,y:WORLD.H/2-k*(y0+y1)/2}; const save=T; T=t; clampT(); const r={...T}; T=save; return r; }
const ZONES = [
  ['Monde', ()=>({x:0,y:0,k:1})],
  ['Europe', ()=>{ const pts=['FR','GB','DE','SE','FI','ES','TR','UA','IE'].map(a=>WORLD.cent[a]); return fitBox(Math.min(...pts.map(p=>p[0]))-12,Math.min(...pts.map(p=>p[1]))-20,Math.max(...pts.map(p=>p[0]))+8,Math.max(...pts.map(p=>p[1]))+14); }],
  ['France', ()=>{ const [x,y]=WORLD.cent.FR; return fitBox(x-26,y-22,x+26,y+22); }],
  ['Amériques', ()=>fitBox(...WORLD.amer)],
];
const zbox=document.getElementById('zones');
ZONES.forEach(([n,f])=>zbox.append(el('button',{onclick:()=>flyTo(f())},n)));
svg.addEventListener('wheel',e=>{ e.preventDefault(); const [x,y]=svgPt(e); zoomAt(x,y,Math.exp(-e.deltaY*0.0022)); },{passive:false});
const ptrs=new Map(); let drag=null, moved=false, pinch=null;
svg.addEventListener('pointerdown',e=>{ svg.setPointerCapture(e.pointerId); ptrs.set(e.pointerId,svgPt(e)); moved=false;
  if (ptrs.size===1){ const [x,y]=svgPt(e); drag={x,y,tx:T.x,ty:T.y}; }
  if (ptrs.size===2){ const [a,b]=[...ptrs.values()]; pinch={d:Math.hypot(a[0]-b[0],a[1]-b[1]),k:T.k}; drag=null; } });
svg.addEventListener('pointermove',e=>{
  if (!ptrs.has(e.pointerId)) return; ptrs.set(e.pointerId,svgPt(e));
  if (pinch && ptrs.size===2){ const [a,b]=[...ptrs.values()]; const d=Math.hypot(a[0]-b[0],a[1]-b[1]); zoomAt((a[0]+b[0])/2,(a[1]+b[1])/2,(pinch.k*d/pinch.d)/T.k); moved=true; return; }
  if (drag){ const [x,y]=svgPt(e); const dx=x-drag.x, dy=y-drag.y; if (Math.abs(dx)+Math.abs(dy)>3){moved=true;svg.classList.add('dragging');hideTip();} T.x=drag.tx+dx; T.y=drag.ty+dy; clampT(); applyT(); } });
const endPtr=e=>{ ptrs.delete(e.pointerId); if(ptrs.size<2) pinch=null; if(!ptrs.size){drag=null;svg.classList.remove('dragging');} };
svg.addEventListener('pointerup',endPtr); svg.addEventListener('pointercancel',endPtr);
document.getElementById('zin').onclick=()=>zoomAt(WORLD.W/2,WORLD.H/2,1.6);
document.getElementById('zout').onclick=()=>zoomAt(WORLD.W/2,WORLD.H/2,1/1.6);

function showTip(e,html){ const r=document.getElementById('mapbox').getBoundingClientRect(); tip.innerHTML=html; tip.style.left=(e.clientX-r.left)+'px'; tip.style.top=(e.clientY-r.top)+'px'; tip.style.opacity=1; }
function hideTip(){ tip.style.opacity=0; }
function toggleCountry(a){ const n=label(a); if(!n || !usedName[a]) return; const s=state.sel.p; s.has(n)?s.delete(n):s.add(n); update(); }
land.addEventListener('click',e=>{ if(moved) return; const a=e.target.dataset?.a; if(a) toggleCountry(a); });
land.addEventListener('pointermove',e=>{ if(drag&&moved) return; const a=e.target.dataset?.a; if(!a||!label(a)) return hideTip(); showTip(e,`<b>${label(a)}</b> · ${countBy[a]||0} cas`); });
land.addEventListener('pointerleave',hideTip);

let countBy={}, bubbleData=[];
function binOf(n,max){ if(!n) return -1; const t=Math.log(n)/Math.log(Math.max(2,max)); return Math.min(RAMP.length-1,Math.floor(t*(RAMP.length-1)+.0001)); }
function renderMap(list){
  countBy={}; for (const c of list) for (const p of c.p){ const a=WORLD.nameToA2[p]; if(a) countBy[a]=(countBy[a]||0)+1; }
  const max=Math.max(1,...Object.values(countBy));
  for (const [a,ps] of Object.entries(paths)){
    const n=countBy[a]||0, b=binOf(n,max), sel=usedName[a]&&state.sel.p.has(usedName[a]);
    for (const p of ps){ p.style.fill = b<0 ? '' : RAMP[b]; p.classList.toggle('has',!!usedName[a]); p.classList.toggle('sel',!!sel); }
  }
  bubs.innerHTML=''; bubbleData=[];
  Object.entries(countBy).sort((a,b)=>b[1]-a[1]).forEach(([a,n])=>{
    if(!WORLD.cent[a]) return;
    const g=document.createElementNS(NS,'g'); const c=document.createElementNS(NS,'circle'); c.setAttribute('class','bubble');
    const t=document.createElementNS(NS,'text'); t.setAttribute('class','bubble-label'); t.textContent=n;
    g.append(c,t); bubs.append(g);
    g.addEventListener('click',()=>{ if(!moved) toggleCountry(a); });
    g.addEventListener('pointermove',e=>showTip(e,`<b>${label(a)}</b> · ${n} cas`)); g.addEventListener('pointerleave',hideTip);
    bubbleData.push({a,n,c,t});
  });
  layoutBubbles();
  document.getElementById('legend').innerHTML=`Nombre de cas par pays<div class="ramp">${RAMP.map(c=>`<span style="background:${c}"></span>`).join('')}</div><div class="ramp-l"><span>1</span><span>${max}</span></div>`;
}
function layoutBubbles(){
  const R=svg.getBoundingClientRect(); const ds=R.width?Math.min(R.width/WORLD.W,R.height/WORLD.H):1;
  for (const b of bubbleData){ const [x,y]=WORLD.cent[b.a]; const rs=Math.min(24,(ds<0.6?6.5:7.5)+Math.sqrt(b.n)*(ds<0.6?0.8:1.05)), r=rs/T.k/ds;
    b.c.setAttribute('cx',x); b.c.setAttribute('cy',y); b.c.setAttribute('r',r);
    b.t.setAttribute('x',x); b.t.setAttribute('y',y); b.t.setAttribute('font-size',(b.n>=100?rs*0.72:rs*0.9)/T.k/ds); }
}

// ---------- logo ou portrait ----------
function avatar(p, size){
  const list=AV[p.id]||[];
  if (!list.length) return el('div',{class:'pav',style:`width:${size}px;height:${size}px;font-size:${Math.round(size*0.3)}px`,'aria-hidden':'true'}, p.ini||p.short.slice(0,2));
  const box=el('div',{class:'pavs','aria-hidden':'true'});
  list.forEach((a,i)=>box.append(a.logo
    ? el('div',{class:'plogo',style:`height:${size}px;padding:${Math.round(size*.12)}px ${Math.round(size*.18)}px`}, el('img',{src:a.src,alt:''}))
    : el('div',{class:'pav photo',style:`width:${size}px;height:${size}px;${i&&!list[i-1].logo?`margin-left:-${Math.round(size*.2)}px`:''}`}, el('img',{src:a.src,alt:''}))));
  return box;
}

// ---------- fiche d'un cas ----------
let openIdx=-1;
const drawer=document.getElementById('drawer'), overlay=document.getElementById('overlay');
let navList=null;
function sourceBoxes(c){
  const groups=new Map();
  for (const o of c.o){ const id=partnerOf(o)||'_'; if(!groups.has(id)) groups.set(id,[]); groups.get(id).push(o); }
  return [...groups].map(([id,refs])=>{
    const p=PMAP[id];
    if(!p) return el('div',{class:'srcbox'}, refs.map(r=>el('div',{class:'sref'},r)));
    return el('div',{class:'srcbox'},
      el('div',{style:'display:flex;gap:12px;align-items:center'}, avatar(p,40),
        el('div',{}, el('span',{class:'ptype'},p.type), el('div',{class:'sname',style:'margin-top:4px'},p.name))),
      refs.map(r=>el('div',{class:'sref'},r)),
      el('button',{onclick:()=>{closeCase(); location.hash='p-'+id;}},'Découvrir cet expert →'));
  });
}
function openCase(i, list){
  if (list) navList=list; if (!navList) navList=current;
  openIdx=i; const c=CASES[i]; const body=document.getElementById('dbody'); body.innerHTML='';
  const pos=navList.findIndex(x=>x.i===i);
  document.getElementById('dpos').textContent = pos>=0 ? `${pos+1} / ${navList.length}` : '';
  let site;
  if (c.w){ const href=/^https?:\/\//i.test(c.w)?c.w:'https://'+c.w;
    let host=''; try{host=new URL(href).hostname.replace(/^www\./,'');}catch{}
    site=el('div',{class:'dsite'}, el('a',{class:'btn',href,target:'_blank',rel:'noopener noreferrer',title:href},'Visiter le site ↗'), host?el('span',{},host):null); }
  else site=el('div',{class:'dsite'}, el('span',{},'Aucun site renseigné dans la base.'));
  body.append(...[
    el('div',{class:'tags',style:'margin-bottom:10px'}, c.s.map(s=>el('span',{class:'tag'},s))),
    el('h2',{id:'dtitle'},c.n),
    el('div',{style:'color:var(--muted)'}, [c.p.join(', '), c.t.join(', ')].filter(Boolean).join(' · ')),
    c.x ? el('div',{class:'desc'},c.x) : el('div',{class:'desc',style:'color:var(--muted)'},'Pas de description renseignée.'),
    el('dl',{},
      el('dt',{},'Pays'), el('dd',{},c.p.join(', ')||'—'),
      el('dt',{},'Taille'), el('dd',{},c.t.join(', ')||'—'),
      el('dt',{},"Secteur d'activité"), el('dd',{},c.s.join(', ')||'—')),
    el('h4',{style:'margin:22px 0 10px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)'}, c.pt.length>1?'Identifié par nos experts sources':'Identifié par notre expert source'),
    c.o.length ? sourceBoxes(c) : el('div',{style:'color:var(--muted)'},'Source non renseignée.'),
    site].flat().filter(Boolean));
  drawer.classList.add('on'); overlay.classList.add('on'); body.scrollTop=0;
  document.getElementById('dclose').focus({preventScroll:true});
}
function closeCase(){ drawer.classList.remove('on'); overlay.classList.remove('on'); openIdx=-1; }
function stepCase(d){ const L=navList||current; const pos=L.findIndex(x=>x.i===openIdx); if(pos<0) return; const n=L[(pos+d+L.length)%L.length]; openCase(n.i); }
document.getElementById('dclose').onclick=closeCase; overlay.onclick=()=>{closeCase(); document.getElementById('filters').classList.remove('on');};
document.getElementById('dprev').onclick=()=>stepCase(-1); document.getElementById('dnext').onclick=()=>stepCase(1);
document.addEventListener('keydown',e=>{ if(openIdx<0) return; if(e.key==='Escape') closeCase(); if(e.key==='ArrowRight') stepCase(1); if(e.key==='ArrowLeft') stepCase(-1); });

// ---------- câblage ----------
function update(){ state.shown=60; const list=filtered(); renderFacets(); renderChips(); renderGrid(list); renderMap(list); }
let qt; document.getElementById('q').addEventListener('input',e=>{ clearTimeout(qt); qt=setTimeout(()=>{state.q=norm(e.target.value.trim()); update();},150); });
document.getElementById('sort').onchange=e=>{state.sort=e.target.value; renderGrid(filtered());};
document.getElementById('more').onclick=()=>{state.shown+=60; renderGrid(filtered());};
document.getElementById('ftoggle').onclick=()=>{document.getElementById('filters').classList.add('on'); overlay.classList.add('on');};

(function stats(){
  const countries=new Set(CASES.flatMap(c=>c.p)), sectors=new Set(CASES.flatMap(c=>c.s));
  const terr=CASES.filter(c=>c.t.some(t=>t.startsWith('Territoire'))).length;
  document.getElementById('stats').append(
    el('span',{class:'stat'},el('b',{},String(CASES.length)),' cas'),
    el('span',{class:'stat'},el('b',{},String(countries.size)),' pays'),
    el('span',{class:'stat'},el('b',{},String(sectors.size)),' secteurs'),
    el('span',{class:'stat'},el('b',{},String(CASES.length-terr)),' entreprises · ',el('b',{},String(terr)),' territoires'));
  document.getElementById('foot').textContent = `Données : base Regen (Grist)${UPDATED?', mise à jour du '+UPDATED:''}. Les cas sont localisés à l'échelle du pays. Présentations des experts rédigées à partir de leurs publications et informations publiques.`;
})();

// ---------- experts sources ----------
const pview=document.getElementById('view-partenaires');
document.getElementById('pcount').textContent=PARTNERS.length;
const pubsOf = id => [...new Set(CASES.flatMap(c=>c.o.filter(o=>partnerOf(o)===id)))].sort(cmp);
function renderPartnerList(){
  pview.innerHTML='';
  pview.append(
    el('p',{class:'pintro'},`Cette cartographie existe grâce aux travaux de ${PARTNERS.length} experts sources : chercheurs, auteurs, réseaux et communautés qui repèrent et documentent les initiatives régénératives. Découvrez qui ils sont et les sources dont sont issus les cas.`),
    el('div',{class:'pgrid'}, PARTNERS.map(p=>el('button',{class:'partner',onclick:()=>{location.hash='p-'+p.id;}},
      el('div',{class:'ptop'}, avatar(p,64), el('div',{}, el('span',{class:'ptype'},p.type), el('h3',{style:'margin-top:8px'},p.name))),
      el('p',{}, p.desc.length>260 ? p.desc.slice(0,p.desc.lastIndexOf(' ',250))+'…' : p.desc),
      el('div',{class:'go'},'Qui sont-ils ? →')))));
}
function renderPartner(id){
  const p=PMAP[id]; if(!p){ location.hash='partenaires'; return; }
  pview.innerHTML='';
  pview.append(
    el('button',{class:'pback',onclick:()=>{location.hash='partenaires';}},'← Tous les experts'),
    el('div',{class:'phero'},
      el('div',{},
        el('div',{style:'display:flex;flex-direction:column;gap:16px;align-items:flex-start'}, avatar(p,96),
          el('div',{}, el('span',{class:'ptype'},p.type), el('h2',{},p.name))),
        el('p',{class:'pdesc'},p.desc),
        p.facts.length ? el('ul',{class:'facts'}, p.facts.map(f=>el('li',{},f))) : null,
        el('div',{class:'pactions'},
          p.link ? el('a',{class:'btn',href:p.link[0],target:'_blank',rel:'noopener noreferrer'},p.link[1]+' ↗') : null,
          (p.li||[]).map(([u,l])=>el('a',{class:'btn ghost',href:u,target:'_blank',rel:'noopener noreferrer',title:'Profil LinkedIn'},el('span',{class:'inb'},'in'),(p.li.length>1||l!==p.short?l:'LinkedIn')+' ↗')))),
      el('div',{class:'pside'},
        el('div',{class:'pubs'}, el('h4',{},'Sources associées'), el('ul',{}, pubsOf(id).map(o=>el('li',{},o)))),
        el('button',{class:'btn ghost',style:'align-self:flex-start',onclick:()=>{ state.q=''; document.getElementById('q').value=''; FACETS.forEach(f=>state.sel[f.key].clear()); state.sel.pt.add(p.short); location.hash='carte'; update(); }},'Voir les cas issus de cette source →'))));
}
function route(){
  const h=location.hash.slice(1);
  const isP = h==='partenaires' || h.startsWith('p-'), isE = h==='equipe';
  document.getElementById('view-carte').hidden = isP||isE;
  document.getElementById('view-equipe').hidden = !isE;
  pview.hidden = !isP;
  document.querySelectorAll('#tabs a').forEach(a=>a.classList.toggle('on', a.dataset.v===(isE?'equipe':isP?'partenaires':'carte')));
  if (isP){ if (h.startsWith('p-')) renderPartner(h.slice(2)); else renderPartnerList();
    const top=document.getElementById('tabs').getBoundingClientRect().top+window.scrollY-8; if (window.scrollY>top) window.scrollTo({top}); }
  else if (!isE) layoutBubbles();
}
window.addEventListener('hashchange',route);
applyT(); update(); route();
window.addEventListener('resize',layoutBubbles);
