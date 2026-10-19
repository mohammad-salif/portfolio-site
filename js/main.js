(function(){
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches, fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
  gsap.registerPlugin(ScrollTrigger);
  var SITES = {
   1:`<div class="site"><div class="nv"><b>Mocha &amp; Co.</b><span><u>Menu</u><u>Our story</u><u>Visit</u></span><em class="bt">Order online</em></div><div class="hg"><div><span class="tg">Roasted fresh every morning</span><h4>Small-batch coffee for slow mornings.</h4><p>Single-origin beans, baked pastries and a quiet corner to settle into.</p><em class="bt">See the menu</em><em class="bt o">Find us</em></div><div class="ph i4"></div></div></div>`,
   2:`<div class="site"><div class="nv"><b>Más Que Papel</b><span><u>Shop</u><u>Notebooks</u><u>Stationery</u><u>Journal</u></span><em class="bt">Cart (1)</em></div><div class="hg r"><div class="ph i1"></div><div><span class="tg">Made in Spain</span><h4>Paper goods worth writing on.</h4><div class="ml"><p>Letter paper, 100 sheets<i>€18</i></p><p>Notecards, set of 12<i>€14</i></p><p>Ribbon gift box<i>€32</i></p></div><em class="bt">Shop the collection</em></div></div></div>`,
   3:`<div class="site"><div class="nv"><b>Form Studio</b><span><u>Living</u><u>Bedroom</u><u>Workspace</u><u>Sale</u></span><em class="bt">Cart (2)</em></div><div class="eh"><h4>Shop by room</h4><span><em class="tg">All</em><em class="tg">Sofas</em><em class="tg">Tables</em><em class="tg">Desks</em></span></div><div class="pg"><div class="pc"><div class="ph i8"></div><p>Living room<i>from $480</i></p></div><div class="pc"><div class="ph i7"></div><p>Lounge<i>from $620</i></p></div><div class="pc"><div class="ph i3"></div><p>Workspace<i>from $240</i></p></div></div></div>`,
   4:`<div class="site"><div class="nv"><b>Stay Hollow</b><span><u>Stays</u><u>Experiences</u><u>Journal</u></span><em class="bt">Sign in</em></div><div class="hero4 ph i6"><div class="ov"><h4>Quiet places to stay.</h4><div class="sb"><span><u>Where</u>Lisbon, Portugal</span><span><u>Dates</u>12 to 16 Jun</span><span><u>Guests</u>2 adults</span><em class="bt">Search</em></div></div></div></div>`,
   5:`<div class="site t5"><div class="sd"><b>Ledgr</b><u class="on">Overview</u><u>Invoices</u><u>Customers</u><u>Reports</u></div><div class="db"><div class="dh"><h4>Overview</h4><em class="bt">New invoice</em></div><div class="kp"><div><u>Revenue</u><b>$48,210</b></div><div><u>Invoices</u><b>126</b></div><div><u>Overdue</u><b>$3,480</b></div></div><div class="ch"><span style="height:35%"></span><span style="height:48%"></span><span style="height:42%"></span><span style="height:62%"></span><span style="height:55%"></span><span style="height:74%"></span><span style="height:92%"></span><span style="height:68%"></span></div></div></div>`,
   6:`<div class="site"><div class="nv"><b>Haven Homes</b><span><u>Buy</u><u>Rent</u><u>Sell</u></span><em class="bt">List a home</em></div><div class="fl"><em class="tg">Brooklyn, NY</em><em class="tg">2+ beds</em><em class="tg">Under $1.2M</em></div><div class="lg"><div class="lc"><div class="ph i8"></div><p><b>$985,000</b><u>3 bd · 2 ba · 1,820 sqft</u>14 Alder Street</p></div><div class="lc"><div class="ph i7"></div><p><b>$740,000</b><u>2 bd · 1 ba · 1,100 sqft</u>9 Quince Avenue</p></div></div></div>`
  };
  var PR=[
   {s:'mocha',t:'Mocha &amp; Co.',k:'Cafe website',y:'2026',a:1,r:'Design and front end',sv:'UX, UI, Development',im:['i4','i3','i2'],sum:'A website for a neighborhood coffee roaster: online ordering, a seasonal menu and a store locator, all in one calm flow.',ch:'The café had loyal regulars but no way to order ahead, and its old site hid the menu three clicks deep.',so:'I rebuilt the site around two actions, see the menu and order. The photography leads, and the interface stays quiet.',rs:[['+38%','online orders'],['2.1s','to first paint'],['4.8','average rating']]},
   {s:'papel',t:'Más Que Papel',k:'Brand and website',y:'2025',a:2,r:'Identity, design',sv:'Brand, Packaging, Web',im:['i1','i5','i2'],sum:'A brand and online shop for a Spanish paper-goods studio: monogram, packaging and a calm product catalogue.',ch:'The studio’s products were beautiful in person but their online presence felt generic and cluttered.',so:'A single monogram, one paper-white palette and a catalogue that lets each object take the full width of the page.',rs:[['3×','repeat customers'],['12','packaging variants'],['0','stock photos used']]},
   {s:'form',t:'Form Studio',k:'E-commerce store',y:'2025',a:3,r:'Design and front end',sv:'UX, UI, Development',im:['i8','i7','i6'],sum:'A home-goods store where shoppers browse by room first and by product second, with filtering that stays out of the way.',ch:'Shoppers were overwhelmed by a flat catalogue of hundreds of items with no sense of how pieces work together.',so:'Room-based browsing, large photography and quiet filters, so the whole room is visible before a single product is.',rs:[['+24%','average order value'],['−31%','bounce rate'],['5','rooms launched']]},
   {s:'stay',t:'Stay Hollow',k:'Hotel booking',y:'2024',a:4,r:'Design and prototyping',sv:'UX, UI, Prototype',im:['i6','i7','i8'],sum:'A booking flow for boutique stays, with the search bar as the hero and every step reduced to one decision.',ch:'Guests dropped off between choosing dates and confirming, because the flow asked for too much too soon.',so:'Search first, details second. Each step shows one decision, with the price and dates always in view.',rs:[['+19%','completed bookings'],['3','steps instead of 7'],['1.4s','search response']]}];
  var J=[['Why most portfolio sites feel the same','12 Oct 2026','Design','6 min','i5'],['Slow scroll, done properly','2 Oct 2026','Motion','4 min','i2'],['Choosing a palette from a photograph','21 Sep 2026','Color','5 min','i4'],['What a good case study includes','8 Sep 2026','Writing','7 min','i1'],['Designing for the half second after a click','27 Aug 2026','Interaction','4 min','i3'],['Notes from a small studio','10 Aug 2026','Process','8 min','i6']];
  var lenis=null;
  if(!reduce&&window.Lenis){lenis=new Lenis({duration:1.9,easing:function(t){return Math.min(1,1.001-Math.pow(2,-10*t))},wheelMultiplier:.75,touchMultiplier:1.4});lenis.on('scroll',ScrollTrigger.update);gsap.ticker.add(function(t){lenis.raf(t*1000)});gsap.ticker.lagSmoothing(0)}
  function $(i){return document.getElementById(i)}
  function fillArts(root){root.querySelectorAll('.art').forEach(function(el){var m=el.className.match(/\ba(\d)\b/);if(m&&SITES[m[1]])el.innerHTML=SITES[m[1]]})}
  function disp(t){return t.replace('&amp;','<i>&amp;</i>')}

  /* ---- generated sections ---- */
  var BG=['#E4E8DA','#EAE2D3','#F0EDE5','#DDE3D2'];
  $('work').innerHTML=PR.map(function(p,i){return '<a class="wk" href="#/work/'+p.s+'" data-cur="View" style="--bg:'+BG[i]+'"><div class="wki"><p class="mono">0'+(i+1)+' / 0'+PR.length+'</p><h2>'+disp(p.t)+'</h2><p class="wkm mono">'+p.k+' — '+p.y+'</p><p class="wkd">'+p.sum+'</p><span class="wkb">Case study <b>→</b></span></div><div class="wkp"><div class="ph '+p.im[0]+'"></div><div class="art mk a'+p.a+'"></div></div></a>'}).join('');
  var SV=[['Websites','Marketing sites, portfolios and product pages, designed and built to load fast and feel alive.','i4'],['Brand identity','Logo, type, color and the rules that keep a brand consistent once I’m gone.','i1'],['Motion and interaction','Transitions, scroll behavior and micro-interactions that explain what changed.','i5'],['Art direction','One visual point of view across launches, campaigns and social.','i3']];
  $('svl').innerHTML=SV.map(function(s,i){return '<div class="sr" data-img="'+s[2]+'"><span class="mono">0'+(i+1)+'</span><h3>'+s[0]+'</h3><p>'+s[1]+'</p></div>'}).join('');
  var CL=['Mocha &amp; Co.','Más Que Papel','Form Studio','Stay Hollow','Haven Homes','Ledgr'];
  var mq=CL.map(function(c){return '<span>'+c+'</span><span>—</span>'}).join(''); $('mq').innerHTML=mq+mq;
  var QS=[['Replace this with a real client quote, one or two sentences about the result.','Client name, Company'],['A second quote goes here. Keep it specific and short.','Client name, Company'],['A third quote goes here.','Client name, Company']];
  $('qs').innerHTML=QS.map(function(q){return '<blockquote class="q"><p>“'+q[0]+'”</p><cite class="mono">'+q[1]+'</cite></blockquote>'}).join('');
  var row=function(p){return '<a class="jrow fu" data-cur="Read" href="#/journal"><span class="mono">'+p[1]+'</span><h3>'+p[0]+'</h3><span>'+p[2]+' · '+p[3]+'</span></a>'};
  $('jr').innerHTML=J.slice(0,4).map(row).join(''); $('jl').innerHTML=J.map(row).join('');
  var FQ=[['How much does a project cost?','It depends on scope. After a short call I send a fixed quote, so there are no surprises.'],['How long does it take?','Most websites take three to six weeks from brief to launch. Brand identities usually take four to eight.'],['Do you write the copy too?','Yes. I write headlines and key pages as part of the design, or work with your copy if you already have it.'],['How many revisions do I get?','Two focused rounds per stage. Weekly check-ins keep feedback small.'],['Do you work with clients abroad?','Yes. I work remotely with teams in different time zones and keep communication written and clear.']];
  $('fq').innerHTML=FQ.map(function(f){return '<div class="fi"><button><span>'+f[0]+'</span><i></i></button><div class="fa"><p>'+f[1]+'</p></div></div>'}).join('');
  fillArts(document);

  /* ---- reveals ---- */
  function splitEl(el){[].slice.call(el.childNodes).forEach(function(n){if(n.nodeType===3){var f=document.createDocumentFragment();n.textContent.split(/(\s+)/).forEach(function(w){if(!w)return;if(/^\s+$/.test(w)){f.appendChild(document.createTextNode(' '))}else{var s=document.createElement('span');s.className='wd';var t=document.createElement('span');t.textContent=w;s.appendChild(t);f.appendChild(s)}});el.replaceChild(f,n)}else if(n.nodeType===1&&n.tagName!=='BR')splitEl(n)})}
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var el=e.target;io.unobserve(el);if(el.classList.contains('rv'))gsap.to(el.querySelectorAll('.wd>span'),{yPercent:0,duration:1.3,stagger:.07,ease:'expo.out'});else gsap.to(el,{opacity:1,y:0,duration:1.2,ease:'expo.out'})})},{rootMargin:'0px 0px -8% 0px'});
  function prep(root){if(reduce)return;root.querySelectorAll('.rv:not([data-d])').forEach(function(el){splitEl(el);gsap.set(el.querySelectorAll('.wd>span'),{yPercent:115});el.dataset.d=1;io.observe(el)});root.querySelectorAll('.fu:not([data-d])').forEach(function(el){gsap.set(el,{opacity:0,y:34});el.dataset.d=1;io.observe(el)})}
  prep(document);

  /* ---- hero: sheet zooms into one photo ---- */
  var hc=$('hc');
  if(!reduce){
    var htl=gsap.timeline({scrollTrigger:{trigger:'#hero',start:'top top',end:'+=170%',pin:true,scrub:1,invalidateOnRefresh:true}});
    htl.to(hc,{x:function(){return innerWidth/2-(hc.offsetLeft+hc.offsetWidth/2)},y:function(){return innerHeight/2-(hc.offsetTop+hc.offsetHeight/2)},scale:function(){return Math.max(innerWidth/hc.offsetWidth,innerHeight/hc.offsetHeight)*1.03},ease:'power2.inOut',duration:1},0)
       .to('#hgrid .t:not(.c)',{opacity:0,scale:.92,duration:.55},0).to('#hint',{opacity:0,duration:.2},0)
       .fromTo('#hl',{opacity:0,y:60},{opacity:1,y:0,duration:.5},.65);
    gsap.set('#hint',{opacity:1});
  } else {gsap.set('#hint',{opacity:0})}
  /* statement words */
  (function(){var el=$('stt');[].slice.call(el.childNodes).forEach(function(n){if(n.nodeType===3){var f=document.createDocumentFragment();n.textContent.split(/(\s+)/).forEach(function(w){if(!w)return;var s=document.createElement('span');s.className='w';s.textContent=w;f.appendChild(s)});el.replaceChild(f,n)}else n.classList&&n.classList.add('w')});
    if(!reduce)gsap.to('#stt .w',{opacity:1,stagger:.6,ease:'none',scrollTrigger:{trigger:el,start:'top 80%',end:'bottom 50%',scrub:.6}});else gsap.set('#stt .w',{opacity:1})})();
  /* work stack */
  if(!reduce){var wk=gsap.utils.toArray('.wk');wk.forEach(function(p,i){if(i<wk.length-1)gsap.to(p,{scale:.92,opacity:.35,transformOrigin:'50% 0%',ease:'none',scrollTrigger:{trigger:wk[i+1],start:'top bottom',end:'top top',scrub:true}})})}
  /* marquee + quotes */
  var mt=gsap.to('#mq',{xPercent:-50,duration:45,ease:'none',repeat:-1});
  if(!reduce)ScrollTrigger.create({onUpdate:function(s){gsap.to(mt,{timeScale:Math.min(6,1+Math.abs(s.getVelocity())/350),duration:.3,overwrite:true,onComplete:function(){gsap.to(mt,{timeScale:1,duration:1.2})}})}});
  var qs=gsap.utils.toArray('.q'),qi=0;gsap.set(qs.slice(1),{opacity:0});
  function nq(){var o=qs[qi];qi=(qi+1)%qs.length;var n=qs[qi];gsap.to(o,{opacity:0,yPercent:-10,duration:.7,ease:'power2.in'});gsap.fromTo(n,{opacity:0,yPercent:10},{opacity:1,yPercent:0,duration:1,delay:.5,ease:'expo.out'})}
  $('qs').addEventListener('click',nq);if(!reduce)setInterval(nq,6500);

  /* ---- cursor + disciplines image ---- */
  var cu=$('cur'),fl=$('flt');
  if(fine&&!reduce){
    gsap.set([cu,fl],{xPercent:-50,yPercent:-50});
    var cx=gsap.quickTo(cu,'x',{duration:.35,ease:'power3'}),cy=gsap.quickTo(cu,'y',{duration:.35,ease:'power3'}),fx=gsap.quickTo(fl,'x',{duration:.7,ease:'power3'}),fy=gsap.quickTo(fl,'y',{duration:.7,ease:'power3'});
    addEventListener('pointermove',function(e){cx(e.clientX);cy(e.clientY);fx(e.clientX+110);fy(e.clientY)});
    document.addEventListener('pointerover',function(e){var t=e.target.closest('[data-cur]');if(t){cu.textContent=t.dataset.cur;cu.classList.add('on')}else{cu.classList.remove('on');cu.textContent=''}
      var r=e.target.closest('.sr');if(r){fl.className='flt '+r.dataset.img;gsap.to(fl,{opacity:1,scale:1,duration:.6,ease:'power3.out',overwrite:'auto'})}else gsap.to(fl,{opacity:0,scale:.8,duration:.4,overwrite:'auto'})});
  }

  /* ---- case page ---- */
  function renderCase(s){
    var i=Math.max(0,PR.findIndex(function(p){return p.s===s})),p=PR[i],nx=PR[(i+1)%PR.length],el=$('p-case');
    el.innerHTML='<section class="cvr"><div class="ph '+p.im[0]+'"></div></section><section class="wrap chd"><p class="mono">(Case 0'+(i+1)+') '+p.k+' — '+p.y+'</p><h1 class="pt rv" style="margin-top:1rem">'+disp(p.t)+'</h1><div class="cmeta mono fu"><div><u>Role</u>'+p.r+'</div><div><u>Year</u>'+p.y+'</div><div><u>Type</u>'+p.k+'</div><div><u>Services</u>'+p.sv+'</div></div><p class="cl-l fu">'+p.sum+'</p></section>'
    +'<section class="scr"><div class="lap fu"><div class="art a'+p.a+'"></div></div></section>'
    +'<section class="wrap cxx"><h3 class="fu">The <i>challenge</i></h3><p class="fu">'+p.ch+'</p></section><section class="wrap cxx"><h3 class="fu">The <i>approach</i></h3><p class="fu">'+p.so+'</p></section>'
    +'<section class="wrap cgal"><div class="fu g1"><div class="ph '+p.im[1]+'"></div></div><div class="fu g2"><div class="ph '+p.im[2]+'"></div></div><div class="fu g3"><div class="ph '+p.im[0]+'" style="background-position:50% 70%"></div></div></section>'
    +'<section class="wrap cst">'+p.rs.map(function(r){return '<div class="fu"><b>'+r[0]+'</b><span>'+r[1]+'</span></div>'}).join('')+'</section>'
    +'<section class="wrap"><a class="nxt" data-cur="Next" href="#/work/'+nx.s+'"><span class="mono">Next project</span><b>'+disp(nx.t)+'</b></a></section>';
    fillArts(el);prep(el);document.title=p.t.replace('&amp;','&')+' — Ora Studio';
  }

  /* ---- router with title wipe ---- */
  var pg={home:$('top'),about:$('p-about'),journal:$('p-journal'),contact:$('p-contact'),case:$('p-case')};
  var NAMES={home:'Ora Studio',work:'Work',about:'About',journal:'Journal',contact:'Contact'};
  function parse(h){var a=(h||'#/').replace(/^#\/?/,'').split('/');return{n:a[0]||'home',s:a[1]}}
  function kind(r){return r.n==='work'&&r.s?'case':(r.n==='work'||r.n==='home')?'home':r.n}
  var prev=null,busy=false,dock=$('dock'),ind=$('ind');
  function setDock(r){var n=r.n==='work'?'work':r.n,idx={work:0,about:1,journal:2,contact:3}[n];[].forEach.call(dock.querySelectorAll('a'),function(a,i){a.classList.toggle('on',i===idx)});var a=dock.querySelectorAll('a')[idx];if(a){ind.style.left=a.offsetLeft+'px';ind.style.width=a.offsetWidth+'px';ind.style.opacity=1}else ind.style.opacity=0}
  function render(r){
    var k=kind(r);Object.keys(pg).forEach(function(x){pg[x].hidden=true});
    if(k==='case'){pg.case.hidden=false;renderCase(r.s)}else{pg[k].hidden=false;document.title=k==='home'?'Ora Studio — Websites with a point of view':NAMES[k]+' — Ora Studio'}
    if(lenis){lenis.start();lenis.scrollTo(0,{immediate:true})}else scrollTo(0,0);
    requestAnimationFrame(function(){ScrollTrigger.refresh();if(r.n==='work'&&!r.s){var w=$('work');lenis?lenis.scrollTo(w,{duration:1.8}):w.scrollIntoView()}});
    setDock(r);prev=r;
  }
  function go(){
    var r=parse(location.hash);
    if(prev&&kind(prev)==='home'&&kind(r)==='home'){prev=r;setDock(r);var w=$(r.n==='work'?'work':'top');lenis?lenis.scrollTo(r.n==='work'?w:0,{duration:2}):scrollTo({top:r.n==='work'?w.offsetTop:0,behavior:'smooth'});return}
    if(reduce){render(r);return}
    if(busy)return;busy=true;$('wt').textContent=r.s?(PR.filter(function(p){return p.s===r.s})[0]||PR[0]).t.replace('&amp;','&'):NAMES[r.n]||'Ora Studio';
    gsap.timeline({onComplete:function(){busy=false}}).fromTo('#wipe',{xPercent:100},{xPercent:0,duration:.8,ease:'power4.inOut'}).add(function(){render(r)}).to('#wipe',{xPercent:-100,duration:.8,ease:'power4.inOut'},'+=.25');
  }
  addEventListener('hashchange',go);
  render(parse(location.hash));
  /* intro */
  if(!reduce){var il=gsap.timeline({delay:.3});il.to('#wipe',{xPercent:-100,duration:1.1,ease:'power4.inOut'},.9).from('#hgrid',{scale:1.14,opacity:0,duration:1.8,ease:'expo.out'},1.2)}
  /* faq, form, clock */
  document.addEventListener('click',function(e){var b=e.target.closest('.fi button');if(b){var it=b.parentNode,open=it.classList.toggle('open');gsap.to(it.querySelector('.fa'),{height:open?'auto':0,duration:.7,ease:'power3.inOut',onComplete:function(){ScrollTrigger.refresh()}})}var c=e.target.closest('.ch2');if(c)c.classList.toggle('on')});
  $('cf').addEventListener('submit',function(e){e.preventDefault();var f=new FormData(e.target),need=[].map.call(e.target.querySelectorAll('.ch2.on'),function(x){return x.textContent}).join(', ')||'Not specified';location.href='mailto:hello@example.com?subject='+encodeURIComponent('Project enquiry from '+f.get('n'))+'&body='+encodeURIComponent('Name: '+f.get('n')+'\nEmail: '+f.get('e')+'\nNeeds: '+need+'\nBudget: '+f.get('b')+'\n\n'+f.get('m'));$('thx').hidden=false});
  function tick(){$('tm').textContent='Local time '+new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}tick();setInterval(tick,20000);
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){ScrollTrigger.refresh();setDock(prev)});
  addEventListener('resize',function(){setDock(prev)});
})();
